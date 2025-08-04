import CardFile from "@/components/CardFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useFiles } from "@/context/FilesContext";
import SectionFilesProps from "@/interfaces/SectionFilesProp";
import { editFile } from "@/utils/api";

export default function PinnedFiles({ showToast }: SectionFilesProps) {
  const { files = [], loading, error, fixFile } = useFiles();
  const { refreshFiles } = useFiles();

 const handleEdit = async (id: number, newName: string, newDescription: string) => {
   try {
     await editFile({
       id,
       nome: newName,
       descricao: newDescription
     });
     if (refreshFiles) {
       await refreshFiles();
     }
   } catch (error) {
     console.error("Erro ao editar arquivo:", error);
   }
 };
  const handleDownload = (id: string) => {
    // TODO: Requisição para download
  };
  const handleUnpin = async (id: string) => {
    try {
      await fixFile(Number(id), false);
      if (showToast) showToast("Arquivo desafixado com sucesso!", <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />);
    } catch (e) {
      if (showToast) showToast("Erro ao desafixar arquivo!", <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />);
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
            id={String(file.id)}
            nome={file.nome}
            descricao={file.descricao}
            categoria={file.categoria}
            size={file.size}
            criadoEm={new Date(file.criadoEm)}
            fixado={file.fixado}
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
