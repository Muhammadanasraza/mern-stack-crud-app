import React from "react";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PopupMessage from "../PopupMessage";

const CreateProduct = () => {
  // Form submit handler
  const onFinish = (values) => {
    console.log("Form Values:", values);
    message.success("Product created successfully!");
  };

  // Image upload props
  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error(`${file.name} is not a valid image file`);
      }
      return isImage || Upload.LIST_IGNORE;
    },
    maxCount: 1,
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Product</h2>

      <Form
        layout="vertical"
        onFinish={onFinish}
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
          <Input placeholder="Enter product name" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter product description"
          />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the product price" }]}
        >
          <InputNumber
            className="w-full"
            min={0}
            placeholder="Enter product price"
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Product Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload a product image" }]}
        >
          <Upload {...uploadProps} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          {/* <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          > */}
            <PopupMessage/>
            {/* Create Product */}
          {/* </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
