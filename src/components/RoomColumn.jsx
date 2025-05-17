import ReservationCard from "./ReservationCard";

const RoomColumn = ({ room }) => {
  return (
    <div className="w-1/3 border border-gray-200 p-2">
      <h3 className="text-center font-semibold border-b border-gray-200 p-2">{room.name}</h3>
      <div className="mt-4 space-y-3">
        {room.reservations.map((res, idx) => (
          <ReservationCard key={idx} {...res} />
        ))}
      </div>
    </div>
  );
};

export default RoomColumn;
