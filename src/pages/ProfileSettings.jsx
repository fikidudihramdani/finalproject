import React, { useState } from 'react';
import Sidebar from '@components/Sidebar';
import Header from '@components/Header';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    email: 'johndoe@gmail.com',
    username: 'John Doe',
    role: 'Admin',
    status: 'Active',
    language: 'English',
    password: '********',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white shadow fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>
      

      {/* Main content */}
      <div className="flex flex-col flex-1 ml-16">
        {/* Header */}
        <div className="sticky top-0 shadow z-20">
          <Header />
        </div>
        <div className='m-3 p-3 bg-white h-full rounded'>
        {/* Page content */}
        <div className="p-6 overflow-auto">
          <h2 className="text-2xl font-semibold mb-6">My Account</h2>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
            <img
              src="https://randomuser.me/api/portraits/women/32.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Status</label>
                <input
                  type="text"
                  name="status"
                  value={profile.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Language</label>
                <select
                  name="language"
                  value={profile.language}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="English">English</option>
                  <option value="Bahasa">Bahasa</option>
                </select>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Password</h2>
          <div className="max-w-md">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition">
            Edit
          </button>
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
