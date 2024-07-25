import { useRef, type FC } from 'react'
import { LikeOutlined } from '@ant-design/icons'
import {
  ActionType,
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components'
import { Form, Space } from 'antd'
import type { ChamCongv2 } from '@/models/chamCong-V2.model'

const Articles: FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<ChamCongv2>[] = [
    {
      title: 'Nhân viên',
      key: 'nhan_vien',
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
      render: (_: string) => Number(_)?.toLocaleString('en-US'),
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
      render: (_: string) => Number(_)?.toLocaleString('en-US'),
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
      render: (_: string, record: ChamCongv2) => {
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
        searchFormRender={(props, defaulDom) => {
          console.log(props)

          return <>{defaulDom}</>
        }}
        formRef={formRef}
        actionRef={actionRef}
        columns={columns}
      ></ProTable>
    </>
  )
}

export default Articles
