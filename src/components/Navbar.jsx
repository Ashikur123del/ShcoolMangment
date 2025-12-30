import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, Moon, Sun, Maximize, User, Settings, LogOut, ChevronDown } from 'lucide-react';

const Navbar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isDark, setIsDark] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const dark = !isDark;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  return (
    <nav className="h-20 bg-white/80 dark:bg-[#0f111a]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 sticky top-0 z-40 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-[#ffa001]/10 hover:text-[#ffa001] rounded-xl transition-all">
          <Menu size={22} />
        </button>
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-white/5 rounded-2xl px-4 py-2.5 w-72 lg:w-96 group focus-within:ring-2 ring-[#ffa001]/30 transition-all">
          <Search size={18} className="text-gray-400 group-focus-within:text-[#ffa001]" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none text-[15px] ml-3 w-full focus:outline-none dark:text-gray-200" />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={toggleTheme} className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all">
          {isDark ? <Sun size={19} className="text-yellow-400" /> : <Moon size={19} />}
        </button>
        <div className="relative" ref={profileRef}>
          <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 p-1 cursor-pointer rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
            <div className="hidden lg:block text-right">
              <p className="text-[14px] font-bold dark:text-white leading-none">Jahid Hasan</p>
              <p className="text-[11px] text-[#ffa001] font-semibold mt-1 uppercase tracking-wider">Super Admin</p>
            </div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jahid" className="w-10 h-10 rounded-xl bg-[#ffa001]/20 p-0.5 border border-[#ffa001]/30" alt="User" />
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#1a1c23] rounded-2xl shadow-2xl py-2 border border-gray-100 dark:border-white/10 overflow-hidden">
                <a href="#profile" className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-gray-600 dark:text-gray-300 hover:bg-[#ffa001]/10 hover:text-[#ffa001] transition-all"><User size={17} /> My Profile</a>
                <a href="#settings" className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-gray-600 dark:text-gray-300 hover:bg-[#ffa001]/10 hover:text-[#ffa001] transition-all"><Settings size={17} /> Settings</a>
                <div className="h-px bg-gray-50 dark:bg-white/5 my-2 mx-4"></div>
                <button className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-red-500 w-full text-left hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-medium"><LogOut size={17} /> Sign Out</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;