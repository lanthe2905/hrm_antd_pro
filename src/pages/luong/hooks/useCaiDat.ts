import { CaiDat } from '@/models/caiDat.model'
import { useEffect, useState } from 'react'
import { getDetail } from '@/services/caiDat.service'
import { handleApiError } from '@/util/handleError'

export default (): CaiDat | undefined => {
  const [value, setState] = useState<CaiDat>()
  useEffect(() => {
    getDetail()
      .then((rs) => {
        setState(rs.data as any)
      })
      .catch((err) => {
        handleApiError(err, null, null)
      })
  }, [])

  return value
}
