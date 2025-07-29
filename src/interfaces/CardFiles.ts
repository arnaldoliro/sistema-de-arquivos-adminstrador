export default interface CardFileProps {
  id: string;
  name: string;
  description: string;
  size: string;
  updated: string;
  icon: string;
  type: string;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
  onPin?: (id: string) => void;
  onUnpin?: (id: string) => void;
  onDelete?: (id: string) => void;
  pinLabel?: string;
}