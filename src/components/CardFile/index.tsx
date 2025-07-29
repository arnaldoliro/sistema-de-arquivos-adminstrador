import { useState } from "react";


import DropdownCard from "../DropdownCard";

export default function CardFile({
  id,
  name,
  description,
  size,
  updated,
  icon,
  type,
  onEdit,
  onDownload,
  onPin,
  onUnpin,
  onDelete,
  pinLabel = "Fixar",
  pinned
}: import("../../interfaces/CardFiles").default & { pinned?: boolean }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className={`file-card bg-white rounded-lg shadow p-4 border-l-4 ${pinned ? "border-blue-500" : "border-transparent"}`}>
      <div className="flex justify-between items-start mb-3">
        <div className={`file-icon ${type}-icon`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div className="dropdown relative">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setOpenDropdown(!openDropdown)}
            aria-label="Abrir menu de opções"
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          {openDropdown && (
            <DropdownCard
              onEdit={onEdit ? () => { onEdit(id); setOpenDropdown(false); } : undefined}
              onDownload={onDownload ? () => { onDownload(id); setOpenDropdown(false); } : undefined}
              onPin={onPin ? () => { onPin(id); setOpenDropdown(false); } : undefined}
              onUnpin={onUnpin ? () => { onUnpin(id); setOpenDropdown(false); } : undefined}
              onDelete={onDelete ? () => { onDelete(id); setOpenDropdown(false); } : undefined}
              pinLabel={pinLabel}
            />
          )}
        </div>
      </div>
      <h5 className="font-medium text-gray-800 mb-1">{name}</h5>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{size}</span>
        <span>Atualizado: {updated}</span>
      </div>
    </div>
  );
}
