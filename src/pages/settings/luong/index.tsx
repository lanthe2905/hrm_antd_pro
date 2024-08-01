import { Tabs, Form, Input, Row, Col, Button, message } from 'antd'
import type { TabsProps } from 'antd'

import { useForm } from 'antd/es/form/Form'
import { renderCurrency, getMessage, regexGetNumber } from '@/util/common'
import { handleApiError } from '@/util/handleError'
import { useEffect, useState } from 'react'
import * as caiDatApi from '@/services/caiDat.service'
import { CaiDat } from '@/models/caiDat.model'
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  RouteContext,
  RouteContextType,
} from '@ant-design/pro-components'

function InputCustom(props: any) {
  const { value, onChange, fieldName } = props
  const form = Form.useFormInstance()

  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={(e) => {
        form.setFields([
          {
            name: fieldName,
            value: renderCurrency(e.target.value),
            errors: [],
          },
        ])
        setTimeout(() => {
          tabShowError({ showError: false })
          tabShowError({ showError: true })
        }, 500)
      }}
    />
  )
}

const tabShowError = ({ showError = true }) => {
  const tabpanes = document.querySelectorAll(
    'form#caidat_form .ant-tabs-tabpane',
  )
  if (showError) {
    tabpanes.forEach((tabpane) => {
      const error = tabpane.querySelectorAll(
        '.ant-input-status-error,.ant-form-item-explain-error',
      )
      if (error.length > 0) {
        const tab = document.getElementById(
          tabpane.getAttribute('aria-labelledby') ?? '',
        ) as HTMLElement
        tab && (tab.style.color = '#ff4d4f')
      }
    })
  } else {
    tabpanes.forEach((tabpane) => {
      const tab = document.getElementById(
        tabpane.getAttribute('aria-labelledby') ?? '',
      ) as HTMLElement
      tab && (tab.style.color = 'inherit')
    })
  }
}

