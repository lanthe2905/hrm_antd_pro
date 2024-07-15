type Message = {
  [key: string]: string
}

const messages: Message = {
  login_fail: 'Đăng nhập không thành công',
  authority: 'Chưa được xác thực',
  errorDetails: 'error is not Null',
  rangeError: '{0} khoảng {1} ~ {2} không được để trống',
  min: '{0} ít nhất {1} kí tự',
  max: '{0} nhiều nhất {1} kí tự',
  required: '{0} Không được để trống ',
}

export default messages
