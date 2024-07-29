import { useState, useEffect } from 'react'
import { Button, Col, Flex, Radio, Row, Space, Typography } from 'antd'
import { LockOutlined, EditOutlined } from '@ant-design/icons'
// import CheckableTag from 'antd/es/tag/CheckableTag'

import './style.css'
import Calendar from './Calendar'
import PhongBanOptions from '@/components/PhongBanOptions'
import TimeKeppingContext from './components/Context'
import * as KyHieuApi from '@/services/kyHieu.service'
import * as KyHieuType from '@/models/kyHieu.model'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
} from '@ant-design/pro-components'
import CheckableTag from 'antd/es/tag/CheckableTag'
const CheDoHienThi = ({ accessor }: { accessor: [boolean, any] }) => {
  const [cheDoHienThi, setCheDoHienThi] = accessor

  return (
    <Radio.Group
      style={{
        minWidth: '220px',
      }}
      value={cheDoHienThi}
      onChange={(val) => setCheDoHienThi(val.target.value)}
    >
      <Radio value={true}>
        <EditOutlined
          style={{
            color: '#4096ff',
          }}
        />
        {'  '}
        Cập nhật
      </Radio>
      <Radio value={false}>
        <LockOutlined
          style={{
            color: '#4096ff',
          }}
        />
        {'      '}
        Chỉ xem
      </Radio>
    </Radio.Group>
  )
}

const TimeKeeping = () => {
  const [rendered, setRendered] = useState(false)
  const [visibleKiHieu, setVisibleKiHieu] = useState(false)
  const [idPhongBan, setIdPhongBan] = useState(null)
  const [cheDoHienThi, setCheDoHienThi] = useState(false)
  const [idKyHieu, setIDKyHieu] = useState<number>(1)
  const [kyHieuData, setKyHieuData] = useState<Array<KyHieuType.Dropdown>>([])

  const toggleKiHieu = () => {
    setVisibleKiHieu(!visibleKiHieu)
  }

  useEffect(() => {
    KyHieuApi.dropdown()
      .then((rs) => {
        setKyHieuData(rs.data as KyHieuType.Dropdown[])
      })
      .finally(() => {
        setRendered(true)
      })
  }, [])

  return (
    <PageContainer>
      <TimeKeppingContext.Provider
        value={{
          idPhongBan: idPhongBan,
          cheDoHienThi: cheDoHienThi,
          idKyHieu: idKyHieu,
          kyHieuData: kyHieuData,
        }}
      >
        <ProForm
          submitter={{
            render: (_, dom) => (
              <FooterToolbar>
                <Space>
                  <CheDoHienThi accessor={[cheDoHienThi, setCheDoHienThi]} />
                  <PhongBanOptions
                    styles={{
                      transform: 'translateY(40%)',
                    }}
                    onChange={(val) => setIdPhongBan(val)}
                  ></PhongBanOptions>
                </Space>
                {dom}
              </FooterToolbar>
            ),
          }}
        >
          <Row justify={'space-between'} gutter={[20, 0]}>
            <Col span={20}>{rendered && <Calendar></Calendar>}</Col>

            <Col span={4}>
              <Flex vertical gap="middle">
                <Typography.Title
                  level={2}
                  style={{ marginBottom: 10 }}
                ></Typography.Title>
                {/* Hiển thị ký hiệu */}
                <Button type="primary">Kí hiệu</Button>

                {kyHieuData?.map((kyHieu) => (
                  <CheckableTag
                    style={{
                      padding: '7px',
                      border: '5px',
                    }}
                    checked={false}
                    key={kyHieu.id}
                    onChange={(chcked) => {
                      setIDKyHieu(kyHieu.id)
                    }}
                  >
                    <span
                      style={{
                        padding: '10px',
                        maxWidth: '15px',
                        maxHeight: '15px',
                        backgroundColor:
                          kyHieu.id == idKyHieu ? '#1677ff' : '#d3d3d3',
                        color: 'white',
                      }}
                    >
                      {' '}
                      {kyHieu.ky_hieu}
                    </span>
                    {' - '}
                    {kyHieu.mo_ta}
                  </CheckableTag>
                ))}
                {/* End hiển thị ký hiệu */}
              </Flex>
            </Col>
          </Row>
        </ProForm>
      </TimeKeppingContext.Provider>
    </PageContainer>
  )
}

export default TimeKeeping
