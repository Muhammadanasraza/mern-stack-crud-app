import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message, Descriptions } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CreateProduct = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [productData, setProductData] = useState({
    productName: "",
    descriptions: "",
    price: "",
    image: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (info) => {
    const file = info.file.originFileObj;
    console.log("Selected Image File:", file);
    setProductData(file);
  };

  // Form submit handler
  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Success Message
    messageApi.open({
      type: "success",
      content: "Product created successfully!",
    });

    form.resetFields();
  };

  // Form Submit Error Handler
  const onFinishFailed = (errorInfo) => {
    console.log("Form Submission Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "Please fill in all required fields correctly.",
    });
  };


  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Product</h2>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          price: 0,
        }}
      >
        {/* Product Name */}
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input
            type="text"
            name="name"
            value='name'
            placeholder="Enter product name"
            onChange={handleInputChange}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the product description" }]}
        >
          <Input.TextArea
            type="text"
            name="description"
            // value={formData.description}
            rows={4}
            placeholder="Enter product description"
            onChange={handleInputChange}
          />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          name="price"

          rules={[{ required: true, message: "Please enter the product price" }]}
        >
          <InputNumber
            type="number"
            name="price"
            // value={formData.price}
            className="w-full"

            min={0}
            max={10000}
            placeholder="Enter product price"
            onChange={(value) => setProductData((prevData) => ({ ...prevData, name: value }))}
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Product Image"
          name="image"
          rules={[{ required: true, message: "Please upload a product image" }]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={handleImageChange}
            maxCount={1}
            listType="picture"
            required
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            className="bg-blue-500 hover:bg-blue-600 border-4 "
          >
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
