import { useRef } from 'react'
import { Space, message, Popconfirm, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Create from './create'
import Update from './update'

import * as Api from '@/services/kyHieu.service'
import * as Type from '@/models/kyHieu.model'
import { handleApiError } from '@/util/handleError'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'

type Props = {
  accessor: [boolean, any]
}
function KiHieu({ accessor }: Props) {
  const [visibleModal, setVisibleModal] = accessor
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<Type.KyHieuChamCong>[] = [
    {
      dataIndex: 'id',
      key: 'id',
      search: {
        transform: (value) => {
          return {
            search: value,
          }
        },
      },
      title: 'Tìm kiếm',
      hidden: true,
      hideInSetting: true,
    },
    {
      title: 'Ký hiệu',
      dataIndex: 'ky_hieu',
      key: 'ten',
      search: false,
    },
    {
      title: 'Hệ số công',
      dataIndex: 'hs_cong',
      key: 'hs_cong',
      search: false,
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      key: 'mo_ta',
      search: false,
    },
    {
      title: 'Thao tác',
      key: 'action',
      search: false,
      render: (_, record) => (
        <Space size="middle">
          <Update data={record} resetTable={resetTable}></Update>
          <a>
            <Popconfirm
              title={'Xoá'}
              description={
                <>
                  {'Xoá ký hiệu'} <b>{record.ky_hieu}</b>
                </>
              }
              onConfirm={async () => {
                try {
                  const rs = await Api.remove(record)
                  message.success(rs?.message ?? '')
                  resetTable()
                } catch (error) {
                  handleApiError(error, null, null)
                }
              }}
              okText="Xoá"
              cancelText="Từ chối"
            >
              <DeleteOutlined /> Xoá
            </Popconfirm>
          </a>
        </Space>
      ),
    },
  ]

  const resetTable = () => {
    // setUuid(createUniqueKey())
    actionRef.current?.reload()
  }

  return (
    <Modal
      width={'60vw'}
      title="Kí hiệu chấm công"
      open={visibleModal}
      onCancel={(e) => setVisibleModal(false)}
    >
      <ProTable<Type.KyHieuChamCong>
        actionRef={actionRef}
        rowKey={'id'}
        columns={columns}
        toolBarRender={() => [<Create resetTable={resetTable}></Create>]}
        request={async (params) => {
          return await Api.getList(params)
        }}
      />
    </Modal>
  )
}

export default KiHieu
