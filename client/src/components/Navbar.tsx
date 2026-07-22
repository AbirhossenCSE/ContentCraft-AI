import type React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  LogOut,
  Coins,
  User,
  History as HistoryIcon,
  LayoutGrid,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex justify-between items-center relative z-10 shrink-0 select-none">
      <div className="flex items-center gap-8">
        {/* App Logo */}
        <NavLink
          to="/generator"
          className="flex items-center gap-2 outline-none"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/10">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            ContentCraft AI
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/generator"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-purple-600/15 text-purple-300 border border-purple-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`
            }
          >
            <LayoutGrid className="w-4 h-4" />
            Generator
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-purple-600/15 text-purple-300 border border-purple-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`
            }
          >
            <HistoryIcon className="w-4 h-4" />
            History
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Mobile Navigation Links */}
        <div className="flex md:hidden items-center gap-1 mr-2">
          <NavLink
            to="/generator"
            className={({ isActive }) =>
              `p-2 rounded-lg transition ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300'
                  : 'text-slate-400 hover:text-white'
              }`
            }
            title="Generator"
          >
            <LayoutGrid className="w-5 h-5" />
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `p-2 rounded-lg transition ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300'
                  : 'text-slate-400 hover:text-white'
              }`
            }
            title="History"
          >
            <HistoryIcon className="w-5 h-5" />
          </NavLink>
        </div>

        {/* User Info / Credits */}
        <div className="flex items-center gap-3 text-sm">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-950 border border-slate-800/80 px-3.5 py-1.5 rounded-full text-slate-300">
            <User className="w-4 h-4 text-purple-400" />
            <span className="max-w-[100px] truncate">{user?.name}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800/80 px-3.5 py-1.5 rounded-full text-slate-300">
            <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              {user?.credits} Credits
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-3 py-2 hover:bg-slate-800/50 rounded-xl transition duration-150 cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
