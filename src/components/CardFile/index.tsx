import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileImage,
  faFileWord,
  faFileArchive,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import DropdownCard from "../DropdownCard";
import EditModal from "../modals/EditModal";
export default function CardFile(props: import("../../interfaces/CardFiles").default & { pinned?: boolean }) {
  const {
    id,
    nome,
    descricao,
    categoria,
    size,
    criadoEm,
    icon,
    type,
    onEdit,
    onDownload,
    onPin,
    onUnpin,
    onDelete,
    pinLabel = "Fixar",
    pinned
  } = props;
        // Converte criadoEm para dd/mm/yyyy
        function formatDate(date: string | Date): string {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          return `${day}/${month}/${year}`;
        }
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleEditClick = () => {
    setShowEditModal(true);
    setOpenDropdown(false);
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`w-fit bg-white rounded-lg shadow p-4 border-l-4 flex flex-col h-full ${pinned ? "border-blue-500" : "border-transparent"} hover:scale-105 transition-transform duration-300`}
      >
        <div className="flex justify-between items-start mb-3">
          <div className={`file-icon ${type}-icon`}>
            {categoria === "Documento" && <FontAwesomeIcon color="red" size="2xl" icon={faFilePdf} />}
            {categoria === "Imagem" && <FontAwesomeIcon color="green" size="2xl" icon={faFileImage} />}
            {categoria === "Planilha" && <FontAwesomeIcon color="blue" size="2xl" icon={faFileWord} />}
            {categoria === "Outros" && <FontAwesomeIcon color="orange" size="2xl" icon={faFileArchive} />}
          </div>
          <div className="dropdown relative">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer rounded-full hover:bg-gray-200 transition duration-300"
              onClick={() => setOpenDropdown(!openDropdown)}
              aria-label="Abrir menu de opções"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {openDropdown && (
              <DropdownCard
                onEdit={handleEditClick}
                onDownload={onDownload ? () => { onDownload(id); setOpenDropdown(false); } : undefined}
                onPin={onPin ? () => { onPin(id); setOpenDropdown(false); } : undefined}
                onUnpin={onUnpin ? () => { onUnpin(id); setOpenDropdown(false); } : undefined}
                onDelete={onDelete ? () => { onDelete(id); setOpenDropdown(false); } : undefined}
                pinLabel={pinLabel}
              />
            )}
          </div>
        </div>
        <h5 className="text-gray-800 mb-1 font-semibold break-words">{nome}</h5>
        <p className="text-sm text-gray-500 mb-3 break-words">{descricao}</p>
        <div className="flex justify-between flex-wrap gap-2 mt-auto mb-0 text-xs text-gray-500">
          <span className="break-words">{categoria}</span>
          <span className="break-words">Criado em: {formatDate(criadoEm)}</span>
        </div>
      </div>
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        initialName={nome}
        initialDescription={descricao}
        onSave={onEdit ? () => onEdit(id) : undefined}
      />
    </>
  );
}
