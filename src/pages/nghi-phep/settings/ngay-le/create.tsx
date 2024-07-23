import { getMessage, regexGetNumber, renderCurrency } from '@/util/common'
import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProFormDatePicker,
  ProFormGroup,
  ProFormText,
} from '@ant-design/pro-components'
import { RouteContext, RouteContextType } from '@ant-design/pro-components'

import { Button, Form, message } from 'antd'
import { create } from '@/services/ngayle.services'
import { handleApiError } from '@/util/handleError'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

type FormType = {
  loai_ngay_phep: any
  hs: any
  so_ngay_trong_nam: any
}
export default (props: any) => {
  const { reload } = props
  const [form] = Form.useForm<FormType>()

  return (
    <RouteContext.Consumer key={'ngay_le'}>
      {({ isMobile }: RouteContextType) => {
        return (
          <ModalForm<FormType>
            title="Tạo ngày lễ"
            trigger={
              <Button type="primary">
                <PlusOutlined />
                Tạo mới
              </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
            }}
            submitTimeout={4000}
            onFinish={async (values) => {
              await waitTime(100)
              try {
                values.so_ngay_trong_nam = regexGetNumber(
                  values.so_ngay_trong_nam,
                )
                values.hs = regexGetNumber(values.hs)
                await create(values)
                message.success('Tạo loại ngày lễ thành công')
                reload()
                return true
              } catch (error) {
                handleApiError(error, form, null)
                return false
              }
            }}
          >
            <ProFormGroup>
              <ProFormText
                name="ten"
                label="Tiêu đề"
                width={isMobile ? 'lg' : 'md'}
                rules={[
                  {
                    required: true,
                    message: getMessage('required', 'Tiêu đề'),
                  },
                ]}
              ></ProFormText>

              <ProFormText
                name="hs_cong"
                label="Hệ số công"
                width={isMobile ? 'lg' : 'md'}
                rules={[
                  {
                    required: true,
                    message: getMessage('required', 'Hệ số công'),
                  },
                ]}
                fieldProps={{
                  onBlur: (e) => {
                    form.setFieldValue(
                      'hs_cong',
                      renderCurrency(e.target.value),
                    )
                  },
                }}
              ></ProFormText>
            </ProFormGroup>

            <ProFormGroup>
              <ProFormDatePicker
                fieldProps={{
                  format: 'DD-MM',
                }}
                name="ngay_bat_dau"
                label="Ngày bắt đầu"
                width={isMobile ? 'lg' : 'md'}
                rules={[
                  {
                    required: true,
                    message: getMessage('required', 'Ngày bắt đầu'),
                  },
                ]}
              ></ProFormDatePicker>

              <ProFormDatePicker
                fieldProps={{
                  format: 'DD-MM',
                }}
                name="ngay_ket_thuc"
                label="Ngày kết thúc"
                dependencies={['ngay_bat_dau']}
                width={isMobile ? 'lg' : 'md'}
                rules={[
                  {
                    required: true,
                    message: getMessage('required', 'Ngày kết thúc'),
                  },
                  {
                    validator: (rule, value) => {
                      if (value < form.getFieldValue('ngay_bat_dau')) {
                        return Promise.reject(
                          'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
                        )
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              ></ProFormDatePicker>
            </ProFormGroup>

            <ProFormGroup>
              <ProFormText
                name="hs_cong_di_lam"
                label="Hệ số công đi làm"
                width={isMobile ? 'lg' : 'md'}
                fieldProps={{
                  onBlur: (e) => {
                    form.setFieldValue(
                      'hs_cong_di_lam',
                      renderCurrency(e.target.value),
                    )
                  },
                }}
              ></ProFormText>

              <ProFormText
                name="chu_thich"
                label="Chú thích"
                width={isMobile ? 'lg' : 'md'}
                style={{ marginBottom: 0 }}
              ></ProFormText>
            </ProFormGroup>
          </ModalForm>
        )
      }}
    </RouteContext.Consumer>
  )
}
