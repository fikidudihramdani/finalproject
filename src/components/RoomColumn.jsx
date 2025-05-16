import ReservationCard from "./ReservationCard";

const RoomColumn = ({ room }) => {
  return (
    <div className="w-1/3 border-r p-2">
      <h3 className="text-center font-semibold">{room.name}</h3>
      <div className="mt-4 space-y-3">
        {room.reservations.map((res, idx) => (
          <ReservationCard key={idx} {...res} />
        ))}
      </div>
    </div>
  );
};

export default RoomColumn;
