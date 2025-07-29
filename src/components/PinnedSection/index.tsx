
import { useState } from "react";

const pinnedFiles = [
  {
    id: "1",
    name: "Relatório Anual 2023.pdf",
    description: "Relatório financeiro completo do ano fiscal de 2023",
    size: "2.4 MB",
    updated: "15/04/2023",
    icon: "fa-file-pdf",
    type: "pdf"
  },
  {
    id: "2",
    name: "Manual do Usuário.docx",
    description: "Instruções detalhadas para novos usuários do sistema",
    size: "1.8 MB",
    updated: "03/05/2023",
    icon: "fa-file-word",
    type: "doc"
  }
];

export default function PinnedSection() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Funções para requisições futuras
  const handleEdit = (id: string) => {
    // TODO: Requisição para editar arquivo
    alert(`Editar arquivo ${id}`);
  };
  const handleDownload = (id: string) => {
    // TODO: Requisição para download
    alert(`Baixar arquivo ${id}`);
  };
  const handleUnpin = (id: string) => {
    // TODO: Requisição para desafixar
    alert(`Desafixar arquivo ${id}`);
  };
  const handleDelete = (id: string) => {
    // TODO: Requisição para excluir
    alert(`Excluir arquivo ${id}`);
  };

  return (
    <div className="mb-8 pinned-section rounded-lg p-4">
      <h4 className="text-md font-medium text-gray-700 mb-4">
        <i className="fas fa-thumbtack mr-2 text-blue-600"></i>
        Arquivos Fixados
      </h4>
      <div
        id="pinned-files"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {pinnedFiles.map(file => (
          <div key={file.id} className="file-card bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-3">
              <div className={`file-icon ${file.type}-icon`}>
                <i className={`fas ${file.icon}`}></i>
              </div>
              <div className="dropdown relative">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setOpenDropdown(openDropdown === file.id ? null : file.id)}
                >
                  <i className="fas fa-ellipsis-v"></i>
                </button>
                {openDropdown === file.id && (
                  <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleEdit(file.id)}
                    >
                      <i className="fas fa-edit mr-2"></i> Editar
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleDownload(file.id)}
                    >
                      <i className="fas fa-download mr-2"></i> Baixar
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleUnpin(file.id)}
                    >
                      <i className="fas fa-thumbtack mr-2"></i> Desafixar
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => handleDelete(file.id)}
                    >
                      <i className="fas fa-trash-alt mr-2"></i> Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
            <h5 className="font-medium text-gray-800 mb-1">{file.name}</h5>
            <p className="text-sm text-gray-500 mb-3">{file.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{file.size}</span>
              <span>Atualizado: {file.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
