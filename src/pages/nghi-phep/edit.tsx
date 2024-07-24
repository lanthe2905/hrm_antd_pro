import { memo } from 'react'
import { Form, Input, Typography } from 'antd'
import * as Api from '@/services/nghiphep.service'
import { getMessage } from '@/util/common'
import { handleApiError } from '@/util/handleError'
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { EditOutlined } from '@ant-design/icons'
import type { NghiPhep } from '@/models/nghiPhep.model'
import dayjs from 'dayjs'
import { flushSync } from 'react-dom'

type Props = {
  values: NghiPhep
  userOptions: { label: string; value: string }[]
  loaiNghiPhepOptions: { label: string; value: string }[]
  resetTable: Function
}

function EditLeave(props: Props) {
  const { values, resetTable, userOptions, loaiNghiPhepOptions } = props
  const [form] = Form.useForm<any>()
  let tu_ngay = dayjs(values.tu_ngay)
  let den_ngay = dayjs(values.den_ngay)

  return (
    <>
      <ModalForm
        title={
          <Typography.Title level={4}>Cập nhật nghỉ phép</Typography.Title>
        }
        initialValues={{
          ...values,
          tu_ngay: undefined,
          den_ngay: undefined,
        }}
        form={form}
        trigger={
          <a>
            <EditOutlined /> Cập nhật
          </a>
        }
        onOpenChange={(open) => {
          open && setTimeout(() => form.resetFields())
        }}
        onFinish={async (values) => {
          try {
            let data = form.getFieldsValue()
            await Api.update(data)
            resetTable()
            form.resetFields()
            return true
          } catch (error) {
            handleApiError(error, form, null)
            return false
          }
        }}
      >
        <ProFormText
          name="id"
          hidden={true}
          rules={[
            {
              required: true,
              message: getMessage('required', 'id'),
            },
          ]}
        ></ProFormText>

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
          initialValue={tu_ngay.isValid() ? tu_ngay : undefined}
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
          initialValue={den_ngay.isValid() ? den_ngay : undefined}
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
            ({ getFieldValue }) => {
              return {
                validator(_, value) {
                  const tuNgay = dayjs(getFieldValue('tu_ngay'))
                  const denNgay = dayjs(getFieldValue('den_ngay'))
                  if (denNgay > tuNgay) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Đến ngày phải lớn hơn!'))
                },
              }
            },
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

export default memo(EditLeave)
