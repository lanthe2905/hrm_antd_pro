import React, { SetStateAction, Dispatch, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMessage } from '@/util/common'
import { Input, Form, InputNumber, Button, Modal, message } from 'antd'
import { ChucDanh } from '@/models/chucDanh.model'
import { createChucDanh } from '@/services/chucDanh.service'
import { handleApiError } from '@/util/handleError'

type CreateJobTitleProps = {
  accessor: [boolean, Dispatch<SetStateAction<boolean>>]
  resetTable: Function
}

const style = {
  inputNumber: { width: '100%' },
}

const Create = ({ accessor, resetTable }: CreateJobTitleProps) => {
  const [openDialog, setOpenDialog] = accessor
  const [form] = Form.useForm()
  let [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const onFinish = async (value: ChucDanh) => {
    try {
      const rs = await createChucDanh({ params: value, options: {} })
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
      title={'Thêm chức danh công việc'}
      open={openDialog}
      afterClose={() => setOpenDialog(false)}
      onCancel={() => setOpenDialog(false)}
      footer={[
        <Button
          key="submit"
          form="jobTitleCreateForm"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Lưu
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
        id="jobTitleCreateForm"
        layout="vertical"
        form={form}
        onFinish={(value: ChucDanh) => {
          setLoading(true)
          onFinish(value)
        }}
        onFieldsChange={(e) => {
          form.setFields([
            {
              name: e[0].name,
            },
          ])
        }}
      >
        <Form.Item
          name="ten"
          label={'Tên chức danh'}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Tên chức danh'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="mo_ta"
          label="Mô tả:"
          rules={[
            {
              required: false,
              message: getMessage('required', 'Mô tả'),
            },
            {
              max: 255,
              message: getMessage('max', 'Mô tả', 255),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="kpp"
          label="Kpp:"
          initialValue={1}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Hệ số Kpp'),
            },
            {
              validator(rule, value, callback) {
                if (value < 1 || value > 10) {
                  return Promise.reject('Hệ số Kpp phải từ 1 đến 10')
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <InputNumber style={style.inputNumber} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(Create)
