import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import type { PhongBan } from '@/models/phongBan.model'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { getList } from '@/services/phongBan.service'

import { Button } from 'antd'
import { useRef } from 'react'
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

const columns: ProColumns<PhongBan>[] = [
  {
    dataIndex: 'ID',
    hidden: true,
    search: {
      transform: (value) => ({ search: value }),
    },
  },
  {
    hidden: true,
    valueType: 'select',
    tooltip: 'Chọn trạng thái của phòng ban',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },

    search: {
      transform: (value) => ({ search: value }),
    },
  },
  {
    title: () => {
      return 'mã phòng ban'
    },
    dataIndex: 'ma_bp',
    ellipsis: true,
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: 'Tên phòng ban',
    search: false,
    dataIndex: 'ten',
    filters: false,
    // onFilter: true,
    ellipsis: true,
  },
  {
    title: 'Thao tác',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        Chỉnh sửa
      </a>,

      <a
        key="remove"
        onClick={() => {
          //Xử lý xoá
        }}
      >
        Xoá
      </a>,
    ],
  },
]

export default () => {
  const actionRef = useRef<ActionType>()

  return (
    <PageContainer>
      <ProTable<PhongBan>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        params={{
          page_size: 1,
          page: 10,
        }}
        request={async (params) => {
          console.log(params)
          await waitTime(100)
          const rs = await getList({
            per_page: params.pageSize,
            page: params.current,
          })

          return Promise.resolve({
            data: rs?.data ?? [],
            success: true,
            total: rs.meta.total ?? 0,
          })
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
          labelWidth: 120,
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
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
        pagination={{
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="Danh sách phòng ban"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload()
            }}
            type="primary"
          >
            Thêm mơi
          </Button>,
        ]}
      />
    </PageContainer>
  )
}
