import React from 'react';
import { NavigationTab, User } from '../types';
import {
  Home,
  FolderGit2,
  Rocket,
  Code2,
  LogOut,
  User as UserIcon,
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentUser: User;
  onLogout: () => void;
  solutionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  onLogout,
  solutionsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#30363D] bg-[#0D1117]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('inicio')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white block">
                  Nexus<span className="text-purple-400">Solve</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase block -mt-1 font-mono">
                  Code & Challenges
                </span>
              </div>
            </button>
          </div>

          {/* 3 Main Control Buttons (Section 4 Requirements) */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {/* Botón 1: 🏠 Inicio */}
            <button
              type="button"
              onClick={() => onTabChange('inicio')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeTab === 'inicio'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                  : 'text-gray-300 hover:text-white hover:bg-[#161B22]'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Inicio</span>
            </button>

            {/* Botón 2: 📂 Mis Soluciones */}
            <button
              type="button"
              onClick={() => onTabChange('mis-soluciones')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeTab === 'mis-soluciones'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                  : 'text-gray-300 hover:text-white hover:bg-[#161B22]'
              }`}
            >
              <FolderGit2 className="w-4 h-4 shrink-0 text-purple-300" />
              <span>Mis Soluciones</span>
              <span className="ml-1 px-1.5 py-0.2 text-[11px] font-mono font-bold bg-[#161B22] text-purple-300 border border-[#30363D] rounded-full">
                {solutionsCount}
              </span>
            </button>

            {/* Botón 3: 🚀 Explorar Problemas */}
            <button
              type="button"
              onClick={() => onTabChange('explorar')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeTab === 'explorar'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                  : 'text-gray-300 hover:text-white hover:bg-[#161B22]'
              }`}
            >
              <Rocket className="w-4 h-4 shrink-0 text-indigo-300" />
              <span>Explorar Problemas</span>
            </button>
          </nav>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#161B22] border border-[#30363D]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white font-mono">
                {currentUser.username[0].toUpperCase()}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-gray-200 block leading-none font-mono">
                  {currentUser.username}
                </span>
                <span className="text-[10px] text-purple-400 font-medium">Desarrollador</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-rose-400 hover:bg-[#161B22] rounded-lg transition-colors border border-transparent hover:border-[#30363D]"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
