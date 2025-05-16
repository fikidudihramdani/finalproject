import React from 'react';

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4 w-full text-center">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

export default StatCard;
