import { Luong } from '@/models/luong.model'
import { useEffect, useState } from 'react'

const useHeaderTitle = (luongs: Luong[]) => {
  const [kdc, setKdc] = useState<number>(0)
  const [luongToiThieu, setLuongToiThieu] = useState<number>(0)
  const [quyLuong, setQuyLuong] = useState<number>(0)

  useEffect(() => {
    setKdc(luongs[0]?.kdc ?? 0)
    setLuongToiThieu(luongs[0]?.luong_toi_thieu ?? 0)
    setQuyLuong(luongs[0]?.quy_luong ?? 0)
  }, [luongs])
  return [kdc, luongToiThieu, quyLuong]
}

export default useHeaderTitle
