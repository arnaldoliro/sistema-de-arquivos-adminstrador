export default interface CardFileProps {
  id: string;
  nome: string;
  descricao: string;
  size: string;
  categoria: string;
  criadoEm: Date;
  icon: string;
  type: string;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
  onPin?: (id: string) => void;
  onUnpin?: (id: string) => void;
  onDelete?: (id: string) => void;
  pinLabel?: string;
  fixado?: boolean;
}