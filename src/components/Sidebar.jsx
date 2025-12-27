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
        { name: 'Admin', path: '/dashboard/admin' },
      ]
    },
    { 
      name: 'Students', 
      icon: <Users size={22} />, 
      path: '/students',
      subMenu: [
        { name: 'Setting', path: '/students/setting' },
        { name: 'Configauration', path: '/students/configuration' },
        { name: 'Registration', path: '/students/registration' },
        { name: 'Update', path: '/students/update' },
        { name: 'Migraation', path: '/students/migration' },
        { name: 'Delete', path: '/students/delete' },
        { name: 'Reports', path: '/students/reports' },
      ]
    },
    { 
      name: 'Teacher & Staff', 
      icon: <UserSquare2 size={22} />, 
      path: '/teachers',
      subMenu: [
        { name: 'Setting', path: '/teachers/setting' },
        { name: 'Registration', path: '/teachers/registration' },
        { name: 'Update', path: '/teachers/update' },
        { name: 'Assing', path: '/teachers/assign' },
        { name: 'reports', path: '/teachers/reports' },
      ]
    },
    { 
      name: 'Student Accounts', 
      icon: <Users2 size={22} />, 
      path: '/student-accounts',
      subMenu: [
        { name: 'Setting', path: '/student-accounts/setting' },
        { name: 'Configuration', path: '/student-accounts/configuration' },
        { name: 'Fee Collection', path: '/student-accounts/fee-collection' },
        { name: 'Delete', path: '/student-accounts/delete' },
        { name: 'Reports', path: '/student-accounts/reports' },
      ]
    },
    { 
      name: 'General Accounts', 
      icon: <Library size={22} />, 
      path: '/general-accounts',
      subMenu: [
        { name: 'Ladger', path: '/general-accounts/ledger' },
        { name: 'Transaction', path: '/general-accounts/transaction' },
        { name: 'Dellte', path: '/general-accounts/delete' },
        { name: 'Reports', path: '/general-accounts/reports' },
      ]
    },
    { 
      name: 'Student Attendance', 
      icon: <Calculator size={22} />, 
      path: '/student-attendance',
      subMenu: [
        { name: 'Setting', path: '/student-attendance/setting' },
        { name: 'Take', path: '/student-attendance/take' },
        { name: 'Update', path: '/student-attendance/update' },
        { name: 'File Upload', path: '/student-attendance/upload' },
        { name: 'Auto', path: '/student-attendance/auto' },
        { name: 'Leave', path: '/student-attendance/leave' },
        { name: 'Blank Sheet', path: '/student-attendance/blank-sheet' },
        { name: 'Reprots', path: '/student-attendance/reports' },
      ]
    },
    { 
      name: 'Teacher Attendance', 
      icon: <PencilRuler size={22} />, 
      path: '/teacher-attendance',
      subMenu: [
        { name: 'Setting', path: '/teacher-attendance/setting' },
        { name: 'Take', path: '/teacher-attendance/take' },
        { name: 'Update', path: '/teacher-attendance/update' },
        { name: 'Auto', path: '/teacher-attendance/auto' },
        { name: 'Flie Upload', path: '/teacher-attendance/upload' },
        { name: 'Leave', path: '/teacher-attendance/leave' },
        { name: 'Reports', path: '/teacher-attendance/reports' },
      ]
    },
    { 
      name: 'Exam & Result', 
      icon: <PencilRuler size={22} />, 
      path: '/exam-result',
      subMenu: [
        { name: 'Setting', path: '/exam-result/setting' },
        { name: 'Configuration', path: '/exam-result/configuration' },
        { name: 'Blank Sheet', path: '/exam-result/blank-sheet' },
        { name: 'Mark Input', path: '/exam-result/mark-input' },
        { name: 'Mark Update', path: '/exam-result/mark-update' },
        { name: 'Mark Delete', path: '/exam-result/mark-delete' },
        { name: 'Result Process', path: '/exam-result/process' },
        { name: 'Mark Sheet', path: '/exam-result/mark-sheet' },
        { name: 'Tabulation', path: '/exam-result/tabulation' },
        { name: 'Reports', path: '/exam-result/reports' },
      ]
    },
    { 
      name: 'New Result', 
      icon: <PencilRuler size={22} />, 
      path: '/new-result',
      subMenu: [
        { name: 'Configuration', path: '/new-result/configuration' },
        { name: 'Assessment Input', path: '/new-result/assessment-input' },
        { name: 'Result proccess', path: '/new-result/process' },
      ]
    },
    { 
      name: 'Routine', 
      icon: <PencilRuler size={22} />, 
      path: '/routine',
      subMenu: [
        { name: 'Exam Routing', path: '/routine/exam' },
        { name: 'Class Routing', path: '/routine/class' },
      ]
    },
    { 
      name: 'Accessories', 
      icon: <PencilRuler size={22} />, 
      path: '/accessories',
      subMenu: [
        { name: 'Admit/Seatplan', path: '/accessories/admit-card' },
        { name: 'Id Card', path: '/accessories/id-card' },
        { name: 'Testimonial', path: '/accessories/testimonial' },
        { name: 'TC', path: '/accessories/tc' },
        { name: 'Configuration', path: '/accessories/configuration' },
      ]
    },
    { 
      name: 'Sms Management', 
      icon: <PencilRuler size={22} />, 
      path: '/sms',
      subMenu: [
        { name: 'Send SMS', path: '/sms/send' },
        { name: 'Template', path: '/sms/template' },
        { name: 'Purchase Sms', path: '/sms/purchase' },
        { name: 'Reports', path: '/sms/reports' },
      ]
    },
    { 
      name: 'Payslip Management', 
      icon: <PencilRuler size={22} />, 
      path: '/payslip',
      subMenu: [
        { name: 'Create', path: '/payslip/create' },
        { name: 'Collect', path: '/payslip/collect' },
        { name: 'Template', path: '/payslip/template' },
      ]
    },
    { 
      name: 'Holiday', 
      icon: <PencilRuler size={22} />, 
      path: '/holiday',
      subMenu: [
        { name: 'Weekly Holiday', path: '/holiday/weekly' },
        { name: 'Others Holiday', path: '/holiday/others' },
      ]
    },
    { 
      name: 'Basic Setting', 
      icon: <PencilRuler size={22} />, 
      path: '/basic-setting',
      subMenu: [
        { name: 'Institute Setting', path: '/basic-setting/institute' },
        { name: 'Add Signatrue', path: '/basic-setting/signature' },
      ]
    },
    { 
      name: 'Online Admission', 
      icon: <PencilRuler size={22} />, 
      path: '/online-admission',
      subMenu: [
        { name: 'Class Setting', path: '/online-admission/class-setting' },
        { name: 'General Appliction List', path: '/online-admission/application-list' },
        { name: 'Application Approve Report', path: '/online-admission/approve-report' },
        { name: 'Application Waiting Report', path: '/online-admission/waiting-report' },
      ]
    },
    { 
      name: 'User Management', 
      icon: <PencilRuler size={22} />, 
      path: '/user-management',
      subMenu: [
        { name: 'Create Role', path: '/user-management/create-role' },
        { name: 'Set Permisson', path: '/user-management/set-permission' },
        { name: 'Create User', path: '/user-management/create-user' },
        { name: 'Supper Admin', path: '/user-management/super-admin' },
        { name: 'Result Published', path: '/user-management/result-published' },
      ]
    },
    { 
      name: 'Website Management', 
      icon: <PencilRuler size={22} />, 
      path: '/website-management',
      subMenu: [
        { name: 'All Classes', path: '/website-management/classes' },
      ]
    },
    { 
      name: 'Website Link', 
      icon: <PencilRuler size={22} />, 
      path: '/website-link',
      subMenu: [
        { name: 'All Classes', path: '/website-link/classes' },
      ]
    },
  ];

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 280 : 85 }}
      className="fixed md:sticky top-0 left-0 h-auto bg-[#002147] text-gray-300 flex flex-col z-50 shadow-2xl overflow-hidden"
    >
      <div className="h-[70px] flex items-center px-4 bg-[#ffa001] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <GraduationCap className="text-[#002147] w-6 h-6" />
          </div>
          {isOpen && (
            <span className="text-2xl font-bold text-white">
              Mentorerp <span className="text-[10px] align-top font-normal">MT</span>
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 mt-2 overflow-y-auto overflow-x-hidden custom-sidebar-scroll">
        {menuLinks.map((item, index) => {
          const isExpanded = openMenu === item.name;
          const hasSub = item.subMenu && item.subMenu.length > 0;

          return (
            <div key={index} className="pl-5 md:pl-0 border-b border-white/5">
              <div
                onClick={() => handleMenuClick(item.name)}
                className={`flex items-center justify-between md:px-5 py-4 cursor-pointer transition-all hover:bg-[#001b3a] ${
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