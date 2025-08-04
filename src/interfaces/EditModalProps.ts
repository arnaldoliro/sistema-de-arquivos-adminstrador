export default interface EditModalProps {
  fileId: any;
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialDescription?: string;
  onSave?: (name: string, description: string) => void;
}