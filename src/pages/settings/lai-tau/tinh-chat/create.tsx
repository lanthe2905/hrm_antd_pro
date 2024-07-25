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
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}
    >
      <Form layout='vertical'
      labelWrap={true}>
        <Row gutter={15}>
          <Col span={24}>
          <Form.Item
                  name="matinhchat"
                  label="Mã tính chất:"
                  rules={[
                    {
                      required: true,
                      message: "Nhập mã tính chất",
                    },
                  ]}>
                    <Input placeholder='Mã tính chất'/>
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
