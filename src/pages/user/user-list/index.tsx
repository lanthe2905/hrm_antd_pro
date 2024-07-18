import { useEffect, useRef, useState } from 'react'

import { Space, Button, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import Create from '../create'
import { getList, deleteUser } from '@/services/user.service'
import * as phongBanService from '@/services/phongBan.service'
import * as chucDanhService from '@/services/chucDanh.service'
import { User } from '@/models/user.model'
import { handleApiError } from '@/util/handleError'
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components'
// import { waitTime } from '@/pages/departments'
import dayjs from 'dayjs'
import { PhongBan } from '@/models/phongBan.model'

const optionColumn = {
  width: 180,
}
const Employee = () => {
  const columns: ProColumns<User>[] = [
    {
      dataIndex: 'ID',
      key: 'search',
      hidden: true,
      // fixed: 'left',
      width: 100,
      search: {
        transform: (value: any) => ({ search: value }),
      },
    },
    {
      title: 'SDB',
      dataIndex: 'sdb',
      key: 'sdb',
      ellipsis: true,
      search: false,
      width: 100,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'ho_va_ten',
      key: 'ho_va_ten',
      search: false,
      ellipsis: true,
      ...optionColumn,
    },
    {
      title: 'mã bộ phận',
      key: 'ten_bp',
      dataIndex: ['ma_bp'],
      ellipsis: true,
      search: false,
      ...optionColumn,
    },
    {
      title: 'Tên bộ phận',
      key: 'ten_bp',
      dataIndex: ['ten_bo_phan'],
      search: false,
      ellipsis: true,
      ...optionColumn,
    },
    {
      title: 'Đơn vị CT',
      key: 'don_vi_ct',
      search: false,
      dataIndex: ['don_vi_ct'],
      ellipsis: true,
      ...optionColumn,
    },
    {
      title: 'Khối LL',
      key: 'khoi_ll',
      dataIndex: ['khoi_ll'],
      search: false,
      ellipsis: true,
      ...optionColumn,
    },
    {
      title: 'Chức danh LL',
      key: 'chuc_danh_ll',
      dataIndex: ['chuc_danh_ll'],
      search: false,
      ellipsis: true,
      width: 150,
    },
    {
      title: 'K2',
      key: 'k2',
      dataIndex: ['k2'],
      search: false,
      ellipsis: true,
      width: 100,
    },
    {
      title: 'Hsl',
      key: 'hsl',
      dataIndex: ['hsl'],
      search: false,
      ellipsis: true,
      width: 100,
    },
    {
      title: 'PCTN',
      key: 'pctn',
      dataIndex: ['pctn'],
      search: false,
      ellipsis: true,
      width: 100,
    },
    {
      title: 'PCCV',
      key: 'pccv',
      dataIndex: ['pccv'],
      ellipsis: true,
      search: false,
      width: 100,
    },
    {
      title: 'Ngày sinh',
      key: 'ngay_sinh',
      search: false,
      dataIndex: ['ngay_sinh'],
      ellipsis: true,
      render: (_: any, record: any) => {
        return record.ngay_sinh
      },
      ...optionColumn,
    },
    {
      title: 'Giới tính',
      key: 'gioi_tinh',
      search: false,
      dataIndex: ['gioi_tinh'],
      ...optionColumn,
    },
    {
      title: 'SĐT',
      key: 'sdt',
      search: false,
      dataIndex: ['sdt'],
      ...optionColumn,
    },
    {
      title: 'Địa chỉ',
      search: false,
      key: 'dia_chi',
      dataIndex: ['dia_chi'],
      ...optionColumn,
    },
    {
      title: 'Thao tác',
      key: 'action',
      search: false,
      width: 150,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            style={{ padding: 0 }}
            type="link"
            onClick={(e) => {
              setCurrentUser(record)
              // setVisibileUpdate(true)
            }}
          >
            <EditOutlined /> Sửa
          </Button>
          <Button type="link" style={{ padding: 0 }}>
            <Popconfirm
              title={'Xoá: ' + _.ho_va_ten}
              okText="Xoá"
              cancelText="Không"
              onConfirm={() => eventDeleteUser(_)}
            >
              <DeleteOutlined /> Xoá
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ]
  const [visibleCreateDialog, setVisibleCreateDialog] = useState(false)
  const [phongBanList, setPhongBanList] = useState<PhongBan[]>([])
  const [chucDanhList, setChucDanhList] = useState<any[]>([])
  // const [currentUser, setCurrentUser] = useState({} as User)
  const actionRef = useRef<ActionType>()

  const resetTable = () => {
    if (actionRef.current) actionRef.current.reload()
  }

  const eventDeleteUser = async (user: User) => {
    try {
      const rs = await deleteUser(user)
      message.success(rs.message)
      actionRef.current?.reload()
    } catch (error) {
      handleApiError(error, null, null)
    }
  }

  useEffect(() => {
    const queryService = async () => {
      const state = [phongBanService.getList({}), chucDanhService.getList({})]
      return Promise.all(state)
    }

    const handler = async () => {
      try {
        const listRS = await queryService()
        setPhongBanList(listRS.at(0)?.data ?? [])
        setChucDanhList(listRS.at(1)?.data ?? [])
      } catch (error) {
        handleApiError(error, null, null)
      }
    }
    handler()
  }, [])

  return (
    <>
      <PageContainer>
        <ProTable<User, any>
          columns={columns}
          scroll={{ x: 1300 }}
          actionRef={actionRef}
          cardBordered
          params={{}}
          request={async (params) => {
            params.per_page = params.pageSize
            params.page = params.current
            delete params['pageSize']
            delete params['current']
            return getList(params)
          }}
          rowKey="id"
          search={{
            labelWidth: 0,
            collapsed: true,
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
            density: false,
          }}
          form={{}}
          dateFormatter="string"
          headerTitle="Danh sách phòng ban"
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

      <Create
        accessor={[visibleCreateDialog, setVisibleCreateDialog]}
        resetTable={resetTable}
        phongBanList={phongBanList}
        chucDanhList={chucDanhList}
      />

      {/* {visibleUpdate && (
        <ActionModal
          user={currentUser}
          setUuid={setUuid}
          accessor={[visibleUpdate, setVisibileUpdate]}
        />
      )} */}
    </>
  )
}

export default Employee
