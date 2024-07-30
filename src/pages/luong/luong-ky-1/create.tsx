import { useReducer, useRef, useState, memo, useEffect, useMemo } from 'react'
import {
  Button,
  Form,
  Modal,
  Typography,
  Input,
  Row,
  Col,
  DatePicker,
  message,
} from 'antd'
import _ from 'lodash'
import FilterPhongBan from '@/components/PhongBanOptions'
import {
  debounce,
  getMessage,
  regexGetNumber,
  removeNullFilter,
  renderCurrency,
} from '@/util/common'
import { DeleteOutlined } from '@ant-design/icons'
import { handleApiError } from '@/util/handleError'
import dayjs from 'dayjs'
import * as api from '@/services/luongKy1.service'
import { User } from '@/models/user.model'
import { ProTable } from '@ant-design/pro-components'
const { Title } = Typography

type Props = {
  resetTable: Function
}

function Create({ resetTable }: Props) {
  const [visibleModal, setVisibleModal] = useState(false)
  const [userData, setUserData] = useState<User[]>([])
  const [submitLoad, setSubmitLoad] = useState(false)
  const [btnThem, setBtnThem] = useState({
    loading: false,
  })
  const [form] = Form.useForm()
  const subUsers = useRef<any>([])
  const timeoutID = useRef<any>()
  const formatDate = 'MM/YYYY'

  const [filter, dispatchFilter] = useReducer(
    (state: any, action: any) => {
      const curState: any = { ...state, ...action.payload }
      if (action.type === 'fetchData' && curState.id_bo_phan) {
        setBtnThem({ loading: true })
        timeoutID.current = debounce(timeoutID.current, 400, async () => {
          try {
            const payload = removeNullFilter({
              ...curState,
              thang_ung_tien: curState.thang_ung_tien
                .format(formatDate)
                .toString(),
            })
            const rs = await api.getUserWithLuong(payload)
            subUsers.current = rs.data
          } catch (err) {
            handleApiError(err, null, null)
          } finally {
            setBtnThem({ loading: false })
          }
        })
      }
      return curState
    },
    { search: '', id_bo_phan: null, thang_ung_tien: dayjs() },
  )

  useEffect(() => {
    if (visibleModal == true) {
      dispatchFilter({ type: 'fetchData' })
    }
  }, [visibleModal])

  const showModal = () => {
    setVisibleModal(true)
  }

  const handleCancel = () => {
    setVisibleModal(false)
    // Reset form values
    subUsers.current = []
    setBtnThem({ loading: false })
    setUserData([])
  }

  //Register submit react-form
  const handleSubmit = async (data: any) => {
    const prepareData = _.compact(data?.luong_ky_1_s).map((row: any) => {
      row.tien_ung = regexGetNumber(row?.tien_ung)
      row.thang_ung_tien = filter?.thang_ung_tien?.format(formatDate).toString()
      return row
    })
    try {
      setSubmitLoad(true)
      const rs = await api.create({ luong_ky_1_s: prepareData as any })
      message.success(rs.message)
      resetTable()
      handleCancel()
    } catch (error) {
      handleApiError(error, null, null)
    } finally {
      setSubmitLoad(false)
    }
  }

  const removeUser = async (user_id: number) => {
    const list = userData.filter((_, i) => _?.id !== user_id)
    form.setFields([{ name: ['luong_ky_1_s', user_id], value: null }])
    setUserData(list)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm mới
      </Button>
      {
        <Modal
          title={<Title level={4}>Thêm lương ứng</Title>}
          open={visibleModal}
          onOk={(e) => form.submit()}
          onCancel={handleCancel}
          okText="Lưu"
          confirmLoading={submitLoad}
          cancelText="Huỷ"
          width={1000}
        >
          {/* Hiển thị Filter */}
          <Form layout="vertical">
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item
                  name="thang"
                  label="Tháng"
                  style={{ marginBottom: 10 }}
                  validateTrigger="onChange"
                  initialValue={filter?.thang_ung_tien}
                  rules={[
                    {
                      required: true,
                      message: getMessage('required', 'Tháng'),
                    },
                  ]}
                >
                  <DatePicker
                    picker="month"
                    value={filter?.thang_ung_tien}
                    onChange={(date, dateString) => {
                      if (date) {
                        setUserData([])
                        form.setFieldsValue([
                          {
                            luong_ky_1_s: null,
                          },
                        ])
                        dispatchFilter({
                          type: 'fetchData',
                          payload: {
                            thang_ung_tien: date,
                          },
                        })
                      }
                    }}
                    style={{ width: '100%' }}
                    format={formatDate}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={10}>
                <Form.Item label="Nhân viên" style={{ marginBottom: 10 }}>
                  <Input
                    placeholder="Tìm kiếm tên nhân viên"
                    onChange={(e) => {
                      dispatchFilter({
                        type: 'fetchData',
                        payload: {
                          search: e.target.value,
                        },
                      })
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item
                  initialValue={''}
                  label="Bộ phận"
                  style={{ marginBottom: 10 }}
                >
                  <FilterPhongBan
                    onChange={(value) =>
                      dispatchFilter({
                        type: 'fetchData',
                        payload: {
                          id_bo_phan: value,
                        },
                      })
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={4} style={{ textAlign: 'left', marginBottom: 10 }}>
                {' '}
                <Button
                  type="primary"
                  style={{ marginTop: 30, width: '100%' }}
                  loading={btnThem.loading}
                  onClick={(e) => {
                    //Lấy ra số user chưa có trong userData để thêm vào
                    const differenceUsers = subUsers.current?.filter(
                      (user: User) => {
                        return !userData.some((_) => _.id === user.id)
                      },
                    )
                    setUserData([...userData, ...differenceUsers])
                    setTimeout(() => {
                      form.resetFields()
                    }, 100)
                  }}
                >
                  {' '}
                  Thêm
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Hiển thị bảng */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <ProTable
              dataSource={userData}
              pagination={false}
              scroll={{ x: 1200, y: '90vh' }}
              columns={[
                {
                  dataIndex: 'sdb',
                  title: 'SDB',
                  search: false,
                  fixed: 'left',
                  width: 90,
                  render: (dom, record, index, action, schema) => {
                    return (
                      <>
                        <Form.Item
                          hidden={true}
                          name={['luong_ky_1_s', record.id, 'id_nhan_vien']}
                          initialValue={record.id}
                        >
                          <Input placeholder={'id nhân viên'}></Input>
                        </Form.Item>
                        {dom}
                      </>
                    )
                  },
                },
                {
                  dataIndex: 'ho_va_ten',
                  title: 'Họ và tên',
                  search: false,
                },
                {
                  dataIndex: 'ten_bo_phan',
                  title: 'BP',
                  search: false,
                },
                {
                  dataIndex: 'chuc_danh_ll',
                  title: 'Chức vụ',
                  search: false,
                },
                {
                  title: 'Tiến ứng',
                  search: false,
                  render: (value, record, index) => {
                    return (
                      <Form.Item
                        style={{
                          margin: 0,
                        }}
                        name={['luong_ky_1_s', record.id, 'tien_ung']}
                        initialValue={renderCurrency(
                          record?.luong_ky_1_s.find(
                            (luongKy1) =>
                              luongKy1.thang_ung_tien ==
                              filter?.thang_ung_tien
                                .format(formatDate)
                                .toString(),
                          )?.tien_ung ?? 0,
                        )}
                      >
                        <Input
                          onBlur={(e) => {
                            form.setFieldValue(
                              ['luong_ky_1_s', record.id, 'tien_ung'],
                              renderCurrency(e.target.value),
                            )
                          }}
                          placeholder={'Số tiền ứng'}
                        ></Input>
                      </Form.Item>
                    )
                  },
                },
                {
                  title: 'Ghi chú',
                  search: false,
                  render: (value, record, index) => {
                    return (
                      <Form.Item
                        style={{
                          margin: 0,
                        }}
                        name={['luong_ky_1_s', record.id, 'ghi_chu']}
                        initialValue={
                          record?.luong_ky_1_s.find(
                            (luongKy1) =>
                              luongKy1.thang_ung_tien ==
                              filter?.thang_ung_tien
                                .format(formatDate)
                                .toString(),
                          )?.ghi_chu ?? ''
                        }
                      >
                        <Input placeholder={'Ghi chú'}></Input>
                      </Form.Item>
                    )
                  },
                },
                {
                  title: 'Thao tác',
                  search: false,
                  render: (value, record, index) => {
                    return (
                      <Button
                        onClick={(e) => {
                          removeUser(record.id)
                        }}
                        icon={<DeleteOutlined />}
                      ></Button>
                    )
                  },
                },
              ]}
              search={false}
            ></ProTable>
          </Form>
        </Modal>
      }
    </>
  )
}

export default memo(Create)
