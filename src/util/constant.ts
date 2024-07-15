const constant = {
  user: 'user',
  title_validate: 'Lỗi đầu vào',
  system_error: 'Lỗi hệ thống!',
  validation_error: 'Thông tin không hợp lệ',
  system_error_label: 'Lỗi',
  authority_label: 'Thiếu quyền',
  del_confirm_title: 'Xác nhận xoá',
  register_title: 'Đăng ký',
  update_title: 'Cập nhật',
  filter_title: 'Lọc',
  delete_title: 'Xoá',
  backend_error: 'Không kết nối được máy chủ',
  server_error: "Lỗi phía máy chủ",
  number_required: 'Yêu cầu nhập số',
}

const KHOI_LL = [
  { value: 'GT-BT', label: 'Khối Gián tiếp bổ trợ' },
  { value: 'BTC', label: 'Khối bổ trợ ca' },
  { value: 'LM', label: 'Khối Lái Máy' },
  { value: 'SC', label: 'Khối sửa chữa' },
]
const HINH_THUC_LAM_VIEC = [
  { value: 'thu_viec', label: 'Thử việc' },
  { value: 'toan_thoi_gian', label: 'Toàn thời gian' },
]


export { constant, KHOI_LL, HINH_THUC_LAM_VIEC }
