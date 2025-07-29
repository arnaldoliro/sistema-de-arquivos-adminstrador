import React from "react";

export interface DropdownCardProps {
  onEdit?: () => void;
  onDownload?: () => void;
  onPin?: () => void;
  onUnpin?: () => void;
  onDelete?: () => void;
  pinLabel?: string;
}

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
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onEdit}
        >
          <i className="fas fa-edit mr-2"></i> Editar
        </button>
      )}
      {onDownload && (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onDownload}
        >
          <i className="fas fa-download mr-2"></i> Baixar
        </button>
      )}
      {onPin && (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onPin}
        >
          <i className="fas fa-thumbtack mr-2"></i> {pinLabel}
        </button>
      )}
      {onUnpin && (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onUnpin}
        >
          <i className="fas fa-thumbtack mr-2"></i> Desafixar
        </button>
      )}
      {onDelete && (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          onClick={onDelete}
        >
          <i className="fas fa-trash-alt mr-2"></i> Excluir
        </button>
      )}
    </div>
  );
}
