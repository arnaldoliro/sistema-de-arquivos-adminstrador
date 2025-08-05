import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import DeleteModalProps from "@/interfaces/DeleteModalProps";
import { deleteFile } from "@/utils/api";
import { useFiles } from "@/context/FilesContext";

export default function DeleteModal({ id, isOpen, onClose, onDelete }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { refreshFiles } = useFiles();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      setLoading(false);
      setSuccess(false);
      setError(false);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleDelete = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      await deleteFile(id);
      await refreshFiles();
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onDelete();
        onClose();
      }, 1200);
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      setLoading(false);
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0000007a] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            key="modal"
            ref={modalRef}
            className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin mb-4"></div>
                <p className="text-gray-700">Processando...</p>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faCheck} className="text-white text-3xl" />
                </div>
                <p className="text-green-700 font-semibold">Arquivo excluído com sucesso!</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-3xl" />
                </div>
                <p className="text-red-700 font-semibold">Erro ao excluir o arquivo!</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h3>
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <p className="mb-6 text-gray-700">
                  Tem certeza que deseja excluir este arquivo? Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-end">
                  <button
                    className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md cursor-pointer"
                    onClick={handleDelete}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
