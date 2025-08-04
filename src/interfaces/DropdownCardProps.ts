export default interface DropdownCardProps {
  id: string;
  onEdit?: () => void;
  onDownload?: () => void;
  onPin?: () => void;
  onUnpin?: () => void;
  onDelete?: () => void;
  onRequestDelete: (id: string) => void;
  pinLabel?: string;
}