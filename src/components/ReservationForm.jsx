import React, { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

const AddReservationForm = ({ isOpen, onClose, onSubmit, rooms = [], snacks = [] }) => {
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
    const roomData = rooms.find((r) => r.name === formData.room);
    const snackData = snacks.find((s) => s.name === formData.snack);

    const roomPrice = roomData?.price || 0;
    const snackPrice = formData.addSnack && snackData ? snackData.price : 0;
    const total = roomPrice + snackPrice;

    return { roomData, snackData, roomPrice, snackPrice, total };
  };

  const canGoNext = () => {
    const f = formData;
    if (
      !f.room ||
      !f.name ||
      !f.phone ||
      !f.company ||
      !f.date ||
      !f.startTime ||
      !f.endTime ||
      !f.participants
    ) return false;

    if (f.addSnack && !f.snack) return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const { roomData, snackData, roomPrice, snackPrice, total } = calculateTotal();

  return (
  <aside className="fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-96 transition-all duration-300">
    <div className="p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800">Formulir Reservasi</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      {step === 1 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canGoNext()) setStep(2);
            else alert("Harap lengkapi semua field.");
          }}
          className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2"
        >
          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Pilih Ruangan</label>
              <select name="room" value={formData.room} onChange={onChange} className="border rounded-lg px-3 py-2 w-full">
                <option value="">-- Pilih Ruangan --</option>
                {rooms.map((room) => (
                  <option key={room.name} value={room.name}>{room.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Nama Lengkap</label>
              <input name="name" value={formData.name} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">No. Telepon</label>
              <input name="phone" value={formData.phone} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Perusahaan</label>
              <input name="company" value={formData.company} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Tanggal</label>
              <input type="date" name="date" value={formData.date} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">Jam Mulai</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">Jam Selesai</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Jumlah Peserta</label>
              <input name="participants" value={formData.participants} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Catatan</label>
              <textarea name="note" value={formData.note} onChange={onChange} className="border rounded-lg px-3 py-2 w-full" />
            </div>

            {/* Checkbox + Snack */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="addSnack" checked={formData.addSnack} onChange={onChange} />
              <label className="text-sm font-semibold">Tambahkan Snack</label>
            </div>

            {formData.addSnack && (
              <div>
                <label className="block text-sm font-semibold mb-1">Pilih Snack</label>
                <select name="snack" value={formData.snack} onChange={onChange} className="border rounded-lg px-3 py-2 w-full">
                  <option value="">-- Pilih Snack --</option>
                  {snacks.map((snack) => (
                    <option key={snack.name} value={snack.name}>{snack.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Tombol Submit */}
          <div className="mt-auto pt-5">
            <button
              type="submit"
              disabled={!canGoNext()}
              className="bg-orange-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-orange-300 transition"
            >
              Lanjutkan
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto p-1">
          {/* Header Step 2 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(1)}
              className="hover:bg-gray-200 p-2 rounded-full text-gray-700"
            >
              <FaChevronLeft />
            </button>
            <h3 className="text-xl font-semibold text-gray-800">Konfirmasi Data Reservasi</h3>
          </div>

          {/* Tabel Informasi */}
          <div className="space-y-5 text-sm text-gray-700">
            {/* Detail Ruangan */}
            <div>
              <h2 className="font-semibold text-gray-700 mb-2">📌 Detail Ruangan</h2>
              <table className="w-full table-fixed">
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="py-2">Tipe Ruangan</td><td className="text-right">{roomData?.name || '-'}</td></tr>
                  <tr><td className="py-2">Kapasitas</td><td className="text-right">{roomData?.capacity || '-'}</td></tr>
                  <tr><td className="py-2">Harga / Jam</td><td className="text-right">Rp {roomPrice.toLocaleString()}</td></tr>
                  <tr><td className="py-2">Durasi</td><td className="text-right">{formData.startTime} - {formData.endTime}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Data Pemesan */}
            <div>
              <h2 className="font-semibold text-gray-700 mb-2">👤 Data Pemesan</h2>
              <table className="w-full table-fixed">
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="py-2">Nama</td><td className="text-right">{formData.name}</td></tr>
                  <tr><td className="py-2">Telepon</td><td className="text-right">{formData.phone}</td></tr>
                  <tr><td className="py-2">Perusahaan</td><td className="text-right">{formData.company}</td></tr>
                  <tr><td className="py-2">Tanggal</td><td className="text-right">{formData.date}</td></tr>
                  <tr><td className="py-2">Peserta</td><td className="text-right">{formData.participants}</td></tr>
                  {formData.addSnack && snackData && (
                    <>
                      <tr><td className="py-2">Snack</td><td className="text-right">{snackData.name}</td></tr>
                      <tr><td className="py-2">Harga Snack</td><td className="text-right">Rp {snackPrice.toLocaleString()}</td></tr>
                    </>
                  )}
                  <tr><td className="py-2">Catatan</td><td className="text-right">{formData.note || '-'}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Total Harga */}
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Tombol Konfirmasi */}
          <div className="mt-auto pt-4 border-t">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white w-full font-semibold py-3 rounded-lg transition"
            >
              ✅ Konfirmasi Reservasi
            </button>
          </div>
        </div>
      )}
    </div>
  </aside>
);

};

export default AddReservationForm;
