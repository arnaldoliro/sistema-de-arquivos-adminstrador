
import CardFile from "@/components/CardFile";
import { useEffect, useState } from "react";
import { getFiles } from "@/utils/api";

export default function AllFilesSection() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      setError(null);
      try {
        const data = await getFiles({ page: 1 });
        setFiles(data.files || data);
      } catch (err: any) {
        setError("Erro ao buscar arquivos");
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  // Funções para requisições futuras
  const handleEdit = (id: string) => {
    // TODO: Requisição para editar arquivo
  };
  const handleDownload = (id: string) => {
    // TODO: Requisição para download
  };
  const handlePin = (id: string) => {
    // TODO: Requisição para fixar
  };
  const handleDelete = (id: string) => {
    // TODO: Requisição para excluir
  };

  return (
    <div>
      <h4 className="text-xl text-gray-700 mb-4 font-bold">Todos os Arquivos</h4>
      {loading && <div className="text-center py-8 text-gray-500">Carregando arquivos...</div>}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}
      <div id="all-files" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.filter(file => !file.pinned).map((file: any) => (
          <CardFile
            key={file.id}
            id={file.id}
            name={file.name}
            description={file.description}
            size={file.size}
            updated={file.updated}
            icon={file.icon}
            type={file.type}
            onEdit={handleEdit}
            onDownload={handleDownload}
            onPin={handlePin}
            onDelete={handleDelete}
            pinLabel="Fixar"
          />
        ))}
      </div>
    </div>
  );
}
