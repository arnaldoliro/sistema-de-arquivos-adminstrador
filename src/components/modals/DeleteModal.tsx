import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import DeleteModalProps from "@/interfaces/DeleteModalProps";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Simula sucesso/erro
    const isSuccess = Math.random() > 0.2;
    setLoading(false);
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onDelete();
        onClose();
      }, 1200);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1200);
    }
  };

  if (!isOpen && !show) return null;

  return (
    <AnimatePresence mode="wait">
      {(isOpen || show) && (
        <motion.div
          className="fixed inset-0 bg-[#00000093] flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <div onClick={e => e.stopPropagation()} className="w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {loading && (
              <motion.div
                key="loading"
                className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 flex flex-col items-center justify-center p-8"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin mb-4"></div>
                <p className="text-gray-700">Processando...</p>
              </motion.div>
            )}
            {success && (
              <motion.div
                key="success"
                className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 flex flex-col items-center justify-center p-8"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faCheck} className="text-white text-3xl" />
                </span>
                <p className="text-green-700 font-semibold">Arquivo excluído com sucesso!</p>
              </motion.div>
            )}
            {error && (
              <motion.div
                key="error"
                className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 flex flex-col items-center justify-center p-8"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-3xl" />
                </span>
                <p className="text-red-700 font-semibold">Erro ao excluir arquivo!</p>
              </motion.div>
            )}
            {!loading && !success && !error && (
              <motion.div
                key="default"
                className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                  <p className="mb-6 text-gray-700">Tem certeza que deseja excluir este arquivo? Esta ação não pode ser desfeita.</p>
                  <div className="flex justify-end">
                    <button
                      className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-all duration-300"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md cursor-pointer transition-all duration-300"
                      onClick={handleDelete}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}