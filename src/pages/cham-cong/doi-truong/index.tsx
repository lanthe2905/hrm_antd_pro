import { useRef, type FC } from 'react'
import { useNavigate } from '@umijs/max'
import {
  ActionType,
  ProColumns,
  ProFormDatePicker,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components'
import { getData } from '@/services/chamCong.service'
import type { ChamCongv2 } from '@/models/chamCong-V2.model'
import dayjs from 'dayjs'

const DoiTruongLT: FC = () => {
  const navigate = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<ChamCongv2>[] = [
    {
      hidden: true,
      hideInSetting: true,
      renderFormItem: (item, config) => {
        return (
          <ProFormDatePicker
            name={'thang_cham_cong'}
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
      key: 'search',
      hideInSetting: true,
      hidden: true,
      search: {
        transform: (value: any) => {
          return {
            search: value,
          }
        },
      },
    },
    {
      title: 'SDB',
      dataIndex: ['thong_tin_nhan_vien', 'sdb'],
      key: 'sdb',
      search: false,
    },
    {
      title: 'Họ tên',
      dataIndex: ['thong_tin_nhan_vien', 'ho_va_ten'],
      search: false,
      key: 'ho_ten',
    },
    {
      title: 'Tên BP',
      dataIndex: ['thong_tin_nhan_vien', 'ten_bo_phan'],
      search: false,
      key: 'ma_bp',
    },
    {
      title: 'Kq+Kt+Kcl',
      dataIndex: ['thong_tin_chay_tau', 'kq_kt_kcl'],
      search: false,
      key: 'kq_kt_kcl',
    },
    {
      title: 'Kpx',
      dataIndex: ['thong_tin_chay_tau', 'kpx'],
      search: false,
      key: 'kpx',
    },
    {
      title: 'Hs CLQL',
      dataIndex: ['thong_tin_chay_tau', 'hs_clql'],
      search: false,
      key: 'hs_clql',
    },
    {
      title: 'Nctt ',
      dataIndex: 'nctt',
      search: false,
      key: 'nctt',
    },
    {
      title: 'Ca 3 ',
      dataIndex: 'ca_3',
      search: false,
      key: 'ca_3',
    },
    {
      title: 'Cơm',
      dataIndex: 'com',
      search: false,
      key: 'com',
    },
    {
      title: 'Phép ',
      dataIndex: 'nghi_phep',
      search: false,
      key: 'nghi_phep',
    },
    {
      title: 'Lễ ',
      dataIndex: ['thong_tin_chay_tau', 'ngay_le'],
      search: false,
      key: 'ngay_le',
    },
  ]

  return (
    <>
      <ProTable
        formRef={formRef}
        actionRef={actionRef}
        columns={columns}
        params={{
          chuc_danh_ll: 'ĐT-LT',
        }}
        request={async (params) => {
          return getData(params)
        }}
        search={{
          span: 4,
          labelWidth: 0,
        }}
        toolBarRender={() => []}
      ></ProTable>
    </>
  )
}

export default DoiTruongLT
