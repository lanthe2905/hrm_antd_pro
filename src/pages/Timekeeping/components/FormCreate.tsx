import { useEffect } from 'react'

import { DatePicker, Form, Input, Select, TimePicker } from 'antd'
import { type a1 } from '@fullcalendar/core/internal-common'

import dayjs from 'dayjs'

type Prop = {
  caOption: Array<{ label: string; value: any }>
  eventSelected: EventClickArgs | undefined
  form: any
}
type EventClickArgs = a1

const FormCreate = ({ caOption, eventSelected, form }: Prop) => {
  useEffect(() => {
    setTimeout(() => {
      form.setFieldValue('ngay', dayjs(eventSelected?.event.start))
      form.setFieldValue('id_nhan_vien', eventSelected?.event.getResources()[0]['id'])
      form.setFieldValue('id_ky_hieu', eventSelected?.event._def.extendedProps['idKyHieu'])
      form.setFieldValue('co_gop', eventSelected?.event.end ? true : false)
    }, 200)
  }, [eventSelected])

  return (
    <>
      <Form.Item name={'id_ca'} label={'Chọn ca'} initialValue={null}>
        <Select options={caOption}></Select>
      </Form.Item>

      <Form.Item name={'ngay'} label={'Ngày'}>
        <DatePicker disabled={true} style={{ width: '100%' }} format={'DD-MM-YYYY'} />
      </Form.Item>

      <Form.Item name={'gio_vao'} label={'Giờ vào'}>
        <TimePicker format={'HH:mm'} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name={'gio_ve'} label={'Giờ về'}>
        <TimePicker format={'HH:mm'} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name={'co_gop'} label={'Ca đêm'} initialValue={false} hidden={true}>
        <Select
          options={[
            { value: true, label: 'Có' },
            { value: false, label: 'Không' },
          ]}
        ></Select>
      </Form.Item>

      <Form.Item name={'ghi_chu'} label={'Ghi chú'}>
        <Input></Input>
      </Form.Item>

      <Form.Item name={'id_nhan_vien'} label={'Mã nhân viên'} hidden={true}>
        <Input></Input>
      </Form.Item>

      <Form.Item name={'id_ky_hieu'} label={'Mã ký hiệu'} hidden={true}>
        <Input></Input>
      </Form.Item>
    </>
  )
}

export default FormCreate
