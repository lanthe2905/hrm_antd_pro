import { createContext } from 'react'
import * as KyHieuType from '~/type/kyHieu.type'

type Values = {
  idPhongBan: number | null
  idKyHieu: number // Thằng này là id ký hiệu
  cheDoHienThi: boolean
  kyHieuData: Array<KyHieuType.Dropdown>
}
const TimeKeppingContext = createContext({} as Values)

export default TimeKeppingContext
