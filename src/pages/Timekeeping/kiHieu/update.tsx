import { useNavigate } from 'react-router-dom'
import { Col, Row, Form, Input, Typography, message } from 'antd'

import * as Type from '@/models/kyHieu.model'
import * as Api from '@/services/kyHieu.service'

import { getMessage } from '@/util/common'
import { handleApiError } from '@/util/handleError'
import TextArea from 'antd/es/input/TextArea'
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { EditOutlined } from '@ant-design/icons'

const { Title } = Typography

type Props = {
  resetTable: Function
  data: Type.KyHieuChamCong
}

const Update = ({ resetTable, data }: Props) => {
  const [form] = Form.useForm()
  const kyHieu = data
  const navigate = useNavigate()

  const beforeSubmit = (value: Type.KyHieuChamCong) => {
    return { ...value }
  }

  const submit = async (value: Type.KyHieuChamCong) => {
    value = beforeSubmit(value)
    try {
      const rs = await Api.update(value)
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
      title={<Title level={4}> Cập nhật ký hiệu phân ca</Title>}
      form={form}
      initialValues={kyHieu}
      width={800}
      onOpenChange={(open) => {
        setTimeout(() => form.resetFields(), 0)
      }}
      onFinish={async (values) => {
        return submit(values)
      }}
      trigger={
        <a>
          <EditOutlined />
          Cập nhật
        </a>
      }
    >
      <ProFormText hidden={true} name={'id'}>
        <Input />
      </ProFormText>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            label="ký hiệu"
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
          >
            <Input size="large" />
          </ProFormText>
        </Col>

        <Col span={12}>
          <ProFormText
            label="Hệ số công"
            name="hs_cong"
            initialValue={1}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số công'),
              },
            ]}
          ></ProFormText>
        </Col>

        <Col span={24} style={{ paddingLeft: '10px' }}>
          <ProFormTextArea label="mô tả" name={'mo_ta'}>
            <TextArea></TextArea>
          </ProFormTextArea>
        </Col>
      </Row>
    </ModalForm>
  )
}

export default Update
