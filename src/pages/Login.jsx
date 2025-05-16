import React from 'react';
import backgroundImage from '@images/background.png'
import {NavLink, Outlet,Link} from "react-router-dom";

const LoginCard = () => {
  return (
    <div className="min-h-screen flex items-center justify-start bg-cover  bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white shadow-xl rounded-xl ml-5 p-8 w-full max-w-md">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">E</div>
          <span className="text-orange-500 font-semibold">E-Meeting</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-sm text-gray-500 mb-6">Please enter your username and password here!</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <div className="text-right text-sm mt-1">
              <a href="#" className="text-orange-500 hover:underline">Forgot Password?</a>
            </div>
          </div>
          <NavLink to="dashboard">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
