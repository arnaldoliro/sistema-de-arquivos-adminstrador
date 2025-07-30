
import CardFile from "@/components/CardFile";
import { filesData } from "@/data/FilesData";

export default function AllFilesSection() {

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
      <h4 className="text-md font-medium text-gray-700 mb-4">Todos os Arquivos</h4>
      <div id="all-files" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filesData.filter(file => !file.pinned).map((file: any) => (
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
