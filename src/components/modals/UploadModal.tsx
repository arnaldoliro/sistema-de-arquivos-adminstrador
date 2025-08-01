import React, { useState, useRef } from "react";
import BaseModal from "../BaseModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { uploadFile } from "@/utils/api"; // ajuste o caminho se necessário
import { useFiles } from "@/context/FilesContext";


export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lotacao, setLotacao] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refreshFiles } = useFiles();

  const resetForm = () => {
    setNome("");
    setDescricao("");
    setArquivo(null);
    setMensagem("");
    setCategoria("");
    setLotacao("");
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
    if (!nome || !categoria || !lotacao) {
      setMensagem("Preencha todos os campos obrigatórios.");
      setError(true);
      setTimeout(() => {
        setError(false);
        setMensagem("");
      }, 2000);
      return;
    }
    setLoading(true);
    setError(false);
    setSuccess(false);
    setMensagem("");

    try {
      // Lê o arquivo como base64
      const fileContent = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(arquivo);
      });

      // Remove o prefixo "data:...;base64,"
      const base64 = fileContent.split(",")[1];

      await uploadFile({
        nome,
        descricao,
        categoria,
        lotacao,
        conteudo: base64,
        originalFileName: arquivo.name,
        mimeType: arquivo.type,
        isPinned: false,
      });
      await refreshFiles();

      setLoading(false);
      setSuccess(true);
      setMensagem("Arquivo enviado com sucesso!");
      setTimeout(() => {
        setSuccess(false);
        setMensagem("");
        onClose();
        resetForm();
      }, 1800);
    } catch (err) {
      setLoading(false);
      setError(true);
      setMensagem("Erro ao enviar arquivo!");
      setTimeout(() => {
        setError(false);
        setMensagem("");
      }, 2000);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => { onClose(); resetForm(); }}
      title="Enviar Arquivo"
      loading={loading}
      success={success}
      error={error}
      message={mensagem}
      icon={success ? <span className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto"><FontAwesomeIcon icon={faCheck} className="text-white text-2xl" /></span> : error ? <span className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto"><FontAwesomeIcon icon={faTimes} className="text-white text-2xl" /></span> : null}
      actions={null}
    >
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="mb-6">
          <div className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center" id="drop-area">
            <input type="file" id="file-input" className="hidden" ref={fileInputRef} onChange={e => {
              const file = e.target.files?.[0] || null;
              setArquivo(file);
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
        <div className="mb-4">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
              <option value="">Selecione uma categoria</option>
              <option value="Documento">Documentos</option>
              <option value="Imagem">Imagens</option>
              <option value="Planilha">Planilhas</option>
              <option value="Apresentacao">Apresentação</option>
              <option value="Outros">Outros</option>
            </select>
        </div>
        <div className="mb-4">
          <label htmlFor="lotacao" className="block text-sm font-medium text-gray-700 mb-1">Lotação</label>
          <select id="lotacao" value={lotacao} onChange={e => setLotacao(e.target.value)} className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
            <option value="">Selecione a lotação</option>
            <option value="Gerência Comercial">Gerência Comercial</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="button" className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-all duration-300" onClick={() => { onClose(); resetForm(); }} disabled={loading}>Cancelar</button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer transition-all duration-300" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
