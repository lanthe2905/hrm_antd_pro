import React, { useRef, useState, type FC } from 'react'
import {
  ActionType,
  PageContainer,
  ProCard,
  ProColumns,
  ProFormDatePicker,
  ProFormInstance,
  ProTable,
  RouteContext,
  RouteContextType,
} from '@ant-design/pro-components'
import { Space, Tooltip, Typography } from 'antd'
import { getLuongLMData } from '@/services/luong.service'
import type { Luong } from '@/models/luong.model'
import { renderCurrency } from '@/util/common'
import Create from './create'
import useHeaderTitle from '../hooks/useHeaderTitle'
import dayjs from 'dayjs'
import PhongBanOptions from '@/components/PhongBanOptions'
const { Title, Text } = Typography

const KhoiGTBT: FC = () => {
  const [dataSource, setDataSource] = useState<Luong[]>([])
  const [kdc, luongToiThieu, quyLuong] = useHeaderTitle(dataSource)
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<Luong>[] = React.useMemo(
    () => [
      {
        title: 'SDB',
        dataIndex: ['thong_tin_nhan_vien', 'sdb'],
        key: 'sdb',
        fixed: 'left',
      },
      {
        title: 'Họ và tên',
        dataIndex: ['thong_tin_nhan_vien', 'ho_va_ten'],
        key: 'ten',
      },

      {
        title: 'Chức danh',
        key: 'chuc_danh_ll',
        dataIndex: ['thong_tin_nhan_vien', 'chuc_danh_ll'],
      },
      {
        title: 'P.đoạn',
        dataIndex: ['thong_tin_chay_tau', 'pdoan'],
        key: 'phan_doan',
      }, // chua biet
      {
        title: 'Đội',
        dataIndex: ['thong_tin_chay_tau', 'doi'],
        key: 'doi',
      }, // chua biet
      {
        title: 'Cơ báo',
        dataIndex: ['thong_tin_chay_tau', 'cb'],
        key: 'cb',
      }, // chua biet
      { title: 'HSL', dataIndex: 'hsl', key: 'hsl' },
      { title: 'hscv', dataIndex: 'hscvu', key: 'hscvu' },
      { title: 'pctn', dataIndex: 'hspctn', key: 'pctn' },
      {
        title: <Tooltip title="Giờ làm việc thực tế">Giờ lvtt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'gilvtt'],
        key: 'gilvtt',
      },
      {
        title: <Tooltip title="Giờ chạy">G.chạy</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'gchay'],
        key: 'gchay',
        width: 100,
      },
      {
        title: <Tooltip title="Giờ dồn">G.dồn</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'gdon'],
        key: 'gdon',
        width: 100,
      },
      {
        title: <Tooltip title="Giờ dừng">G.dừng</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'gdung'],
        key: 'gdung',
        width: 100,
      },
      {
        title: <Tooltip title="Thời gian lên ban">Tglenban</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'tglenban'],
        key: 'tglenban',
        width: 100,
      },
      {
        title: <Tooltip title="Thời gian xuống ban">Tgxuongban</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'tgxuongban'],
        key: 'tgxuongban',
        width: 125,
      },
      {
        title: <Tooltip title="Số phút rút chậm giờ">sprcg</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'sprcg'],
        key: 'sprcg',
        width: 100,
      },
      {
        title: 't01',
        dataIndex: ['thong_tin_chay_tau', 't01'],
        key: 't01',
        renderText: (t01, record) => {
          return (
            <Tooltip title={t01}>
              {renderCurrency(record?.luong_chay_tau['t01'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't02',
        dataIndex: ['thong_tin_chay_tau', 't02'],
        key: 't02',
        renderText: (t02, record) => {
          return (
            <Tooltip title={t02}>
              {renderCurrency(record?.luong_chay_tau['t02'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't03',
        dataIndex: ['thong_tin_chay_tau', 't03'],
        key: 't03',
        renderText: (t03, record) => {
          return (
            <Tooltip title={t03}>
              {renderCurrency(record?.luong_chay_tau['t03'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't04',
        dataIndex: ['thong_tin_chay_tau', 't04'],
        key: 't04',
        renderText: (t04, record) => {
          return (
            <Tooltip title={t04}>
              {renderCurrency(record?.luong_chay_tau['t04'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't05',
        dataIndex: ['thong_tin_chay_tau', 't05'],
        key: 't05',
        renderText: (t05, record) => {
          return (
            <Tooltip title={t05}>
              {renderCurrency(record?.luong_chay_tau['t05'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't06',
        dataIndex: ['thong_tin_chay_tau', 't06'],
        key: 't06',
        renderText: (t06, record) => {
          return (
            <Tooltip title={t06}>
              {renderCurrency(record?.luong_chay_tau['t06'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't07',
        dataIndex: ['thong_tin_chay_tau', 't07'],
        key: 't07',
        renderText: (t07, record) => {
          return (
            <Tooltip title={t07}>
              {renderCurrency(record?.luong_chay_tau['t07'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't08',
        dataIndex: ['thong_tin_chay_tau', 't08'],
        key: 't08',
        renderText: (t08, record) => {
          return (
            <Tooltip title={t08}>
              {renderCurrency(record?.luong_chay_tau['t08'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't09',
        dataIndex: ['thong_tin_chay_tau', 't09'],
        key: 't09',
        renderText: (t09, record) => {
          return (
            <Tooltip title={t09}>
              {renderCurrency(record?.luong_chay_tau['t09'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't10',
        dataIndex: ['thong_tin_chay_tau', 't10'],
        key: 't10',
        renderText: (t10, record) => {
          return (
            <Tooltip title={t10}>
              {renderCurrency(record?.luong_chay_tau['t10'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't11',
        dataIndex: ['thong_tin_chay_tau', 't11'],
        key: 't11',
        renderText: (t11, record) => {
          return (
            <Tooltip title={t11}>
              {renderCurrency(record?.luong_chay_tau['t11'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't12',
        dataIndex: ['thong_tin_chay_tau', 't12'],
        key: 't12',
        renderText: (t12, record) => {
          return (
            <Tooltip title={t12}>
              {renderCurrency(record?.luong_chay_tau['t12'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't13',
        dataIndex: ['thong_tin_chay_tau', 't13'],
        key: 't13',
        renderText: (t13, record) => {
          return (
            <Tooltip title={t13}>
              {renderCurrency(record?.luong_chay_tau['t13'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't14',
        dataIndex: ['thong_tin_chay_tau', 't14'],
        key: 't14',
        renderText: (t14, record) => {
          return (
            <Tooltip title={t14}>
              {renderCurrency(record?.luong_chay_tau['t14'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't15',
        dataIndex: ['thong_tin_chay_tau', 't15'],
        key: 't15',
        renderText: (t15, record) => {
          return (
            <Tooltip title={t15}>
              {renderCurrency(record?.luong_chay_tau['t15'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't16',
        dataIndex: ['thong_tin_chay_tau', 't16'],
        key: 't16',
        renderText: (t16, record) => {
          return (
            <Tooltip title={t16}>
              {renderCurrency(record?.luong_chay_tau['t16'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't17',
        dataIndex: ['thong_tin_chay_tau', 't17'],
        key: 't17',
        renderText: (t17, record) => {
          return (
            <Tooltip title={t17}>
              {renderCurrency(record?.luong_chay_tau['t17'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't18',
        dataIndex: ['thong_tin_chay_tau', 't18'],
        key: 't18',
        renderText: (t18, record) => {
          return (
            <Tooltip title={t18}>
              {renderCurrency(record?.luong_chay_tau['t18'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't19',
        dataIndex: ['thong_tin_chay_tau', 't19'],
        key: 't19',
        renderText: (t19, record) => {
          return (
            <Tooltip title={t19}>
              {renderCurrency(record?.luong_chay_tau['t19'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't20',
        dataIndex: ['thong_tin_chay_tau', 't20'],
        key: 't20',
        renderText: (t20, record) => {
          return (
            <Tooltip title={t20}>
              {renderCurrency(record?.luong_chay_tau['t20'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't21',
        dataIndex: ['thong_tin_chay_tau', 't21'],
        key: 't21',
        renderText: (t21, record) => {
          return (
            <Tooltip title={t21}>
              {renderCurrency(record?.luong_chay_tau['t21'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't22',
        dataIndex: ['thong_tin_chay_tau', 't22'],
        key: 't22',
        renderText: (t22, record) => {
          return (
            <Tooltip title={t22}>
              {renderCurrency(record?.luong_chay_tau['t22'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't23',
        dataIndex: ['thong_tin_chay_tau', 't23'],
        key: 't23',
        renderText: (t23, record) => {
          return (
            <Tooltip title={t23}>
              {renderCurrency(record?.luong_chay_tau['t23'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't24',
        dataIndex: ['thong_tin_chay_tau', 't24'],
        key: 't24',
        renderText: (t24, record) => {
          return (
            <Tooltip title={t24}>
              {renderCurrency(record?.luong_chay_tau['t24'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't25',
        dataIndex: ['thong_tin_chay_tau', 't25'],
        key: 't25',
        renderText: (t25, record) => {
          return (
            <Tooltip title={t25}>
              {renderCurrency(record?.luong_chay_tau['t25'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't26',
        dataIndex: ['thong_tin_chay_tau', 't26'],
        key: 't26',
        renderText: (t26, record) => {
          return (
            <Tooltip title={t26}>
              {renderCurrency(record?.luong_chay_tau['t26'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't27',
        dataIndex: ['thong_tin_chay_tau', 't27'],
        key: 't27',
        renderText: (t27, record) => {
          return (
            <Tooltip title={t27}>
              {renderCurrency(record?.luong_chay_tau['t27'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't28',
        dataIndex: ['thong_tin_chay_tau', 't28'],
        key: 't28',
        renderText: (t28, record) => {
          return (
            <Tooltip title={t28}>
              {renderCurrency(record?.luong_chay_tau['t28'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't29',
        dataIndex: ['thong_tin_chay_tau', 't29'],
        key: 't29',
        renderText: (t29, record) => {
          return (
            <Tooltip title={t29}>
              {renderCurrency(record?.luong_chay_tau['t29'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't30',
        dataIndex: ['thong_tin_chay_tau', 't30'],
        key: 't30',
        renderText: (t30, record) => {
          return (
            <Tooltip title={t30}>
              {renderCurrency(record?.luong_chay_tau['t30'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't31',
        dataIndex: ['thong_tin_chay_tau', 't31'],
        key: 't31',
        renderText: (t31, record) => {
          return (
            <Tooltip title={t31}>
              {renderCurrency(record?.luong_chay_tau['t31'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't32',
        dataIndex: ['thong_tin_chay_tau', 't32'],
        key: 't32',
        renderText: (t32, record) => {
          return (
            <Tooltip title={t32}>
              {renderCurrency(record?.luong_chay_tau['t32'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't33',
        dataIndex: ['thong_tin_chay_tau', 't33'],
        key: 't33',
        renderText: (t33, record) => {
          return (
            <Tooltip title={t33}>
              {renderCurrency(record?.luong_chay_tau['t33'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't34',
        dataIndex: ['thong_tin_chay_tau', 't34'],
        key: 't34',
        renderText: (t34, record) => {
          return (
            <Tooltip title={t34}>
              {renderCurrency(record?.luong_chay_tau['t34'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 't35',
        dataIndex: ['thong_tin_chay_tau', 't35'],
        key: 't35',
        renderText: (t35, record) => {
          return (
            <Tooltip title={t35}>
              {renderCurrency(record?.luong_chay_tau['t35'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p01',
        dataIndex: ['thong_tin_chay_tau', 'p01'],
        key: 'p01',
        renderText: (p01, record) => {
          return (
            <Tooltip title={p01}>
              {renderCurrency(record?.luong_chay_tau['p01'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p02',
        dataIndex: ['thong_tin_chay_tau', 'p02'],
        key: 'p02',
        renderText: (p02, record) => {
          return (
            <Tooltip title={p02}>
              {renderCurrency(record?.luong_chay_tau['p02'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p03',
        dataIndex: ['thong_tin_chay_tau', 'p03'],
        key: 'p03',
        renderText: (p03, record) => {
          return (
            <Tooltip title={p03}>
              {renderCurrency(record?.luong_chay_tau['p03'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p04',
        dataIndex: ['thong_tin_chay_tau', 'p04'],
        key: 'p04',
        renderText: (p04, record) => {
          return (
            <Tooltip title={p04}>
              {renderCurrency(record?.luong_chay_tau['p04'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p05',
        dataIndex: ['thong_tin_chay_tau', 'p05'],
        key: 'p05',
        renderText: (p05, record) => {
          return (
            <Tooltip title={p05}>
              {renderCurrency(record?.luong_chay_tau['p05'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p06',
        dataIndex: ['thong_tin_chay_tau', 'p06'],
        key: 'p06',
        renderText: (p06, record) => {
          return (
            <Tooltip title={p06}>
              {renderCurrency(record?.luong_chay_tau['p06'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p07',
        dataIndex: ['thong_tin_chay_tau', 'p07'],
        key: 'p07',
        renderText: (p07, record) => {
          return (
            <Tooltip title={p07}>
              {renderCurrency(record?.luong_chay_tau['p07'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p08',
        dataIndex: ['thong_tin_chay_tau', 'p08'],
        key: 'p08',
        renderText: (p08, record) => {
          return (
            <Tooltip title={p08}>
              {renderCurrency(record?.luong_chay_tau['p08'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p09',
        dataIndex: ['thong_tin_chay_tau', 'p09'],
        key: 'p09',
        renderText: (p09, record) => {
          return (
            <Tooltip title={p09}>
              {renderCurrency(record?.luong_chay_tau['p09'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p10',
        dataIndex: ['thong_tin_chay_tau', 'p10'],
        key: 'p10',
        renderText: (p10, record) => {
          return (
            <Tooltip title={p10}>
              {renderCurrency(record?.luong_chay_tau['p10'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p11',
        dataIndex: ['thong_tin_chay_tau', 'p11'],
        key: 'p11',
        renderText: (p11, record) => {
          return (
            <Tooltip title={p11}>
              {renderCurrency(record?.luong_chay_tau['p11'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p12',
        dataIndex: ['thong_tin_chay_tau', 'p12'],
        key: 'p12',
        renderText: (p12, record) => {
          return (
            <Tooltip title={p12}>
              {renderCurrency(record?.luong_chay_tau['p12'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p13',
        dataIndex: ['thong_tin_chay_tau', 'p13'],
        key: 'p13',
        renderText: (p13, record) => {
          return (
            <Tooltip title={p13}>
              {renderCurrency(record?.luong_chay_tau['p13'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p14',
        dataIndex: ['thong_tin_chay_tau', 'p14'],
        key: 'p14',
        renderText: (p14, record) => {
          return (
            <Tooltip title={p14}>
              {renderCurrency(record?.luong_chay_tau['p14'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p15',
        dataIndex: ['thong_tin_chay_tau', 'p15'],
        key: 'p15',
        renderText: (p15, record) => {
          return (
            <Tooltip title={p15}>
              {renderCurrency(record?.luong_chay_tau['p15'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p16',
        dataIndex: ['thong_tin_chay_tau', 'p16'],
        key: 'p16',
        renderText: (p16, record) => {
          return (
            <Tooltip title={p16}>
              {renderCurrency(record?.luong_chay_tau['p16'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p17',
        dataIndex: ['thong_tin_chay_tau', 'p17'],
        key: 'p17',
        renderText: (p17, record) => {
          return (
            <Tooltip title={p17}>
              {renderCurrency(record?.luong_chay_tau['p17'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p18',
        dataIndex: ['thong_tin_chay_tau', 'p18'],
        key: 'p18',
        renderText: (p18, record) => {
          return (
            <Tooltip title={p18}>
              {renderCurrency(record?.luong_chay_tau['p18'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p19',
        dataIndex: ['thong_tin_chay_tau', 'p19'],
        key: 'p19',
        renderText: (p19, record) => {
          return (
            <Tooltip title={p19}>
              {renderCurrency(record?.luong_chay_tau['p19'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p20',
        dataIndex: ['thong_tin_chay_tau', 'p20'],
        key: 'p20',
        renderText: (p20, record) => {
          return (
            <Tooltip title={p20}>
              {renderCurrency(record?.luong_chay_tau['p20'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p21',
        dataIndex: ['thong_tin_chay_tau', 'p21'],
        key: 'p21',
        renderText: (p21, record) => {
          return (
            <Tooltip title={p21}>
              {renderCurrency(record?.luong_chay_tau['p21'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p22',
        dataIndex: ['thong_tin_chay_tau', 'p22'],
        key: 'p22',
        renderText: (p22, record) => {
          return (
            <Tooltip title={p22}>
              {renderCurrency(record?.luong_chay_tau['p22'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p23',
        dataIndex: ['thong_tin_chay_tau', 'p23'],
        key: 'p23',
        renderText: (p23, record) => {
          return (
            <Tooltip title={p23}>
              {renderCurrency(record?.luong_chay_tau['p23'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p24',
        dataIndex: ['thong_tin_chay_tau', 'p24'],
        key: 'p24',
        renderText: (p24, record) => {
          return (
            <Tooltip title={p24}>
              {renderCurrency(record?.luong_chay_tau['p24'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p25',
        dataIndex: ['thong_tin_chay_tau', 'p25'],
        key: 'p25',
        renderText: (p25, record) => {
          return (
            <Tooltip title={p25}>
              {renderCurrency(record?.luong_chay_tau['p25'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p26',
        dataIndex: ['thong_tin_chay_tau', 'p26'],
        key: 'p26',
        renderText: (p26, record) => {
          return (
            <Tooltip title={p26}>
              {renderCurrency(record?.luong_chay_tau['p26'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p27',
        dataIndex: ['thong_tin_chay_tau', 'p27'],
        key: 'p27',
        renderText: (p27, record) => {
          return (
            <Tooltip title={p27}>
              {renderCurrency(record?.luong_chay_tau['p27'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p28',
        dataIndex: ['thong_tin_chay_tau', 'p28'],
        key: 'p28',
        renderText: (p28, record) => {
          return (
            <Tooltip title={p28}>
              {renderCurrency(record?.luong_chay_tau['p28'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p29',
        dataIndex: ['thong_tin_chay_tau', 'p29'],
        key: 'p29',
        renderText: (p29, record) => {
          return (
            <Tooltip title={p29}>
              {renderCurrency(record?.luong_chay_tau['p29'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p30',
        dataIndex: ['thong_tin_chay_tau', 'p30'],
        key: 'p30',
        renderText: (p30, record) => {
          return (
            <Tooltip title={p30}>
              {renderCurrency(record?.luong_chay_tau['p30'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p31',
        dataIndex: ['thong_tin_chay_tau', 'p31'],
        key: 'p31',
        renderText: (p31, record) => {
          return (
            <Tooltip title={p31}>
              {renderCurrency(record?.luong_chay_tau['p31'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p32',
        dataIndex: ['thong_tin_chay_tau', 'p32'],
        key: 'p32',
        renderText: (p32, record) => {
          return (
            <Tooltip title={p32}>
              {renderCurrency(record?.luong_chay_tau['p32'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p33',
        dataIndex: ['thong_tin_chay_tau', 'p33'],
        key: 'p33',
        renderText: (p33, record) => {
          return (
            <Tooltip title={p33}>
              {renderCurrency(record?.luong_chay_tau['p33'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p34',
        dataIndex: ['thong_tin_chay_tau', 'p34'],
        key: 'p34',
        renderText: (p34, record) => {
          return (
            <Tooltip title={p34}>
              {renderCurrency(record?.luong_chay_tau['p34'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'p35',
        dataIndex: ['thong_tin_chay_tau', 'p35'],
        key: 'p35',
        renderText: (p35, record) => {
          return (
            <Tooltip title={p35}>
              {renderCurrency(record?.luong_chay_tau['p35'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Dự phòng tài xế">dpt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'dpt'],
        key: 'dpt',
        renderText: (dpt, record) => {
          return (
            <Tooltip title={dpt}>
              {renderCurrency(record?.luong_chay_tau['dpt'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Việc khác tài xế">vkt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'vkt'],
        key: 'vkt',
        renderText: (vkt, record) => {
          return (
            <Tooltip title={vkt}>
              {renderCurrency(record?.luong_chay_tau['vkt'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Họp tài xế">hpt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'hpt'],
        key: 'hpt',
        renderText: (hpt, record) => {
          return (
            <Tooltip title={hpt}>
              {renderCurrency(record?.luong_chay_tau['hpt'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Gặp PX, CA">gpt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'gpt'],
        key: 'gpt',
        renderText: (gpt, record) => {
          return (
            <Tooltip title={gpt}>
              {renderCurrency(record?.luong_chay_tau['gpt'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: (
          <Tooltip title="Theo máy vào sửa chữa, làm chất lượng 12h">
            tmt12
          </Tooltip>
        ),
        dataIndex: ['thong_tin_chay_tau', 'tmt12'],
        key: 'tmt12',
        renderText: (tmt12, record) => {
          return (
            <Tooltip title={tmt12}>
              {renderCurrency(record?.luong_chay_tau['tmt12'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: (
          <Tooltip title="Theo máy vào sửa chữa, làm chất lượng 8h">
            tmt8
          </Tooltip>
        ),
        dataIndex: ['thong_tin_chay_tau', 'tmt8'],
        key: 'tmt8',
        renderText: (tmt8, record) => {
          return (
            <Tooltip title={tmt8}>
              {renderCurrency(record?.luong_chay_tau['tmt8'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>bbt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'bbt'],
        key: 'bbt',
        renderText: (bbt, record) => {
          return (
            <Tooltip title={bbt}>
              {renderCurrency(record?.luong_chay_tau['bbt'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>dxt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'dxt'],
        key: 'dxt',
        renderText: (dxt, record) => {
          return (
            <Tooltip title={dxt}>
              {renderCurrency(record?.luong_chay_tau['dxt'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>dkt</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'dkt'],
        key: 'dkt',
        renderText: (dkt, record) => {
          return (
            <Tooltip title={dkt}>
              {renderCurrency(record?.luong_chay_tau['dkt'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>dpp</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'dpp'],
        key: 'dpp',
        renderText: (dpp, record) => {
          return (
            <Tooltip title={dpp}>
              {renderCurrency(record?.luong_chay_tau['dpp'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>vkp</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'vkp'],
        key: 'vkp',
        renderText: (vkp, record) => {
          return (
            <Tooltip title={vkp}>
              {renderCurrency(record?.luong_chay_tau['vkp'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>hpp</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'hpp'],
        key: 'hpp',
        renderText: (hpp, record) => {
          return (
            <Tooltip title={hpp}>
              {renderCurrency(record?.luong_chay_tau['hpp'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>gpp</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'gpp'],
        key: 'gpp',
        renderText: (gpp, record) => {
          return (
            <Tooltip title={gpp}>
              {renderCurrency(record?.luong_chay_tau['gpp'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>tmp12</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'tmp12'],
        key: 'tmp12',
        renderText: (tmp12, record) => {
          return (
            <Tooltip title={tmp12}>
              {renderCurrency(record?.luong_chay_tau['tmp12'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip>tmp8</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'tmp8'],
        key: 'tmp8',
        renderText: (tmp8, record) => {
          return (
            <Tooltip title={tmp8}>
              {renderCurrency(record?.luong_chay_tau['tmp8'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="bãi bỏ phụ">bbp</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'bbp'],
        key: 'bbp',
        renderText: (bbp, record) => {
          return (
            <Tooltip title={bbp}>
              {renderCurrency(record?.luong_chay_tau['bbp'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Dồn xưởng phụ">dxp</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'dxp'],
        key: 'dxp',
        renderText: (dxp, record) => {
          return (
            <Tooltip title={dxp}>
              {renderCurrency(record?.luong_chay_tau['dxp'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Dồn kho phụ">dkp</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'dkp'],
        key: 'dkp',
        renderText: (dkp, record) => {
          return (
            <Tooltip title={dkp}>
              {renderCurrency(record?.luong_chay_tau['dkp'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Quay ghi">qgi</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'qgi'],
        key: 'qgi',
        renderText: (qgi, record) => {
          return (
            <Tooltip title={qgi}>
              {renderCurrency(record?.luong_chay_tau['qgi'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: <Tooltip title="Đêm khác">dmk</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'dmk'],
        key: 'dmk',
        renderText: (dmk, record) => {
          return (
            <Tooltip title={dmk}>
              {renderCurrency(record?.luong_chay_tau['dmk'] ?? 0)}
            </Tooltip>
          )
        },
      },
      {
        title: 'phep',
        dataIndex: ['thong_tin_chay_tau', 'phe'],
        key: 'phe',
        width: 70,
      },
      {
        title: 'om1',
        dataIndex: ['thong_tin_chay_tau', 'om1'],
        key: 'om',
        width: 70,
      },
      {
        title: 'ro1',
        dataIndex: ['thong_tin_chay_tau', 'ro1'],
        key: 'ro',
        width: 70,
      },
      {
        title: <Tooltip title="Ca 3 tài">c3t</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'c3t'],
        key: 'c3t',
        width: 70,
      },
      {
        title: <Tooltip title="Ca 3 phụ">c3p</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'c3p'],
        key: 'c3p',
        width: 70,
      },
      {
        title: <Tooltip title="ca3">ca3</Tooltip>,
        dataIndex: ['thong_tin_chay_tau', 'ca3'],
        key: 'ca3',
        width: 70,
      },
      {
        title: 'com',
        dataIndex: ['thong_tin_chay_tau', 'com'],
        key: 'com',
        width: 70,
      },
      {
        title: 'cmk',
        dataIndex: ['thong_tin_chay_tau', 'cmk'],
        key: 'cmk',
        width: 70,
      },
      {
        title: 'slcom',
        dataIndex: ['thong_tin_chay_tau', 'slcom'],
        key: 'slcom',
        width: 100,
      },
      {
        title: 'dh3',
        dataIndex: ['thong_tin_chay_tau', 'dh3'],
        key: 'dh3',
        width: 70,
      },
      {
        title: 'ntt',
        dataIndex: ['thong_tin_chay_tau', 'ntt'],
        key: 'ntt',
        width: 70,
      },
      {
        title: 'lkhoan',
        dataIndex: 'luong_khoan',
        key: 'luong_khoan',
        renderText: renderCurrency,
      },
      {
        title: <Tooltip title="Lương gián tiếp công">L.gtc</Tooltip>,
        dataIndex: 'luong_gian_tiep_cong',
        renderText: renderCurrency,
        key: 'luong_gian_tiep_cong',
        width: 100,
      },
      {
        title: 'l.ốm',
        dataIndex: 'luong_om',
        key: 'luong_om',
        renderText: renderCurrency,
      },
      {
        title: 'l.phép',
        dataIndex: 'luong_phep',
        key: 'luong_phep',
        renderText: renderCurrency,
      },
      {
        title: 'l.cơm',
        dataIndex: 'luong_com',
        key: 'luong_com',
        renderText: renderCurrency,
      },
      {
        title: 'l.đêm',
        dataIndex: 'luong_dem',
        key: 'luong_dem',
        renderText: renderCurrency,
      },
      {
        title: <Tooltip title="Lương phụ cấp trách nhiệm">l.pctn</Tooltip>,
        dataIndex: 'luong_pctn',
        renderText: renderCurrency,
        key: 'luong_pctn',
        width: 110,
      },
      {
        title: 'l.lễ',
        dataIndex: 'luong_le',
        key: 'luong_le',
        width: 110,
        renderText: renderCurrency,
      }, //chua  biet
      {
        title: <Tooltip title="Bảo hiểm xã hội">bhxh</Tooltip>,
        dataIndex: 'bhxh',
        key: 'bhxh',
        renderText: renderCurrency,
      },
      {
        title: <Tooltip title="Bảo hiểm y tế">bhyt</Tooltip>,
        dataIndex: 'bhyt',
        key: 'bhyt',
        renderText: renderCurrency,
      },
      {
        title: <Tooltip title="Lương ứng">l.ung</Tooltip>,
        dataIndex: 'luong_ung',
        key: 'luong_ung',
        renderText: renderCurrency,
      },
      {
        title: <Tooltip title="Phí công đoàn">phicd</Tooltip>,
        dataIndex: 'phi_cong_doan',
        key: 'pdoan',
        renderText: renderCurrency,
      },
      {
        title: () => <Text style={{ fontWeight: '700' }}>Thực lãnh</Text>,
        dataIndex: 'thuc_lanh',
        renderText: (value) => {
          return (
            <Text style={{ fontWeight: '700' }}>{renderCurrency(value)}</Text>
          )
        },
        key: 'thuc_lanh',
        fixed: 'right',
        width: 150,
        ellipsis: true,
      },
    ],
    [],
  )
  const resetTable = () => {
    actionRef.current?.reload()
  }

  return (
    <RouteContext.Consumer>
      {({ isMobile }: RouteContextType) => {
        return (
          <>
            <PageContainer
              content={
                <ProCard style={{ width: '100%' }}>
                  <Space
                    size={'large'}
                    direction={isMobile === false ? 'horizontal' : 'vertical'}
                  >
                    <Title ellipsis={true} level={4} style={{ margin: '0 0' }}>
                      <Tooltip title={quyLuong.toLocaleString('en-US')}>
                        Quỹ lương : {quyLuong.toLocaleString('en-US')}
                      </Tooltip>
                    </Title>

                    <Title ellipsis={true} level={4} style={{ margin: '0 0' }}>
                      <Tooltip title={kdc.toLocaleString('en-US')}>
                        HSĐC : {kdc.toLocaleString('en-US')}
                      </Tooltip>
                    </Title>

                    <Title ellipsis={true} level={4} style={{ margin: '0 0' }}>
                      <Tooltip title={luongToiThieu.toLocaleString('en-US')}>
                        Lương tối thiểu :{' '}
                        {luongToiThieu.toLocaleString('en-US')}
                      </Tooltip>
                    </Title>
                  </Space>
                </ProCard>
              }
            >
              <ProTable
                formRef={formRef}
                rowKey={'id'}
                actionRef={actionRef}
                scroll={{ x: 'auto' }}
                debounceTime={400}
                postData={(data: Luong[]) => {
                  return data
                }}
                columns={[
                  {
                    hidden: true,
                    hideInSetting: true,
                    renderFormItem: (item, config) => {
                      return (
                        <ProFormDatePicker
                          name={'thang'}
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
                  ...columns.map((column) =>
                    Object.assign(column, {
                      search: false,
                      ellipsis: true,
                      hideInSetting: true,
                    }),
                  ),
                ]}
                request={async (params: any) => {
                  return getLuongLMData(params)
                }}
                search={{
                  labelWidth: 'auto',
                }}
                toolBarRender={() => [
                  <Create resetTable={resetTable}></Create>,
                ]}
              ></ProTable>
            </PageContainer>
          </>
        )
      }}
    </RouteContext.Consumer>
  )
}

export default KhoiGTBT
