import React, { useState } from "react";
import BaseModal from "../BaseModal";
import { editFile } from "@/utils/api";
import { useFiles } from "@/context/FilesContext";
import EditModalProps from "@/interfaces/EditModalProps";

export default function EditModal({ isOpen, onClose, initialName = "", initialDescription = "", fileId, onSave }: EditModalProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  
  const resetForm = () => {
    setName(initialName);
    setDescription(initialDescription);
    setMessage("");
    setError(false);
    setSuccess(false);
    setLoading(false);
  };

  const { refreshFiles } = useFiles();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      setMessage("Preencha todos os campos obrigatórios.");
      setError(true);
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
      return;
    }

    setLoading(true);
    setError(false);
    setSuccess(false);
    setMessage("");

    try {
      await editFile({
        id: fileId,
        nome: name,
        descricao: description,
      });

      if (refreshFiles) {
        await refreshFiles();
      }

      setLoading(false);
      setSuccess(true);
      setMessage("Arquivo editado com sucesso!");
      
      if (onSave) onSave(name, description);
      
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
        resetForm();
        onClose();
      }, 1800);
    } catch (err) {
      setLoading(false);
      setError(true);
      setMessage(err instanceof Error ? err.message : "Erro ao editar arquivo!");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => { resetForm(); onClose(); }}
      title="Editar Arquivo"
      loading={loading}
      success={success}
      error={error}
      message={message}
      icon={success ? <span className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto"><span className="text-white text-2xl">✔</span></span> : error ? <span className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto"><span className="text-white text-2xl">✖</span></span> : null}
      actions={null}
    >
      <form onSubmit={handleSave} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="edit-file-name" className="block text-sm font-medium text-gray-700 mb-1">Nome do arquivo</label>
          <input type="text" id="edit-file-name" value={name} onChange={e => setName(e.target.value)} className="text-gray-500 transition-all duration-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div className="mb-4">
          <label htmlFor="edit-file-description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea id="edit-file-description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="text-gray-500 transition-all duration-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
        </div>
        <div className="flex justify-end">
          <button type="button" className="mr-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-all duration-300" onClick={() => { resetForm(); onClose(); }} disabled={loading}>Cancelar</button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer transition-all duration-300" disabled={loading}>Salvar</button>
        </div>
      </form>
    </BaseModal>
  )
}
