export default interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  message?: string;
  icon?: React.ReactNode;
}