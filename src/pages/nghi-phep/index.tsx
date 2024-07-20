import { useState, useEffect, useReducer, useRef, useMemo } from 'react'
import {
  Space,
  Popconfirm,
  message,
  Typography,
  Dropdown,
  MenuProps,
  Button,
  Badge,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  ActionType,
  PageContainer,
  ProTable,
  ProFormInstance,
  ProColumns,
} from '@ant-design/pro-components'
import { useNavigate } from 'umi'
import * as NghiPhepService from '@/services/nghiphep.service'
import dayjs from 'dayjs'

import CreateLeave from './create'
// import UpdateLeave from './update'

// import LeaveSetting from './LeaveSetting'
import { handleApiError } from '@/util/handleError'
import type * as NghiPhepModel from '@/models/nghiPhep.model'
import { flushSync } from 'react-dom'

const { Text, Title } = Typography

function dateDiff(tu_ngay: Date | string, den_ngay: Date | string) {
  const num = dayjs(new Date(den_ngay)).diff(new Date(tu_ngay), 'day') ?? 1
  return num == 0 ? 1 : num
}
const ApproveType: NghiPhepModel.NghiPhep['trang_thai'][] = [
  'cho_xu_ly',
  'da_duyet',
  'da_tu_choi',
]

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      showZero={true}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  )
}

