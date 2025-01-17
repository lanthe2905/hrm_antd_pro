import { memo } from 'react'
import { Button, Form, Input, message, Typography } from 'antd'
import * as nghiPhepApi from '@/services/nghiphep.service'
import { getMessage } from '@/util/common'
import { handleApiError } from '@/util/handleError'
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-components'
import { PlusOutlined } from '@ant-design/icons'
import { waitTime } from '../departments'

type Props = {
  userOptions: { label: string; value: string }[]
  loaiNghiPhepOptions: { label: string; value: string }[]
  resetTable: Function
}

function CreateLeave(props: Props) {
  const { resetTable, userOptions, loaiNghiPhepOptions } = props
  const [form] = Form.useForm<any>()

  return (
    <>
      <ModalForm
        title={<Typography.Title level={4}>Thêm nghỉ phép</Typography.Title>}
        form={form}
        trigger={
          <Button type="primary">
            <PlusOutlined /> Thêm mới
          </Button>
        }
        onFinish={async (values) => {
          await waitTime(100)
          try {
            const data = form.getFieldsValue()
            console.log(data)
            await nghiPhepApi.create(data)
            resetTable()
            form.resetFields()
            message.success('Tạo loại ngày phép thành công')
            return true
          } catch (error) {
            handleApiError(error, form, null)
            return false
          }
        }}
      >
        <ProFormSelect
          name="id_nhan_vien"
          label="Nhân viên"
          showSearch={true}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Nhân viên'),
            },
          ]}
          options={userOptions}
        ></ProFormSelect>

        <ProFormSelect
          rules={[
            {
              required: true,
              message: getMessage(
                'required',
                getMessage('required', 'Loại nghỉ phép'),
              ),
            },
          ]}
          name="id_loai_nghi_phep"
          label="Loại nghỉ phép"
          showSearch={true}
          options={loaiNghiPhepOptions}
        ></ProFormSelect>

        <ProFormDatePicker
          name="tu_ngay"
          label="Từ ngày"
          fieldProps={{
            format: 'DD/MM/YYYY HH:mm',
            showTime: { format: 'HH:mm' },
            style: { width: '100%' },
          }}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Từ ngày'),
            },
          ]}
        ></ProFormDatePicker>

        <ProFormDatePicker
          name="den_ngay"
          label="Đến ngày"
          fieldProps={{
            format: 'DD/MM/YYYY HH:mm',
            showTime: { format: 'HH:mm' },
            style: { width: '100%' },
          }}
          dependencies={['tu_ngay']}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Đến ngày'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value > getFieldValue('tu_ngay')) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Đến ngày phải lớn hơn!'))
              },
            }),
          ]}
        ></ProFormDatePicker>

        <ProFormSelect
          name="xu_ly_boi"
          label="Người nhận bàn giao"
          showSearch={true}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Người nhận bàn giao'),
            },
          ]}
          labelAlign="left"
          options={userOptions}
        ></ProFormSelect>

        <Form.Item
          name="li_do"
          label="Lí do xin nghỉ"
          labelCol={{ span: 6 }}
          labelAlign="left"
          style={{ marginBottom: '0px' }}
        >
          <Input.TextArea size="large" rows={2} placeholder="Nhập lí do" />
        </Form.Item>
      </ModalForm>
    </>
  )
}

export default memo(CreateLeave)
