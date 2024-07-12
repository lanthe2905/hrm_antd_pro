import { message } from 'antd'
import { constant } from '@/util/constant'
/*
 * @param {err}
 * @param formRef nếu dùng Form state của antd thì truyền vào để xử lý lỗi valdiate
 * @param navigate là state của react-router-dom để chuyển hướng trang
 */

const handleApiError = (err: any, formRef: any, navigate: any) => {
  switch (err?.code) {
    case 'INVALID_TOKEN':
      navigate('/login', { replace: true })
      break

    case 'VALIDATION_FAILURE':
      // Xử lý lỗi validate của antd
      err.errors.forEach((validation: any) => {
        const [prefixField, index, field, ...child] =
          validation.field.split('.')

        if ((prefixField, index, field)) {
          // Nếu field có dạng prefixField[index].field.child
          formRef?.setFields([
            {
              name: [prefixField, Number(index), field, ...child],
              errors: [validation?.message],
            },
          ])
        } else if ((prefixField, index)) {
          // Nếu field có dạng prefixField.field/index
          formRef?.setFields([
            {
              name: [prefixField, index],
              errors: [validation?.message],
            },
          ])
        } else {
          formRef?.setFields([
            {
              name: validation.field,
              errors: [validation?.message],
            },
          ])
        }
      })
      message.error(constant.validation_error)
      break
    case 'INTERNAL_SERVER_ERROR':
      message.error(constant.server_error)
      break
    default:
      message.error(err?.message)
      break
  }
}

export { handleApiError }
