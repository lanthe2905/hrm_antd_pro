import { useRef, useState } from 'react'
import { Button, message } from 'antd'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { PlusOutlined } from '@ant-design/icons'
import { getList, deletePhongBan } from '@/services/phongBan.service'
import CreateModal from './create'
import EditModal from './edit'
import { handleApiError } from '@/util/handleError'
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components'
import type { PhongBan } from '@/models/phongBan.model'
import { flushSync } from 'react-dom'

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
  const [selectedPhongBan, setSelectedPhongBan] = useState({} as PhongBan)
  const [visibleCreateModal, setVisibleCreateModal] = useState<boolean>(false)
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false)

  const resetTable = () => {
    formRef.current?.submit()
  }

  const columns: ProColumns<PhongBan>[] = [
    {
      dataIndex: 'ID',
      key: 'search',
      hidden: true,
      hideInSetting: true,
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
          onClick={() => {
            // action?.startEditable?.(record.id)
            flushSync(() => {
              setVisibleEditModal(true)
            })
            setSelectedPhongBan(record)
          }}
        >
          Chỉnh sửa
        </a>,

        <a
          key="remove"
          onClick={async (e) => {
            //Xử lý xoá
            try {
              const rs = await deletePhongBan(record.id)
              message.success('Xoá dữ liệu thành công!')
              if (rs) {
                actionRef.current?.reload()
              }
            } catch (error) {
              handleApiError(error, null, null)
            }
          }}
        >
          Xoá
        </a>,
      ],
    },
  ]

  return (
    <>
      <CreateModal
        accessor={[visibleCreateModal, setVisibleCreateModal]}
        resetTable={resetTable}
      ></CreateModal>

      <EditModal
        accessor={[visibleEditModal, setVisibleEditModal]}
        item={[selectedPhongBan, setSelectedPhongBan]}
        resetTable={resetTable}
      ></EditModal>

      <PageContainer>
        <ProTable<PhongBan>
          columns={columns}
          actionRef={actionRef}
          formRef={formRef}
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
                  created_at: [values.startTime, values.endTime],
                }
              }
              return values
            },
          }}
          dateFormatter="string"
          headerTitle="Danh sách phòng ban"
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
              Thêm mơi
            </Button>,
          ]}
        />
      </PageContainer>
    </>
  )
}
