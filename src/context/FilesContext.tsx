import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { getFiles, fixFiles } from "@/utils/api";
import { FilesProviderProps } from "@/types/FilesProviderProps";

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
  filteredFiles: File[];
  loading: boolean;
  error: string | null;
  refreshFiles: () => void;
  fixFile: (id: number, isPinned: boolean) => Promise<void>;
  setCategoryFilter: (category: string) => void;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const useFiles = () => {
  const ctx = useContext(FilesContext);
  if (!ctx) throw new Error("useFiles must be used within FilesProvider");
  return ctx;
};

export const FilesProvider = ({ children, search = "", page = 1 }: FilesProviderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredFiles = useMemo(() => {
    if (!categoryFilter) return files;
    return files.filter(file => file.categoria === categoryFilter);
  }, [files, categoryFilter]);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFiles({
        page,
        search,
        category: categoryFilter ?? undefined,
      });
      setFiles(data.files || data);
    } catch (err: any) {
      setError("Erro ao buscar arquivos");
    } finally {
      setLoading(false);
    }
  };

  const refreshFiles = async () => {
    await fetchFiles();
  };

  const fixFile = async (id: number, isPinned: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await fixFiles(id, isPinned);
      await fetchFiles();
    } catch (err: any) {
      setError(isPinned ? "Erro ao fixar arquivo" : "Erro ao desafixar arquivo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [search, categoryFilter, page]); // <-- adiciona page aqui

  return (
    <FilesContext.Provider
      value={{
        files,
        filteredFiles,
        loading,
        error,
        refreshFiles,
        fixFile,
        setCategoryFilter,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
