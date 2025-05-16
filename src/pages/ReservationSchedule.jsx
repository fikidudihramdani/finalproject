import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import RoomColumn from "@components/RoomColumn";

const ReservationSchedule = () => {
  const rooms = [
    {
      name: "Aster Room",
      reservations: [
        {
          title: "PT Maju Jaya",
          time: "13.00 - 15.00 WIB",
          status: "Done",
        },
        {
          title: "Organisasi Muslim Pusat",
          time: "13.00 - 15.00 WIB",
          status: "Up coming",
        },
      ],
    },
    {
      name: "Blubell Room",
      reservations: [
        {
          title: "PT XYZ Corp",
          time: "10.00 - 11.00 WIB",
          status: "In Progress",
        },
      ],
    },
    {
      name: "Camellia Room",
      reservations: [
        {
          title: "Alisa Company",
          time: "14.00 - 15.00 WIB",
          status: "Up coming",
        },
      ],
    },
  ];

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <input type="date" className="border rounded px-2 py-1" />
              <input type="date" className="border rounded px-2 py-1" />
              <button className="border border-orange-500 text-orange-500 px-3 py-1 rounded">Search</button>
              <button className="bg-orange-500 text-white px-3 py-1 rounded">+ Add New Reservation</button>
            </div>
          </div>

          <div className="flex border-t">
            {rooms.map((room, index) => (
              <RoomColumn key={index} room={room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSchedule;
