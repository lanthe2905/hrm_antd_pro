import { useEffect } from 'react'

import { DatePicker, Form, Input, Select, TimePicker, message } from 'antd'
import { type a1 } from '@fullcalendar/core/internal-common'

import dayjs from 'dayjs'
import { formatTime } from '@/util/date'

type Prop = {
  caOption: Array<{ label: string; value: any }>
  eventSelected: EventClickArgs | undefined
  form: any
  setVisibleModal: Function
}
type EventClickArgs = a1
const FormUpdate = ({
  caOption,
  eventSelected,
  form,
  setVisibleModal,
}: Prop) => {
  useEffect(() => {
    if (!eventSelected?.event._def.publicId) {
      message.error('Không thể xem form này')
      setVisibleModal(false)
    } else {
      const extendedProps = eventSelected.event._def.extendedProps
      form.setFieldValue('id', eventSelected?.event._def.publicId)
      form.setFieldValue('id_ca', extendedProps['idCa'])
      form.setFieldValue('ngay', dayjs(eventSelected?.event.start))
      form.setFieldValue(
        'gio_vao',
        extendedProps['gioVao']
          ? dayjs(formatTime(extendedProps['gioVao']))
          : null,
      )
      form.setFieldValue(
        'gio_ve',
        extendedProps['gioVe']
          ? dayjs(formatTime(extendedProps['gioVe']))
          : null,
      )
      form.setFieldValue(
        'id_nhan_vien',
        eventSelected?.event.getResources()[0]['id'],
      )
      form.setFieldValue(
        'id_ky_hieu',
        eventSelected?.event._def.extendedProps['idKyHieu'],
      )
      form.setFieldValue('co_gop', eventSelected?.event.end ? true : false)
      form.setFieldValue(
        'ghi_chu',
        eventSelected.event._def.extendedProps['ghiChu'],
      )
    }
  }, [eventSelected])

  return (
    <>
      <Form.Item name={'id'} label={'Mã phân ca'} hidden={true}>
        <Input></Input>
      </Form.Item>

      <Form.Item name={'id_ca'} label={'Chọn ca'} initialValue={null}>
        <Select options={caOption}></Select>
      </Form.Item>

      <Form.Item name={'ngay'} label={'Ngày'}>
        <DatePicker
          disabled={true}
          style={{ width: '100%' }}
          format={'DD-MM-YYYY'}
        />
      </Form.Item>

      <Form.Item name={'gio_vao'} label={'Giờ vào'}>
        <TimePicker format={'HH:mm'} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name={'gio_ve'} label={'Giờ về'}>
        <TimePicker format={'HH:mm'} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name={'co_gop'}
        label={'Ca đêm'}
        initialValue={false}
        hidden={true}
      >
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

export default FormUpdate
