import { SetStateAction, Dispatch, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Form, InputNumber, Button, Modal, message } from 'antd'

import { updateChucDanh } from '@/services/chucDanh.service'
import { getMessage } from '@/util/common'
import { handleApiError } from '@/util/handleError'
import { constant } from '@/util/constant'
import { ChucDanh } from '@/models/chucDanh.model'

type UpdateJobTitleProps = {
  accessor: [boolean, Dispatch<SetStateAction<boolean>>]
  item: [ChucDanh, any]
  resetTable: Function
}

const style = {
  inputNumber: { width: '100%' },
}

const handleOk = () => {}

const Update = ({ accessor, item, resetTable }: UpdateJobTitleProps) => {
  const [chucDanh] = item
  const [openDialog, setOpenDialog] = accessor
  const [form] = Form.useForm()
  let [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const onSubmit = async (jobTitle: ChucDanh) => {
    if (!jobTitle.id) throw new Error(constant.system_error)
    try {
      const rs = await updateChucDanh(jobTitle)
      setOpenDialog(false)
      resetTable()
      message.success(rs?.message)
    } catch (error) {
      handleApiError(error, form, navigate)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      form.resetFields()
    }, 0)
  }, [openDialog])

  return (
    <>
      {openDialog && (
        <Modal
          title={'Cập nhật chức danh công việc'}
          forceRender={true}
          centered={true}
          open={openDialog}
          onOk={handleOk}
          afterClose={() => setOpenDialog(false)}
          onCancel={() => setOpenDialog(false)}
          footer={[
            <Button
              key="submit"
              form="jobTitleUpdateForm"
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
            id="jobTitleUpdateForm"
            layout="vertical"
            form={form}
            onFinish={(value: ChucDanh) => {
              setLoading(true)
              onSubmit(value)
            }}
          >
            <Form.Item hidden={true} name="id" initialValue={chucDanh.id}>
              <Input />
            </Form.Item>

            <Form.Item
              name="ten"
              label={'Tên chức danh'}
              initialValue={chucDanh.ten}
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
              initialValue={chucDanh.mo_ta}
              rules={[
                {
                  required: false,
                  message: getMessage('required', 'Mô tả'),
                },
              ]}
            >
              <Input onChange={(e) => {}} />
            </Form.Item>

            <Form.Item
              name="kpp"
              label="Kpp:"
              initialValue={chucDanh.kpp ?? 1}
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
      )}
    </>
  )
}

export default Update
