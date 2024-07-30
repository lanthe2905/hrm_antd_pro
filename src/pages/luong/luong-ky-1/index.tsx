import { useRef, type FC } from 'react'
import {
  ActionType,
  ProColumns,
  ProFormDatePicker,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components'
import { message, Popconfirm, Space } from 'antd'
import PhongBanOptions from '@/components/PhongBanOptions'
import { getList, remove } from '@/services/luongKy1.service'
import type { LuongKy1 } from '@/models/luongKy1.model'
import KhoiLamLuongOptions from '@/components/KhoiLamluongOptions'
import Create from './create'
import dayjs from 'dayjs'
import { DeleteOutlined } from '@ant-design/icons'
import { handleApiError } from '@/util/handleError'
import { renderCurrency } from '@/util/common'

const Luongky1: FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<LuongKy1>[] = [
    {
      hidden: true,
      hideInSetting: true,
      key: 'search',
    },
    {
      hideInSetting: true,
      hidden: true,
      key: 'id_bo_phan',
      renderFormItem: (schema, config) => {
        return <PhongBanOptions {...config}></PhongBanOptions>
      },
    },
    {
      hideInSetting: true,
      hidden: true,
      key: 'khoi_ll',
      renderFormItem: (schema, config) => {
        return <KhoiLamLuongOptions {...config}></KhoiLamLuongOptions>
      },
    },
    {
      hidden: true,
      hideInSetting: true,
      renderFormItem: (item, config) => {
        return (
          <ProFormDatePicker
            name={'thang_ung_tien'}
            initialValue={dayjs()}
            fieldProps={{
              format: 'MM/YYYY',
              picker: 'month',
            }}
            {...config}
          />
        )
      },
    },
    {
      title: 'SDB',
      dataIndex: ['thong_tin_nhan_vien', 'sdb'],
      search: false,
    },
    {
      title: 'Họ và tên',
      dataIndex: ['thong_tin_nhan_vien', 'ho_va_ten'],
      search: false,
    },
    {
      title: 'Bộ phận',
      dataIndex: ['thong_tin_nhan_vien', 'ten_bo_phan'],
      search: false,
    },
    {
      title: 'Chức danh',
      dataIndex: ['thong_tin_nhan_vien', 'chuc_danh_ll'],
      search: false,
    },
    {
      title: 'Tiền ứng',
      key: 'tien_ung',
      dataIndex: 'tien_ung',
      search: false,
      render: (dom, _: LuongKy1) => {
        return <>{renderCurrency(_.tien_ung)}</>
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      search: false,
      render: (dom, _: LuongKy1) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="Xác nhận xoá lương kỳ 1 này?"
              onConfirm={(e) => removeRowEvent(_)}
              okText="Có"
              cancelText="Không"
            >
              <a>
                {' '}
                <DeleteOutlined /> Xoá
              </a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const resetTable = () => {
    actionRef.current?.reload()
  }

  const removeRowEvent = async (row: LuongKy1) => {
    try {
      await remove(row)
      message.success('Xoá thành công')
      resetTable()
    } catch (error) {
      handleApiError(error, null, null)
    }
  }

  return (
    <>
      <ProTable
        formRef={formRef}
        actionRef={actionRef}
        columns={columns}
        request={async (params) => {
          return getList(params)
        }}
        search={{
          span: 4,
          labelWidth: 0,
        }}
        toolBarRender={() => [<Create resetTable={resetTable}></Create>]}
      ></ProTable>
    </>
  )
}

export default Luongky1
