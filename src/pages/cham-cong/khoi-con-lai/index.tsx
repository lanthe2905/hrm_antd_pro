import { useRef, type FC } from 'react'
import { useNavigate } from '@umijs/max'
import { LikeOutlined } from '@ant-design/icons'
import {
  ActionType,
  ProColumns,
  ProFormDatePicker,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components'
import { Button, Space } from 'antd'
import PhongbanOptions from '@/components/PhongBanOptions'
import { getData } from '@/services/chamCong.service'
import KhoiLamLuongOptions from '@/components/KhoiLamluongOptions'
import type { ChamCongv2 } from '@/models/chamCong-V2.model'

const Articles: FC = () => {
  const navigate = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<ChamCongv2>[] = [
    {
      hidden: true,
      renderFormItem: (item, config) => {
        return (
          <ProFormDatePicker
            name={'thang_cham_cong'}
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
      hidden: true,
      renderFormItem: (item, config) => {
        return (
          <PhongbanOptions
            name={'id_bo_phan'}
            form={formRef.current}
            {...config}
          />
        )
      },
    },
    {
      hidden: true,
      renderFormItem: (item, config) => {
        return (
          <KhoiLamLuongOptions
            exceps={['SC', 'LM']}
            name={'khoi_ll'}
            {...config}
          />
        )
      },
    },
    {
      title: 'Nhân viên',
      key: 'nhan_vien',
      search: false,
      render: (_, record: ChamCongv2) => {
        return (
          <a>
            {record?.thong_tin_nhan_vien?.sdb} -{' '}
            {record?.thong_tin_nhan_vien?.ho_va_ten}
          </a>
        )
      },
    },
    {
      title: 'Mã BP',
      dataIndex: ['thong_tin_nhan_vien', 'ma_bp'],
      key: 'ma_bp',
      search: false,
      filters: [
        {
          text: 'Phòng TC-HC',
          value: '101',
        },
        {
          text: 'Phòng KT',
          value: '102',
        },
      ],
    },
    {
      title: 'K1',
      dataIndex: 'k1',
      search: false,
      key: 'k1',
    },
    {
      title: 'Nctt',
      dataIndex: 'nctt',
      search: false,
      key: 'nctt',
    },
    {
      title: 'Ca 3',
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
      title: 'Phép',

      dataIndex: 'nghi_phep',
      search: false,
      key: 'nghi_phep',
    },
    {
      title: 'Lương kiêm nhiệm',
      dataIndex: 'luong_kiem_nhiem',
      search: false,
      key: 'luong_kiem_nhiem',
      render: (_: any) => {
        return <>{isNaN(_) == false ? Number(_)?.toLocaleString('en-US') : _}</>
      },
    },
    // {
    //   title: 'Giờ SP',
    //   dataIndex: ['gio_san_pham'],
    //   key: 'gio_sp',
    // },
    {
      title: 'Lương gián tiếp công',
      dataIndex: 'luong_gian_tiep_cong',
      search: false,
      key: 'luong_gian_tiep_cong',
      render: (_: any) => {
        return <>{isNaN(_) == false ? Number(_)?.toLocaleString('en-US') : _}</>
      },
    },

    {
      title: 'Ốm',
      dataIndex: 'om',
      search: false,
      key: 'om',
    },
    {
      title: 'Ro',
      dataIndex: 'ro',
      search: false,
      key: 'ro',
    },
    {
      title: 'Thao tác',
      search: false,
      key: 'action',
      render: (_: any, record: ChamCongv2) => {
        return (
          <Space size="middle">
            {/* <Edit v2Id={record?.id} resetTable={resetTable} /> */}
            <a onClick={(e) => handleDelete(record)}>Xoá</a>
          </Space>
        )
      },
    },
  ]
  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  }

  const handleDelete = (record: ChamCongv2) => {
    return record
  }

  return (
    <>
      <ProTable
        formRef={formRef}
        actionRef={actionRef}
        columns={columns}
        request={async (params) => {
          return getData(params)
        }}
        search={{
          span: 4,
          labelWidth: 0,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={(e) => {
              navigate('/salary/them-cham-cong')
            }}
          >
            Thêm mới
          </Button>,
        ]}
      ></ProTable>
    </>
  )
}

export default Articles
