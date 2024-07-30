import { ProFormSelect } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'
import { KHOI_LL } from '@/util/constant'

type Props = {
  handleSelect?: (e: any) => void
  onChange?: (count: number | string) => void
  style?: React.CSSProperties
  value?: any
  skipMeaninglessValue?: boolean
  name?: string
  exceps?: any[] //Loải bỏ giá trị mong muôn
}

const KhoiLamLuongOptions = (props: Props) => {
  const [data, setData] = useState<any>()
  const {
    handleSelect,
    onChange,
    style,
    value,
    skipMeaninglessValue = false,
    exceps,
    name,
  } = props
  useEffect(() => {
    const option = []
    if (skipMeaninglessValue == false) {
      option.push({
        value: '',
        label: 'Chọn Khối LL',
      })
    }

    option.push(...KHOI_LL.filter((item) => !exceps?.includes(item.value)))
    setData(option)
  }, [])

  function defaultOnChange(value: number | string) {
    if (onChange) onChange(value)
  }

  return (
    <ProFormSelect
      style={{
        minWidth: '40%',
        ...style,
      }}
      name={name}
      showSearch
      initialValue={value ?? ''}
      placeholder={'Chọn Khối LL'}
      onChange={(val: number | string) => {
        if (handleSelect) handleSelect(val)
        else defaultOnChange(val)
      }}
      options={data}
    />
  )
}

export default KhoiLamLuongOptions
