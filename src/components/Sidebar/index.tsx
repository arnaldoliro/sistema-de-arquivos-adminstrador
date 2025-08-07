import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUsers,
  faChartBar,
  faCog,
  faSignOutAlt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

type SidebarItem = {
  label: string;
  icon: IconDefinition;
  href: string;
  isActive?: boolean;
};

const sidebarItems: SidebarItem[] = [
  { label: "Arquivos", icon: faFileAlt, href: "#", isActive: true },
  // { label: "Usuários", icon: faUsers, href: "#" },
  // { label: "Estatísticas", icon: faChartBar, href: "#" },
  // { label: "Configurações", icon: faCog, href: "#" },
];

export default function Sidebar({
  sideBarOpen,
  setSideBarOpen,
}: {
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
}) {
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    let startX: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startX === null) return;
      const currentX = e.touches[0].clientX;
      const diffX = currentX - startX;

      // Abrir menu com swipe da esquerda para a direita
      if (!sideBarOpen && diffX > 100) {
        setSideBarOpen(true);
        startX = null;
      }

      // Fechar menu com swipe da direita para a esquerda
      if (sideBarOpen && diffX < -100) {
        setSideBarOpen(false);
        startX = null;
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [sideBarOpen, setSideBarOpen]);

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-40 md:w-48 lg:w-64 bg-gray-900 text-white py-6 items-center md:px-4 z-40
        transform transition-transform duration-300 ease-in-out
        ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="px-2 lg:px-6">
        <h1 className="lg:text-2xl md:text-xl text-lg text-center font-bold mb-6">Admin Panel</h1>
        <nav>
          <ul>
            {sidebarItems.map(({ label, icon, href, isActive }) => (
              <li className="mb-3" key={label}>
                <a
                  href={href}
                  className={`flex items-center md:text-md md:gap-2 gap-1.5 py-1 px-1 md:py-2 md:px-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <span>
                    <FontAwesomeIcon icon={icon} />
                  </span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="md:mt-auto ml-3 mt-10 md:px-6 md:py-4">
        <a
          href="#"
          className="flex items-center text-gray-300 hover:text-white gap-1"
        >
          <span className="md:mr-3">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>
          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
}
