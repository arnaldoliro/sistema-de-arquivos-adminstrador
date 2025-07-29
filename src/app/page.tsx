"use client";
import { useState } from "react";

type FileType = "pdf" | "doc" | "img" | "zip";
interface FileData {
  name: string;
  description: string;
  type: FileType;
  date: string;
  pinned: boolean;
}

type FilesState = Record<string, FileData>;

export default function Home() {
  // Estado para arquivos em memória
  const [files, setFiles] = useState<FilesState>({});
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string; visible: boolean }>({ message: "", type: "success", visible: false });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Função para adicionar arquivo
  function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.fileName as HTMLInputElement).value;
    const description = (form.fileDescription as HTMLInputElement).value;
    const type = (form.fileType as HTMLSelectElement).value as FileType;
    if (!name) return;
    const id = Date.now().toString();
    setFiles(prev => ({
      ...prev,
      [id]: { name, description, type, date: new Date().toLocaleDateString('pt-BR'), pinned: false }
    }));
    setShowUploadModal(false);
    setToast({ message: "Arquivo adicionado com sucesso!", type: "success", visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }

  // Renderização dos cards de arquivos
  const filteredFiles = Object.entries(files).filter(([id, file]) => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase()) || file.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = filter === "all" || file.type === filter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`toast bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg fixed top-4 right-4 z-50`}>
          {toast.message}
        </div>
      )}

      {/* Modais */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md flex flex-col gap-4" onSubmit={handleUpload}>
            <h2 className="text-lg font-bold mb-2">Upload de Arquivo</h2>
            <input name="fileName" type="text" placeholder="Nome do arquivo" className="border px-2 py-1 rounded" required />
            <input name="fileDescription" type="text" placeholder="Descrição" className="border px-2 py-1 rounded" />
            <select name="fileType" className="border px-2 py-1 rounded">
              <option value="pdf">PDF</option>
              <option value="doc">Documento</option>
              <option value="img">Imagem</option>
              <option value="zip">Arquivo Compactado</option>
            </select>
            <div className="flex gap-2 justify-end mt-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowUploadModal(false)}>Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Salvar</button>
            </div>
          </form>
        </div>
      )}
      {/* Edit Modal */}
      {/* ...modal de edição... */}
      {/* Delete Modal */}
      {/* ...modal de exclusão... */}

      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sistema de Arquivo ADM</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => setShowUploadModal(true)}>
          Upload de Arquivo
        </button>
      </header>

      {/* Barra de busca e filtro */}
      <div className="mb-4 flex gap-2">
        <input type="text" placeholder="Buscar arquivo..." className="border px-2 py-1 rounded w-full" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="border px-2 py-1 rounded" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="pdf">PDF</option>
          <option value="doc">Documento</option>
          <option value="img">Imagem</option>
          <option value="zip">Arquivo Compactado</option>
        </select>
      </div>

      {/* Cards de arquivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="all-files">
        {filteredFiles.length === 0 && (
          <div className="col-span-full text-center text-gray-500">Nenhum arquivo encontrado.</div>
        )}
        {filteredFiles.map(([id, file]) => (
          <div key={id} className="file-card bg-white rounded-lg shadow p-4 border-l-4 border-blue-500 flex flex-col gap-2" data-file-id={id} data-file-type={file.type}>
            <h5 className="font-bold text-lg">{file.name}</h5>
            <p className="text-sm text-gray-600">{file.description}</p>
            <span className="text-xs text-gray-400">Atualizado: {file.date}</span>
            {/* Botões de ação: editar, excluir, etc. */}
          </div>
        ))}
      </div>
    </div>
  );
}