import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Products from "./Components/Pages/Products";
import CreateProduct from "./Components/Pages/CreateProduct";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 pt-16 overflow-hidden">
        
          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100 overflow-auto ">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/CreateProduct" element={<CreateProduct />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
