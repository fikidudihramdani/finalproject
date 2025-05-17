import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import RoomCard from '../components/RoomCard';

const Dashboard = () => {
  const roomData = [
    { name: 'Aster Room', percentage: 80, omzet: 'Rp 2.000.000' },
    { name: 'Bluebell Room', percentage: 80, omzet: 'Rp 2.000.000' },
    { name: 'Camellia Room', percentage: 80, omzet: 'Rp 2.000.000' },
    // Duplicate data for layout purposes
    { name: 'Aster Room', percentage: 80, omzet: 'Rp 2.000.000' },
    { name: 'Bluebell Room', percentage: 80, omzet: 'Rp 2.000.000' },
    { name: 'Camellia Room', percentage: 80, omzet: 'Rp 2.000.000' },
    { name: 'Aster Room', percentage: 80, omzet: 'Rp 2.000.000' },
    { name: 'Bluebell Room', percentage: 80, omzet: 'Rp 2.000.000' },
    { name: 'Camellia Room', percentage: 80, omzet: 'Rp 2.000.000' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      <div className="fixed inset-y-0 left-0 bg-white shadow z-30">
      <Sidebar />
     </div>
      <div className="flex-1 ml-16">
        <div className="sticky top-0 z-20 bg-white shadow">
          <Header />
        </div>

        <div className="p-6 space-y-6">
          {/* Filter */}
          <div className="flex w-full bg-white rounded shadow p-3 md:grid-cols-4 gap-4">
            <div className='w-full'>
              <label>
                Start Date
              </label>
              <input
                type="date"
                className="p-2 rounded border border-gray-200 w-full"
                placeholder="Start Date"
              />
            </div>
            
            <div className='w-full'>
              <label>
                End Date
              </label>
              <input
              type="date"
              className="p-2 rounded border-gray-200 w-full"
              placeholder="End Date"
            />
            </div>
            <div>
            <button className="bg-orange-500 text-white px-4 py-2 w-30 rounded mt-6">
              Search
            </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="Total Omzet" value="Rp 8.000.000" />
            <StatCard title="Total Reservation" value="100" />
            <StatCard title="Total Visitor" value="500" />
            <StatCard title="Total Rooms" value="12" />
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 gap-4">
            {roomData.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;