import { useNavigate } from 'react-router-dom'
import { Form, Typography, Button, message } from 'antd'

import * as Type from '@/models/kyHieu.model'
import * as Api from '@/services/kyHieu.service'

import { getMessage, renderCurrency } from '@/util/common'
import { handleApiError } from '@/util/handleError'
import {
  ModalForm,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { waitTime } from '@/pages/departments'

const { Title } = Typography

type Props = {
  resetTable: Function
}

const Create = (props: Props) => {
  const { resetTable } = props
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const beforeSubmit = (value: Type.KyHieuChamCong) => {
    return { ...value }
  }

  const submit = async (value: Type.KyHieuChamCong) => {
    value = beforeSubmit(value)
    try {
      const rs = await Api.create(value)
      message.success(rs?.message)
      form.resetFields()
      resetTable()
      return true
    } catch (error) {
      handleApiError(error, form, navigate)
      return false
    }
  }

  return (
    <ModalForm
      form={form}
      onFinish={async (values) => {
        await waitTime(2000)
        return submit(values)
      }}
      title={<Title level={4}> Thêm ký hiệu phân ca</Title>}
      trigger={<Button>Thêm ký hiệu</Button>}
    >
      <ProFormGroup>
        <ProFormText
          label="Ký hiệu"
          name={'ky_hieu'}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Ký hiệu'),
            },
            {
              max: 10,
              min: 1,
              message: getMessage('rangeError', 'Ký hiệu', '1', '10'),
            },
          ]}
        ></ProFormText>

        <ProFormText
          label="Hệ số công"
          name="hs_cong"
          initialValue={1}
          fieldProps={{
            onBlur: (e) => {
              form.setFieldValue('hs_cong', renderCurrency(e.target.value))
            },
          }}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Hệ số công'),
            },
          ]}
        ></ProFormText>
      </ProFormGroup>

      <ProFormTextArea label="Mô tả" name={'mo_ta'}></ProFormTextArea>
    </ModalForm>
  )
}

export default Create
