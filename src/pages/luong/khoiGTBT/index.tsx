import { useRef, useState, type FC } from 'react'
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
import { getLuongGTBTData } from '@/services/luong.service'
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
  const columns: ProColumns<Luong>[] = [
    {
      title: 'sdb',
      fixed: 'left',
      render: function (_, data) {
        return <a> {data.thong_tin_nhan_vien.sdb}</a>
      },
    },
    {
      title: 'Tên NV',
      dataIndex: ['thong_tin_nhan_vien', 'ho_va_ten'],
    },
    {
      title: 'Khối',
      dataIndex: 'khoi_ll',
      key: 'khoi',
    },
    {
      title: 'Chức danh',
      dataIndex: ['thong_tin_nhan_vien', 'chuc_danh_ll'],
      key: 'chuc_danh',
    },
    // { title: <Tooltip title="Giờ sản phẩm">Giờ SP</Tooltip>, dataIndex: 'gio_san_pham', key: 'gio_san_pham' },
    {
      title: <Tooltip title="Hệ số lương">HSL</Tooltip>,
      dataIndex: 'hsl',
      key: 'hsl',
    },
    {
      title: <Tooltip title="Hệ số chức vụ">hscvu</Tooltip>,
      dataIndex: 'hscvu',
      key: 'hscvu',
    },
    {
      title: <Tooltip title="Hs phụ cấp trách nhiệm">hspctn</Tooltip>,
      dataIndex: 'hspctn',
      key: 'hspctn',
    },
    { title: 'K2', dataIndex: 'k2', key: 'k2' },
    { title: 'K1', dataIndex: 'k1', key: 'k1' },
    {
      title: <Tooltip title="Ngày công thực tế">Nctt</Tooltip>,
      dataIndex: 'nctt',
      key: 'nctt',
    },
    {
      title: <Tooltip title="Lương chế độ">T1</Tooltip>,
      dataIndex: 't1',
      key: 't1',
      renderText: renderCurrency,
    },
    { title: 'SPP', dataIndex: 'spp', key: 'spp' },
    {
      title: <Tooltip title="Lương hiệu quả">T2</Tooltip>,
      dataIndex: 't2',
      key: 'ts',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương khoán">l.khoan</Tooltip>,
      dataIndex: 'luong_khoan',
      key: 'luong_khoan',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương đêm">l.dem</Tooltip>,
      dataIndex: 'luong_dem',
      key: 'luong_dem',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương cơm">l.com</Tooltip>,
      dataIndex: 'luong_com',
      key: 'luong_com',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương ốm">l.om</Tooltip>,
      dataIndex: 'luong_om',
      key: 'luong_om',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương phép">l.phep</Tooltip>,
      dataIndex: 'luong_phep',
      key: 'luong_phep',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương kiêm nhiệm">l.kiemnhiem</Tooltip>,
      dataIndex: 'luong_kiem_nhiem',
      key: 'luong_kiem_nhiem',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương phụ cấp trách nhiệm">L pctn</Tooltip>,
      dataIndex: 'luong_pctn',
      key: 'luong_pctn',
      ellipsis: true,
      renderText: renderCurrency,
    },
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
      title: <Tooltip title="Phí công đoàn">phicd</Tooltip>,
      dataIndex: 'phi_cong_doan',
      key: 'phi_cong_doan',
      renderText: renderCurrency,
    },
    {
      title: <Tooltip title="Lương ứng">l.ung</Tooltip>,
      dataIndex: 'luong_ung',
      key: 'luong_ung',
      renderText: renderCurrency,
    },
    {
      title: () => <Text style={{ fontWeight: '700' }}>Thực lãnh</Text>,
      dataIndex: 'thuc_lanh',
      key: 'thuc_lanh',
      renderText: (text) => (
        <Text style={{ fontWeight: '700' }}>{renderCurrency(text)}</Text>
      ),
    },
  ]
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
                postData={(data: Luong[]) => {
                  setDataSource(data)
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
                    }),
                  ),
                ]}
                request={async (params: any) => {
                  return getLuongGTBTData(params)
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
