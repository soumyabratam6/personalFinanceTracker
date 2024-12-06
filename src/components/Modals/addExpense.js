import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas from qrcode.react

const AddExpenseModal = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();
  const [isQRModalVisible, setQRModalVisible] = useState(false);
  const [qrData, setQRData] = useState("9609848483@ybl"); // QR Data
  const qrRef = useRef();

  // Handle opening QR modal
  const handleOpenQRModal = () => {
    setQRModalVisible(true);
  };

  // Handle closing QR modal
  const handleCloseQRModal = () => {
    setQRModalVisible(false);
  };

  // Function to download QR code as an image
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <>
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "expense");
            form.resetFields(); // Reset the form fields after submission
          }}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the Expense amount!",
              },
            ]}
          >
            <Input
              type="number"
              className="custom-input"
              addonAfter={
                <Button type="link" onClick={handleOpenQRModal}>
                  Show QR
                </Button>
              }
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select the Expense date!",
              },
            ]}
          >
            <DatePicker className="custom-input" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "Please select a tag!",
              },
            ]}
          >
            <Select className="select-input-2">
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="office">Office</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn btn-blue">
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal to show the QR code and provide download option */}
      <Modal
        title="QR Code"
        visible={isQRModalVisible}
        onCancel={handleCloseQRModal}
        footer={null}
        centered
      >
        <div ref={qrRef} style={{ marginBottom: "20px" }}>
          {/* Generate QR code */}
          <QRCodeCanvas value={qrData} size={256} />
        </div>
        <Button type="primary" onClick={downloadQRCode} block>
          Download QR Code
        </Button>
      </Modal>
    </>
  );
};

export default AddExpenseModal;
