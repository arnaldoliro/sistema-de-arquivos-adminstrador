
import CardFile from "@/components/CardFile";
import { useFiles } from "@/context/FilesContext";

export default function AllFilesSection() {
  const { files, loading, error, fixFile } = useFiles();

  // Funções para requisições futuras
  const handleEdit = (id: string) => {
    // TODO: Requisição para editar arquivo
  };
  const handleDownload = (id: string) => {
    // TODO: Requisição para download
  };
  const handlePin = (id: string) => {
    fixFile(Number(id), true);
  };
  const handleDelete = (id: string) => {
    // TODO: Requisição para excluir
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex bg-white rounded-lg shadow-lg px-8 py-6 gap-2 items-center animate-pulse">
          <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-blue-600 font-semibold text-lg">Carregando arquivos...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="bg-red-100 rounded-lg shadow-lg px-8 py-6 flex gap-2 items-center animate-fade-in">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-600 font-semibold text-lg">{error}</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h4 className="text-xl text-gray-700 mb-4 font-bold">Todos os Arquivos</h4>
      <div id="all-files" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.filter(file => file.fixado === false).map((file: any) => (
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
            onPin={handlePin}
            onDelete={handleDelete}
            pinLabel="Fixar"
          />
        ))}
      </div>
    </div>
  );
}