function CaiDatLuong() {
  const [form] = useForm()
  const [data, setData] = useState<CaiDat>({} as CaiDat)
  const [loading, setLoading] = useState(false)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Cài đặt chung',
      forceRender: true,
      children: (
        <ProCard>
          <Form.Item
            label="Lương tối thiểu :"
            rules={[
              {
                required: true,
                message: getMessage('required', 'Lương tối thiểu'),
              },
            ]}
            initialValue={renderCurrency(data?.luong?.luong_toi_thieu)}
            name={'luong_toi_thieu'}
          >
            <InputCustom fieldName={'luong_toi_thieu'} />
          </Form.Item>

          <Form.Item
            label="Hệ số lương ngày lễ :"
            initialValue={renderCurrency(data?.luong?.hs_luong_ngay_le)}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số lương ngày lễ'),
              },
            ]}
            name={'hs_luong_ngay_le'}
          >
            <InputCustom fieldName={'hs_luong_ngay_le'} />
          </Form.Item>
        </ProCard>
      ),
    },
    {
      key: '2',
      label: 'Lương khối GT-BT',
      forceRender: true,
      children: (
        <ProCard>
          <Form.Item
            label=" Hệ số điều chỉnh khối GTBT :"
            initialValue={renderCurrency(data?.luong?.gt_bt?.kdc)}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số điều chỉnh'),
              },
            ]}
            name={['gt_bt', 'kdc']}
          >
            <InputCustom fieldName={['gt_bt', 'kdc']} />
          </Form.Item>

          <Form.Item
            label="Đơn giá lương ca đêm khối GTBT :"
            initialValue={
              renderCurrency(data?.luong?.gt_bt?.don_gia_luong_ca_dem) ?? 0
            }
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số lương ca đêm'),
              },
            ]}
            name={['gt_bt', 'don_gia_luong_ca_dem']}
          >
            <InputCustom fieldName={['gt_bt', 'don_gia_luong_ca_dem']} />
          </Form.Item>
        </ProCard>
      ),
    },
    {
      key: '3',
      label: 'lương khối Bổ trợ ca',
      forceRender: true,
      children: (
        <ProCard>
          <Form.Item
            label=" Hệ số điều chỉnh khối BTC :"
            initialValue={renderCurrency(data?.luong?.btc?.kdc ?? 0)}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số điều chỉnh'),
              },
            ]}
            name={['btc', 'kdc']}
          >
            <InputCustom fieldName={['btc', 'kdc']} />
          </Form.Item>

          <Form.Item
            label="Hệ số lương ca đêm khối BTC :"
            initialValue={renderCurrency(
              data?.luong?.btc?.hs_luong_ca_dem ?? 0,
            )}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số lương ca đêm'),
              },
            ]}
            name={['btc', 'hs_luong_ca_dem']}
          >
            <InputCustom fieldName={['btc', 'hs_luong_ca_dem']} />
          </Form.Item>
        </ProCard>
      ),
    },
    {
      key: '4',
      label: 'Lương khối Sửa chữa',
      forceRender: true,
      children: (
        <ProCard>
          <Form.Item
            label=" Hệ số điều chỉnh khối SC :"
            initialValue={renderCurrency(data?.luong?.sc?.kdc ?? 0)}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số điều chỉnh'),
              },
            ]}
            name={['sc', 'kdc']}
          >
            <InputCustom fieldName={['sc', 'kdc']} />
          </Form.Item>

          <Form.Item
            label="Hệ số lương ca đêm khối SC :"
            initialValue={renderCurrency(data?.luong?.sc?.hs_luong_ca_dem ?? 0)}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số lương ca đêm'),
              },
            ]}
            name={['sc', 'hs_luong_ca_dem']}
          >
            <InputCustom fieldName={['sc', 'hs_luong_ca_dem']} />
          </Form.Item>

          <Form.Item
            label="Đơn giá lương sản phẩm khối SC :"
            initialValue={renderCurrency(
              data?.luong?.sc?.don_gia_luong_san_pham ?? 0,
            )}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Đơn giá lương sản phẩm'),
              },
            ]}
            name={['sc', 'don_gia_luong_san_pham']}
          >
            <InputCustom fieldName={['sc', 'don_gia_luong_san_pham']} />
          </Form.Item>
        </ProCard>
      ),
    },
    {
      key: '5',
      forceRender: true,
      label: 'Lương khối Lái máy',
      children: (
        <ProCard>
          <Form.Item
            label=" Hệ số điều chỉnh khối LM :"
            initialValue={renderCurrency(data?.luong?.lm?.kdc ?? 0)}
            rules={[
              {
                required: true,
                message: getMessage('required', ' Hệ số điều chỉnh'),
              },
            ]}
            name={['lm', 'kdc']}
          >
            <InputCustom fieldName={['lm', 'kdc']} />
          </Form.Item>

          <Form.Item
            label="Hệ số lương ca đêm khối LM :"
            initialValue={renderCurrency(data?.luong?.lm?.hs_luong_ca_dem ?? 0)}
            rules={[
              {
                required: true,
                message: getMessage('required', ' Hệ số lương ca đêm'),
              },
            ]}
            name={['lm', 'hs_luong_ca_dem']}
          >
            <InputCustom fieldName={['lm', 'hs_luong_ca_dem']} />
          </Form.Item>
        </ProCard>
      ),
    },
    {
      key: '6',
      forceRender: true,
      label: 'Lương Chất lượng chạy tàu',
      children: (
        <ProCard>
          <Form.Item
            label=" Đơn giá lương chất lượng chạy tàu :"
            initialValue={renderCurrency(data?.luong?.clct?.don_gia_luong ?? 0)}
            rules={[
              {
                required: true,
                message: getMessage(
                  'required',
                  ' Đơn giá lương chất lượng chạy tàu',
                ),
              },
            ]}
            name={['clct', 'don_gia_luong']}
          >
            <InputCustom fieldName={['clct', 'don_gia_luong']} />
          </Form.Item>
        </ProCard>
      ),
    },
    {
      key: '7',
      forceRender: true,
      label: 'Lương đội trưởng',
      children: (
        <ProCard>
          <Form.Item
            label="Hệ số điều chỉnh đội trưởng lái tàu :"
            initialValue={renderCurrency(data?.luong?.dt_lt?.kdc ?? 0)}
            rules={[
              {
                required: true,
                message: getMessage('required', ' Hệ số điều chỉnh'),
              },
            ]}
            name={['dt_lt', 'kdc']}
          >
            <InputCustom fieldName={['dt_lt', 'kdc']} />
          </Form.Item>
        </ProCard>
      ),
    },
  ]

  const handleFinish = async (values: CaiDat['luong']) => {
    try {
      setLoading(true)
      values.hs_luong_ca_dem = 0
      values.hs_luong_ngay_le = regexGetNumber(values.hs_luong_ngay_le)
      values.luong_toi_thieu = regexGetNumber(values.luong_toi_thieu)
      values.btc.hs_luong_ca_dem = regexGetNumber(values.btc.hs_luong_ca_dem)
      values.btc.kdc = regexGetNumber(values.btc.kdc)
      values.clct.don_gia_luong = regexGetNumber(values.clct.don_gia_luong)
      values.gt_bt.don_gia_luong_ca_dem = regexGetNumber(
        values.gt_bt.don_gia_luong_ca_dem,
      )
      values.gt_bt.kdc = regexGetNumber(values.gt_bt.kdc)
      values.lm.hs_luong_ca_dem = regexGetNumber(values.lm.hs_luong_ca_dem)
      values.lm.kdc = regexGetNumber(values.lm.kdc)
      values.sc.don_gia_luong_san_pham = regexGetNumber(
        values.sc.don_gia_luong_san_pham,
      )
      values.sc.hs_luong_ca_dem = regexGetNumber(values.sc.hs_luong_ca_dem)
      values.sc.kdc = regexGetNumber(values.sc.kdc)
      values.dt_lt.kdc = regexGetNumber(values.dt_lt.kdc)
      await caiDatApi.createOrUpdateLuong(values)

      message.success('Cập nhật thành công')
    } catch (error) {
      handleApiError(error, form, null)
      setTimeout(() => {
        tabShowError({ showError: true })
      }, 800)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    caiDatApi
      .getDetail()
      .then((res) => {
        setData(res.data as any)
        setTimeout(() => {
          form.resetFields()
        }, 300)
      })
      .catch((rs) => {
        handleApiError(rs, null, null)
      })
  }, [])

  return (
    <RouteContext.Consumer>
      {({ isMobile }: RouteContextType) => {
        return (
          <Form
            form={form}
            id="caidat_form"
            layout="vertical"
            onFinish={handleFinish}
          >
            <PageContainer>
              <Row>
                <Col
                  span={24}
                  style={{
                    textAlign: 'right',
                  }}
                ></Col>
                <Col span={24}>
                  <Tabs
                    tabPosition={'top'}
                    defaultActiveKey="1"
                    items={items}
                  />
                </Col>
              </Row>

              <FooterToolbar>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={(e) => {
                    e.preventDefault()
                    form.submit()
                  }}
                >
                  Lưu
                </Button>
              </FooterToolbar>
            </PageContainer>
          </Form>
        )
      }}
    </RouteContext.Consumer>
  )
}

export default CaiDatLuong
