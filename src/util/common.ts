import messages from '@/message'

const IMAGE_PATH = process.env.NODE_ENV === 'production' ? 'icons' : '/icons'
const LIMIT_INIT = 10
const FORMAT_DATE_BE = 'YYYY-MM-DD'


const LOAI_PHAN_CA = ['ca_nhan', 'nhom'] as const

const getMessage = (id: string, ...params: Array<any>): string => {
  const message = messages[id] || id
  const result = message.replace(/\{(\d+)\}/g, (_match: any, index: any) => params[index])
  return result
}


const convertEmptyToNull = (item: any): any => {
  const obj = { ...item }
  const keys = obj && Object.keys(obj)
  if (keys) {
    for (const key of keys) {
      const value = obj[key]
      if (typeof value === 'string' && value.trim() === '') {
        obj[key] = null
      }
    }
  }
  return obj
}

const removeNull = (item: any): any => {
  const obj = { ...item }
  const keys = obj && Object.keys(obj)
  if (keys) {
    for (const key of keys) {
      const value = obj[key]
      if (typeof value === 'string' && value.trim() === '') {
        obj[key] = ''
      }
    }
  }
  return obj
}

//Dùng để clear null cho bộ lọc tìm kiếm
const removeNullFilter = (obj: any) => {
  return Object.keys(obj as any)
    .filter((key, index) => obj[key] != null)
    .reduce((acc, key) => {
      return { ...acc, [key]: obj[key] }
    }, {} as any)
}

const debounce = (timeOutId: any, milliseconds: number, fc: Function) => {
  timeOutId && clearTimeout(timeOutId)
  return setTimeout(() => {
    fc()
  }, milliseconds)
}

const createUniqueKey = () => {
  return Math.floor(Math.random() * (1000 - 1 + 1)) + 1
}


const regexGetNumber = (num: string | number): string => {
  if (num == 0) return '0'
  if (!num) return ''
  return String(num).replace(/[^0-9.]/g, '')
}

const getLoaiPhanCa = (key: (typeof LOAI_PHAN_CA)[number]) => {
  if (LOAI_PHAN_CA.includes(key) == false) throw new Error('Không tìm thấy loại phân ca')
  return key
}

const renderCurrency = (num: any) => {
  num = String(num).replace(/[^0-9.]/g, '')
  if (isNaN(Number(num)) == true) return 0
  return Number(num).toLocaleString('en-US')
}



export {
  IMAGE_PATH,
  LIMIT_INIT,
  FORMAT_DATE_BE,
  getLoaiPhanCa,
  getMessage,
  convertEmptyToNull,
  removeNull,
  removeNullFilter,
  debounce,
  createUniqueKey,
  regexGetNumber,
  renderCurrency,
}
