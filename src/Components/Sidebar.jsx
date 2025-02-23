import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { Avatar } from "antd";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 bg-[#00010229] bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-600 p-5 z-40 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-64 pt-16 flex flex-col justify-between`}
      >
        <div>
          <div className=" text-right mb-4 py-2">
            {/* <h2 className="text-xl font-bold text-white">Sidebar</h2>  */}
            <button className="lg:hidden my-2" onClick={toggleSidebar}>
              <AiOutlineClose size={10} className="text-black " />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4">
            <li>
              <Link
                to="/product"
                className="text-white hover:text-gray-300"
                onClick={toggleSidebar}
              >
                <span className="text-white text-xl">

                  Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/CreateProduct"
                className="text-white hover:text-gray-300"
                onClick={toggleSidebar}
              >
                <span className="text-white text-xl">

                CreateProduct
                </span>

              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-white hover:text-gray-300"
                onClick={toggleSidebar}
              >
                <span className="text-white text-xl">

                  Services
                </span>

              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-gray-300"
                onClick={toggleSidebar}
              >
                <span className="text-white text-xl">

                  Contact
                </span>

              </Link>
            </li>
            <li>
              
                <span className="text-red-200 text-xl">

                 Logout
                </span>

            </li>
          </ul>
        </div>

        {/* User Avatar and Name at Bottom */}
        <div className="flex gap-3 items-center mb-4 lg:hidden">
          <Avatar src="https://i.pravatar.cc/150?img=3" size={40} />
          <span className="mt-2 text-white font-medium">John Doe</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
