import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge, Users, UserSquare2, Users2, Library,
  Calculator, PencilRuler, BookMarked, CalendarDays,
  ClipboardCheck, ChevronRight, GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openMenu, setOpenMenu] = useState('Dashboard');

  const menuLinks = [
    { 
      name: 'Dashboard', 
      icon: <Gauge size={22} />, 
      path: '/',
      subMenu: [
        { name: 'Admin', path: '/' },
        { name: 'Students', path: '/students' },
        { name: 'Teachers', path: '/teachers' },
      ]
    },
    { 
      name: 'Students', 
      icon: <Users size={22} />, 
      path: '/students',
      subMenu: [
        { name: 'All Students', path: '/students/all' },
        { name: 'Admission Form', path: '/students/admission' },
        { name: 'Student Promotion', path: '/students/promotion' },
      ]
    },
    { 
      name: 'Teachers', 
      icon: <UserSquare2 size={22} />, 
      path: '/teachers',
      subMenu: [
        { name: 'All Teachers', path: '/teachers/all' },
        { name: 'Teacher Details', path: '/teachers/details' },
        { name: 'Add Teacher', path: '/teachers/add' },
      ]
    },
    { 
      name: 'Parents', 
      icon: <Users2 size={22} />, 
      path: '/parents',
      subMenu: [
        { name: 'All Parents', path: '/parents/all' },
        { name: 'Add Parent', path: '/parents/add' },
      ]
    },
    { 
      name: 'Library', 
      icon: <Library size={22} />, 
      path: '/library',
      subMenu: [
        { name: 'All Books', path: '/library/books' },
        { name: 'Add New Book', path: '/library/add' },
      ]
    },
    { 
      name: 'Account', 
      icon: <Calculator size={22} />, 
      path: '/account',
      subMenu: [
        { name: 'Fee Collection', path: '/account/fees' },
        { name: 'Expenses', path: '/account/expenses' },
      ]
    },
    { 
      name: 'Class', 
      icon: <PencilRuler size={22} />, 
      path: '/class',
      subMenu: [
        { name: 'All Classes', path: '/class/all' },
        { name: 'New Class', path: '/class/add' },
      ]
    },
    { name: 'Subject', icon: <BookMarked size={22} />, path: '/subject', subMenu: [] },
    { name: 'Class Routine', icon: <CalendarDays size={22} />, path: '/routine', subMenu: [] },
    { name: 'Attendance', icon: <ClipboardCheck size={22} />, path: '/attendance', subMenu: [] },
  ];

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 280 : 85 }}
      className="fixed md:sticky top-0 left-0 h-screen bg-[#002147] text-gray-300 flex flex-col z-50 shadow-2xl overflow-hidden"
    >
      {/* Top Header */}
      <div className="h-[70px] flex items-center px-4 bg-[#ffa001] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <GraduationCap className="text-[#002147] w-6 h-6" />
          </div>
          {isOpen && (
            <span className="text-2xl font-bold text-white">
              SOFTEDU <span className="text-[10px] align-top font-normal">TM</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 mt-2 overflow-y-auto overflow-x-hidden custom-sidebar-scroll">
        {menuLinks.map((item, index) => {
          const isExpanded = openMenu === item.name;
          const hasSub = item.subMenu && item.subMenu.length > 0;

          return (
            <div key={index} className="border-b border-white/5">
              {/* Main Menu Button */}
              <div
                onClick={() => handleMenuClick(item.name)}
                className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-all hover:bg-[#001b3a] ${
                  isExpanded ? 'bg-[#001b3a] text-white' : 'text-gray-400'
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="text-[#ffa001] shrink-0">{item.icon}</span>
                  {isOpen && <span className="text-[15px] font-medium">{item.name}</span>}
                </div>

                {isOpen && hasSub && (
                  <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </div>

              {/* Submenu */}
              <AnimatePresence>
                {isOpen && isExpanded && hasSub && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-[#001630] overflow-hidden"
                  >
                    {item.subMenu.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.path}
                        className="flex items-center gap-3 pl-14 py-3 text-sm text-gray-400 hover:text-[#ffa001] transition-colors"
                      >
                        <ChevronRight size={12} />
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
