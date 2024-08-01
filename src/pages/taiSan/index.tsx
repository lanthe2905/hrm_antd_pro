import { useRef, useState, useEffect } from 'react'
import { Button, message, Popconfirm } from 'antd'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { getList, deleteAssets, dropdownGroupAssets } from '@/services/assets.service'
import CreateModal from './create'
import EditModal from './edit'
import { handleApiError } from '@/util/handleError'
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components'
import type { AssetsRequest, GroupAssetsRequest } from '@/models/assets.model'
import { flushSync } from 'react-dom'
import dayjs from 'dayjs';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time)
}

export default () => {
  const actionRef = useRef<ActionType>()
  const formRef = useRef<ProFormInstance>()
  const [selectedTaiSan, setSelectedTaiSan] = useState({} as AssetsRequest)
  const [visibleCreateModal, setVisibleCreateModal] = useState<boolean>(false)
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false)
  const [taiSanList, setTaiSanList] = useState<GroupAssetsRequest[]>([])

  const resetTable = () => {
    formRef.current?.submit()
  }

  const taiSanMap = taiSanList.reduce((acc, { id, ten }) => {
    acc[id] = ten;
    return acc;
  }, {} as Record<string, string>);

  const columns: ProColumns<AssetsRequest>[] = [
    {
      dataIndex: 'ID',
      key: 'search',
      hidden: true,
      search: {
        transform: (value) => ({ search: value }),
      },
    },
    {
      title: () => {
        return 'Mã tài sản'
      },
      dataIndex: 'ma_tai_san',
      ellipsis: true,
      search: false,
    },
    {
      // disable: true,
      title: 'Tên',
      search: false,
      dataIndex: 'ten',
      filters: false,
      // onFilter: true,
      ellipsis: true,
    },
    {
      // disable: true,
      title: 'Nhóm tài sản',
      search: false,
      dataIndex: 'id_nhom_tai_san',
      filters: false,
      ellipsis: true,
      render: (dom: React.ReactNode, entity: AssetsRequest) => {
        const id = entity.id_nhom_tai_san;
        return taiSanMap[id] || id;
      },
    },
    {
      // disable: true,
      title: 'Ngày mua',
      search: false,
      dataIndex: 'ngay_mua',
      filters: false,
      ellipsis: true,
      render: (text, record, _, action) => [
        dayjs(record.ngay_mua).format('DD/MM/YYYY')
      ]
    },
    {
      // disable: true,
      title: 'Cấp phát',
      search: false,
      dataIndex: 'nha_cung_cap',
      filters: false,
      ellipsis: true,
    },
    {
      // disable: true,
      title: 'Số lượng',
      search: false,
      dataIndex: 'so_luong',
      filters: false,
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          onClick={() => {
            flushSync(() => {
              setVisibleEditModal(true)
            })
            setSelectedTaiSan(record)
          }}
        >
          <EditOutlined /> Chỉnh sửa
        </a>,
        <a key="remove">
          <Popconfirm
              title={'Chắc chắn xóa ' + record.ma_tai_san + " không?"}
              okText="Xoá"
              cancelText="Không"
              onConfirm={async (e) => {
                //Xử lý xoá
                try {
                  const rs = await deleteAssets(record.id)
                  message.success('Xoá dữ liệu thành công!')
                  if (rs) {
                    actionRef.current?.reload()
                  }
                } catch (error) {
                  handleApiError(error, null, null)
                }
              }}
            >
              <DeleteOutlined /> Xoá
            </Popconfirm>
        </a>
      ],
    },
  ]

  useEffect(() => {
    const queryService = async () => {
      const state = [dropdownGroupAssets({})]
      return Promise.all(state)
    }

    const handler = async () => {
      try {
        const listRS = await queryService()
        setTaiSanList(listRS.at(0)?.data ?? [])
      } catch (error) {
        handleApiError(error, null, null)
      }
    }
    handler()
  }, [])

  return (
    <>
      <CreateModal
        accessor={[visibleCreateModal, setVisibleCreateModal]}
        resetTable={resetTable}
        taiSanList={taiSanList}
      ></CreateModal>
      <EditModal
        accessor={[visibleEditModal, setVisibleEditModal]}
        resetTable={resetTable}
        taiSanList={taiSanList}
        item={[selectedTaiSan, setSelectedTaiSan]}
      ></EditModal>

      <PageContainer>
        <ProTable<AssetsRequest>
          columns={columns}
          actionRef={actionRef}
          formRef={formRef}
          scroll={{ x: 1300 }}
          cardBordered
          // params={{}}
          request={async (params) => {
            await waitTime(100)
            return await getList({
              ...params,
              per_page: params.pageSize,
              page: params.current,
            })
          }}
          rowKey="id"
          search={{
            labelWidth: 0,
            collapsed: true,
          }}
          options={{
            setting: {
              listsHeight: 1000,
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
          headerTitle="Danh sách tài sản"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                // actionRef.current?.reload()
                setVisibleCreateModal(true)
              }}
              type="primary"
            >
              Thêm mới
            </Button>,
          ]}
        />
      </PageContainer>
    </>
  )
}
