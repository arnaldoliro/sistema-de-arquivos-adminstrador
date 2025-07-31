import CardFile from "@/components/CardFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useFiles } from "@/context/FilesContext";
import SectionFilesProps from "@/interfaces/SectionFilesProp";

export default function PinnedFiles({ showToast }: SectionFilesProps) {
  const { files = [], loading, error, fixFile } = useFiles();

  // Funções para requisições futuras
  const handleEdit = (id: string) => {
    // TODO: Requisição para editar arquivo
  };
  const handleDownload = (id: string) => {
    // TODO: Requisição para download
  };
  const handleUnpin = async (id: string) => {
    try {
      await fixFile(Number(id), false);
      if (showToast) showToast("Arquivo desafixado!", Date.now());
    } catch (e) {
      if (showToast) showToast("Erro ao desafixar arquivo!", Date.now());
    }
  };
  const handleDelete = (id: string) => {
    // TODO: Requisição para excluir
  };

  const pinnedFiles = files ? files.filter(file => file.fixado === true) : [];
  if (!pinnedFiles.length) {
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
        {pinnedFiles.map(file => (
          <CardFile
            key={file.id}
            id={file.id}
            nome={file.nome}
            descricao={file.descricao}
            categoria={file.categoria}
            size={file.size}
            criadoEm={file.criadoEm}
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
