import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Image from "../images/room.png";
import CustomToast from "./CustomToast";
import ConfirmModal from "./ConfirmModal";
import RoomForm from "./AddRoomsForm";
import { AnimatePresence, motion } from 'framer-motion';

const initialRooms = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "Aster Room",
  capacity: "10",
  price: "500000",
  type: ["Small", "Medium", "Large"][index % 3],
  image: Image,
}));

const RoomsContent = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showModal, setShowModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleCapacityChange = (e) => {
    setSelectedCapacity(e.target.value);
  };

  const filterByCapacity = (room) => {
    const people = parseInt(room.capacity);
    switch (selectedCapacity) {
      case "less10":
        return people < 10;
      case "11-50":
        return people >= 11 && people <= 50;
      case "51-100":
        return people >= 51 && people <= 100;
      default:
        return true;
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchName = room.name.toLowerCase().includes(searchQuery);
    const matchType = selectedType ? room.type === selectedType : true;
    const matchCapacity = filterByCapacity(room);
    return matchName && matchType && matchCapacity;
  });

  const handleAddNewRoom = () => {
    setEditingRoom(null);
    setShowForm(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRoom(null);
  };

  const handleSubmitRoom = (data) => {
    if (editingRoom) {
      // Update room
      setRooms((prev) =>
        prev.map((r) => (r.id === editingRoom.id ? { ...r, ...data } : r))
      );
      setToast({ show: true, message: "Room updated successfully", type: "success" });
    } else {
      // Add room
      const newRoom = {
        ...data,
        id: rooms.length + 1,
        image: Image,
      };
      setRooms((prev) => [...prev, newRoom]);
      setToast({ show: true, message: "New room added", type: "success" });
    }

    setShowForm(false);
    setEditingRoom(null);
  };

  return (
    <div className="p-6 h-[90%] bg-white rounded">
      {/* Form Add/Edit Room */}

        {showForm && (
            <div
              className="fixed inset-0 bg-black opacity-25 z-30"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
    <AnimatePresence>

      {showForm && (
        <motion.div
          key="room-form"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 bottom-0 w-96 bg-white shadow-lg z-40 overflow-auto"
        >
          <RoomForm
            onSubmit={handleSubmitRoom}
            onCancel={handleCancelForm}
            initialData={editingRoom}
          />
        </motion.div>
      )}
    </AnimatePresence>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Enter the keyword here..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 px-4 py-2 rounded-md flex-1 min-w-[200px]"
        />
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="border border-gray-300 px-4 py-2 rounded-md min-w-[150px]"
        >
          <option value="">Room Type</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <select
          value={selectedCapacity}
          onChange={handleCapacityChange}
          className="border border-gray-300 px-4 py-2 rounded-md min-w-[150px]"
        >
          <option value="">Capacity</option>
          <option value="less10">Kurang Dari 10</option>
          <option value="11-50">11-50</option>
          <option value="51-100">51-100</option>
        </select>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <FiSearch />
          Search
        </button>
        <button
          onClick={handleAddNewRoom}
          className="bg-[#FF5C00] text-white px-4 py-2 rounded-md ml-auto"
        >
          + Add New Room
        </button>
      </div>

      {/* Room Grid */}
      <div className="h-185 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
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
                    <button
                      onClick={() => handleEditRoom(room)}
                      className="bg-white p-1 rounded-full shadow"
                    >
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
                    👥 {room.capacity} people
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    💰 Rp {room.price}/hours
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No rooms found.
            </p>
          )}
        </div>
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
