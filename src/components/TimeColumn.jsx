const TimeColumn = ({ timeSlots }) => {
  return (
    <div className="w-[100px]">
      <div className="h-[48px]"></div>
      {timeSlots.map((time, idx) => (
        <div key={idx} className="text-sm text-gray-600 p-2 border-t h-[60px]">
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeColumn;
