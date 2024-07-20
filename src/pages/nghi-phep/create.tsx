import { useState, useEffect, memo } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  message,
  DatePicker,
  Typography,
  Divider,
  Space,
} from 'antd'
import { useNavigate } from 'react-router-dom'

import * as Api from '@/services/nghiphep.service'
import * as LoaiNghiPhepApi from '@/services/loaiNghiPhep.services'
import * as UserApi from '@/services/user.service'
import { getMessage } from '@/util/common'
import { handleApiError } from '@/util/handleError'
import type { LoaiNghiPhep } from '@/models/loaiNghiPhep.model'
import type { User } from '@/models/user.model'

type Props = {
  accessor: [boolean, any]
  resetTable: Function
}

function CreateLeave({ accessor, resetTable }: Props) {
  const [visible, setVisible] = accessor
  const [form] = Form.useForm<any>()
  const [loading, setLoading] = useState(false)
  const [userOption, setUserOption] = useState<User[]>([])
  const [listNhanVien, setListNhanVien] = useState<User[]>([])
  const [listNguoiNhanBanGiao, setListNguoiNhanBanGiao] = useState<User[]>([])
  const [loaiNghiPhepOption, setLoaiNghiPhepOption] = useState<LoaiNghiPhep[]>(
    [],
  )

  const onSubmit = async (value: any) => {
    value.tu_ngay = value.tu_ngay?.toISOString()
    value.den_ngay = value.den_ngay?.toISOString()

    try {
      setLoading(true)
      const rs = await Api.create(value)
      message.success(rs?.message)
      form.resetFields()
      setVisible(false)
      resetTable()
    } catch (error) {
      handleApiError(error, form, null)
      if (error?.code == 'VALIDATION_FAILURE') {
        error.errors.forEach((validation: any) => {
          if (validation.field == 'tu_ngay') {
            form?.setFields([
              {
                name: 'date_range',
                errors: [validation?.message],
              },
            ])
          }
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    //Lấy dropdown user
    UserApi.dropdownUser({ search: '' })
      .then((rs) => {
        if (!rs.data) return
        setUserOption(rs.data)
        setListNguoiNhanBanGiao(rs.data)
        setListNhanVien(rs.data)
      })
      .catch((err) => {
        handleApiError(err, null, null)
      })

    //Lấy dropdown loại nghỉ phép
    LoaiNghiPhepApi.dropDown({ search: '' }).then((rs) => {
      if (!rs.data) return
      setLoaiNghiPhepOption(rs.data)
    })
  }, [])

  return (
    <>
      <Modal
        forceRender
        title={<Typography.Title level={4}> Nghỉ phép</Typography.Title>}
        open={visible}
        onCancel={(e) => {
          setVisible(false)
        }}
        width={800}
        footer={[
          <Button
            key="reset"
            htmlType="reset"
            onClick={(e) => setVisible(false)}
          >
            Huỷ
          </Button>,
          <Button
            loading={loading}
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={(e) => {
              form.submit()
            }}
          >
            Tạo mới
          </Button>,
        ]}
      >
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            name="id_nhan_vien"
            label="Nhân viên"
            labelCol={{ span: 6 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: getMessage('required', 'Nhân viên'),
              },
            ]}
          >
            <Select
              size="large"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      size={'large'}
                      style={{ width: '80%' }}
                      placeholder="Tìm kiếm tên"
                      onInput={function (event) {
                        const value = event.currentTarget.value.toLowerCase()
                        if (value == '') setListNhanVien(userOption)
                        else
                          setListNhanVien(
                            userOption.filter((user) =>
                              user.ho_va_ten?.toLowerCase().includes(value),
                            ),
                          )
                      }}
                    />
                  </Space>
                </>
              )}
            >
              {listNhanVien.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.ho_va_ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
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
            labelCol={{ span: 6 }}
            labelAlign="left"
          >
            <Select size="large" placeholder="Chọn loại nghỉ phép">
              {loaiNghiPhepOption.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {' '}
                    {item.ten}{' '}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="tu_ngay"
            label="Từ ngày"
            labelCol={{ span: 6 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: getMessage('required', 'Từ ngày'),
              },
            ]}
          >
            <DatePicker
              size="large"
              format={'DD/MM/YYYY HH:mm'}
              style={{ width: '100%' }}
              showTime={{ format: 'HH:mm' }}
            />
          </Form.Item>

          <Form.Item
            name="den_ngay"
            label="Đến ngày"
            labelCol={{ span: 6 }}
            labelAlign="left"
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
          >
            <DatePicker
              size="large"
              format={'DD/MM/YYYY HH:mm'}
              style={{ width: '100%' }}
              showTime={{ format: 'HH:mm' }}
              changeOnBlur
            />
          </Form.Item>

          <Form.Item
            name="xu_ly_boi"
            label="Người nhận bàn giao"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Người nhận bàn giao'),
              },
            ]}
            labelAlign="left"
          >
            <Select
              size="large"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      size={'large'}
                      style={{ width: '80%' }}
                      placeholder="Tìm kiếm tên"
                      onInput={function (event) {
                        const value = event.currentTarget.value.toLowerCase()
                        if (value == '') setListNguoiNhanBanGiao(userOption)
                        else
                          setListNguoiNhanBanGiao(
                            userOption.filter((user) =>
                              user.ho_va_ten?.toLowerCase().includes(value),
                            ),
                          )
                      }}
                    />
                  </Space>
                </>
              )}
            >
              {listNguoiNhanBanGiao.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.ho_va_ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="li_do"
            label="Lí do xin nghỉ"
            labelCol={{ span: 6 }}
            labelAlign="left"
            style={{ marginBottom: '0px' }}
          >
            <Input.TextArea size="large" rows={2} placeholder="Nhập lí do" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default memo(CreateLeave)
