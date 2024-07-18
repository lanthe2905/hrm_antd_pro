import { SetStateAction, Dispatch, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  message,
  Modal,
  Button,
  Typography,
  InputNumber,
  Checkbox,
  Row,
  Col,
} from 'antd'

import { User } from '@/models/user.model'
import { createUser } from '@/services/user.service'
import { handleApiError } from '@/util/handleError'
import { PhongBan } from '@/models/phongBan.model'
import { ChucDanh } from '@/models/chucDanh.model'
import { getMessage } from '@/util/common'
import { KHOI_LL } from '@/util/constant'
import dayjs from 'dayjs'

type CreateProps = {
  accessor: [boolean, Dispatch<SetStateAction<boolean>>]
  resetTable: Function
  phongBanList: PhongBan[]
  chucDanhList: ChucDanh[]
}

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

const Create = ({
  accessor,
  resetTable,
  phongBanList,
  chucDanhList,
}: CreateProps) => {
  const [form] = Form.useForm()
  const [openDialog, setOpenDialog] = accessor
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const chucDanhOption = useMemo(() => {
    const option = [{ value: '', label: 'Vui lòng chọn' }]

    chucDanhList.forEach((item) =>
      option.push({ value: item.id as any, label: item.ten }),
    )

    return option
  }, [chucDanhList])

  const phongbanOption = useMemo(() => {
    const option = [{ value: '', label: 'Vui lòng chọn' }]

    phongBanList.forEach((item) =>
      option.push({ value: item.id as any, label: item.ten }),
    )

    return option
  }, [phongBanList])

  const onFinish = async (value: User) => {
    try {
      setLoading(true)
      const rs = await createUser(value)
      message.success(rs.message)
      setOpenDialog(false)
      resetTable()
      form.resetFields()
    } catch (error) {
      handleApiError(error, form, navigate)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={<Typography.Title level={4}>Thêm nhân viên</Typography.Title>}
      open={openDialog}
      onCancel={() => setOpenDialog(false)}
      width={1000}
      footer={[
        <Button
          onClick={(e) => {
            setOpenDialog(false)
          }}
          key="reset"
          htmlType="reset"
        >
          Đóng
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          form="createUser"
        >
          Tạo mới
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        name="createUser"
        form={form}
        onFinish={(value: User) => onFinish(value)}
        onFieldsChange={(changedFields) => {
          form.setFields([
            {
              name: changedFields[0].name,
            },
          ])
        }}
        labelWrap={true}
      >
        <Row gutter={30}>
          <Col span={12}>
            <Form.Item
              name="sdb"
              label="Số danh bạ"
              rules={[
                {
                  required: true,
                  message: getMessage('required', 'Số danh bạ'),
                },
              ]}
            >
              <Input placeholder="Số danh bạ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ngay_ky_hdld_dau_tien"
              label="Ngày ký hợp đồng lao động đầu tiên"
              initialValue={dayjs()}
              rules={[
                {
                  required: false,
                  message: getMessage('required', 'Ngày ký hợp đồng'),
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                placeholder="Ngày ký HĐLĐ đầu tiên"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ho_va_ten"
              label="Tên nhân viên"
              rules={[
                {
                  required: true,
                  message: getMessage('required', 'Tên nhân viên'),
                },
              ]}
            >
              <Input placeholder="Tên nhân viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="k2"
              label="Hệ số K2"
              initialValue={0}
              rules={[
                {
                  required: false,
                  message: getMessage('required', 'K2'),
                },
              ]}
            >
              <Input placeholder="K2" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sdt"
              label="Số điện thoại"
              rules={[
                {
                  validator: (_, value) => {
                    if (value == '' || !value) return Promise.resolve()
                    const regex = /(84|0[3|5|7|8|9])+([0-9]{8}|[0-9]{9})\b/gi
                    return regex.test(value)
                      ? Promise.resolve()
                      : Promise.reject(new Error('Số điện thoại không hợp lệ'))
                  },
                },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              name="bac"
              label="Bậc"

              rules={[{ required: true, message: getMessage('required', 'Bậc') }]}
              initialValue={'1/5'}
            >
              <Input placeholder="Bậc" />
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Định dạng email không hợp lệ',
                },
                {
                  required: false,
                  message: getMessage('required', 'email'),
                },
              ]}
            >
              <Input type="text" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Khối làm lương"
              name="khoi_ll"
              rules={[
                {
                  required: false,
                  message: getMessage('required', 'Khối làm lương'),
                },
              ]}
            >
              <Select placeholder="Chọn khối" options={KHOI_LL} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={'khong_xac_dinh'}
              name="gioi_tinh"
              label="Giới tính"
            >
              <Radio.Group name="radiogroup">
                <Radio value={'nam'}> Nam </Radio>
                <Radio value={'nu'}> Nữ</Radio>
                <Radio value={'khong_xac_dinh'}> Không xác định</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              name="bang_luong"
              label="Bảng lương"

              rules={[{ required: true, message: getMessage('required', 'Bảng lương') }]}
            >
              <Input placeholder="Bảng lương" />
            </Form.Item>
          </Col> */}

          <Col span={12}>
            <Form.Item
              name="ten_chuc_danh"
              label="Chức danh"
              rules={[
                {
                  required: false,
                  message: getMessage('required', 'Chức danh'),
                },
              ]}
            >
              <Input placeholder="Chức danh" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hsl"
              label="Hệ số lương"
              labelCol={{ span: 7 }}
              labelAlign="left"
              initialValue={0}
              rules={[
                {
                  required: false,
                  message: getMessage('required', 'Hệ số lương'),
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Hệ số lương"
                controls={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ngay_sinh"
              label="Ngày sinh"
              rules={[
                {
                  required: false,
                  message: getMessage('required', 'Ngày sinh'),
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                placeholder="Ngày sinh"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_bo_phan"
              label="Phòng ban"
              labelCol={{ span: 7 }}
              initialValue={''}
              labelAlign="left"
            >
              <Select
                showSearch={true}
                filterOption={filterOption}
                style={{ width: '100%' }}
                placeholder="Chọn phòng ban"
                options={phongbanOption as any}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trang_thai"
              initialValue={'hoat_dong'}
              label="Trạng thái"
              style={{ marginBottom: 0 }}
              required={true}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="Trạng thái"
                options={[
                  {
                    value: 'hoat_dong',
                    label: 'Hoạt động',
                  },
                  {
                    value: 'khong_hoat_dong',
                    label: 'Không hoạt động',
                  },
                ]}
              ></Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="id_chuc_danh"
              label="Chức danh làm lương"
              initialValue={''}
              style={{ marginBottom: 0 }}
            >
              <Select
                showSearch={true}
                filterOption={filterOption}
                style={{ width: '100%' }}
                placeholder="Chọn chức danh"
                options={chucDanhOption as any}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          hidden={true}
          name="cho_phep_dang_nhap"
          valuePropName="checked"
          labelCol={{ span: 7 }}
          labelAlign="left"
          initialValue={false}
          style={{ marginBottom: 0 }}
        >
          <Checkbox value={false}>Cho phép đăng nhập</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Create
