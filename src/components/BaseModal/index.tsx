import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import BaseModalProps from "@/interfaces/BaseModalProps";

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  loading,
  success,
  error,
  message,
  icon,
}: BaseModalProps) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen && !show) return null;

  return (
    <AnimatePresence mode="wait">
      {(isOpen || loading || success || error) && (
        <motion.div
          key={success ? "success" : error ? "error" : loading ? "loading" : "form"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          {loading && (
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center gap-3"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-gray-700">Processando...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-lg shadow-xl p-6 text-center"
            >
              {icon}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-red-700 font-semibold"
              >
                {message}
              </motion.p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 15 }}
              className="bg-white rounded-lg flex flex-col justify-center items-center text-center shadow-xl w-full max-w-md p-6"
            >
              {icon}
              <p className="mt-4 text-green-700 font-semibold">{message}</p>
            </motion.div>
          )}

          {!loading && !error && !success && (
            <motion.div
              key="form"
              className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-all duration-300 cursor-pointer"
                    onClick={onClose}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                {children}
                {actions && <div className="flex justify-end mt-4">{actions}</div>}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
