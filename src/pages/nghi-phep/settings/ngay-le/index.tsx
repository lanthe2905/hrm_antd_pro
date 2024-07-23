import { waitTime } from '@/pages/departments'
import { handleApiError } from '@/util/handleError'
import { DeleteOutlined } from '@ant-design/icons'
import {
  ActionType,
  ProColumns,
  // ProFormInstance,
  ProTable,
} from '@ant-design/pro-components'
import { message, Popconfirm, Space } from 'antd'
import { useRef } from 'react'
import CreateModal from './create'
import EditModal from './edit'
import { getList, deleteNgayle } from '@/services/ngayle.services'
import type { NgayLe } from '@/models/ngayLe.model'

export default () => {
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<NgayLe>[] = [
    {
      dataIndex: 'id',
      key: 'id',
      hidden: true,
      search: {
        transform: (value) => ({ search: value }),
      },
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'ten',
      key: 'tieu_de',
      search: false,
    },
    {
      title: 'Từ ngày',
      dataIndex: 'ngay_bat_dau',
      key: 'ngay_bat_dau',
      search: false,
    },
    {
      title: 'Đến ngày',
      dataIndex: 'ngay_ket_thuc',
      key: 'ngay_ket_thuc',
      search: false,
    },
    {
      title: 'Hệ số công',
      dataIndex: 'hs_cong',
      key: 'hs_cong',
      search: false,
    },
    {
      title: 'Hệ số công đi làm ngày lễ',
      dataIndex: 'hs_cong_di_lam',
      key: 'hs_cong_di_lam',
      search: false,
    },
    {
      title: 'Thao tác',
      key: 'action',
      search: false,
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditModal
            reload={actionRef.current?.reload}
            values={record}
          ></EditModal>
          <Popconfirm
            title={'Xoá!'}
            description={
              <>
                {'Xoá '} <b>{_.ten}</b>
              </>
            }
            onConfirm={async () => {
              try {
                await deleteNgayle(_)
                message.success('Xoá loại ngày phép thành công')
                actionRef.current?.reload()
              } catch (error) {
                handleApiError(error, null, null)
              }
            }}
            okText="Xoá"
            cancelText="Từ chối"
          >
            <a>
              <DeleteOutlined /> Xoá
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <ProTable<any>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        await waitTime(1000)
        return await getList(params)
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
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
            }
          }
          return values
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Loại ngày phép"
      toolBarRender={() => [
        <CreateModal reload={actionRef.current?.reload}></CreateModal>,
      ]}
    />
  )
}
