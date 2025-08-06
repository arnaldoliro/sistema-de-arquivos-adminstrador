import { ReactNode } from "react";

export type FilesProviderProps = {
  children: ReactNode;
  search?: string;
  page?: number;
};