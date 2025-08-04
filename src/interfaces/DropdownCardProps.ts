export default interface DropdownCardProps {
  id: string;
  onEdit?: () => void;
  onDownload?: () => void;
  onPin?: () => void;
  onUnpin?: () => void;
  onDelete?: () => void;
  pinLabel?: string;
}