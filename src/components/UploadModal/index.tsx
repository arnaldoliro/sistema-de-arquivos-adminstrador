import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCloudUploadAlt, faFile, faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import UploadModalProps from "@/interfaces/UploadModalProps";

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [mimeType, setMimeType] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const resetForm = () => {
    setNome("");
    setDescricao("");
    setArquivo(null);
    setMensagem("");
    setOriginalFileName("");
    setMimeType("");
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      resetForm();
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arquivo) {
      setMensagem("Selecione um arquivo.");
      setError(true);
      setTimeout(() => {
        setError(false);
        setMensagem("");
      }, 2000);
      return;
    }
    setMensagem("");
    setError(false);
    setSuccess(false);
    setLoading(true);
    // Simula upload
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const isSuccess = Math.random() > 0.3;
    setLoading(false);
    if (isSuccess) {
      setSuccess(true);
      setMensagem("Arquivo enviado com sucesso!");
      setTimeout(() => {
        setSuccess(false);
        setMensagem("");
        onClose();
        resetForm();
      }, 1800);
    } else {
      setError(true);
      setMensagem("Erro ao enviar arquivo!");
      setTimeout(() => {
        setError(false);
        setMensagem("");
      }, 2000);
    }
  };

  if (!isOpen && !show) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center gap-3">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-gray-700">Enviando arquivo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white rounded-lg shadow-xl p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto"
          >
            <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-red-700 font-semibold"
          >
            {mensagem}
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 15 }}
          className="bg-white rounded-lg flex flex-col justify-center items-center text-center shadow-xl w-full max-w-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Enviar Novo Arquivo</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center text-center mx-auto mt-3 justify-center">
            <FontAwesomeIcon icon={faCheck} className="text-white text-2xl" />
          </div>
          <p className="mt-4 text-green-700 font-semibold">{mensagem}</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#000000c9] flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <motion.div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Enviar Arquivo</h3>
            <button id="close-upload-modal" className="text-gray-500 hover:text-gray-700 transition-all duration-300 cursor-pointer" onClick={() => { onClose(); resetForm(); }}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="mb-6">
              <div className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center" id="drop-area">
                <input type="file" id="file-input" className="hidden" ref={fileInputRef} onChange={e => {
                  const file = e.target.files?.[0] || null;
                  setArquivo(file);
                  if (file) {
                    setOriginalFileName(file.name);
                    setMimeType(file.type);
                  }
                }} />
                <label htmlFor="file-input" className="cursor-pointer">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-blue-500 mb-2" />
                  <p className="text-gray-700">Clique para selecionar ou arraste um arquivo</p>
                </label>
                {arquivo && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Arquivo selecionado:</p>
                    <p className="text-blue-600 font-medium break-all">{arquivo.name}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="file-name" className="block text-sm font-medium text-gray-700 mb-1">Nome do arquivo</label>
              <input type="text" id="file-name" value={nome} onChange={e => setNome(e.target.value)} required className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" />
            </div>
            <div className="mb-4">
              <label htmlFor="file-description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea id="file-description" value={descricao} onChange={e => setDescricao(e.target.value)} rows={3} className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"></textarea>
            </div>
            <div className="flex justify-end">
              <button type="button" className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-all duration-300" onClick={() => { onClose(); resetForm(); }} disabled={isLoading}>Cancelar</button>
              <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer transition-all duration-300" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}