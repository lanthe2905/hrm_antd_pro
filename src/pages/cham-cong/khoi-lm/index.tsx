import { useRef, type FC } from 'react'
import { useNavigate } from '@umijs/max'
import {
  ActionType,
  ProColumns,
  ProFormDatePicker,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components'
import { Popconfirm, Space, Tooltip } from 'antd'
import { getData } from '@/services/chamCong.service'
import type { ChamCongv2 } from '@/models/chamCong-V2.model'
import dayjs from 'dayjs'

const KhoiLaiMay = () => {
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
      title: 'Nhân viên',
      key: 'nhan_vien',
      fixed: 'left',
      search: false,
      width: 200,
      render: (_, record) => {
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
      fixed: 'left',
      dataIndex: ['thong_tin_nhan_vien', 'ma_bp'],
      key: 'ma_bp',
      search: false,
    },
    {
      title: <Tooltip title="Phân đoạn">pdoan</Tooltip>,
      fixed: 'left',
      dataIndex: ['thong_tin_chay_tau', 'pdoan'],
      key: 'pdoan',
      search: false,
    },
    {
      title: <Tooltip title={'Đội'}>doi</Tooltip>,
      dataIndex: ['thong_tin_chay_tau', 'doi'],
      search: false,
      key: 'doi',
    },
    {
      title: <Tooltip title={'Cơ báo'}>cb</Tooltip>,
      search: false,
      dataIndex: ['thong_tin_chay_tau', 'cb'],
      key: 'cb',
    },
    {
      title: <Tooltip title={'HS trách nhiệm'}>atv</Tooltip>,
      dataIndex: ['thong_tin_chay_tau', 'atv'],
      search: false,
      key: 'atv',
    },
    {
      title: <Tooltip title={'Giờ làm việc thực tế'}>gilvtt</Tooltip>,
      dataIndex: ['thong_tin_chay_tau', 'gilvtt'],
      search: false,
      key: 'gilvtt',
    },
    {
      title: <Tooltip title={'Giờ chạy'}>gchay</Tooltip>,
      dataIndex: ['thong_tin_chay_tau', 'gchay'],
      search: false,
      key: 'gchay',
    },
    {
      title: <Tooltip title={'Giờ dồn'}>gdon</Tooltip>,
      dataIndex: ['thong_tin_chay_tau', 'gdon'],
      search: false,
      key: 'gdon',
    },
    {
      title: <Tooltip title={'Giờ dừng'}>gdung</Tooltip>,
      search: false,
      dataIndex: ['thong_tin_chay_tau', 'gdung'],
      key: 'gdung',
    },
    {
      title: <Tooltip title={'Thời gian lên ban'}>tglenban</Tooltip>,
      dataIndex: ['thong_tin_chay_tau', 'tglenban'],
      search: false,
      key: 'tglenban',
    },
    {
      title: <Tooltip title={'Thời gian xuống ban'}>tgxuongban</Tooltip>,
      dataIndex: ['thong_tin_chay_tau', 'tgxuongban'],
      search: false,
      key: 'tgxuongban',
    },
    {
      title: <Tooltip title={'Số phút rút chậm giờ'}>sprcg</Tooltip>,
      search: false,
      dataIndex: ['thong_tin_chay_tau', 'sprcg'],
      key: 'sprcg',
    },
    {
      title: 't01',
      dataIndex: ['thong_tin_chay_tau', 't01'],
      search: false,
      key: 't01',
    },
    {
      title: 't02',
      dataIndex: ['thong_tin_chay_tau', 't02'],
      key: 't02',
      search: false,
    },
    {
      title: 't03',
      dataIndex: ['thong_tin_chay_tau', 't03'],
      key: 't03',
      search: false,
    },
    {
      title: 't04',
      dataIndex: ['thong_tin_chay_tau', 't04'],
      key: 't04',
      search: false,
    },
    {
      title: 't05',
      dataIndex: ['thong_tin_chay_tau', 't05'],
      key: 't05',
      search: false,
    },
    {
      title: 't06',
      dataIndex: ['thong_tin_chay_tau', 't06'],
      key: 't06',
      search: false,
    },
    {
      title: 't07',
      dataIndex: ['thong_tin_chay_tau', 't07'],
      key: 't07',
      search: false,
    },
    {
      title: 't08',
      dataIndex: ['thong_tin_chay_tau', 't08'],
      key: 't08',
      search: false,
    },
    {
      title: 't09',
      dataIndex: ['thong_tin_chay_tau', 't09'],
      key: 't09',
      search: false,
    },
    {
      title: 't10',
      dataIndex: ['thong_tin_chay_tau', 't10'],
      key: 't10',
      search: false,
    },
    {
      title: 't11',
      dataIndex: ['thong_tin_chay_tau', 't11'],
      key: 't11',
      search: false,
    },
    {
      title: 't12',
      dataIndex: ['thong_tin_chay_tau', 't12'],
      key: 't12',
      search: false,
    },
    {
      title: 't13',
      dataIndex: ['thong_tin_chay_tau', 't13'],
      key: 't13',
      search: false,
    },
    {
      title: 't14',
      dataIndex: ['thong_tin_chay_tau', 't14'],
      key: 't14',
      search: false,
    },
    {
      title: 't15',
      dataIndex: ['thong_tin_chay_tau', 't15'],
      key: 't15',
      search: false,
    },
    {
      title: 't16',
      dataIndex: ['thong_tin_chay_tau', 't16'],
      key: 't16',
      search: false,
    },
    {
      title: 't17',
      dataIndex: ['thong_tin_chay_tau', 't17'],
      search: false,
    },
    {
      title: 't18',
      dataIndex: ['thong_tin_chay_tau', 't18'],
      key: 't18',
      search: false,
    },
    {
      title: 't19',
      dataIndex: ['thong_tin_chay_tau', 't19'],
      key: 't19',
      search: false,
    },
    {
      title: 't20',
      dataIndex: ['thong_tin_chay_tau', 't20'],
      key: 't20',
      search: false,
    },
    {
      title: 't21',
      dataIndex: ['thong_tin_chay_tau', 't21'],
      key: 't21',
      search: false,
    },
    {
      title: 't22',
      dataIndex: ['thong_tin_chay_tau', 't22'],
      key: 't22',
      search: false,
    },
    {
      title: 't23',
      dataIndex: ['thong_tin_chay_tau', 't23'],
      key: 't23',
      search: false,
    },
    {
      title: 't24',
      dataIndex: ['thong_tin_chay_tau', 't24'],
      key: 't24',
      search: false,
    },
    {
      title: 't25',
      dataIndex: ['thong_tin_chay_tau', 't25'],
      key: 't25',
      search: false,
    },
    {
      title: 't26',
      dataIndex: ['thong_tin_chay_tau', 't26'],
      key: 't26',
      search: false,
    },
    {
      title: 't27',
      dataIndex: ['thong_tin_chay_tau', 't27'],
      key: 't27',
      search: false,
    },
    {
      title: 't28',
      dataIndex: ['thong_tin_chay_tau', 't28'],
      key: 't28',
      search: false,
    },
    {
      title: 't29',
      dataIndex: ['thong_tin_chay_tau', 't29'],
      key: 't29',
      search: false,
    },
    {
      title: 't30',
      dataIndex: ['thong_tin_chay_tau', 't30'],
      key: 't30',
      search: false,
    },
    {
      title: 't31',
      dataIndex: ['thong_tin_chay_tau', 't31'],
      key: 't31',
      search: false,
    },
    {
      title: 't32',
      dataIndex: ['thong_tin_chay_tau', 't32'],
      key: 't32',
      search: false,
    },
    {
      title: 't33',
      dataIndex: ['thong_tin_chay_tau', 't33'],
      key: 't33',
      search: false,
    },
    {
      title: 't34',
      dataIndex: ['thong_tin_chay_tau', 't34'],
      key: 't34',
      search: false,
    },
    {
      title: 't35',
      dataIndex: ['thong_tin_chay_tau', 't35'],
      key: 't35',
      search: false,
    },
    {
      title: 'p01',
      dataIndex: ['thong_tin_chay_tau', 'p01'],
      key: 'p01',
      search: false,
    },
    {
      title: 'p02',
      dataIndex: ['thong_tin_chay_tau', 'p02'],
      key: 'p02',
      search: false,
    },
    {
      title: 'p03',
      dataIndex: ['thong_tin_chay_tau', 'p03'],
      key: 'p03',
      search: false,
    },
    {
      title: 'p04',
      dataIndex: ['thong_tin_chay_tau', 'p04'],
      key: 'p04',
      search: false,
    },
    {
      title: 'p05',
      dataIndex: ['thong_tin_chay_tau', 'p05'],
      key: 'p05',
      search: false,
    },
    {
      title: 'p06',
      dataIndex: ['thong_tin_chay_tau', 'p06'],
      key: 'p06',
      search: false,
    },
    {
      title: 'p07',
      dataIndex: ['thong_tin_chay_tau', 'p07'],
      key: 'p07',
      search: false,
    },
    {
      title: 'p08',
      dataIndex: ['thong_tin_chay_tau', 'p08'],
      key: 'p08',
      search: false,
    },
    {
      title: 'p09',
      dataIndex: ['thong_tin_chay_tau', 'p09'],
      key: 'p09',
      search: false,
    },
    {
      title: 'p10',
      dataIndex: ['thong_tin_chay_tau', 'p10'],
      key: 'p10',
      search: false,
    },
    {
      title: 'p11',
      dataIndex: ['thong_tin_chay_tau', 'p11'],
      key: 'p11',
      search: false,
    },
    {
      title: 'p12',
      dataIndex: ['thong_tin_chay_tau', 'p12'],
      key: 'p12',
      search: false,
    },
    {
      title: 'p13',
      dataIndex: ['thong_tin_chay_tau', 'p13'],
      key: 'p13',
      search: false,
    },
    {
      title: 'p14',
      dataIndex: ['thong_tin_chay_tau', 'p14'],
      key: 'p14',
      search: false,
    },
    {
      title: 'p15',
      dataIndex: ['thong_tin_chay_tau', 'p15'],
      key: 'p15',
      search: false,
    },
    {
      title: 'p16',
      dataIndex: ['thong_tin_chay_tau', 'p16'],
      key: 'p16',
      search: false,
    },
    {
      title: 'p17',
      dataIndex: ['thong_tin_chay_tau', 'p17'],
      key: 'p17',
      search: false,
    },
    {
      title: 'p18',
      dataIndex: ['thong_tin_chay_tau', 'p18'],
      key: 'p18',
      search: false,
    },
    {
      title: 'p19',
      dataIndex: ['thong_tin_chay_tau', 'p19'],
      key: 'p19',
      search: false,
    },
    {
      title: 'p20',
      dataIndex: ['thong_tin_chay_tau', 'p20'],
      key: 'p20',
      search: false,
    },
    {
      title: 'p21',
      dataIndex: ['thong_tin_chay_tau', 'p21'],
      key: 'p21',
      search: false,
    },
    {
      title: 'p22',
      dataIndex: ['thong_tin_chay_tau', 'p22'],
      key: 'p22',
      search: false,
    },
    {
      title: 'p23',
      dataIndex: ['thong_tin_chay_tau', 'p23'],
      key: 'p23',
      search: false,
    },
    {
      title: 'p24',
      dataIndex: ['thong_tin_chay_tau', 'p24'],
      key: 'p24',
      search: false,
    },
    {
      title: 'p25',
      dataIndex: ['thong_tin_chay_tau', 'p25'],
      key: 'p25',
      search: false,
    },
    {
      title: 'p26',
      dataIndex: ['thong_tin_chay_tau', 'p26'],
      key: 'p26',
      search: false,
    },
    {
      title: 'p27',
      dataIndex: ['thong_tin_chay_tau', 'p27'],
      key: 'p27',
      search: false,
    },
    {
      title: 'p28',
      dataIndex: ['thong_tin_chay_tau', 'p28'],
      key: 'p28',
      search: false,
    },
    {
      title: 'p29',
      dataIndex: ['thong_tin_chay_tau', 'p29'],
      key: 'p29',
      search: false,
    },
    {
      title: 'p30',
      dataIndex: ['thong_tin_chay_tau', 'p30'],
      key: 'p30',
      search: false,
    },
    {
      title: 'p31',
      dataIndex: ['thong_tin_chay_tau', 'p31'],
      key: 'p31',
      search: false,
    },
    {
      title: 'p32',
      dataIndex: ['thong_tin_chay_tau', 'p32'],
      key: 'p32',
      search: false,
    },
    {
      title: 'p33',
      dataIndex: ['thong_tin_chay_tau', 'p33'],
      key: 'p33',
      search: false,
    },
    {
      title: 'p34',
      dataIndex: ['thong_tin_chay_tau', 'p34'],
      key: 'p34',
      search: false,
    },
    {
      title: 'p35',
      dataIndex: ['thong_tin_chay_tau', 'p35'],
      key: 'p35',
      search: false,
    },
    {
      title: 'dpt',
      dataIndex: ['thong_tin_chay_tau', 'dpt'],
      key: 'dpt',
      search: false,
    },
    {
      title: 'vkt',
      dataIndex: ['thong_tin_chay_tau', 'vkt'],
      key: 'vkt',
      search: false,
    },
    {
      title: 'hpt',
      dataIndex: ['thong_tin_chay_tau', 'hpt'],
      key: 'hpt',
      search: false,
    },
    {
      title: 'gpt',
      dataIndex: ['thong_tin_chay_tau', 'gpt'],
      key: 'gpt',
      search: false,
    },
    {
      title: 'tmt12',
      dataIndex: ['thong_tin_chay_tau', 'tmt12'],
      key: 'tmt12',
      search: false,
    },
    {
      title: 'tmt8',
      dataIndex: ['thong_tin_chay_tau', 'tmt8'],
      key: 'tmt8',
      search: false,
    },
    {
      title: 'bbt',
      dataIndex: ['thong_tin_chay_tau', 'bbt'],
      key: 'bbt',
      search: false,
    },
    {
      title: 'dxt',
      dataIndex: ['thong_tin_chay_tau', 'dxt'],
      key: 'dxt',
      search: false,
    },
    {
      title: 'dkt',
      dataIndex: ['thong_tin_chay_tau', 'dkt'],
      key: 'dkt',
      search: false,
    },
    {
      title: 'dpp',
      dataIndex: ['thong_tin_chay_tau', 'dpp'],
      key: 'dpp',
      search: false,
    },
    {
      title: 'vkp',
      dataIndex: ['thong_tin_chay_tau', 'vkp'],
      key: 'vkp',
      search: false,
    },
    {
      title: 'gpp',
      dataIndex: ['thong_tin_chay_tau', 'gpp'],
      key: 'gpp',
      search: false,
    },
    {
      title: 'tmp12',
      dataIndex: ['thong_tin_chay_tau', 'tmp12'],
      key: 'tmp12',
      search: false,
    },
    {
      title: 'tmp8',
      dataIndex: ['thong_tin_chay_tau', 'tmp8'],
      key: 'tmp8',
      search: false,
    },
    {
      title: 'bbp',
      dataIndex: ['thong_tin_chay_tau', 'bbp'],
      key: 'bbp',
      search: false,
    },
    {
      title: 'dxp',
      dataIndex: ['thong_tin_chay_tau', 'dxp'],
      key: 'dxp',
      search: false,
    },
    {
      title: 'dkp',
      dataIndex: ['thong_tin_chay_tau', 'dkp'],
      key: 'dkp',
      search: false,
    },
    {
      title: 'qgi',
      dataIndex: ['thong_tin_chay_tau', 'qgi'],
      key: 'qgi',
      search: false,
    },
    {
      title: 'dmk',
      dataIndex: ['thong_tin_chay_tau', 'dmk'],
      key: 'dmk',
      search: false,
    },
    {
      title: 'phe',
      dataIndex: ['thong_tin_chay_tau', 'phe'],
      key: 'phe',
      search: false,
    },
    {
      title: 'om1',
      dataIndex: ['thong_tin_chay_tau', 'om1'],
      key: 'om1',
      search: false,
    },
    {
      title: 'ro1',
      dataIndex: ['thong_tin_chay_tau', 'ro1'],
      key: 'ro1',
      search: false,
    },
    {
      title: 'c3t',
      dataIndex: ['thong_tin_chay_tau', 'c3t'],
      key: 'c3t',
      search: false,
    },
    {
      title: 'c3p',
      dataIndex: ['thong_tin_chay_tau', 'c3p'],
      key: 'c3p',
      search: false,
    },
    {
      title: 'ca3',
      dataIndex: ['thong_tin_chay_tau', 'ca_3'],
      key: 'ca3',
      search: false,
    },
    {
      title: 'com',
      dataIndex: ['thong_tin_chay_tau', 'com'],
      key: 'com',
      search: false,
    },
    {
      title: 'cmk',
      dataIndex: ['thong_tin_chay_tau', 'cmk'],
      key: 'cmk',
      search: false,
    },
    {
      title: 'slcom',
      dataIndex: ['thong_tin_chay_tau', 'slcom'],
      key: 'slcom',
      search: false,
    },
    {
      title: 'dh3',
      dataIndex: ['thong_tin_chay_tau', 'dh3'],
      key: 'dh3',
      search: false,
    },
    {
      title: 'ntt',
      dataIndex: ['thong_tin_chay_tau', 'ntt'],
      key: 'ntt',
      search: false,
    },
    {
      title: 'Thao tác',
      fixed: 'right',
      key: 'action',
      search: false,
      render: (_, record: ChamCongv2) => (
        <Space size="middle">
          {/* <Edit v2Id={record?.id} resetTable={resetTable} /> */}

          <Popconfirm
            title={`Xoá chấm công của: ${record?.thong_tin_nhan_vien.ho_va_ten}`}
            onConfirm={(e) => handleDelete(record)}
            okText="Xoá"
            cancelText="Không"
          >
            <a>Xoá</a>
          </Popconfirm>
        </Space>
      ),
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
        columns={columns.map((item) => {
          return {
            width: 100,
            ...item,
          }
        })}
        params={{
          khoi_ll: ['LM'],
        }}
        scroll={{ x: '1200' }}
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

export default KhoiLaiMay
