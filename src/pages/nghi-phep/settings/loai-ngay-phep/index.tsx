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
import type { LoaiNghiPhep } from '@/models/loaiNghiPhep.model'
import { useRef } from 'react'
import Create from './create'
import EditModal from './edit'
import { getList, deleteNgiPhep } from '@/services/loaiNghiPhep.services'

export default () => {
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<LoaiNghiPhep>[] = [
    {
      dataIndex: 'id',
      key: 'id',
      hidden: true,
      search: {
        transform: (value) => ({ search: value }),
      },
    },
    {
      title: 'Loại nghỉ phép',
      dataIndex: 'ten',
      key: 'ten',
      search: false,
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Số ngày',
      dataIndex: 'so_ngay_trong_nam',
      search: false,
      key: 'so_ngay_trong_nam',
    },
    {
      title: 'Tính lương',
      dataIndex: 'co_tinh_luong',
      key: 'co_tinh_luong',
      search: false,
      render: (coTinhLuong: any) => {
        return <>{coTinhLuong ? 'Có tính lương' : 'Không tính lương'}</>
      },
    },
    {
      title: 'Hệ số lương',
      dataIndex: 'hs',
      search: false,
      key: 'hs',
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
                await deleteNgiPhep(_)
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
        onChange(value) {
          console.log('value: ', value)
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
        <Create reload={actionRef.current?.reload}></Create>,
      ]}
    />
  )
}
