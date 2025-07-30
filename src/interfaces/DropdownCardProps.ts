export default interface DropdownCardProps {
  onEdit?: () => void;
  onDownload?: () => void;
  onPin?: () => void;
  onUnpin?: () => void;
  onDelete?: () => void;
  pinLabel?: string;
}