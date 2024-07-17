import { SetStateAction, Dispatch, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMessage } from '@/util/common'
import { Input, Form, Button, Modal, message } from 'antd'

import { handleApiError } from '@/util/handleError'
import { PhongBan } from '@/models/phongBan.model'

import { createPhongBan } from '@/services/phongBan.service'

type CreateJobTitleProps = {
  accessor: [boolean, Dispatch<SetStateAction<boolean>>]
  resetTable: Function
}

const Create = ({ accessor, resetTable }: CreateJobTitleProps) => {
  const [openDialog, setOpenDialog] = accessor
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const onFinish = async (value: PhongBan) => {
    try {
      setLoading(true)
      const rs = await createPhongBan({ params: value })
      message.success(rs?.message)
      setOpenDialog(false)
      form.resetFields()
      resetTable()
    } catch (error) {
      handleApiError(error, form, navigate)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={'Thêm bộ phận'}
      open={openDialog}
      forceRender={true}
      className="modal-create-departments"
      onCancel={() => setOpenDialog(false)}
      footer={[
        <Button
          form="department_form"
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Tạo mới
        </Button>,
        <Button
          key="reset"
          htmlType="reset"
          onClick={() => {
            const department = form.getFieldsValue()
            const keys = Object.keys(department)

            if (department?.id && Number.isInteger(department?.id)) {
              const index = keys.indexOf('id')
              keys.splice(index, 1)
            }

            form.resetFields(keys)
          }}
        >
          Đặt lại
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onFinish}
        id="department_form"
        layout="vertical"
        onFieldsChange={(e) => {
          form.setFields([
            {
              name: e[0].name,
            },
          ])
        }}
      >
        <Form.Item name="id" hidden={true}>
          <Input value={form.getFieldValue('id')} hidden={true} />
        </Form.Item>

        <Form.Item
          name="ma_bp"
          label="Mã bộ phận"
          rules={[
            {
              required: true,
              message: getMessage('required', 'Mã bộ phận'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ten"
          label="Tên bộ phận"
          rules={[
            {
              required: true,
              message: getMessage('required', 'Tên bộ phận'),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Create
