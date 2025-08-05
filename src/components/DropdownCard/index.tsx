import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faDownload,
  faThumbtack,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import DropdownCardProps from "@/interfaces/DropdownCardProps";
import ReactDOM from "react-dom";
import { downloadArquivo } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion"; // Import necessário

export default function DropdownCard({
  id,
  onEdit,
  onDownload,
  onPin,
  onUnpin,
  pinLabel = "Fixar",
  onRequestDelete
}: DropdownCardProps) {
  const [toast, setToast] = useState<{ message: string; icon?: React.ReactNode } | null>(null);

  const showToast = (message: string, icon?: React.ReactNode) => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      {toast && ReactDOM.createPortal(
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999]">
          <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out">
            {toast.icon}
            <span>{toast.message}</span>
          </div>
        </div>,
        document.body
      )}

      <AnimatePresence>
        <motion.div
          key="dropdown"
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {onEdit && (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-300"
              onClick={onEdit}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" /> Editar
            </button>
          )}
          {onDownload && (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-300"
              onClick={() => downloadArquivo(id)}
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" /> Baixar
            </button>
          )}
          {onPin && (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-300"
              onClick={() => {
                onPin();
                showToast("Arquivo fixado com sucesso!", <FontAwesomeIcon icon={faThumbtack} className="mr-2 text-green-400" />);
              }}
            >
              <FontAwesomeIcon icon={faThumbtack} className="mr-2" /> {pinLabel}
            </button>
          )}
          {onUnpin && (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-300"
              onClick={() => {
                onUnpin();
                showToast("Arquivo desafixado!", <FontAwesomeIcon icon={faThumbtack} className="mr-2 text-yellow-400" />);
              }}
            >
              <FontAwesomeIcon icon={faThumbtack} className="mr-2" /> Desafixar
            </button>
          )}
          {onRequestDelete && (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer transition-all duration-300"
              onClick={() => onRequestDelete(id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Excluir
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
