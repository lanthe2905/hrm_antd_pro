import { regexGetNumber, renderCurrency } from '@/util/common'
import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import { create } from '@/services/loaiNghiPhep.services'
import { handleApiError } from '@/util/handleError'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

type FormType = {
  loai_ngay_phep: any
  hs: any
  so_ngay_trong_nam: any
}
export default (props: any) => {
  const { reload } = props
  const [form] = Form.useForm<FormType>()
  const coTinhLuongWatch = Form.useWatch('co_tinh_luong', form)
  return (
    <ModalForm<FormType>
      title="Tạo loại ngày phép"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Tạo mới
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={4000}
      onFinish={async (values) => {
        await waitTime(100)
        try {
          values.so_ngay_trong_nam = regexGetNumber(values.so_ngay_trong_nam)
          values.hs = regexGetNumber(values.hs)
          message.success('Tạo loại ngày phép thành công')
          reload()
          await create(values)
          return true
        } catch (error) {
          handleApiError(error, form, null)
        }
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="ten"
          required={true}
          label="Loại ngày phép"
          placeholder="Loại ngày phép"
        />

        <ProFormText
          width="md"
          name="so_ngay_trong_nam"
          required={true}
          fieldProps={{
            onBlur: (e) => {
              form.setFieldValue(
                'so_ngay_trong_nam',
                renderCurrency(e.target.value),
              )
            },
          }}
          label="Số ngày phép"
          placeholder="Số ngày phép"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="co_tinh_luong"
          label="Có tính lương"
          initialValue={'true'}
          placeholder="Chọn cách trả lương"
          options={[
            {
              value: 'true',
              label: 'Có trả lương',
            },
            {
              value: 'false',
              label: 'Không trả lương',
            },
          ]}
        />

        <ProFormText
          width="md"
          name="hs"
          label="Hệ số lương"
          placeholder="Hệ số lương"
          dependencies={['co_tinh_luong']}
          rules={[
            {
              required: coTinhLuongWatch === 'true' ? true : false,
              message: 'Hệ số lương không được để trống',
            },
          ]}
          fieldProps={{
            onBlur: (e) => {
              form.setFieldValue('hs', renderCurrency(e.target.value))
            },
          }}
        />
      </ProForm.Group>
    </ModalForm>
  )
}
