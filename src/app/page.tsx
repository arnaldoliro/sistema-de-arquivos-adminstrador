'use client';
import ActionBar from "@/components/ActionBar";
import Navbar from "@/components/Navbar";
import PinnedSection from "@/components/PinnedSection";
import Sidebar from "@/components/Sidebar";

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
          </div>
        </main>
      </div>
    </div>
  );
}