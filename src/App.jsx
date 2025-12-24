import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Admin from './Admin/Admin';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-white', 'text-black');
    }
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen overflow-x-hidden transition-colors duration-300">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <AnimatePresence>
          {sidebarOpen && window.innerWidth < 768 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[45] md:hidden backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

          <main className="p-4 md:p-6 flex-1">
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/courses" element={<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-gray-900 dark:text-gray-100">কোর্স লিস্ট</div>} />
              <Route path="/students" element={<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-gray-900 dark:text-gray-100">স্টুডেন্ট লিস্ট</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
