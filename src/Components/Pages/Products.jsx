import React, { useState } from "react";
import shir from '../../assets/images/shirt-1.jpg'
import { Button } from "antd";

const Products = () => {
  // Sample product data (You can replace this with dynamic data later)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: "$20",
      description: "A short description of Product 1.",
      image: shir,
    },
    {
      id: 2,
      name: "Product 2",
      price: "$35",
      description: "A short description of Product 2.",
      image: shir,
    },
    {
      id: 3,
      name: "Product 3",
      price: "$50",
      description: "A short description of Product 3.",
      image: shir,
    },
    {
      id: 4,
      name: "Product 4",
      price: "$40",
      description: "A short description of Product 4.",
      image: shir,
    },
  ]);


  // Function to handle the delete action
 const handleDelete = (id)=>{
  const updatedProduct = products.filter((product)=> product.id !== id)
  setProducts(updatedProduct)
 }

  // Function to handle the edit action (for now, just logs the product)
  const handleEdit = (product) => {
    console.log("Edit Product:", product);
  };

  return (
    <div className="p-4">
      <dir className='flex  justify-between items-center'>
      <p className="text-4xl font-bold mb-6">Products</p>
      <Button className="  bg-[#00010229] hover:bg-blue-600 text-white">
        Add Products
      </Button>

      </dir>
      
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
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b text-green-500 font-bold">
                  {product.price}
                </td>
                <td className="py-2 px-1 border-b space-x-2">
                  <button
                    className=" text-black py-1 px-2 rounded   transition"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className=" text-red-500 py-1 px-2 rounded  transition"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
