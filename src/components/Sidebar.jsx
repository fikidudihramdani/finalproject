import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChevronRight,
  FaTh,
  FaCalendarAlt,
  FaClipboardList,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <FaTh size={20} />, label: "Dashboard", to: "/dashboard" },
    { icon: <FaCalendarAlt size={20} />, label: "Calendar", to: "/resevarsi" },
    { icon: <FaClipboardList size={20} />, label: "Rooms", to: "/room" },
    { icon: <FaFileAlt size={20} />, label: "Report", to: "/report" },
    { icon: <FaCog size={20} />, label: "Profile", to: "/profile" },
  ];

  return (
    <div
      className={`h-screen bg-white shadow transition-all duration-300 ${
        isOpen ? "w-38" : "w-16"
      } flex flex-col items-center py-4`}
    >
      {/* Logo */}
      <div className="mb-6 flex items-center space-x-2 px-2">
        <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
          E
        </div>
        {isOpen && (
          <span className="text-orange-600 font-semibold select-none">
            Meeting
          </span>
        )}
      </div>

      {/* Toggle Button */}
        <div
          className={`mb-6 cursor-pointer p-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-100 transition ${
            isOpen ? "flex justify-end pr-4" : "flex justify-center"
          }`}
          onClick={toggleSidebar}
        >
          <FaChevronRight
            size={10}
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>


      {/* Menu Items */}
      <div className="flex flex-col space-y-1 w-full">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.to}
            key={index}
            className={({ isActive }) =>
              `flex items-center no-underline mb-10 ${
                isOpen ? "justify-start px-4" : "justify-center"
              } py-2 cursor-pointer hover:bg-orange-100 transition-all ${
                isActive
                  ? "text-orange-500 border-r-2 border-orange-500"
                  : "text-gray-400"
              }`
            }
          >
            {item.icon}
            {isOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


