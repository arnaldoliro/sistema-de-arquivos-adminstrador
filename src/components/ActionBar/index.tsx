
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUpload } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../modals/UploadModal";

export default function ActionBar() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleOpenUpload = () => setIsUploadOpen(true);
  const handleCloseUpload = () => setIsUploadOpen(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Todos os Arquivos</h3>
          <p className="text-sm text-gray-500" id="file-count">Mostrando 8 arquivos</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <select id="filter-select" className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer">
              <option value="all">Todos os tipos</option>
              <option value="pdf">PDF</option>
              <option value="doc">Documentos</option>
              <option value="img">Imagens</option>
              <option value="zip">Arquivos ZIP</option>
            </select>
            <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
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