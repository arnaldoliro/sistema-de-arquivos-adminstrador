import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUsers,
  faChartBar,
  faCog,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
return (
    <aside className="w-64 bg-gray-900 text-white py-6 flex flex-col md:block min-h-screen">
      <div className="px-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav>
          <ul>
                  <li className="mb-1">
                    <a href="#" className="flex items-center py-2 px-4 bg-blue-600 rounded-lg">
                      <span className="mr-3"><FontAwesomeIcon icon={faFileAlt} /></span>
                      <span>Arquivos</span>
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-800 rounded-lg">
                      <span className="mr-3"><FontAwesomeIcon icon={faUsers} /></span>
                      <span>Usuários</span>
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-800 rounded-lg">
                      <span className="mr-3"><FontAwesomeIcon icon={faChartBar} /></span>
                      <span>Estatísticas</span>
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-800 rounded-lg">
                      <span className="mr-3"><FontAwesomeIcon icon={faCog} /></span>
                      <span>Configurações</span>
                    </a>
                  </li>
          </ul>
        </nav>
      </div>
      <div className="mt-auto px-6 py-4">
        <a href="#" className="flex items-center text-gray-300 hover:text-white">
                <span className="mr-3"><FontAwesomeIcon icon={faSignOutAlt} /></span>
                <span>Sair</span>
              </a>
            </div>
    </aside>
  );
}