import React from 'react';

const RoomCard = ({ name, percentage, omzet }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * percentage) / 100;

  return (
    <div className="bg-white rounded-xl shadow-sm px-6 py-4 w-full max-w-xs">
      <div className="flex justify-between items-center">
        {/* Kiri: Semua info */}
        <div className="flex flex-col justify-between h-full">
          <div className="text-lg font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500 mt-1">Percentage of Usage</div>
          <div className="text-base font-bold text-black mb-2">{percentage}%</div>
          <div className="text-sm text-gray-500">Omzet</div>
          <div className="text-lg font-bold text-black">{omzet}</div>
        </div>

        {/* Kanan: Lingkaran */}
        <div className="w-16 h-16 self-center">
          <svg className="w-16 h-16">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#f3f4f6" // abu-abu muda
              strokeWidth="8"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#e65100" // oranye gelap
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
