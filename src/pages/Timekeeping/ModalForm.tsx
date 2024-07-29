import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Form, Modal, message } from 'antd'

import FullCalendar from '@fullcalendar/react'

import { type a1 } from '@fullcalendar/core/internal-common'
import FormCreate from './components/FormCreate'
import FormUpdate from './components/FormUpdate'

import * as ApiUser from '@/services/user.service'
import * as ApiChamCong from '@/services/chamCong-v1.service'
import dayjs from 'dayjs'
import TimekeepingContext from './components/Context'
import { handleApiError } from '@/util/handleError'

type EventClickArgs = a1

type ModalFormProps = {
  resetCalendar: Function
  accessor: [boolean, any]
  setEvent: Function
  eventSelected: EventClickArgs | undefined
  calendar: React.RefObject<FullCalendar>
}

const ModalForm = ({
  accessor,
  eventSelected,
  calendar,
  setEvent,
  resetCalendar,
}: ModalFormProps) => {
  const context = useContext(TimekeepingContext)
  const navigate = useNavigate()
  const [visibleModal, setVisibleModal] = accessor
  const setEventData = setEvent
  const [form] = Form.useForm()
  const [formTitle, setFormTitle] = useState('')
  const [caOption, setCaOption] = useState<Array<any>>([])

  const createCaOption = () => {
    const ngayBatDau = eventSelected?.event.start?.toISOString()
    const ngayKetThuc = eventSelected?.event.end?.toISOString()
    const options: Array<{ label: string; value: any }> = [
      {
        label: 'Tuỳ chọn ca làm việc',
        value: null,
      },
    ]

    const payload = {
      id_nhan_vien: eventSelected?.event.getResources()[0]['id'] as string,
      ngay_ket_thuc: (ngayKetThuc ?? ngayBatDau) as string,
    }

    // ApiUser.shift(payload)
    //   .then((rs) => {
    //     const prepareOption = rs.data?.map((ca) => {
    //       return {
    //         value: ca.id,
    //         label: ca.ten,
    //       }
    //     }) as any

    //     setCaOption(options.concat(prepareOption))
    //   })
    //   .catch((e) => {
    //     message.error(e.message)
    //   })
  }

  const removeEvent = async (info: EventClickArgs) => {
    try {
      info.event._def.publicId &&
        (await ApiChamCong.remove({ id: info.event._def.publicId }))
      info.event.remove()
      const newEvents = calendar.current
        ?.getApi()
        .getEvents()
        .map((event) => {
          const result = {
            className: [
              'fc-event-title-container-center',
              'fc-event-title-container-pending',
            ],
            resourceIds: event._def.resourceIds,
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            id: event._def.publicId,
            //Kí hiệu nằm ngoài
            ...event._def.extendedProps,
          }
          event._def.publicId &&
            (result.className = ['fc-event-title-container-center'])

          return result
        })
      setEventData(newEvents as any)
      setVisibleModal(false)
    } catch (error) {
      handleApiError(error, null, navigate)
    }
  }

  /**
   * Xử lý sự kiện submit form
   * {1} Tạo chấm công
   * {2} Cập nhật chấm công
   */
  const onSubmitForm = async (values: any) => {
    try {
      const idChamCong = eventSelected?.event._def.publicId
      values['ngay'] = dayjs(form.getFieldValue('ngay')).format(FORMAT_VN_TIME)
      values['gio_vao'] = values['gio_vao']
        ? dayjs(values['gio_vao']).format('HH:mm:ss')
        : null
      values['gio_ve'] = values['gio_ve']
        ? dayjs(values['gio_ve']).format('HH:mm:ss')
        : null

      idChamCong
        ? await ApiChamCong.update(values)
        : await ApiChamCong.create(values)

      resetCalendar()
      setVisibleModal(false)
    } catch (error) {
      handleApiError(error, form, navigate)
    }
  }

  useEffect(() => {
    form.resetFields()
    const status = eventSelected?.event._def.publicId
    if (status == '') setFormTitle('Đăng ký ngày công')
    else if (status) setFormTitle('Cập nhật ngày công')

    visibleModal && createCaOption()
  }, [visibleModal])

  return (
    <>
      <Modal
        open={visibleModal}
        onCancel={(e) => setVisibleModal(false)}
        title={formTitle}
        footer={[
          <Button
            type="primary"
            danger
            key={'remove'}
            title="Xoá"
            disabled={!context.cheDoHienThi}
            onClick={(e) => removeEvent(eventSelected as EventClickArgs)}
          >
            Xoá
          </Button>,
          <Button
            type="primary"
            key={'ok'}
            title="Cập nhật"
            disabled={!context.cheDoHienThi}
            htmlType="submit"
            form="modal_form"
          >
            {eventSelected?.event._def.extendedProps?.status == 'register'
              ? 'Tạo'
              : 'Cập nhật'}
          </Button>,
        ]}
      >
        <Form
          name="modal_form"
          form={form}
          onFinish={(values) => onSubmitForm(values)}
        >
          {!eventSelected?.event._def.publicId ? (
            <FormCreate
              eventSelected={eventSelected}
              form={form}
              caOption={caOption}
            />
          ) : (
            <FormUpdate
              caOption={caOption}
              form={form}
              eventSelected={eventSelected}
              setVisibleModal={setVisibleModal}
            />
          )}
        </Form>
      </Modal>
    </>
  )
}

export default ModalForm
