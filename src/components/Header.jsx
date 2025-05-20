import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = ({ onLogout }) => {
  const location = useLocation();

  
  const pathTitleMap = {
    "/dashboard": "Dashboard",
    "/resevarsi": "Reservation Schedule",
    "/room": "Room",
    "/report": "Reports",
    "/profile": "Settings",
  };

  
  const title = pathTitleMap[location.pathname] || "Dashboard";

  return (
    <div className="w-full flex justify-between items-center px-4 md:px-6 py-3 shadow bg-white">
      <h1 className="text-lg md:text-xl font-semibold whitespace-nowrap">
        {title}
      </h1>
      <div className="flex items-center space-x-2">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
        <div className="hidden md:block text-right">
          <div className="text-sm font-semibold">Angelina</div>
          <div className="text-xs text-gray-500">Admin</div>
        </div>
        <div
          className="ml-3 cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={onLogout}
          title="Logout"
        >
          <FaSignOutAlt size={18} />
        </div>
      </div>
    </div>
  );
};

export default Header;
