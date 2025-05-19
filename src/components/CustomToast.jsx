import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const CustomToast = ({ message, type = "success", onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  const bgColor =
    type === "success" ? "bg-white" : "bg-red-500";
  const Icon = type === "success" ? FiCheckCircle : FiXCircle;

  return (
    <div className={`fixed top-26 right-5 z-50 shadow  border-l-4 border-orange-400`}>
      <div
        className={`flex items-center gap-3  px-5 py-3 shadow-md animate-slide-up ${bgColor}`}
      >
        <Icon className="text-xl" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default CustomToast;
