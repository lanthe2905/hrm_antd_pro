import { Button, Form, Input, message, Typography } from 'antd'
import {
  ModalForm,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components'
import { createLuongBTC } from '@/services/luong.service'
import { handleApiError } from '@/util/handleError'
import { getMessage, regexGetNumber, renderCurrency } from '@/util/common'
import useCaiDat from '@/pages/luong/hooks/useCaiDat'
import dayjs from 'dayjs'
const { Title } = Typography

type Props = {
  resetTable: Function
}

function Create(props: Props) {
  const { resetTable } = props
  const caiDat = useCaiDat()
  const [form] = Form.useForm()
  const quyLuong = Form.useWatch('quy_luong', form)
  const formatDate = 'MM/YYYY'
  const isFormValid = () => {
    const states = form.getFieldsError()
    if (states.find((state) => state.errors.length > 0)) return false
    return true
  }

  const onFinish = async () => {
    try {
      const data = form.getFieldsValue()
      if (isFormValid()) {
        data['thang'] = form
          .getFieldValue('thang')
          .format(formatDate)
          .toString()
        data['quy_luong'] = regexGetNumber(data?.quy_luong ?? 0)
        data['luong_toi_thieu'] = regexGetNumber(data?.luong_toi_thieu ?? 0)

        const rs = await createLuongBTC(data)
        message.success(rs.message ?? '')
        form.resetFields()
        resetTable()
      }
      return true
    } catch (error) {
      handleApiError(error, form, null)
      return false
    }
  }

  return (
    <>
      <ModalForm
        trigger={<Button type="primary">Tạo bảng lương</Button>}
        title={
          <>
            <Title level={4}> Tạo bảng lương </Title>
            <span> Khối GT-BT - Quỹ lương : {quyLuong}</span>
          </>
        }
        form={form}
        onFinish={onFinish}
        width={'80vw'}
      >
        <ProFormDatePicker
          label="Thời gian"
          name={'thang'}
          initialValue={dayjs()}
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Thời gian'),
            },
          ]}
          fieldProps={{
            picker: 'month',
            format: formatDate,
            style: { width: '100%' },
          }}
          labelAlign="left"
        ></ProFormDatePicker>

        <ProFormText
          label="Quỹ lương"
          labelCol={{ span: 6 }}
          name={'quy_luong'}
          rules={[
            {
              required: true,
              message: getMessage('required', 'TQuỹ lương'),
            },
          ]}
          fieldProps={{
            onBlur: (e) => {
              form.setFieldValue(
                'quy_luong',
                renderCurrency(e.currentTarget.value) + '',
              )
            },
          }}
          labelAlign="left"
        ></ProFormText>

        <ProFormText
          name={'luong_toi_thieu'}
          label="Lương tối thiểu"
          labelCol={{ span: 6 }}
          initialValue={renderCurrency(caiDat?.luong?.luong_toi_thieu ?? 0)}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Lương tối thiểu'),
            },
          ]}
          fieldProps={{
            onBlur: (e) => {
              form.setFieldValue(
                'luong_toi_thieu',
                renderCurrency(e.target.value) + '',
              )
            },
          }}
          labelAlign="left"
        ></ProFormText>

        <ProFormText
          name={'kdc'}
          label="Hệ số điều chỉnh"
          initialValue={caiDat?.luong?.btc.kdc ?? 0}
          rules={[
            {
              required: true,
              message: getMessage('required', 'Hệ số điều chỉnh'),
            },
          ]}
          labelCol={{ span: 6 }}
          labelAlign="left"
          style={{ marginBottom: 0 }}
          fieldProps={{
            type: 'number',
          }}
        ></ProFormText>
      </ModalForm>
    </>
  )
}

export default Create
