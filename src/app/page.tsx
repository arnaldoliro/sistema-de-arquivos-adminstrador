"use client";
import React from "react";
import ActionBar from "@/components/ActionBar";
import AllFilesSection from "@/components/AllFilesSection";
import Navbar from "@/components/Navbar";
import PinnedSection from "@/components/PinnedSection";
import Sidebar from "@/components/Sidebar";
import ToastNotification from "@/components/ToastNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FilesProvider } from "@/context/FilesContext";

export default function Home() {
  const [toast, setToast] = React.useState<{ message: string; icon?: React.ReactNode; trigger: boolean; id?: number }>({ message: "", icon: undefined, trigger: false, id: 0 });
  const [search, setSearch] = React.useState("");

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

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onSearch={setSearch} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <ActionBar />
            <FilesProvider search={search}>
              {/* ToastNotification global */}
              <ToastNotification message={toast.message} icon={toast.icon} trigger={toast.trigger} />
              <PinnedSection showToast={showToast} />
              <AllFilesSection showToast={showToast} />
            </FilesProvider>
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
      </div>
    </div>
  );
}
