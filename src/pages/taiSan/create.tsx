import { SetStateAction, Dispatch, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMessage, renderCurrency, regexGetNumber } from '@/util/common'
import { Form, message} from 'antd'

import { handleApiError } from '@/util/handleError'
import { AssetsRequest, GroupAssetsRequest } from '@/models/assets.model'
import { createAssets } from '@/services/assets.service'

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
}

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

const Create = ({ accessor, resetTable, taiSanList }: CreateJobTitleProps) => {
  const [openDialog, setOpenDialog] = accessor
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const TaiSanOption = useMemo(() => {
    const option = [{ value: '', label: 'Vui lòng chọn' }]

    taiSanList.forEach((item) =>
      option.push({ value: item.id as any, label: item.ten }),
    )

    return option
  }, [taiSanList])

  const onFinish = async (value: AssetsRequest) => {
    try {
      value['don_gia'] = Number(regexGetNumber(value['don_gia']))
      value['so_luong'] = Number(regexGetNumber(value['so_luong']))
      const rs = await createAssets({ params: value })
      message.success(rs?.message)
      setOpenDialog(false)
      form.resetFields()
      resetTable()
      return true
    } catch (error) {
      handleApiError(error, form, null)
      return false
    }
  }

  return (
    <>
      <ModalForm
        title="Thêm tài sản"
        form={form}
        open={openDialog}
        onFinish={onFinish}
        onOpenChange={setOpenDialog}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="ma_tai_san"
            label="Mã tài sản"
            tooltip="Tối đa 50 kí tự"
            placeholder="Nhập mã tài sản..."
            rules={[
              { required: true, message: getMessage('required', 'Mã tài sản') },
              { max: 50, message: 'Mã tài sản không được quá 50 ký tự' }
            ]}
          />

          <ProFormText
            width="md"
            name="don_gia"
            label="Đơn giá"
            placeholder="Nhập đơn giá..."
            rules={[{ required: true, message: getMessage('required', 'Đơn giá') }]}
            fieldProps={{
              onBlur: (e)=>{
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
            rules={[
              { required: true, message: getMessage('required', 'Tên tài sản') },
              { max: 255, message: 'Tên tài sản không được quá 255 ký tự' }
            ]}
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
              onBlur: (e)=>{
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
            placeholder="Nhập đơn vị..."
            rules={[
              { required: true, message: getMessage('required', 'Đơn vị') },
              { max: 50, message: 'Đơn vị không được quá 50 ký tự' }
            ]}
          />
          <ProFormText 
            width="md"
            name="nha_cung_cap"
            label="Nhà cung cấp"
            tooltip="Tối đa 1000 kí tự"
            placeholder="Nhập vào nhà cung cấp..."
            rules={[
              { required: true, message: getMessage('required', 'Nhà cung cấp') },
              { max: 1000, message: 'Cấp phát không được quá 1000 ký tự' }
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="bao_hanh"
            label="Bảo hành"
            width="md"
            tooltip="Tối đa 255 kí tự"
            placeholder="Nhập chính sách bảo hành..."
            rules={[
              { required: true, message: getMessage('required', 'Bảo hành') },
              { max: 255, message: 'Bảo hành không được quá 255 ký tự' }
            ]}
          />
        </ProForm.Group>
        
      </ModalForm>
    </>
  )
}

export default Create
