import { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Typography,
} from 'antd'
import { createLuongGTBT } from '@/services/luong.service'
import { handleApiError } from '@/util/handleError'
import * as caiDatApi from '@/models/caiDatApi'
import { getMessage, renderCurrency } from '~/util/common'
import { CaiDat } from '~/type/caiDat.type'
import dayjs from 'dayjs'
const { Title } = Typography

function Create({ resetView }: { resetView: Function }) {
  const [visibleModal, setVisibleModal] = useState(false)
  const [caiDat, setCaiDat] = useState<CaiDat>()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const quyLuong = Form.useWatch('quy_luong', form)
  const formatDate = 'MM/YYYY'

  const showModal = () => {
    setVisibleModal(true)
  }

  const isFormValid = () => {
    const states = form.getFieldsError()
    if (states.find((state) => state.errors.length > 0)) return false
    return true
  }

  const onFinish = async () => {
    try {
      const data = form.getFieldsValue()
      if (isFormValid()) {
        setVisibleModal(true)
        data['thang'] = form
          .getFieldValue('thang')
          .format(formatDate)
          .toString()
        data['quy_luong'] = data['quy_luong']?.replace(/\D/g, '') ?? 0
        data['luong_toi_thieu'] =
          data['luong_toi_thieu']?.replace(/\D/g, '') ?? 0
        const rs = await createLuongGTBT(data)
        message.success(rs.message ?? '')
        setVisibleModal(false)
        resetView()
      }
    } catch (error) {
      handleApiError(error, form, null)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setVisibleModal(false)
  }

  const removeErrorValidate = (name: string) => {
    form.setFields([
      {
        name: name,
      },
    ])
  }

  useEffect(() => {
    caiDatApi
      .getDetail()
      .then((rs) => {
        setCaiDat(rs.data as any)
        form.resetFields()
      })
      .catch((err) => {
        handleApiError(err, null, null)
      })
  }, [])

  useEffect(() => {
    if (visibleModal == false) {
      form.resetFields()
    }
  }, [visibleModal])

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Tạo bảng lương
      </Button>

      <Modal
        title={
          <>
            <Title level={4}> Tạo bảng lương </Title>
            <span> Khối GT-BT - Quỹ lương : {quyLuong}</span>
          </>
        }
        open={visibleModal}
        forceRender={false}
        onCancel={handleCancel}
        onOk={(e) => form.submit()}
        width={600}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form form={form} onFinish={(e) => onFinish()} name="create_gtbt_form">
          <Form.Item
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
            labelAlign="left"
          >
            <DatePicker
              picker="month"
              style={{ width: '100%' }}
              format={formatDate}
              onChange={(e) => {
                removeErrorValidate('thang')
              }}
            />
          </Form.Item>

          <Form.Item
            label="Quỹ lương"
            labelCol={{ span: 6 }}
            name={'quy_luong'}
            rules={[
              {
                required: true,
                message: getMessage('required', 'TQuỹ lương'),
              },
            ]}
            labelAlign="left"
          >
            <Input
              type="text"
              onBlur={(e) => {
                form.setFieldValue(
                  'quy_luong',
                  renderCurrency(e.currentTarget.value) + '',
                )
              }}
              onChange={(e) => {
                removeErrorValidate('quy_luong')
              }}
            />
          </Form.Item>

          <Form.Item
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
            labelAlign="left"
          >
            <Input
              type="text"
              onBlur={(e) => {
                form.setFieldValue(
                  'luong_toi_thieu',
                  renderCurrency(e.target.value) + '',
                )
              }}
            />
          </Form.Item>

          <Form.Item
            name={'kdc'}
            label="Hệ số điều chỉnh"
            initialValue={caiDat?.luong?.gt_bt.kdc ?? 0}
            rules={[
              {
                required: true,
                message: getMessage('required', 'Hệ số điều chỉnh'),
              },
            ]}
            labelCol={{ span: 6 }}
            labelAlign="left"
            style={{ marginBottom: 0 }}
          >
            <Input
              type="number"
              onChange={(e) => {
                removeErrorValidate('kdc')
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Create
