import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ isOpen, onClose, onDelete }: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#00000093] w-screen h-screen items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
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
                  className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
                  onClick={onDelete}
                >
                  Excluir
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}