import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Image from "../images/room.png";
import CustomToast from "./CustomToast";
import ConfirmModal from "./ConfirmModal";

const initialRooms = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "Aster Room",
  capacity: "10 people",
  price: "Rp 500.000",
  type: "Small",
  image: Image,
}));

const RoomsContent = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showModal, setShowModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const handleDelete = () => {
    if (roomToDelete) {
      setRooms((prev) => prev.filter((room) => room.id !== roomToDelete.id));
      setToast({ show: true, message: "Room successfully deleted", type: "success" });
      setShowModal(false);
      setRoomToDelete(null);
    }
  };

  const handleOpenModal = (room) => {
    setRoomToDelete(room);
    setShowModal(true);
  };

  return (
    <div className="p-6 min-h-screen bg-white m-5 rounded-md">
      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Enter the keyword here..."
          className="border border-gray-300 px-4 py-2 rounded-md flex-1 min-w-[200px]"
        />
        <select className="border border-gray-300 px-4 py-2 rounded-md min-w-[150px]">
          <option>Room Type</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <select className="border border-gray-300 px-4 py-2 rounded-md min-w-[150px]">
          <option>Capacity</option>
          <option>Kurang Dari 10</option>
          <option>11-50</option>
          <option>51-100</option>
        </select>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <FiSearch />
          Search
        </button>
        <button className="bg-[#FF5C00] text-white px-4 py-2 rounded-md ml-auto">
          + Add New Room
        </button>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 overflow-scroll md:grid-cols-2 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="rounded-xl border border-gray-200 overflow-hidden shadow-sm relative group"
          >
            <div className="relative">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleOpenModal(room)}
                  className="bg-white p-1 rounded-full shadow"
                >
                  <FiTrash2 className="text-red-500" />
                </button>
                <button className="bg-white p-1 rounded-full shadow">
                  <FiEdit2 className="text-orange-500" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">
                {room.type}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {room.name}
              </h3>
              <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                👥 {room.capacity}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                💰 {room.price}/hours
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <CustomToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        </div>
      )}

      {/* Modal konfirmasi */}
      {showModal && (
        <ConfirmModal
          title="Delete Room"
          message={`Are you sure you want to delete "${roomToDelete?.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RoomsContent;
