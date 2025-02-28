import React, { useEffect, useState } from "react";
import { Button, message, Modal, Spin, Form, Input, InputNumber } from "antd";
import shirt from "../../assets/images/shirt-1.jpg";

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
    <div>
      {contextHolder}
      <div className="flex justify-between items-center">
        <p className="text-4xl font-bold mb-6">Products</p>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Add Products
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <Spin size="large" />
          <h1 className="px-5">Loading...</h1>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={shirt}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b text-green-500 font-bold">
                    ${product.price}
                  </td>
                  <td className="py-2 px-1 border-b space-x-4">
                    <button
                      className="bg-blue-200 py-1 px-4 rounded transition"
                      onClick={() => showEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-200 py-1 my-3 px-2 rounded transition"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
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
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEdit}
          initialValues={selectedProduct}
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

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
