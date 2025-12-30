import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Menu, Bell, Moon, Sun,
  Maximize, User, Settings, LogOut
} from 'lucide-react';

const Navbar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isDark, setIsDark] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // Load theme safely
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
    }
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const dark = !isDark;
    setIsDark(dark);

    document.documentElement.classList.toggle('dark', dark);
    document.body.classList.toggle('bg-gray-900', dark);
    document.body.classList.toggle('text-white', dark);

    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <nav className="h-16 bg-white dark:bg-[#1a1c23] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl"
        >
          <Menu size={22} />
        </button>

        <div className="hidden md:flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-2 w-64 lg:w-80">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none text-sm ml-2 w-full focus:outline-none dark:text-gray-200"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button onClick={toggleFullScreen} className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl">
          <Maximize size={18} />
        </button>

        <button onClick={toggleTheme} className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl">
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl">
            <Bell size={18} />
          </button>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 ml-2 pl-4 border-l cursor-pointer"
          >
            <div className="hidden lg:block text-right">
              <p className="text-sm font-bold">Jahid Hasan</p>
              <p className="text-[11px] text-gray-400">Super Admin</p>
            </div>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jahid"
              className="w-10 h-10 rounded-xl"
              alt="User"
            />
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl py-2">
              <a className="flex items-center gap-3 px-4 py-2 text-sm"><User size={16} /> My Profile</a>
              <a className="flex items-center gap-3 px-4 py-2 text-sm"><Settings size={16} /> Settings</a>
              <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 w-full text-left">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
