import { useRef, useState, useEffect, useContext } from 'react'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import allLocales from '@fullcalendar/core/locales-all'

import ModalForm from './ModalForm'
import TimeKeepingContext from './components/Context'
import { type a1, type a3 } from '@fullcalendar/core/internal-common'
// import { type aE } from '@fullcalendar/core/internal-common'

import * as ApiPhanCa from '@/services/phanCa.service'
import * as ApiChamCong from '@/services/chamCong.service'
import dayjs from 'dayjs'

type EventClickArgs = a1
type DateSelectArg = a3
// type EventDef = aE

const resourceAreaColumns = [{ field: 'name', headerContent: 'Tên nhân viên' }]

// const createEventCalendar = (data: Partial<EventDef & { id: number }>): Partial<EventDef> => {
//   return data
// }

const Calendar = () => {
  const context = useContext(TimeKeepingContext)
  const calendar = useRef<FullCalendar>(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const [resources, setResource] = useState<Array<any>>([])
  const [eventsData, setEventData] = useState<Array<any>>([])
  const kyHieuData = context.kyHieuData
  const [eventSelected, setEventSelected] = useState<EventClickArgs>()

  //Xử lý khi click vào event trên calendar
  const eventClick = (info: EventClickArgs) => {
    setVisibleModal(true)
    setEventSelected(info)
  }

  //Tìm ký hiệu
  function findKyHieu(id: number) {
    return kyHieuData.find((kyHieu: any) => {
      return kyHieu.id == id
    })
  }

  //Xử lý tạo event
  const onSelect = (selectionInfo: DateSelectArg) => {
    const startDay = selectionInfo.start as Date
    const endDay = selectionInfo.end as Date

    const kyHieu = findKyHieu(context.idKyHieu)

    const minusMilisecond = Math.abs(endDay.getTime() - startDay.getTime())
    const dayRange = minusMilisecond / (1000 * 60 * 60 * 24)

    //Nếu ngày lớn hơn 1 thì dừng không được tạo
    if (dayRange > 1 || !kyHieu) return

    const eventRegister = {
      resourceIds: [selectionInfo?.resource?.id],
      start: selectionInfo?.startStr,
      end: selectionInfo?.endStr,
      title: kyHieu.ky_hieu,
      idKyHieu: kyHieu.id,
      className: [
        'fc-event-title-container-center',
        'fc-event-title-container-pending',
      ],
    }

    setEventData([...eventsData, eventRegister])
  }

  function createDanhSachPhanCa() {
    const dayEndOfMonth = calendar.current?.getApi().view.currentEnd
    if (!dayEndOfMonth) return

    const payload = {
      tu_ngay: dayEndOfMonth?.toISOString(),
    } as any
    if (context.idPhongBan) payload['id_bo_phan'] = context.idPhongBan

    ApiPhanCa.danhSachDaPhanCa(payload).then((rs) => {
      const typeOfResources = rs.data?.map((item) => {
        return {
          id: item.id,
          name: item.ho_va_ten,
        }
      }) as any

      setResource([...typeOfResources])
    })
  }

  function createEvents() {
    const payload = {
      tu_ngay: dayjs(calendar?.current?.getApi().view.currentStart).format(
        FORMAT_VN_TIME,
      ),
      den_ngay: dayjs(calendar?.current?.getApi().view.currentEnd).format(
        FORMAT_VN_TIME,
      ),
    } as any

    if (context.idPhongBan) payload['id_bo_phan'] = context.idPhongBan

    ApiChamCong.getData(payload).then((rs) => {
      const prepareEvent: any = []
      if (!rs?.data) return

      for (const chamCong of rs?.data) {
        const kyHieu = findKyHieu(chamCong.id_ky_hieu)
        if (!kyHieu) continue
        prepareEvent.push({
          id: chamCong.id,
          resourceIds: [chamCong?.id_nhan_vien],
          start: chamCong?.ngay,
          title: kyHieu['ky_hieu'],
          className: ['fc-event-title-container-center'],
          //Kí hiệu nằm ngoài
          idCa: chamCong.id_ca,
          idKyHieu: chamCong.id_ky_hieu,
          gioVao: chamCong.gio_vao,
          gioVe: chamCong.gio_ve,
          ghiChu: chamCong.ghi_chu,
        })
      }
      /**
       * Vì khi ta chọn sự kiện thì chắc chắn nó sẻ được cập nhật/tạo
       * dựa vào yếu tố này nếu khi tạo/cập nhật xong thì ta sẻ có defId event cũ đó và remove nó ra
       */
      if (eventSelected) {
        let events = calendar.current?.getApi().getEvents() ?? []
        if (events) {
          const oldEvents = events.filter((event) => !event._def.publicId)
          events = oldEvents.filter(
            (event) => event._def.defId != eventSelected.event._def.defId,
          )
        }
        events.forEach((event) => {
          prepareEvent.push({
            defId: event._def.defId,
            resourceId: event._def.resourceIds,
            className: event._def.ui.classNames,
            title: event._def.title,
            publicId: event._def.publicId,
            start: event.startStr,
            end: event.endStr,
            ...event._def.extendedProps,
          })
        })
        setEventData([...prepareEvent])
      } else setEventData([...prepareEvent])
    })
  }

  function resetCalendar() {
    createEvents()
  }

  useEffect(() => {
    setEventSelected(null as any)
    createDanhSachPhanCa()
    createEvents()
  }, [context.idPhongBan])

  return (
    <>
      <FullCalendar
        ref={calendar}
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        editable={false}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
          timeGridPlugin,
        ]}
        selectable={context.cheDoHienThi}
        eventClick={eventClick}
        select={onSelect}
        headerToolbar={{ left: 'prev,next,today', center: 'title', right: '' }}
        locales={allLocales}
        locale={'vi'}
        weekends={true}
        buttonText={{
          day: 'Ngày',
          prev: 'Tháng trước',
          next: 'Tháng sau',
          month: 'Tháng',
          today: 'Tháng này',
          week: 'Tuần',
        }}
        initialView="timelineMyWeek"
        views={{
          timelineMyWeek: {
            type: 'resourceTimelineMonth',
            duration: { months: 1 },
            slotDuration: { days: 1 },
            slotLabelFormat: { day: 'numeric' },
          },
        }}
        resources={resources}
        resourceAreaColumns={resourceAreaColumns}
        events={eventsData}
        height={'80vh'}
      />
      <ModalForm
        resetCalendar={resetCalendar}
        setEvent={setEventData}
        accessor={[visibleModal, setVisibleModal]}
        eventSelected={eventSelected}
        calendar={calendar}
      ></ModalForm>
    </>
  )
}

export default Calendar
