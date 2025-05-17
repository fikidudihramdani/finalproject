// components/AddReservationForm.jsx
import React from "react";

const AddReservationForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  rooms,
}) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ${
        isOpen ? "w-[400px]" : "w-0 overflow-hidden"
      }`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Reservation Form</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 overflow-y-auto flex-grow">
          <div>
            <label className="block mb-1 font-medium text-sm">Room Name</label>
            <select
              name="room"
              value={formData.room}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="" disabled>Select Room Name</option>
              {rooms.map((room) => (
                <option key={room.name} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Name"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">No. HP</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="No. HP"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Company/Organization</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={onChange}
              placeholder="Company"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Date Reservation</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-sm">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={onChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-sm">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={onChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Total Participants</label>
            <input
              type="number"
              name="participants"
              value={formData.participants}
              onChange={onChange}
              placeholder="Total Participants"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="addSnack"
              checked={formData.addSnack}
              onChange={onChange}
            />
            <label className="text-sm font-medium">Add Snack</label>
          </div>

          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 mt-4">
            Submit Reservation
          </button>
        </form>
      </div>
    </aside>
  );
};

export default AddReservationForm;
