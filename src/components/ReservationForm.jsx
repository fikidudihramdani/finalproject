import React, { useState, useEffect } from "react";

const AddReservationForm = ({ isOpen, onClose, onSubmit, rooms = [], snacks = [] }) => {
  // Local form data state
  const [formData, setFormData] = useState({
    room: "",
    name: "",
    phone: "",
    company: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    note: "",
    addSnack: false,
    snack: "",
  });

  // Step form: 1 = input, 2 = confirmation
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        room: "",
        name: "",
        phone: "",
        company: "",
        date: "",
        startTime: "",
        endTime: "",
        participants: "",
        note: "",
        addSnack: false,
        snack: "",
      });
      setStep(1);
    }
  }, [isOpen]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "addSnack" && !checked ? { snack: "" } : {}),
    }));
  };

  const calculateTotal = () => {
    const roomPrice = rooms.find((r) => r.name === formData.room)?.price || 0;
    const snackPrice =
      formData.addSnack && formData.snack
        ? snacks.find((s) => s.name === formData.snack)?.price || 0
        : 0;
    return { roomPrice, snackPrice, total: roomPrice + snackPrice };
  };

  const canGoNext = () => {
    if (
      !formData.room ||
      !formData.name ||
      !formData.phone ||
      !formData.company ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.participants
    ) {
      return false;
    }
    if (formData.addSnack && !formData.snack) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const { roomPrice, snackPrice, total } = calculateTotal();

  return (
    <aside className="fixed top-0 right-0 h-full bg-white shadow-lg z-40 w-[450px] transition-all duration-300">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Reservation Form</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold text-xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            if (canGoNext()) setStep(2);
            else alert("Please fill all required fields.");
          }} className="flex flex-col gap-4 flex-1 overflow-y-auto">
            <div>
              <label className="block mb-1 font-semibold">Room</label>
              <select
                name="room"
                value={formData.room}
                onChange={onChange}
                required
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select room</option>
                {rooms.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                type="text"
                placeholder="Your name"
                required
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={onChange}
                type="tel"
                placeholder="Phone number"
                required
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={onChange}
                type="text"
                placeholder="Company name"
                required
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <input
                name="date"
                value={formData.date}
                onChange={onChange}
                type="date"
                required
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-semibold">Start Time</label>
                <input
                  name="startTime"
                  value={formData.startTime}
                  onChange={onChange}
                  type="time"
                  required
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-semibold">End Time</label>
                <input
                  name="endTime"
                  value={formData.endTime}
                  onChange={onChange}
                  type="time"
                  required
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Number of Participants</label>
              <input
                name="participants"
                value={formData.participants}
                onChange={onChange}
                type="number"
                min="1"
                required
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                name="addSnack"
                type="checkbox"
                checked={formData.addSnack}
                onChange={onChange}
                id="addSnack"
              />
              <label htmlFor="addSnack" className="font-semibold">
                Add Snack (Rp 10.000)
              </label>
            </div>

            {formData.addSnack && (
              <div>
                <label className="block mb-1 font-semibold">Select Snack</label>
                <select
                  name="snack"
                  value={formData.snack}
                  onChange={onChange}
                  className="border rounded px-3 py-2 w-full"
                  required={formData.addSnack}
                >
                  <option value="">Select snack</option>
                  {snacks.map((snack) => (
                    <option key={snack.name} value={snack.name}>
                      {snack.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block mb-1 font-semibold">Additional Notes</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={onChange}
                placeholder="Additional notes"
                className="border rounded px-3 py-2 w-full"
                rows={3}
              ></textarea>
            </div>

            <div className="mt-auto flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="border px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canGoNext()}
                className={`bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:bg-orange-300`}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Confirm Reservation Details</h3>
            <div>
              <p><b>Room:</b> {formData.room}</p>
              <p><b>Name:</b> {formData.name}</p>
              <p><b>Phone:</b> {formData.phone}</p>
              <p><b>Company:</b> {formData.company}</p>
              <p><b>Date:</b> {formData.date}</p>
              <p><b>Time:</b> {formData.startTime} - {formData.endTime}</p>
              <p><b>Participants:</b> {formData.participants}</p>
              <p><b>Snack:</b> {formData.addSnack ? formData.snack : "No snack"}</p>
              <p><b>Additional Notes:</b> {formData.note || "-"}</p>
              <p className="mt-3 text-lg font-semibold">Total: Rp {total.toLocaleString()}</p>
            </div>

            <div className="mt-auto flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="border px-4 py-2 rounded hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AddReservationForm;
