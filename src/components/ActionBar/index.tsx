
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch, faUpload } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../modals/UploadModal";
import SelectCategory from "../SelectCategory";
import { useFiles } from "@/context/FilesContext";

export default function ActionBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
   const { setCategoryFilter } = useFiles();

  const handleOpenUpload = () => setIsUploadOpen(true);
  const handleCloseUpload = () => setIsUploadOpen(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Todos os Arquivos</h3>
          <p className="text-sm text-gray-500" id="file-count">Mostrando 12 arquivos</p>
        </div>
        <div className="relative w-[40%] mx-4">
          <input
            type="text"
            placeholder="Buscar arquivos..."
            className="text-gray-600 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400"><FontAwesomeIcon icon={faSearch} /></span>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <SelectCategory onFilterChange={setCategoryFilter}/>
          <button
            id="upload-button"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300"
            onClick={handleOpenUpload}
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            <span>Enviar Arquivo</span>
          </button>
        </div>
      </div>
      <UploadModal isOpen={isUploadOpen} onClose={handleCloseUpload} />
    </>
  );
}