import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCloudUploadAlt, faFile } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="upload-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay transparente */}
          <div
            className="absolute inset-0 bg-[#000000c9]"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Upload de Arquivo</h3>
                <button id="close-upload-modal" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center" id="drop-area">
                  <input type="file" id="file-input" className="hidden"/>
                  <div className="mb-4 text-blue-500">
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl" />
                  </div>
                  <p className="mb-2 text-gray-700">Arraste e solte arquivos aqui ou</p>
                  <button id="browse-files" className="text-blue-600 font-medium hover:text-blue-800">Procurar arquivos</button>
                  <p className="mt-2 text-sm text-gray-500">Tamanho máximo: 50MB</p>
                </div>
                <div id="file-preview" className="hidden mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-3 text-gray-500">
                      <FontAwesomeIcon icon={faFile} className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <p id="preview-filename" className="text-sm font-medium text-gray-700 truncate"></p>
                      <p id="preview-filesize" className="text-xs text-gray-500"></p>
                    </div>
                    <button id="remove-file" className="text-gray-400 hover:text-gray-600">
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div id="upload-progress" className="h-1 bg-blue-600 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="file-name" className="block text-sm font-medium text-gray-700 mb-1">Nome do arquivo</label>
                <input type="text" id="file-name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
              </div>
              <div className="mb-4">
                <label htmlFor="file-description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea id="file-description" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
              <div className="flex justify-end">
                <button id="cancel-upload" className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md" onClick={onClose}>Cancelar</button>
                <button id="confirm-upload" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">Upload</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}