export default interface SectionFilesProps {
  showToast?: (msg: string, icon?: React.ReactNode) => void;
  onRequestDelete: (id: string) => void;
}