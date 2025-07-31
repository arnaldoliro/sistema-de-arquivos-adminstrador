import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getFiles, fixFiles } from "@/utils/api";

interface File {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  size: string;
  criadoEm: string;
  icon: string;
  type: string;
  fixado?: boolean;
}

interface FilesContextType {
  files: File[];
  loading: boolean;
  error: string | null;
  refreshFiles: () => void;
  fixFile: (id: number, isPinned: boolean) => Promise<void>;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const useFiles = () => {
  const ctx = useContext(FilesContext);
  if (!ctx) throw new Error("useFiles must be used within FilesProvider");
  return ctx;
};

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFiles({ page: 1 });
      setFiles(data.files || data);
    } catch (err: any) {
      setError("Erro ao buscar arquivos");
    } finally {
      setLoading(false);
    }
  };

  const fixFile = async (id: number, isPinned: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await fixFiles(id, isPinned);
      await refreshFiles();
    } catch (err: any) {
      setError(isPinned ? "Erro ao fixar arquivo" : "Erro ao desafixar arquivo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  return (
    <FilesContext.Provider value={{ files, loading, error, refreshFiles, fixFile }}>
      {children}
    </FilesContext.Provider>
  );
};
