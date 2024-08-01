import { SetStateAction, Dispatch, useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMessage, renderCurrency, regexGetNumber } from '@/util/common'
import { Form, message, Input} from 'antd'

import { handleApiError } from '@/util/handleError'
import { AssetsRequest, GroupAssetsRequest } from '@/models/assets.model'
import { updateAssets } from '@/services/assets.service'

import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

type CreateJobTitleProps = {
  accessor: [boolean, Dispatch<SetStateAction<boolean>>]
  resetTable: Function
  taiSanList : GroupAssetsRequest[]
  item: [AssetsRequest, any]
}

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

const EditModal = ({ accessor, resetTable, taiSanList, item }: CreateJobTitleProps) => {
  const [openDialog, setOpenDialog] = accessor
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [asset] = item

  const TaiSanOption = useMemo(() => {
    const option = [{ value: '', label: 'Vui lòng chọn' }]

    taiSanList.forEach((item) =>
      option.push({ value: item.id as any, label: item.ten }),
    )

    return option
  }, [taiSanList])

  const onFinish = async (value: AssetsRequest) => {
    try {
      setLoading(true)
      const rs = await updateAssets(value)
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
  }, [form.setFieldsValue(asset)])

  return (
    <>
      <ModalForm
        title="Chỉnh sửa tài sản"
        form={form}
        open={openDialog}
        onFinish={onFinish}
        onOpenChange={setOpenDialog}
      >
        <Form.Item name="id" hidden={true} initialValue={asset.id}>
          <Input value={form.getFieldValue('id')} />
        </Form.Item>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="ma_tai_san"
            label="Mã tài sản"
            tooltip="Tối đa 50 kí tự"
            placeholder="Nhập mã tài sản..."
            rules={[{ required: true, message: getMessage('required', 'Mã tài sản') }]}
          />

          <ProFormText
            width="md"
            name="don_gia"
            label="Đơn giá"
            placeholder="Nhập đơn giá..."
            rules={[{ required: true, message: getMessage('required', 'Đơn giá') }]}
            fieldProps={{
              onChange: (e)=>{
                form.setFieldValue('don_gia', renderCurrency(e.target.value))
              }
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="ten"
            label="Tên tài sản"
            tooltip="Tối đa 255 kí tự và không được trùng lặp"
            placeholder="Nhập tên tài sản..."
            rules={[{ required: true, message: getMessage('required', 'Tên tài sản') }]}
            fieldProps={{
              maxLength: 255
            }}
          />
          <ProFormDatePicker
            name="ngay_mua"
            label="Ngày mua"
            width="md"
            placeholder="Chọn ngày mua"
            rules={[{ required: true, message: getMessage('required', 'Ngày mua') }]}
            fieldProps={{
              format: 'DD/MM/YYYY',
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            options={TaiSanOption}
            name="id_nhom_tai_san"
            label="Nhóm tài sản"
            placeholder="Chọn nhóm tài sản"
            rules={[{ required: true, message: getMessage('required', 'Nhóm tài sản') }]}
          />
          <ProFormText
            width="md"
            name="so_luong"
            label="Số lượng"
            placeholder="Nhập số lượng..."
            rules={[{ required: true, message: getMessage('required', 'Số lượng') }]}
            fieldProps={{
              onChange: (e)=>{
                form.setFieldValue('so_luong', renderCurrency(e.target.value))
              }
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="don_vi"
            label="Đơn vị"
            tooltip="Tối đa 50 kí tự"
            placeholder="Nhập tên..."
            rules={[{ required: true, message: getMessage('required', 'Đơn vị') }]}
            fieldProps={{
              maxLength: 50
            }}
          />
          <ProFormText 
            width="md"
            name="nha_cung_cap"
            label="Nhà cung cấp"
            tooltip="Tối đa 1000 kí tự"
            placeholder="Nhập vào nhà cung cấp..."
            rules={[{ required: true, message: getMessage('required', 'Nhà cung cấp') }]}
            fieldProps={{
              maxLength: 1000
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="bao_hanh"
            label="Bảo hành"
            width="md"
            tooltip="Tối đa 255 kí tự"
            placeholder="Nhập chính sách bảo hành..."
            rules={[{ required: true, message: getMessage('required', 'Bảo hành') }]}
            fieldProps={{
              maxLength: 255
            }}
          />
        </ProForm.Group>
        
      </ModalForm>
    </>
  )
}

export default EditModal
