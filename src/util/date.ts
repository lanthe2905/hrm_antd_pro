const addDays = function (current: Date, days: number) {
  current.setDate(current.getDate() + days)
  return current
}

const tinhKhoangCachNgay = (ngayBatDau: Date, ngayKetThuc: Date): number => {
  // Lấy hiệu của hai ngày
  const khoangCachMilliseconds = ngayKetThuc.getTime() - ngayBatDau.getTime()

  // Chuyển đổi khoảng cách từ milliseconds sang days
  const khoangCachNgay = khoangCachMilliseconds / (1000 * 60 * 60 * 24)

  return khoangCachNgay
}

/**
 *
 * @param date is string
 * @description date will format to YYYY-MM-DD
 */
const formatDate = (date: string) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

/**
 *
 * @param date is string format HH:mm:ss
 * @returns Date object
 */
const formatTime = (hourString: string) => {
  const d = new Date(),
    hour = hourString.split(':')[0],
    minute = hourString.split(':')[1],
    second = hourString.split(':')[2]

  return d.setHours(Number(hour), Number(minute), Number(second))
}

export { addDays, tinhKhoangCachNgay, formatDate, formatTime }
