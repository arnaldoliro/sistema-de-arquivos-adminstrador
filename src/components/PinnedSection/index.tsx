import { useEffect, useState } from "react";
import { getFiles } from "@/utils/api";
import CardFile from "@/components/CardFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

export default function PinnedFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      setError(null);
      try {
        const data = await getFiles({ page: 1 });
        setFiles((data.files || data).filter((file: any) => file.fixado === true));
      } catch (err: any) {
        setError("Erro ao buscar arquivos fixados");
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
  const handleUnpin = (id: string) => {
    // TODO: Requisição para desafixar
  };
  const handleDelete = (id: string) => {
    // TODO: Requisição para excluir
  };
  
  if (!files.length) {
    return null;
  }
  return (
    <div className="mb-8 pinned-section rounded-lg p-4">
      <h4 className="text-xl font-bold text-gray-700 mb-4">
        Arquivos Fixados
        <FontAwesomeIcon icon={faThumbtack} className="ml-2 text-blue-600" />
      </h4>
      <div
        id="pinned-files"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {files.map(file => (
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
            onUnpin={handleUnpin}
            onDelete={handleDelete}
            pinLabel="Desafixar"
          />
        ))}
      </div>
    </div>
  );
}
