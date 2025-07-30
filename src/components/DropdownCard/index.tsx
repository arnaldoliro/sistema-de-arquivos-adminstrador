import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faDownload,
  faThumbtack,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import DropdownCardProps from "@/interfaces/DropdownCardProps";
import DeleteModal from "../modals/DeleteModal";
import ReactDOM from "react-dom";
import ToastNotification from "../ToastNotification";

export default function DropdownCard({
  onEdit,
  onDownload,
  onPin,
  onUnpin,
  onDelete,
  pinLabel = "Fixar"
}: DropdownCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
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
          onClick={onDownload}
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" /> Baixar
        </button>
      )}
      {onPin && (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-300"
          onClick={() => {
            if (onPin) onPin();
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
            if (onUnpin) onUnpin();
            showToast("Arquivo desafixado!", <FontAwesomeIcon icon={faThumbtack} className="mr-2 text-yellow-400" />);
          }}
        >
          <FontAwesomeIcon icon={faThumbtack} className="mr-2" /> Desafixar
        </button>
      )}
      {onDelete && (
        <>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer transition-all duration-300"
            onClick={() => setShowDeleteModal(true)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Excluir
          </button> 
          {showDeleteModal && typeof window !== 'undefined' &&
            ReactDOM.createPortal(
              <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={() => {
                  if (onDelete) onDelete();
                  setShowDeleteModal(false);
                }}
              />,
              document.body
            )
          }
        </>
      )}
      </div>
    </>
  );
} 
