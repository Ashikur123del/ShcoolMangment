import React, { useState, useEffect } from 'react';
import { Search, Menu, Bell, Moon, Sun, Maximize, User, Settings, LogOut } from 'lucide-react';

const Navbar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isDark, setIsDark] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-white');
      document.body.classList.add('bg-white', 'text-black');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
      document.body.classList.remove('bg-white', 'text-black');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else if (document.exitFullscreen) document.exitFullscreen();
  };

  return (
    <nav className="h-16 bg-white dark:bg-[#1a1c23] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 sticky top-0 z-40 transition-colors duration-300 shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-[#5D78FF] rounded-xl transition-all">
          <Menu size={22} />
        </button>

        <div className="hidden md:flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-2 border border-transparent focus-within:border-blue-400 dark:focus-within:border-blue-500 transition-all w-64 lg:w-80">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Search anything..." className="bg-transparent border-none text-sm ml-2 w-full focus:ring-0 outline-none dark:text-gray-200" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleFullScreen} className="hidden xs:flex p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <Maximize size={18} />
        </button>

        <button onClick={toggleTheme} className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300">
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <Bell size={18} />
          </button>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-[#1a1c23] rounded-full"></span>
        </div>

        <div className="relative">
          <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-100 dark:border-gray-800 cursor-pointer group">
            <div className="hidden lg:block text-right leading-tight">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#5D78FF] transition-colors">Jahid Hasan</p>
              <p className="text-[11px] text-gray-400 font-medium">Super Admin</p>
            </div>
            <div className="relative">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jahid" alt="User" className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-blue-100 dark:group-hover:ring-blue-900 transition-all" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1a1c23] rounded-full"></div>
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1a1c23] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-in fade-in zoom-in duration-200">
              <a href="#profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"><User size={16} /> My Profile</a>
              <a href="#settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"><Settings size={16} /> Settings</a>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-4"></div>
              <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left font-medium"><LogOut size={16} /> Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
