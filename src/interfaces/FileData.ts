import FileType from "@/types/FileType";

export default interface FileData {
  id: number;
  name: string;
  description: string;
  type: FileType;
  date: string;
  pinned: boolean;
}