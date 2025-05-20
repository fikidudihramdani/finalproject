import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@components/Sidebar';
import Header from '@components/Header';
import { FaEdit } from 'react-icons/fa';
import CustomToast from '@components/CustomToast';

const ReportTable = () => {
  const initialData = Array(100).fill(null).map((_, index) => ({
    date: '2024-10-01',
    roomName: index % 2 === 0 ? 'Aster Room' : 'Daisy Room',
    roomType: index % 3 === 0 ? 'Small' : index % 2 === 0 ? 'Medium' : 'Large',
    status: index % 3 === 0 ? 'Booked' : index % 2 === 0 ? 'Cancel' : 'Paid',
    capacity: index % 2 === 0 ? 10 : 20,
    pricePerHour: index % 2 === 0 ? 100000 : 200000,
    duration: index % 2 === 0 ? 2 : 4,
    totalParticipants: index % 2 === 0 ? 8 : 15,
    customerName: index % 2 === 0 ? 'Angela Thomas' : 'John Doe',
    phoneNumber: index % 2 === 0 ? '085123456789' : '081987654321',
    company: index % 2 === 0 ? 'PT Maju Jaya' : 'PT Sejahtera',
    snacks: [
      {
        category: 'Lunch',
        package: 'Packages Lunch 1 - Rp 20.000/box',
        quantity: index % 2 === 0 ? 8 : 15,
        pricePerBox: 20000
      }
    ]
  }));

  const [data, setData] = useState(initialData);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roomType, setRoomType] = useState('');
  const [status, setStatus] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [modalType, setModalType] = useState(null); // "paid" | "cancel"

  const statusColors = {
    Paid: 'bg-green-500',
    Booked: 'bg-yellow-500',
    Cancel: 'bg-red-500'
  };

  useEffect(() => {
    const filteredData = initialData.filter(item => {
      const matchDate = (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate);
      const matchRoomType = !roomType || item.roomType === roomType;
      const matchStatus = !status || item.status === status;
      return matchDate && matchRoomType && matchStatus;
    });
    setData(filteredData);
    setCurrentPage(1);
  }, [startDate, endDate, roomType, status]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsSlideOpen(true);
  };

  const calculateTotal = (item) => {
    const roomCost = item.pricePerHour * item.duration;
    const snackCost = item.snacks.reduce((total, snack) => total + (snack.pricePerBox * snack.quantity), 0);
    return roomCost + snackCost;
  };

  const DetailItem = ({ label, value }) => (
    <div className="flex justify-between border-b border-gray-200 pb-2">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleConfirmAction = () => {
    if (modalType === "paid") {
      setToastMsg("Reservation marked as paid.");
    } else if (modalType === "cancel") {
      setToastMsg("Reservation has been cancelled.");
    }
    setShowToast(true);
    setModalType(null);
    setIsSlideOpen(false); // Tutup slide bar
  };

  return (
    <>
      <div className="bg-gray min-h-screen flex">
        <aside className="fixed inset-y-0 left-0  shadow-lg z-30">
          <Sidebar />
        </aside>

        <main className="flex-1 ml-16 flex flex-col min-h-screen">
          <header className="sticky top-0 bg-white shadow z-20">
            <Header />
          </header>

          <section className="flex-1 p-3  overflow-auto">
            {/* Filter Section */}
            <div className='p-5 bg-white rounded'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Start Date</label>
                <input
                  type="date"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">End Date</label>
                <input
                  type="date"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Room Type</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="">All Types</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="">All Statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Booked">Booked</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto max-h-[650px] mt-10 rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">Date</th>
                    <th className="py-3 px-4 whitespace-nowrap">Room Name</th>
                    <th className="py-3 px-4 whitespace-nowrap">Room Type</th>
                    <th className="py-3 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y divide-gray-100">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition duration-200 cursor-pointer"
                      >
                        <td className="py-3 px-4 whitespace-nowrap">{item.date}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{item.roomName}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{item.roomType}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${statusColors[item.status] || 'bg-gray-500'}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(item)}
                            aria-label="Edit reservation"
                            className="text-orange-500 hover:text-orange-600 focus:outline-none"
                          >
                            <FaEdit size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls - Bottom */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 mt-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Show</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="p-2 border w-18 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={70}>70</option>
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
            </div>
          </section>

          {isSlideOpen && (
            <div
              className="fixed inset-0 bg-black opacity-25 z-30"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Slide Panel */}
          <AnimatePresence>
        {isSlideOpen && selectedItem && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-96 bg-white shadow-lg z-40 overflow-auto"
          >
            <div className="p-6 flex flex-col h-full">
              <button
                onClick={() => setIsSlideOpen(false)}
                className="self-end mb-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>

              <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">Detail Reservation</h2>

              <DetailItem label="Date" value={selectedItem.date} />
              <DetailItem label="Room Name" value={selectedItem.roomName} />
              <DetailItem label="Room Type" value={selectedItem.roomType} />
              <DetailItem label="Status" value={selectedItem.status} />
              <DetailItem label="Capacity" value={selectedItem.capacity} />
              <DetailItem label="Price Per Hour" value={`Rp ${selectedItem.pricePerHour.toLocaleString()}`} />
              <DetailItem label="Duration (hours)" value={selectedItem.duration} />
              <DetailItem label="Total Participants" value={selectedItem.totalParticipants} />
              <DetailItem label="Customer Name" value={selectedItem.customerName} />
              <DetailItem label="Phone Number" value={selectedItem.phoneNumber} />
              <DetailItem label="Company" value={selectedItem.company} />

              <div className="mt-4 border-t border-gray-300 pt-4">
                <h3 className="text-lg font-semibold mb-2">Snack Packages</h3>
                {selectedItem.snacks.map((snack, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="font-medium">{snack.category}</div>
                    <div className="text-sm text-gray-700">{snack.package}</div>
                    <div className="text-sm">
                      Quantity: <span className="font-semibold">{snack.quantity}</span>
                    </div>
                    <div className="text-sm">
                      Price per Box: Rp {snack.pricePerBox.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-300 space-y-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Cost:</span>
                  <span>Rp {calculateTotal(selectedItem).toLocaleString()}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    onClick={() => setModalType("paid")}
                  >
                    Paid
                  </button>
                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    onClick={() => setModalType("cancel")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Konfirmasi */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative"
            >
              {/* Tombol X di kanan atas modal */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setModalType(null)}
              >
                ×
              </button>

              <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
              <p className="mb-6">
                Are you sure you want to{" "}
                <strong>{modalType === "paid" ? "mark as paid" : "cancel"}</strong>{" "}
                this reservation?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setModalType(null)}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 text-white rounded ${
                    modalType === "paid" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={handleConfirmAction}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      {showToast && (
        <CustomToast
          message={toastMsg}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
        </main>
      </div>
    </>
  );
};

export default ReportTable;
