import React, { useEffect, useState } from "react";
import { Button, message, Modal, Spin, Form, Input, InputNumber } from "antd";
import shirt from "../../assets/images/shirt-1.jpg";
import { Link } from "react-router-dom";





const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // Fetch products from the server
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/products/available", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
      // console.log("Products fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
      messageApi.error("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/available/delete${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        messageApi.success("Product deleted successfully!");
      } else {
        throw new Error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      messageApi.error(error.message);
    }
  };

  // Show edit modal with selected product data
  const showEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  // Handle form submission for product editing
  // Function to handle form submission for product editing
  const handleEdit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/products/available/edite${selectedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        messageApi.error(data.message || "Failed to edit product");
      } else {
        messageApi.success("Product Edited successfully!");;
      }
      
      fetchProducts(); // Refresh product list
      setIsModalVisible(false);

    } catch (error) {
      console.error("Error updating product:", error.message);
      messageApi.error("Error occurred while updating the product.");
    }
  };



  return (
    <div className="w-[80%] mx-auto py-6">
    {contextHolder}
    <div className="flex justify-between items-center mb-4">
      <p className="text-4xl font-bold">Products</p>
      <Link to="/CreateProduct">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Add Products</Button>
      </Link>
    </div>

    {loading ? (
      <div className="flex justify-center items-center h-80">
        <Spin size="large" />
        <h1 className="px-5">Loading...</h1>
      </div>
    ) : (
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b text-center w-24">Image</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Description</th>
              <th className="py-3 px-4 border-b text-right">Price</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b text-center">
                  <div className="flex justify-center">
                    <img
                      src={shirt || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="py-3 px-4 border-b text-left font-medium">{product.name}</td>
                <td className="py-3 px-4 border-b text-left">{product.description}</td>
                <td className="py-3 px-4 border-b border-neutral-950 text-right text-green-500 font-bold">
                  ${product.price.toFixed(1)}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-3 rounded transition"
                      onClick={() => showEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded transition"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* Edit Modal */}
    <Modal
      title="Edit Product"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEdit}
        initialValues={selectedProduct || {}}
        className="pt-2"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter the price" }]}>
          <InputNumber
            min={0}
            className="w-full"
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          />
        </Form.Item>

        <Form.Item className="mb-0 text-right">
          <Button type="default" onClick={() => setIsModalVisible(false)} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
  );
};

export default Products;
