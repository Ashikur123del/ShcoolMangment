import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge, Users, UserSquare2, ChevronDown, 
  MoreHorizontal, GraduationCap, LayoutGrid
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  // state এখন শুধু বর্তমান খোলা মেনুগুলোর নাম রাখবে
  const [openMenus, setOpenMenus] = useState([]);

  const menuLinks = [
    { 
      name: 'Dashboard', 
      icon: <Gauge size={20} />, 
      subMenu: [{ name: 'Admin Analytics', path: '/' }]
    },
    {
      name: 'Student Information',
      icon: <Users size={20} />,
      subMenu: [
        {
          name: 'Registration',
          children: [
            { name: 'Registration Form', path: '/students/registration-form' },
            { name: 'Excel Form', path: '/students/excel-form' },
          ]
        },
        { 
          name: 'Update', 
          children: [ // subMenu এর বদলে সব জায়গায় children ব্যবহার করলে লজিক সহজ হয়
            { name: 'Student Profile', path: '/students/update/profile' },
            { name: 'Basic Info', path: '/students/update/profile' },
            { name: 'Class Info', path: '/students/update/profile' },
            { name: 'Profile Status', path: '/students/update/profile' },
          ] 
        },
        { 
          name: 'Migration', 
          children: [
            { name: 'With Merit Position', path: '/students/update/profile' },
            { name: 'Without Merit position', path: '/students/update/profile' },
            { name: 'Migration Pushback', path: '/students/update/profile' },
          ] 
        },
        { 
          name: 'Summary', 
          children: [
            { name: 'Student', path: '/students/update/profile' },
          ] 
        },
        { 
          name: 'Details', 
          children: [
            { name: 'Student List', path: '/students/update/profile' },
            { name: 'Taught List', path: '/students/update/profile' },
            { name: 'Migrated List', path: '/students/update/profile' },
            { name: 'At A Glance', path: '/students/update/profile' },
            { name: 'Quick Search', path: '/students/update/profile' },
          ] 
        },
      ]
    },
    { 
      name: 'Teacher & Staff', 
      icon: <UserSquare2 size={20} />, 
      subMenu: [
        { name: 'Staff List', path: '/teachers/list' },
        { name: 'Attendance', path: '/teachers/attendance' },
      ]
    },
  ];

  /**
   * লজিক: যদি একটি মেনু খোলা হয়, তবে ঐ একই লেভেলের (depth) অন্য সব মেনু বন্ধ হয়ে যাবে।
   * depth ০ মানে মেইন মেনু, depth ১ মানে Registration/Update ইত্যাদি।
   */
  const toggleMenu = (name, depth) => {
    setOpenMenus(prev => {
      const isOpen = prev.includes(name);
      
      if (isOpen) {
        // যদি ক্লিক করা মেনুটি আগেই খোলা থাকে, তবে সেটি এবং তার চাইল্ডগুলো বন্ধ হবে
        return prev.filter(m => m !== name);
      } else {
        // কেবল বর্তমান ডেপথের আগের মেনুগুলো মুছে ফেলে নতুনটি যোগ করবে
        // এটি Accordion ইফেক্ট তৈরি করে
        const newState = prev.filter((_, index) => index < depth);
        return [...newState, name];
      }
    });
  };

  const MenuItem = ({ item, depth = 0 }) => {
    const isExpanded = openMenus.includes(item.name);
    const children = item.subMenu || item.children;
    const hasChildren = children && children.length > 0;

    return (
      <div className={`w-full px-2 transition-colors duration-300 ${isExpanded && depth === 0 ? 'bg-white/5' : ''}`}>
        <motion.div
          whileHover={{ x: 4 }}
          onClick={() => hasChildren && toggleMenu(item.name, depth)}
          className={`group flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-200
            ${depth === 0 ? 'mb-1' : 'mb-0.5'}
            ${isExpanded ? 'text-cyan-400' : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'}`}
        >
          <div className="flex items-center gap-3.5 relative">
            {depth > 0 && isOpen && (
              <>
                <div className="absolute -left-[19px] top-[-14px] bottom-0 w-[1.5px] bg-[#ffa001]" />
                <div className="absolute -left-[19px] top-1/2 w-3 h-[1.5px] bg-[#ffa001]" />
              </>
            )}
            
            {item.icon && (
              <span className={`transition-transform duration-200 group-hover:scale-110 ${isExpanded ? 'text-cyan-400' : 'text-[#ffa001]'}`}>
                {item.icon}
              </span>
            )}
            
            {isOpen && (
              <span className={`whitespace-nowrap tracking-wide transition-opacity duration-300
                ${depth === 0 ? 'text-[14px] font-semibold' : 'text-[13px] font-medium opacity-90 group-hover:opacity-100'}`}>
                {item.name}
              </span>
            )}
          </div>

          {isOpen && hasChildren && (
            <div className="flex items-center opacity-50 group-hover:opacity-100 transition-opacity">
              <motion.div 
                animate={{ rotate: isExpanded ? 0 : -90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </div>
          )}
          
          {isOpen && !hasChildren && depth > 0 && (
            <div className="opacity-30 group-hover:opacity-100">
              <MoreHorizontal size={14} />
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="overflow-hidden ml-4 mb-2 rounded-md bg-black/10 border-l border-white/10"
            >
              {children.map((child, idx) => (
                <MenuItem key={idx} item={child} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      className="fixed left-0 top-0 h-screen bg-[#001b3a] text-gray-300 flex flex-col z-50 shadow-[10px_0_30px_rgba(0,0,0,0.3)] overflow-hidden"
    >
      <div className="h-[75px] flex items-center justify-between px-4 bg-gradient-to-r from-[#ffa001] to-[#ffb733] shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-inner"
          >
            <GraduationCap className="text-white w-6 h-6" />
          </motion.div>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-lg font-black text-white leading-none tracking-tight">MentorERP</span>
              <span className="text-[10px] text-white/80 font-bold tracking-[3px] uppercase mt-0.5">Management</span>
            </motion.div>
          )}
        </div>
        {isOpen && (
          <div className="flex gap-2 text-white/90">
            <button className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><LayoutGrid size={18} /></button>
          </div>
        )}
      </div>

      <nav className="flex-1 mt-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
        {menuLinks.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </nav>

      <div className="h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <style jsx="true">{`
        nav::-webkit-scrollbar { width: 5px; }
        nav::-webkit-scrollbar-track { background: transparent; }
        nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        nav:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;