import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToastNotificationProps from "@/interfaces/ToastNotificationProps";

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, icon, trigger }) => {
  // Estado interno removido, exibição controlada apenas pelo prop 'trigger'.

  return (
    <AnimatePresence>
      {trigger && message && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 right-6 z-[9999] bg-gray-800 text-white px-4 py-3 rounded-t-lg rounded-b-sm shadow-lg cursor-default"
          style={{ pointerEvents: trigger ? "auto" : "none" }}
        >
          <div className="flex items-center">
            {icon && <span className="mr-3">{icon}</span>}
            <span>{message}</span>
          </div>
          {/* Barra de progresso animada */}
          <motion.div
            key="progress-bar"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute left-0 bottom-0 h-1 bg-blue-500 rounded-b-lg"
            style={{ zIndex: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;