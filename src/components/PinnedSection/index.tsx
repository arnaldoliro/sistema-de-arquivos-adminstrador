
import CardFile from "@/components/CardFile";

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
