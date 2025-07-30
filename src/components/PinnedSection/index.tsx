import CardFile from "@/components/CardFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { filesData } from "@/data/FilesData";

const pinnedFiles = filesData.filter(file => file.pinned);

export default function PinnedSection() {

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

  return (
    <div className="mb-8 pinned-section rounded-lg p-4">
      <h4 className="text-md font-medium text-gray-700 mb-4">
        <FontAwesomeIcon icon={faThumbtack} className="mr-2 text-blue-600" />
        Arquivos Fixados
      </h4>
      <div
        id="pinned-files"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {pinnedFiles.map(file => (
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
