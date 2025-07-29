
"use client";
import ActionBar from "@/components/ActionBar";
import AllFilesSection from "@/components/AllFilesSection";
import Navbar from "@/components/Navbar";
import PinnedSection from "@/components/PinnedSection";
import Sidebar from "@/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <ActionBar />
            <PinnedSection />
            <AllFilesSection />
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
