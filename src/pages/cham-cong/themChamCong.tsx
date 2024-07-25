import { Button, Card, Col, Form, Row, Space } from 'antd'
import * as _ from 'lodash'
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components'
import PhongBanOptions from '@/components/PhongBanOptions'
import { danhSachNhanVienChamCong } from '@/services/chamCong.service'
import { NguoiThamDu } from '@/models/nguoiThamDu.model'
import { useRef } from 'react'
import dayjs from 'dayjs'

function NhapBangCong() {
  const [formTimKiem] = Form.useForm()
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<NguoiThamDu>[] = [
    {
      title: 'Nhân viên',
      width: '10',
      render: (text, record) => {
        return <>{record.sdb + ' - ' + record.ho_va_ten}</>
      },
    },
    {
      title: 'BP',
      key: 'ma_bp',
      width: '20',
      dataIndex: 'ma_bp',
      render: (text, record) => {
        return <>{record.ma_bp}</>
      },
    },
    {
      key: 'k1',
      title: 'K1',
      width: '10',
      render: (text, record, index) => {
        return (
          <ProFormText
            placeholder={'k1'}
            name={['cham_congs', index, 'k1']}
            fieldProps={{
              style: { width: '100%' },
            }}
          />
        )
      },
    },
    {
      key: 'nctt',
      title: 'Nctt',
      width: '10',
      render: (text, record, index) => {
        return (
          <ProFormText
            placeholder={'Nctt'}
            name={['cham_congs', index, 'nctt']}
            fieldProps={{
              style: { width: '100%' },
            }}
          />
        )
      },
    },
    {
      key: 'ca_3',
      title: 'Ca 3',
      width: '10',
      render: (text, record, index) => {
        return (
          <ProFormText
            placeholder={'Ca 3'}
            name={['cham_congs', index, 'ca_3']}
            fieldProps={{
              style: { width: '100%' },
            }}
          />
        )
      },
    },
    {
      key: 'com',
      title: 'Cơm',
      width: '10',
      render: (text, record, index) => {
        return (
          <ProFormText
            placeholder={'Cơm'}
            name={['cham_congs', index, 'com']}
            fieldProps={{
              style: { width: '100%' },
            }}
          />
        )
      },
    },
    {
      key: 'phep',
      title: 'Phép',
      width: '10',
      render: (text, record, index) => {
        return (
          <ProFormText
            placeholder={'Phép'}
            name={['cham_congs', index, 'phep']}
            fieldProps={{
              style: { width: '100%' },
            }}
          />
        )
      },
    },
  ]
  return (
    <>
      <PageContainer>
        <Card>
          <ProForm
            submitter={false}
            form={formTimKiem}
            onFieldsChange={(e) => {
              actionRef.current?.reload()
            }}
            layout={'horizontal'}
          >
            <Row>
              <Col span={6}>
                <ProForm.Item
                  label={'Tháng chấm công'}
                  name={'thang_cham_cong'}
                  initialValue={dayjs()}
                >
                  <ProFormDatePicker
                    fieldProps={{
                      format: 'MM/YYYY',
                      picker: 'month',
                      style: { width: '100%' },
                    }}
                  />
                </ProForm.Item>
              </Col>
            </Row>

            <Row gutter={[10, 10]}>
              <Col span={4}>
                <ProFormText
                  label={'Tìm kiếm'}
                  placeholder={'Tìm kiếm theo SDB, Tên nhân viên'}
                  fieldProps={{
                    style: { width: '100%' },
                  }}
                  name={'search'}
                />
              </Col>

              <Col span={4}>
                <PhongBanOptions label="Phòng ban" name="id_phong_ban" />
              </Col>

              <Col span={4}>
                <Space>
                  <Button type={'primary'}>Thêm</Button>
                  <Button>Làm trống</Button>
                </Space>
              </Col>
            </Row>
          </ProForm>
        </Card>

        <ProTable<NguoiThamDu>
          actionRef={actionRef}
          debounceTime={500}
          rowKey={'id'}
          params={{
            khoi_ll: ['SC', 'BTC', 'GT-BT'],
          }}
          search={false}
          pagination={false}
          request={async (params: any) => {
            const filterParams = formTimKiem.getFieldsValue()
            const rs = await danhSachNhanVienChamCong({
              ...filterParams,
              ...params,
            })

            return {
              data: rs.data,
              total: 200,
              success: true,
            }
          }}
          columns={columns}
        ></ProTable>
      </PageContainer>
    </>
  )
}

export default NhapBangCong