function NghiPhep() {
  const navigate = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const [activeKey, setActiveKey] = useState<React.Key>('tab1')
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false)
  const [visibleUpdateDialog, setVisibleUpdateDialog] = useState(false)
  const [nghiPhepSelected, setNghiPhepSelected] =
    useState<NghiPhepModel.NghiPhep>({} as NghiPhepModel.NghiPhep)

  const [notification, setNotification] = useState({
    cho_xu_ly: 0,
    da_duyet: 0,
    da_tu_choi: 0,
  })

  const approveStatus = async (
    record: NghiPhepModel.NghiPhep,
    status: NghiPhepModel.NghiPhep['trang_thai'],
  ) => {
    try {
      const rs = await NghiPhepService.approveOrReject({
        id: record.id,
        trang_thai: status,
      })
      message.success(rs?.message ?? '')
      resetTable()
    } catch (error) {
      handleApiError(error, null, null)
    }
  }

  const resetTable = () => {}

  const columns = useMemo<ProColumns<NghiPhepModel.NghiPhep>[]>(() => {
    return [
      {
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Nhân viên',
        dataIndex: ['user', 'ho_va_ten'],
        key: 'user.ho_va_ten',
        search: false,
      },
      {
        title: 'Thông tin',
        search: false,
        dataIndex: 'information',
        render: (_: string, record: NghiPhepModel.NghiPhep) => (
          <>
            <p>
              {' '}
              <Text strong> Loại nghỉ phép:</Text> {record?.loaiNghiPhep?.ten}
            </p>
            <p>
              {' '}
              <Text strong> Ngày:</Text>{' '}
              {new Date(record?.tu_ngay).toLocaleDateString()} -{' '}
              {new Date(record?.den_ngay).toLocaleDateString()}
            </p>
            <p>
              {' '}
              <Text strong> Số ngày:</Text>{' '}
              {dateDiff(record.tu_ngay, record.den_ngay)}
            </p>
          </>
        ),
      },
      {
        title: 'Lý do',
        dataIndex: 'li_do',
        search: false,
        key: 'li_do',
      },

      {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        search: false,
        key: 'created_at',
        render: (_: string) => {
          return new Date(_).toLocaleDateString()
        },
      },
      {
        hidden: activeKey !== 'chua_duyet',
        dataIndex: 'action',
        title: 'Hành động',
        search: false,
        key: 'action',
        render: (_: string, record: NghiPhepModel.NghiPhep) => (
          <Space size="middle">
            <a
              onClick={(e) => {
                setNghiPhepSelected(record)
                setVisibleUpdateDialog(true)
              }}
            >
              <EditOutlined /> Sửa
            </a>
            <a>
              <Popconfirm
                title="Xoá"
                description="Xoá nghỉ phép?"
                onConfirm={async () => {
                  try {
                    const rs = await NghiPhepService.deleteNghiPhep(record)
                    message.success(rs?.message ?? '')
                    resetTable()
                  } catch (error) {
                    handleApiError(error, null, null)
                  }
                }}
                okText="Có"
                cancelText="Không"
              >
                {' '}
                <DeleteOutlined /> Xoá
              </Popconfirm>
            </a>

            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <a onClick={() => approveStatus(record, 'da_duyet')}>
                        Duyệt
                      </a>
                    ),
                    icon: <CheckOutlined />,
                  },
                  {
                    key: '2',
                    label: (
                      <a onClick={() => approveStatus(record, 'da_tu_choi')}>
                        Từ chối
                      </a>
                    ),
                    icon: <CloseOutlined />,
                  },
                  // { key: '3', label: <a>Xuất PDF</a>, icon: <FilePdfOutlined /> },
                ] as MenuProps['items'],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ] as ProColumns<NghiPhepModel.NghiPhep>[]
  }, [activeKey])

  useEffect(() => {
    //Lấy mặc chưa duyệt ở lần đầu render
    // socket.emit('getThongBaoNghiPhep', function (response: { data: any }) {
    //   const counter = { ...notification }
    //   counter.cho_xu_ly = 0
    //   counter.da_duyet = 0
    //   counter.da_tu_choi = 0
    //   response.data.forEach((item: any) => {
    //     if (!item['trang_thai']) return
    //     counter[item['trang_thai'] as keyof typeof notification] = item.count ?? 0
    //   })
    //   setNotification(counter)
    // })
    // if (!socket.hasListeners('sendThongBaoNghiPhep')) {
    //   socket.on('sendThongBaoNghiPhep', function (response: { data: any }) {
    //     const counter = { ...notification }
    //     counter.cho_xu_ly = 0
    //     counter.da_duyet = 0
    //     counter.da_tu_choi = 0
    //     response.data.forEach((item: any) => {
    //       if (!item['trang_thai']) return
    //       counter[item['trang_thai'] as keyof typeof notification] = item.count ?? 0
    //     })
    //     setNotification(counter)
    //   })
    // }
  }, [])

  return (
    <>
      <CreateLeave
        accessor={[visibleCreateDialog, setVisibleCreateDialog]}
        resetTable={resetTable}
      ></CreateLeave>

      <PageContainer>
        <ProTable<NghiPhepModel.NghiPhep>
          actionRef={actionRef}
          formRef={formRef}
          debounceTime={400}
          cardBordered
          // params={{}}
          columns={columns}
          request={async (params) => {
            return await NghiPhepService.getList({
              ...params,
              trang_thai: activeKey as NghiPhepModel.NghiPhep['trang_thai'],
            })
          }}
          rowKey="id"
          search={{
            labelWidth: 0,
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                }
              }
              return values
            },
          }}
          dateFormatter="string"
          toolbar={{
            menu: {
              type: 'tab',
              activeKey: activeKey,

              items: [
                {
                  key: 'cho_xu_ly',
                  label: (
                    <span>
                      Chưa duyệt
                      {renderBadge(
                        notification.cho_xu_ly,
                        activeKey === 'cho_xu_ly',
                      )}
                    </span>
                  ),
                },
                {
                  key: 'da_duyet',
                  label: (
                    <span>
                      Đã duyệt
                      {renderBadge(
                        notification.da_duyet,
                        activeKey === 'da_duyet',
                      )}
                    </span>
                  ),
                },
                {
                  key: 'da_tu_choi',
                  label: (
                    <span>
                      Từ chối
                      {renderBadge(
                        notification.da_tu_choi,
                        activeKey === 'da_tu_choi',
                      )}
                    </span>
                  ),
                },
              ],
              onChange: (key) => {
                setActiveKey(key as string)
                flushSync(() => {
                  formRef.current?.submit()
                })
              },
            },
          }}
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                // actionRef.current?.reload()
                setVisibleCreateDialog(true)
              }}
              type="primary"
            >
              Thêm mơi
            </Button>,
          ]}
        />
      </PageContainer>
    </>
  )
}

export default NghiPhep
