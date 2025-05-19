import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportTable = () => {
    const initialData = Array(20).fill().map((_, index) => ({
        date: '01/10/2024',
        roomName: 'Aster Room',
        roomType: 'Small',
        status: index % 3 === 0 ? 'Booked' : index % 2 === 0 ? 'Cancel' : 'Paid'
    }));

    const [data, setData] = useState(initialData);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [roomType, setRoomType] = useState('');
    const [status, setStatus] = useState('');
    const [isSlideOpen, setIsSlideOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const statusColors = {
        Paid: 'bg-green-500',
        Booked: 'bg-orange-500',
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
    }, [startDate, endDate, roomType, status]);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsSlideOpen(true);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-4 gap-4 mb-6">
                <input type="date" className="p-2 border rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" className="p-2 border rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <select className="p-2 border rounded" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                    <option value="">Select Room Type</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
                <select className="p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Booked">Booked</option>
                    <option value="Cancel">Cancel</option>
                </select>
            </div>

            <table className="w-full bg-white rounded-lg shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-3 px-4">Date Reservation</th>
                        <th className="py-3 px-4">Room Name</th>
                        <th className="py-3 px-4">Room Type</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{item.date}</td>
                            <td className="py-3 px-4">{item.roomName}</td>
                            <td className="py-3 px-4">{item.roomType}</td>
                            <td className="py-3 px-4">
                                <span className={`px-3 py-1 text-white rounded-full ${statusColors[item.status]}`}>{item.status}</span>
                            </td>
                            <td className="py-3 px-4">
                                <button onClick={() => handleEdit(item)} className="text-orange-500 hover:text-orange-600">✏️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AnimatePresence>
                {isSlideOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-6"
                    >
                        <h2 className="text-lg font-semibold mb-4">Edit Reservation</h2>
                        <p><strong>Date:</strong> {selectedItem.date}</p>
                        <p><strong>Room Name:</strong> {selectedItem.roomName}</p>
                        <p><strong>Room Type:</strong> {selectedItem.roomType}</p>
                        <p><strong>Status:</strong> {selectedItem.status}</p>
                        <button onClick={() => setIsSlideOpen(false)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Close</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReportTable;
