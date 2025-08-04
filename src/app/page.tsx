"use client";
import React from "react";
import ActionBar from "@/components/ActionBar";
import AllFilesSection from "@/components/AllFilesSection";
import Navbar from "@/components/Navbar";
import PinnedSection from "@/components/PinnedSection";
import Sidebar from "@/components/Sidebar";
import ToastNotification from "@/components/ToastNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronLeft, faChevronRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FilesProvider } from "@/context/FilesContext";
import { deleteFile } from "@/utils/api";
import DeleteModal from "@/components/modals/DeleteModal";

export default function Home() {
  const [toast, setToast] = React.useState<{ message: string; icon?: React.ReactNode; trigger: boolean; id?: number }>({ message: "", icon: undefined, trigger: false, id: 0 });
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState<string | null>(null);

  // Função para disparar o toast
  const toastTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const showToast = (message: string, icon?: React.ReactNode) => {
    setToast({
      message,
      icon,
      trigger: true,
      id: Date.now()
    });
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
    }
    toastTimeout.current = setTimeout(() => {
      setToast(t => ({ ...t, trigger: false }));
      toastTimeout.current = null;
    }, 3000);
  };

  function openDeleteModal(id: string) {
  setIdToDelete(id);
  setModalOpen(true);
  }

  function closeDeleteModal() {
    setModalOpen(false);
    setIdToDelete(null);
  }

  async function handleDelete() {
  if (!idToDelete) return;
  try {
    await deleteFile(idToDelete);
    showToast("Arquivo excluído com sucesso!", <FontAwesomeIcon icon={faCheck} className="text-green-500" />);
    closeDeleteModal();
    setIdToDelete(null);

  } catch (error) {
    showToast("Erro ao excluir arquivo!", <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400" />);
  }
}

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
       <FilesProvider search={search}>
        <Navbar onSearch={setSearch} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <ActionBar />
              {/* ToastNotification global */}
              <DeleteModal
                isOpen={modalOpen}
                id={idToDelete ?? ""}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
              />
              <ToastNotification message={toast.message} icon={toast.icon} trigger={toast.trigger} />
              <PinnedSection 
                showToast={showToast} 
                onRequestDelete={openDeleteModal} />
              <AllFilesSection
                showToast={showToast}
                onRequestDelete={openDeleteModal}
              />
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button className="cursor-pointer px-3 py-1 rounded-l-md border hover:text-blue-600 border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="cursor-pointer px-3 py-1 border-t border-b border-gray-300 bg-blue-50 text-blue-600 font-medium">
                  1
                </button>
                <button className="cursor-pointer px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="cursor-pointer px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="cursor-pointer px-3 py-1 rounded-r-md border hover:text-blue-600 border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </nav>
            </div>
          </div>
        </main>
       </FilesProvider>
      </div>
    </div>
  );
}
