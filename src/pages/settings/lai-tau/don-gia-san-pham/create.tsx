import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Form, message, Typography, Row, Col, Input, Select,Modal } from 'antd';

const Create = ()=>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <Button type="primary" onClick={showModal} icon={<PlusOutlined/>}>
    Thêm mới
  </Button>
    <Modal
      title={<Typography.Title level={4}>Thêm đơn giá sản phẩm </Typography.Title>}
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}
    >
      <Form layout='vertical'
      labelWrap={true}>
        <Row gutter={15}>
          <Col span={8}>
          <Form.Item
                  name="tensp"
                  label="Tên sản phẩm:"
                  rules={[
                    {
                      required: true,
                      message: "Nhập tên sản phẩm",
                    },
                  ]}>
                    <Input placeholder='Tên sản phẩm'/>
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
                  name="dvt"
                  label="Đơn vị tính:"
                  rules={[
                    {
                      required: true,
                      message: "Nhập đơn vị tính",
                    },
                  ]}>
                    <Input placeholder='Đơn vị tính'/>
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
                  name="kihieu"
                  label="Kí hiệu:"
                  rules={[
                    {
                      required: true,
                      message: "Nhập kí hiệu",
                    },
                  ]}>
                    <Input placeholder='Kí hiệu sản phẩm'/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item
                  name="congtac"
                  label="Mã công tác:">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Cấu hình mã công tác"
                      options={[{value:1, label: 'Tàu khách'},{value:2, label: 'Tàu hàng'}]}
                    />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item
                  name="tinhchat"
                  label="Mã tính chất:">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Cấu hình mã tính chất"
                      options={[{value:1, label: 'Chạy chính'},{value:2, label: 'Chạy đơn'}]}
                    />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item
                  name="khudoan"
                  label="Khu đoạn:"
                  tooltip= "Nhập kí hiệu khu đoạn trùng với kí hiệu khu đoạn trong cơ báo để hệ thống có thể nhận diện khu đoạn và áp đơn giá chính xác. Nếu có nhiều khu đoạn thì các khu đoạn cách nhau bằng dấu phẩy">

                    <Input placeholder='VD: HUE-DN-HUE, DH-HUE-DH'/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item
                  name="loaidongia"
                  label="Áp dụng cho loại giờ:"
                  tooltip= "Đơn giá áp dụng đỂ tính lương cho một loại giờ có trong cơ báo">

                    <Select

                      style={{ width: '100%' }}
                      options={[{value:1, label: 'giờ chạy'},{value:2, label: 'giờ dừng'}, {value:3, label: 'giờ dồn'}, {value:3, label: 'giờ tac nghiệp'}]}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item name="dongiatai"
                  label="Đơn giá lái tàu:">
                  <Input placeholder='Đơn giá tài'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dongiaphu"
                  label="Đơn giá phụ lái tàu:">
                  <Input placeholder='Đơn giá phụ'/>
            </Form.Item>
          </Col>
        </Row>


      </Form>

    </Modal>
    </>
  );
}
export default Create;
