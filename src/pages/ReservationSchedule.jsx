import React, { useState } from "react";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import RoomColumn from "@components/RoomColumn";
import AddReservationForm from "@components/ReservationForm";

const ReservationSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([
    {
      name: "Aster Room",
      price: 1000,
      reservations: [
        { title: "PT Maju Jaya", time: "13.00 - 15.00 WIB", status: "Done" },
        { title: "Organisasi Muslim Pusat", time: "13.00 - 15.00 WIB", status: "Up coming" },
      ],
    },
    {
      name: "Blubell Room",
      price: 1000,
      reservations: [
        { title: "PT XYZ Corp", time: "10.00 - 11.00 WIB", status: "In Progress" },
      ],
    },
    {
      name: "Camellia Room",
      price: 1000,
      reservations: [
        { title: "Alisa Company", time: "14.00 - 15.00 WIB", status: "Up coming" },
      ],
    },
  ]);

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}.00`);

  const [formData, setFormData] = useState({
    room: "",
    name: "",
    phone: "",
    company: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    snack: "",
    addSnack: false,
    note: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddReservation = (data) => {
    // Gunakan data dari form submit
    const { room, company, startTime, endTime } = data;

    if (!room || !company || !startTime || !endTime) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedRooms = rooms.map((r) => {
      if (r.name === room) {
        return {
          ...r,
          reservations: [
            ...r.reservations,
            {
              title: company,
              time: `${startTime} - ${endTime} WIB`,
              status: "Up coming",
            },
          ],
        };
      }
      return r;
    });

    setRooms(updatedRooms);
    setIsSidebarOpen(false);
    setFormData({
      room: "",
      name: "",
      phone: "",
      company: "",
      date: "",
      startTime: "",
      endTime: "",
      participants: "",
      snack: "",
      addSnack: false,
      note: "",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed inset-y-0 left-0 bg-white shadow z-30">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 ml-16">
        <div className="sticky top-0 z-20 bg-white shadow">
          <Header />
        </div>

        <div className="p-4">
          <div className="mb-4 bg-white p-4 shadow rounded">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
              <h2 className="text-gray-700 font-medium border-r pr-4 md:w-auto w-full md:text-base text-sm">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <input type="date" className="border rounded px-3 py-2 text-sm w-full md:w-auto flex-1" />
              <input type="date" className="border rounded px-3 py-2 text-sm w-full md:w-auto flex-1" />
              <button className="border border-orange-500 text-orange-500 px-4 py-2 text-sm rounded hover:bg-orange-50">Search</button>
              <button
                className="bg-orange-500 text-white px-4 py-2 text-sm rounded hover:bg-orange-600"
                onClick={() => setIsSidebarOpen(true)}
              >
                + Add New Reservation
              </button>
            </div>
          </div>

          <div className="rounded bg-white shadow p-6 scrollbar-thin">
            <div className="min-w-full overflow-scroll h-90 xl:h-180">
              <div className="flex min-w-[1000px]">
                <div className="w-[100px]">
                  <div className="h-[48px]"></div>
                  {timeSlots.map((time, idx) => (
                    <div key={idx} className="h-[60px] text-sm text-gray-600 flex items-start justify-center pt-2">
                      {time}
                    </div>
                  ))}
                </div>

                {rooms.map((room, index) => (
                  <RoomColumn key={index} room={room} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <AddReservationForm
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSubmit={handleAddReservation}
        rooms={rooms}
        snacks={[{ name: 'Snack A', price: 10000 }, { name: 'Snack B', price: 10000 }]}
      />
    </div>
  );
};

export default ReservationSchedule;
