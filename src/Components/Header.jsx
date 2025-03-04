import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "antd";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 fixed w-full top-0 z-50 flex items-center justify-between p-4 shadow-md">
      {/* Application Title */}
      <p className="text-2xl text-white font-bold">Product Crud App</p>

      <div className="flex items-center space-x-4 ">
        {/* User Info for lg and md screens */}
        <div className="hidden md:flex items-center space-x-2 ">
          <Avatar className="" src="https://i.pravatar.cc/150?img=3" size="large" />
          <span className="text-white font-medium px-2">John Doe</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={toggleSidebar}>
          <AiOutlineMenu size={15} className="text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
