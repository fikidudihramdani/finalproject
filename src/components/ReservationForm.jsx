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
    <aside className="fixed top-0 right-0 h-full bg-white shadow-lg z-40 w-[450px] transition-all duration-300">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Formulir Reservasi</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold text-xl"
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
            className="flex flex-col gap-4 flex-1 overflow-y-auto"
          >
            <div>
              <label className="block font-semibold mb-1">Pilih Ruangan</label>
              <select name="room" value={formData.room} onChange={onChange} className="border p-2 rounded w-full">
                <option value="">-- Pilih Ruangan --</option>
                {rooms.map((room) => (
                  <option key={room.name} value={room.name}>{room.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Nama Lengkap</label>
              <input name="name" value={formData.name} onChange={onChange} className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block font-semibold mb-1">No. Telepon</label>
              <input name="phone" value={formData.phone} onChange={onChange} className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Perusahaan</label>
              <input name="company" value={formData.company} onChange={onChange} className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Tanggal</label>
              <input type="date" name="date" value={formData.date} onChange={onChange} className="border p-2 rounded w-full" />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block font-semibold mb-1">Jam Mulai</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={onChange} className="border p-2 rounded w-full" />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold mb-1">Jam Selesai</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={onChange} className="border p-2 rounded w-full" />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Jumlah Peserta</label>
              <input name="participants" value={formData.participants} onChange={onChange} className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Catatan</label>
              <textarea name="note" value={formData.note} onChange={onChange} className="border p-2 rounded w-full" />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" name="addSnack" checked={formData.addSnack} onChange={onChange} />
              <label className="font-semibold">Tambahkan Snack</label>
            </div>

            {formData.addSnack && (
              <div>
                <label className="block font-semibold mb-1">Pilih Snack</label>
                <select name="snack" value={formData.snack} onChange={onChange} className="border p-2 rounded w-full">
                  <option value="">-- Pilih Snack --</option>
                  {snacks.map((snack) => (
                    <option key={snack.name} value={snack.name}>{snack.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="bg-white shadow-xs flex justify-center items-center py-5">
              <button
                type="submit"
                disabled={!canGoNext()}
                className="bg-orange-500 w-full text-white px-4 py-2 rounded hover:bg-orange-600 disabled:bg-orange-300"
              >
                Lanjutkan
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
            <div className="flex items-center gap-3">
              <button onClick={() => setStep(1)} className="hover:bg-gray-200 p-1 rounded">
                <FaChevronLeft />
              </button>
              <h3 className="text-lg font-semibold">Konfirmasi Data Reservasi</h3>
            </div>

            <div className="border-t pt-3">
              <h2 className="font-bold mb-2">Detail Ruangan</h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="text-left font-medium">Tipe Ruangan</td><td className="text-right">{roomData?.name || '-'}</td></tr>
                  <tr><td className="text-left font-medium">Kapasitas</td><td className="text-right">{roomData?.capacity || '-'}</td></tr>
                  <tr><td className="text-left font-medium">Harga / Jam</td><td className="text-right">Rp {roomPrice.toLocaleString()}</td></tr>
                  <tr><td className="text-left font-medium">Durasi</td><td className="text-right">{formData.startTime} - {formData.endTime}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="border-t pt-3">
              <h2 className="font-bold mb-2">Data Pemesan</h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="text-left font-medium">Nama</td><td className="text-right">{formData.name}</td></tr>
                  <tr><td className="text-left font-medium">Telepon</td><td className="text-right">{formData.phone}</td></tr>
                  <tr><td className="text-left font-medium">Perusahaan</td><td className="text-right">{formData.company}</td></tr>
                  <tr><td className="text-left font-medium">Tanggal</td><td className="text-right">{formData.date}</td></tr>
                  <tr><td className="text-left font-medium">Peserta</td><td className="text-right">{formData.participants}</td></tr>
                  {formData.addSnack && snackData && (
                    <>
                      <tr><td className="text-left font-medium">Snack</td><td className="text-right">{snackData.name}</td></tr>
                      <tr><td className="text-left font-medium">Harga Snack</td><td className="text-right">Rp {snackPrice.toLocaleString()}</td></tr>
                    </>
                  )}
                  <tr><td className="text-left font-medium">Catatan</td><td className="text-right">{formData.note || '-'}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="border-t pt-3">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-bold text-left">Total</td>
                    <td className="text-right font-bold">Rp {total.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Konfirmasi Reservasi
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AddReservationForm;
