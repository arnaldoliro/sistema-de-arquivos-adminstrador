import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faDownload,
  faThumbtack,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import DropdownCardProps from "@/interfaces/DropdownCardProps";

export default function DropdownCard({
  onEdit,
  onDownload,
  onPin,
  onUnpin,
  onDelete,
  pinLabel = "Fixar"
}: DropdownCardProps) {
  return (
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
          onClick={onPin}
        >
          <FontAwesomeIcon icon={faThumbtack} className="mr-2" /> {pinLabel}
        </button>
      )}
      {onUnpin && (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-300"
          onClick={onUnpin}
        >
          <FontAwesomeIcon icon={faThumbtack} className="mr-2" /> Desafixar
        </button>
      )}
      {onDelete && (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer transition-all duration-300"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Excluir
        </button>
      )}
    </div>
  );
}
