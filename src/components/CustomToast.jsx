import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const CustomToast = ({ message, type = "success", onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-white" : "bg-red-500";
  const Icon = type === "success" ? FiCheckCircle : FiXCircle;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-6 right-6 z-50 shadow border-l-4 border-orange-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`flex items-center gap-3 px-5 py-3 shadow-md ${bgColor}`}
          >
            <Icon className="text-xl" />
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;
