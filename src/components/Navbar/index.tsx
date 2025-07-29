"use client";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="md:hidden mr-4 text-gray-600">
            <span className="text-xl"><i className="fas fa-bars" /></span>
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Gerenciamento de Arquivos</h2>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input type="text" placeholder="Buscar arquivos..." className="text-gray-600 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-search" /></span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Admin</span>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <span><i className="fas fa-user" /></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}