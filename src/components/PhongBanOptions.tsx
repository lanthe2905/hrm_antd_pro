import { PhongBan } from '@/models/phongBan.model'
import { dropdown } from '@/services/phongBan.service'
import { ProFormSelect } from '@ant-design/pro-form'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

type SchoolFormFieldProps = {
  name?: string
  required?: boolean
  disabled?: boolean
  label?: string
  form?: any
  onChange?: (value: any) => void
  byData?: PhongBan[]
}
const PhongBanField: FC<SchoolFormFieldProps> = (props) => {
  const { name, onChange, disabled, form, byData = [], label } = props
  const [phongBanOptions, setPhongBanOptions] = useState<any[]>([
    {
      value: '',
      label: 'Tất cả',
    },
  ])
  useEffect(() => {
    const fetchPhongBan = async () => {
      try {
        if (byData.length > 0) {
          const option = byData.map((item: PhongBan) => {
            return {
              value: item.id,
              label: item.ma_bp + ' - ' + item.ten,
            }
          })
          console.log(option)
          setPhongBanOptions([...phongBanOptions, ...option])
        } else {
          const response = await dropdown({}, {})
          if (response && response.data) {
            const option = response.data.map((item) => {
              return {
                value: item.id,
                label: item.ma_bp + ' - ' + item.ten,
              }
            })
            setPhongBanOptions([...phongBanOptions, ...option])
          }
        }
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:27 ~ fetchPhongBan ~ error', error)
      }
    }
    fetchPhongBan()
  }, [])

  return (
    <ProFormSelect
      name={name}
      label={label ?? ''}
      disabled={disabled}
      allowClear={false}
      options={phongBanOptions}
      fieldProps={{
        onChange: (value) => {
          if (onChange) {
            flushSync(() => {
              onChange(value)
            })
            form.submit()
          }
        },
      }}
      placeholder={'Chọn phòng ban'}
    />
  )
}
export default PhongBanField
