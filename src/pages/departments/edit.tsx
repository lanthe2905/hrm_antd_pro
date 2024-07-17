import { SetStateAction, Dispatch, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMessage } from '@/util/common'
import { Input, Form, Button, Modal, message } from 'antd'

import { handleApiError } from '@/util/handleError'
import { PhongBan } from '@/models/phongBan.model'

import { updatePhongBan } from '@/services/phongBan.service'

type Props = {
  accessor: [boolean, Dispatch<SetStateAction<boolean>>]
  resetTable: Function
  item: [PhongBan, any]
}

const Update = ({ accessor, resetTable, item }: Props) => {
  const [department] = item
  const [openDialog, setOpenDialog] = accessor
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const onFinish = async (value: PhongBan) => {
    try {
      setLoading(true)
      const rs = await updatePhongBan(value)
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

  useEffect(() => {
    form.resetFields()
  }, [department])

  return (
    <Modal
      title={'Sửa bộ phận'}
      open={openDialog}
      className="modal-edit-departments"
      forceRender={true}
      onCancel={() => setOpenDialog(false)}
      footer={[
        <Button
          form="department_form_edit"
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Cập nhật
        </Button>,

        <Button
          key="reset"
          htmlType="reset"
          onClick={() => {
            form.resetFields()
          }}
        >
          Đặt lại
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onFinish}
        id="department_form_edit"
        layout="vertical"
        onFieldsChange={(e) => {
          form.setFields([
            {
              name: e[0].name,
            },
          ])
        }}
      >
        <Form.Item name="id" hidden={true} initialValue={department.id}>
          <Input value={form.getFieldValue('id')} />
        </Form.Item>

        <Form.Item
          name="ma_bp"
          label="Mã bộ phận"
          initialValue={department?.ma_bp}
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
          initialValue={department?.ten}
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

export default Update
