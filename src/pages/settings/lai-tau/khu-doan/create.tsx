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
      title={<Typography.Title level={4}>Thêm khu đoạn </Typography.Title>}
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}
    >
      <Form layout='vertical'
      labelWrap={true}>
        <Row gutter={15}>
          <Col span={24}>
          <Form.Item
                  name="kihieu"
                  label="Kí hiệu khu đoạn:"
                  tooltip= "Nhập kí hiệu khu đoạn trùng với kí hiệu khu đoạn trong cơ báo để hệ thống có thể nhận diện khu đoạn và áp đơn giá chính xác."
                  rules={[
                    {
                      required: true,
                      message: "Nhập kí hiệu khu đoạn",
                    },
                  ]}>
                    <Input placeholder='VD: HUE-DN-HUE, DN-QN'/>
            </Form.Item>
          </Col>
          <Col span={24}>
          <Form.Item
                  name="mota"
                  label="Mô tả:"
                 >
                    <Input placeholder='Mô tả'/>
            </Form.Item>
          </Col>

        </Row>




      </Form>

    </Modal>
    </>
  );
}
export default Create;
