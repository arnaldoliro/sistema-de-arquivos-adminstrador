
import { useState } from "react";
import CardFile from "@/components/CardFile";

const allFiles = [
  {
    id: "3",
    name: "Contrato de Serviço.pdf",
    description: "Termos e condições para prestação de serviços",
    size: "1.2 MB",
    updated: "10/03/2023",
    icon: "fa-file-pdf",
    type: "pdf"
  },
  {
    id: "4",
    name: "Logo da Empresa.png",
    description: "Logotipo oficial em alta resolução",
    size: "3.5 MB",
    updated: "22/02/2023",
    icon: "fa-file-image",
    type: "img"
  },
  {
    id: "5",
    name: "Plano de Marketing.docx",
    description: "Estratégia de marketing para o próximo trimestre",
    size: "2.1 MB",
    updated: "05/04/2023",
    icon: "fa-file-word",
    type: "doc"
  },
  {
    id: "6",
    name: "Recursos Gráficos.zip",
    description: "Pacote de ícones e imagens para o site",
    size: "15.8 MB",
    updated: "18/03/2023",
    icon: "fa-file-archive",
    type: "zip"
  },
  {
    id: "7",
    name: "Política de Privacidade.pdf",
    description: "Documento legal sobre tratamento de dados",
    size: "0.9 MB",
    updated: "12/01/2023",
    icon: "fa-file-pdf",
    type: "pdf"
  },
  {
    id: "8",
    name: "Banner Promocional.jpg",
    description: "Imagem para campanha de marketing digital",
    size: "4.2 MB",
    updated: "28/04/2023",
    icon: "fa-file-image",
    type: "img"
  }
];

export default function AllFilesSection() {
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
  const handlePin = (id: string) => {
    // TODO: Requisição para fixar
    alert(`Fixar arquivo ${id}`);
  };
  const handleDelete = (id: string) => {
    // TODO: Requisição para excluir
    alert(`Excluir arquivo ${id}`);
  };

  return (
    <div>
      <h4 className="text-md font-medium text-gray-700 mb-4">Todos os Arquivos</h4>
      <div id="all-files" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allFiles.map(file => (
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
