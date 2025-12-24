import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Phone, 
  ChevronRight 
} from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const menuLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Courses', icon: <BookOpen size={20} />, path: '/courses', hasSub: true },
    { name: 'Students', icon: <GraduationCap size={20} />, path: '/students', hasSub: true },
    { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    { name: 'Contact', icon: <Phone size={20} />, path: '/contact' },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isOpen ? 260 : (window.innerWidth < 768 ? 0 : 85),
        x: (window.innerWidth < 768 && !isOpen) ? -260 : 0 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed md:sticky top-0 left-0 h-screen bg-[#042954] text-white flex flex-col z-50 shadow-xl overflow-hidden"
    >
      <div className="p-6 flex items-center gap-3 min-w-[260px] bg-[#FFA90C]">
         <div className="w-8 h-8 bg-cyan-400 rounded-lg shrink-0 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white/30 rounded-sm rotate-45" />
         </div>
         <span className={`text-xl  font-bold tracking-wider transition-opacity duration-300 ${!isOpen && 'md:opacity-0'}`}>
            KONRIX
         </span>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuLinks.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={index} 
              to={item.path} 
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
            >
              <div className={`flex items-center justify-between p-3 rounded-xl mb-1 whitespace-nowrap transition-all ${
                isActive ? 'bg-white/20 shadow-md text-white' : 'text-blue-100 hover:bg-white/10'
              }`}>
                <div className="flex items-center gap-4">
                  <span className="shrink-0">{item.icon}</span>
                  <AnimatePresence>
                    {(isOpen || window.innerWidth < 768) && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {isOpen && item.hasSub && <ChevronRight size={14} className="opacity-50" />}
              </div>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;