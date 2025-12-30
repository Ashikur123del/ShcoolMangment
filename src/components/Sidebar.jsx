import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge, Users, UserSquare2, ChevronDown, 
  GraduationCap, LayoutGrid, ArrowRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openMenus, setOpenMenus] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const menuLinks = [
    { 
      name: 'dashboard', 
      icon: <Gauge size={22} />, 
      subMenu: [{ name: 'admin', path: '/dashboard' }]
    },
    {
      name: 'student information',
      icon: <Users size={22} />,
      subMenu: [
        {
          name: 'registration',
          children: [
            { name: 'registration form', path: '/students/registration/form' },
            { name: 'excel form', path: '/students/registration/excel' },
          ]
        },
        { 
          name: 'update', 
          children: [
            { name: 'student profile', path: '/students/update/profile' },
            { name: 'basic info', path: '/students/update/basic-info' },
            { name: 'class info', path: '/students/update/class-info' },
            { name: 'profile status', path: '/students/update/status' },
          ] 
        },
        { 
          name: 'migration', 
          children: [
            { name: 'with merit position', path: '/students/migration/with-merit' },
            { name: 'without merit position', path: '/students/migration/without-merit' },
            { name: 'migration pushback', path: '/students/migration/pushback' },
          ] 
        },
        // --- REPORTS LABEL ADDED HERE ---
        { type: 'label', label: 'REPORTS' },
        { 
          name: 'summary', 
          children: [
            { name: 'student summary', path: '/students/summary/view' },
          ] 
        },
        { 
          name: 'details', 
          children: [
            { name: 'student list', path: '/students/details/list' },
            { name: 'taught list', path: '/students/details/taught' },
            { name: 'migrated list', path: '/students/details/migrated' },
            { name: 'at a glance', path: '/students/details/glance' },
            { name: 'quick search', path: '/students/details/search' },
          ] 
        },
      ]
    },
    { 
      name: 'teacher infromation', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'registration',
          children: [
            { name: 'registration form', path: '/teachers/registration/form' },
            { name: 'excel form', path: '/teachers/registration/excel' },
          ]
        },
        {
          name: 'assign',
          children: [
            { name: 'shift assigh', path: '/teachers/assign/shift' },
            { name: 'class teacher', path: '/teachers/assign/class' },
            { name: 'subject teacher', path: '/teachers/assign/subject' },
          ]
        },
        {
          name: 'update profile',
          children: [
            { name: 'teacher profile', path: '/teachers/update/profile' },
            { name: 'basic info', path: '/teachers/update/basic' },
            { name: 'status', path: '/teachers/update/status' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'details',
          children: [
            { name: 'teacher list', path: '/teachers/details/list' },
          ]
        },
      ]
    },
    { 
      name: 'student attendance', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'setting',
          children: [
            { name: 'device ID mapping', path: '/attendance/student/mapping' },
            { name: 'time config', path: '/attendance/student/time-config' },
            { name: 'SMS template', path: '/attendance/student/sms-template' },
          ]
        },
        {
          name: 'attendance device',
          children: [
            { name: 'update file', path: '/attendance/student/device/update' },
            { name: 'file date process', path: '/attendance/student/device/file-process' },
            { name: 'device date process', path: '/attendance/student/device/date-process' },
          ]
        },
        {
          name: 'take attendance',
          children: [
            { name: 'section attendance', path: '/attendance/student/take/section' },
            { name: 'exam attendance', path: '/attendance/student/take/exam' },
          ]
        },
        {
          name: 'update',
          children: [
            { name: 'device ID mapping', path: '/attendance/student/update/mapping' },
            { name: 'time config', path: '/attendance/student/update/time' },
            { name: 'section attendance', path: '/attendance/student/update/section' },
            { name: 'exam attendance', path: '/attendance/student/update/exam' },
          ]
        },
        {
          name: 'leave',
          children: [
            { name: 'leave application', path: '/attendance/student/leave/apply' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'blank sheet',
          children: [
            { name: 'section attendance', path: '/attendance/student/blank-sheet/section' },
          ]
        },
        {
          name: 'details info',
          children: [
            { name: 'attendance sheet', path: '/attendance/student/report/sheet' },
            { name: 'attendance status', path: '/attendance/student/report/status' },
            { name: 'attendance info', path: '/attendance/student/report/info' },
            { name: 'exam attendance', path: '/attendance/student/report/exam' },
          ]
        },
        {
          name: 'device report',
          children: [
            { name: 'device date log', path: '/attendance/student/device-report/log' },
            { name: 'device mapping', path: '/attendance/student/device-report/mapping' },
          ]
        },
      ]
    },
    { 
      name: 'teacher attendance', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'setting',
          children: [
            { name: 'device ID mapping', path: '/attendance/teacher/mapping' },
            { name: 'time config', path: '/attendance/teacher/time-config' },
            { name: 'time process', path: '/attendance/teacher/time-process' },
          ]
        },
        {
          name: 'attendance device',
          children: [
            { name: 'upload', path: '/attendance/teacher/device/upload' },
            { name: 'process', path: '/attendance/teacher/device/process' },
            { name: 'auto process', path: '/attendance/teacher/device/auto' },
          ]
        },
        {
          name: 'take attendance',
          children: [
            { name: 'daily attendance', path: '/attendance/teacher/take/daily' },
          ]
        },
        {
          name: 'update',
          children: [
            { name: 'device ID mapping', path: '/attendance/teacher/update/mapping' },
            { name: 'time config', path: '/attendance/teacher/update/time' },
            { name: 'time process', path: '/attendance/teacher/update/process' },
            { name: 'daily attendance', path: '/attendance/teacher/update/daily' },
          ]
        },
        {
          name: 'leave',
          children: [
            { name: 'leave', path: '/attendance/teacher/leave' },
          ]
        },
        {
          name: 'delete',
          children: [
            { name: 'daily attendance', path: '/attendance/teacher/delete/daily' },
            { name: 'time config', path: '/attendance/teacher/delete/time' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'details',
          children: [
            { name: 'blank sheet', path: '/attendance/teacher/details/blank-sheet' },
            { name: 'attendance preview', path: '/attendance/teacher/details/preview' },
            { name: 'attendance status', path: '/attendance/teacher/details/status' },
            { name: 'attendance record', path: '/attendance/teacher/details/record' },
            { name: 'leave info', path: '/attendance/teacher/details/leave-info' },
          ]
        },
        {
          name: 'device report',
          children: [
            { name: 'device date log', path: '/attendance/teacher/device-report/log' },
            { name: 'device mapping', path: '/attendance/teacher/device-report/mapping' },
          ]
        },
      ]
    },
    { 
      name: 'semester exam', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'setting',
          children: [
            { name: 'exam starup', path: '/exams/setting/startup' },
            { name: 'mark config', path: '/exams/setting/mark-config' },
            { name: 'mark sheet config', path: '/exams/setting/marksheet-config' },
            { name: 'remarks config', path: '/exams/setting/remarks-config' },
            { name: 'date config', path: '/exams/setting/date-config' },
          ]
        },
        {
          name: 'mark input',
          children: [
            { name: 'section wise', path: '/exams/input/section' },
            { name: 'subject wise', path: '/exams/input/subject' }
          ]
        },
        {
          name: 'mark update',
          children: [
            { name: 'section wise', path: '/exams/update/section' },
            { name: 'subject wise', path: '/exams/update/subject' }
          ]
        },
        {
          name: 'mark delete',
          children: [
            { name: 'section wise', path: '/exams/delete/section' },
          ]
        },
        {
          name: 'mark process',
          children: [
            { name: 'class wise', path: '/exams/process/class' },
          ]
        },
        {
          name: 'result process',
          children: [
            { name: 'general exam', path: '/exams/result/general' },
            { name: 'grand exam', path: '/exams/result/grand' },
            { name: 'merit position', path: '/exams/result/merit' },
            { name: 'set remark', path: '/exams/result/remark' },
            { name: 'attendance count', path: '/exams/result/attendance' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'blank sheet',
          children: [
            { name: 'mark input', path: '/exams/blank/mark' },
            { name: 'exam attendance', path: '/exams/blank/attendance' },
          ]
        },
        {
          name: 'summary',
          children: [
            { name: 'unassigned marks', path: '/exams/summary/unassigned' },
            { name: 'result info', path: '/exams/summary/result' },
            { name: 'grading info', path: '/exams/summary/grading' },
            { name: 'pass-file info', path: '/exams/summary/pass-file' },
          ]
        },
        {
          name: 'details',
          children: [
            { name: 'mark sheet', path: '/exams/details/marksheet' },
            { name: 'exam result', path: '/exams/details/result' },
            { name: 'merit list', path: '/exams/details/merit' },
            { name: 'fail list', path: '/exams/details/fail' },
          ]
        },
        {
          name: 'tabulation sheet',
          children: [
            { name: 'general exam', path: '/exams/tabulation/general' },
            { name: 'grand file', path: '/exams/tabulation/grand' },
          ]
        },
      ]
    },
    { 
      name: 'class test', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
       {
          name: 'setting',
          children: [
            { name: 'create', path: '/class-text/setting/create' },
            { name: 'assing', path: '/class-text/setting/assign' },
          ]
        },
       {
          name: 'mark input',
          children: [
            { name: 'section wise', path: '/class-text/input/section' },
          ]
        },
       {
          name: 'mark update',
          children: [
            { name: 'section wise', path: '/class-text/update/section' },
          ]
        },
       {
          name: 'mark delete',
          children: [
            { name: 'section wise', path: '/class-text/delete/section' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
       {
          name: 'mark list',
          children: [
            { name: 'section wise', path: '/class-text/list/section' },
            { name: 'subject wise', path: '/class-text/list/subject' },
          ]
        },
       {
          name: 'mark sheet',
          children: [
            { name: 'section wise', path: '/class-text/sheet/section' },
          ]
        },
      ]
    },
    { 
      name: 'routing mangement', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'setting',
          children: [
            { name: 'class routin', path: '/routing/setting/class' },
            { name: 'exam routin', path: '/routing/setting/exam' },
          ]
        },
        {
          name: 'create',
          children: [
            { name: 'class routin', path: '/routing/create/class' },
            { name: 'exam routing', path: '/routing/create/exam' },
            { name: 'online class routing', path: '/routing/create/online' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'student',
          children: [
            { name: 'class routing', path: '/routing/student/class' },
            { name: 'exam routing', path: '/routing/student/exam' },
          ]
        },
        {
          name: 'teacher',
          children: [
            { name: 'daily routing', path: '/routing/teacher/daily' },
          ]
        },
      ]
    },
    { 
      name: 'fees management', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
       {
          name: 'setting',
          children: [
            { name: 'fees startup', path: '/fees/setting/startup' },
            { name: 'fees mapping', path: '/fees/setting/mapping' },
            { name: 'amount config', path: '/fees/setting/amount' },
            { name: 'date config', path: '/fees/setting/date' },
            { name: 'waiver config', path: '/fees/setting/waiver' },
            { name: 'fees remove', path: '/fees/setting/remove' },
            { name: 'sub-head remove', path: '/fees/setting/subhead-remove' },
          ]
        },
        {
          name: 'paysilp greate',
          children: [
            { name: 'specific fee', path: '/fees/payslip/specific' },
            { name: 'all fee', path: '/fees/payslip/all' },
          ]
        },
        {
          name: 'fee collection',
          children: [
            { name: 'quick collection', path: '/fees/collection/quick' },
            { name: 'degital fees collection', path: '/fees/collection/digital' },
            { name: 'payment history', path: '/fees/collection/history' },
          ]
        },
        {
          name: 'delete fees',
          children: [
            { name: 'collection', path: '/fees/delete/collection' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'summary',
          children: [
            { name: 'payment ratio', path: '/fees/summary/ratio' },
            { name: 'head wise collection', path: '/fees/summary/head-wise' },
          ]
        },
        {
          name: 'details',
          children: [
            { name: 'payment info', path: '/fees/details/payment-info' },
            { name: 'paid info', path: '/fees/details/paid' },
            { name: 'unpaid info', path: '/fees/details/unpaid' },
            { name: 'head wise payment', path: '/fees/details/head-paid' },
            { name: 'head wise due', path: '/fees/details/head-due' },
            { name: 'paid fees', path: '/fees/details/paid-fees' },
            { name: 'unpaid paysilp', path: '/fees/details/unpaid-payslip' },
            { name: 'paid due summary', path: '/fees/details/due-summary' },
            { name: 'digital collection', path: '/fees/details/digital' },
          ]
        },
      ]
    },
    { 
      name: 'payroll management', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'setting',
          children: [
            { name: 'payroll startup', path: '/payroll/setting/startup' },
            { name: 'payroll mapping', path: '/payroll/setting/mapping' },
            { name: 'payroll assing', path: '/payroll/setting/assign' },
          ]
        },
        {
          name: 'create',
          children: [
            { name: 'salary slip', path: '/payroll/create/salary-slip' },
          ]
        },
        {
          name: 'payment',
          children: [
            { name: 'salary', path: '/payroll/payment/salary' },
            { name: 'due', path: '/payroll/payment/due' },
            { name: 'advance', path: '/payroll/payment/advance' },
          ]
        },
        {
          name: 'payMent retrun',
          children: [
            { name: 'advance', path: '/payroll/return/advance' },
          ]
        },
        {
          name: 'delete',
          children: [
            { name: 'salary slip', path: '/payroll/delete/salary-slip' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'details',
          children: [
            { name: 'salary statements', path: '/payroll/details/statement' },
            { name: 'payment info', path: '/payroll/details/info' },
            { name: 'single staff', path: '/payroll/details/staff' },
          ]
        },
      ]
    },
    { 
      name: 'inventory', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
       {
          name: 'setting',
          children: [
            { name: 'create', path: '/inventory/setting/create' },
            { name: 'supplier info', path: '/inventory/setting/supplier' },
            { name: 'mapping', path: '/inventory/setting/mapping' },
          ]
        },
       {
          name: 'transaction',
          children: [
            { name: 'purchase', path: '/inventory/transaction/purchase' },
            { name: 'sales', path: '/inventory/transaction/sales' },
            { name: 'collect due', path: '/inventory/transaction/collect-due' },
            { name: 'pay due', path: '/inventory/transaction/pay-due' },
          ]
        },
       {
          name: 'delete',
          children: [
            { name: 'purehase invoice', path: '/inventory/delete/purchase' },
            { name: 'sales invoice', path: '/inventory/delete/sales' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
       {
          name: 'summary',
          children: [
            { name: 'purchase', path: '/inventory/summary/purchase' },
            { name: 'item wise', path: '/inventory/summary/item' },
            { name: 'supplier payment', path: '/inventory/summary/supplier' },
            { name: 'stock list', path: '/inventory/summary/stock' },
          ]
        },
       {
          name: 'details',
          children: [
            { name: 'purchase', path: '/inventory/details/purchase' },
            { name: 'sales', path: '/inventory/details/sales' },
            { name: 'supplier payment', path: '/inventory/details/supplier' },
            { name: 'student due', path: '/inventory/details/student-due' },
          ]
        },
      ]
    },
    { 
      name: 'accounts management', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'setting',
          children: [
            { name: 'create ledger', path: '/accounts/setting/ledger' },
            { name: 'greate fund', path: '/accounts/setting/fund' },
          ]
        },
        {
          name: 'voucher entry',
          children: [
            { name: 'payment', path: '/accounts/voucher/payment' },
            { name: 'receipt', path: '/accounts/voucher/receipt' },
            { name: 'contra', path: '/accounts/voucher/contra' },
            { name: 'journal', path: '/accounts/voucher/journal' },
            { name: 'fund transfer', path: '/accounts/voucher/fund-transfer' },
          ]
        },
        {
          name: 'delete',
          children: [
            { name: 'voucher', path: '/accounts/delete/voucher' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'core reports',
          children: [
            { name: 'balance sheet', path: '/accounts/reports/balance-sheet' },
            { name: 'trail balance', path: '/accounts/reports/trail-balance' },
            { name: 'income statement', path: '/accounts/reports/income' },
            { name: 'cash summary', path: '/accounts/reports/cash' },
            { name: 'cash flow statement', path: '/accounts/reports/cash-flow' },
            { name: 'books of accounts', path: '/accounts/reports/books' },
            { name: 'chart of accounts', path: '/accounts/reports/chart' },
          ]
        },
        {
          name: 'transaction reports',
          children: [
            { name: 'voucher', path: '/accounts/trans-report/voucher' },
            { name: 'user wise', path: '/accounts/trans-report/user' },
            { name: 'ledger wise', path: '/accounts/trans-report/ledger' },
            { name: 'accound journal', path: '/accounts/trans-report/journal' },
            { name: 'fund wish', path: '/accounts/trans-report/fund' },
            { name: 'fund tran summary', path: '/accounts/trans-report/fund-summary' },
            { name: 'fund tran monthly', path: '/accounts/trans-report/fund-monthly' },
          ]
        },
      ]
    },
    { 
      name: 'layuout & certificates', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
       {
          name: 'setting',
          children: [
            { name: 'template formate', path: '/certificates/setting/template' },
            { name: 'admit card instruction', path: '/certificates/setting/admit-instruction' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
       {
          name: 'download',
          children: [
            { name: 'ID card', path: '/certificates/download/id-card' },
            { name: 'envelope tag', path: '/certificates/download/envelope' },
            { name: 'exam essentials', path: '/certificates/download/exam-essentials' },
            { name: 'testimonial', path: '/certificates/download/testimonial' },
            { name: 'transfer certificate', path: '/certificates/download/tc' },
          ]
        },
      ]
    },
    { 
      name: 'SMS & notificacation', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
        {
          name: 'create',
          children: [
            { name: 'sms template', path: '/sms/create/template' },
            { name: 'phone book', path: '/sms/create/phone-book' },
            { name: 'notice', path: '/sms/create/notice' },
          ]
        },
        {
          name: 'send',
          children: [
            { name: 'person wise', path: '/sms/send/person' },
            { name: 'institute wise', path: '/sms/send/institute' },
            { name: 'notification wise', path: '/sms/send/notification' },
          ]
        },
        {
          name: 'recharge',
          children: [
            { name: 'sms recharge', path: '/sms/recharge' },
          ]
        },
        { type: 'label', label: 'REPORTS' },
        {
          name: 'summary',
          children: [
            { name: 'send sms', path: '/sms/summary/send' },
            { name: 'purchase history', path: '/sms/summary/purchase' },
          ]
        },
        {
          name: 'details',
          children: [
            { name: 'to parent', path: '/sms/details/parent' },
            { name: 'to teacher', path: '/sms/details/teacher' },
            { name: 'to anyone', path: '/sms/details/anyone' },
          ]
        },
      ]
    },
    { 
      name: 'core setting', 
      icon: <UserSquare2 size={22} />, 
      subMenu: [
       {
          name: 'institute setting',
          children: [
            { name: 'basic config', path: '/settings/core/basic' },
            { name: 'startup', path: '/settings/core/startup' },
            { name: 'class config', path: '/settings/core/class' },
            { name: 'signature', path: '/settings/core/signature' },
          ]
        },
       {
          name: 'subject setting',
          children: [
            { name: 'subject config', path: '/settings/subject/config' },
            { name: '4th subject config', path: '/settings/subject/fourth-subject' },
          ]
        },
       {
          name: 'user setting',
          children: [
            { name: 'user assigh', path: '/settings/user/assign' },
          ]
        },
       {
          name: 'portal setting',
          children: [
            { name: 'new connect', path: '/settings/portal/new' },
            { name: 'connected', path: '/settings/portal/connected' },
          ]
        },
      ]
    },
  ];

  useEffect(() => {
    const findActiveMenu = (links) => {
      for (const item of links) {
        if (item.path === location.pathname) return [item.name];
        const children = item.subMenu || item.children;
        if (children) {
          const found = findActiveMenu(children);
          if (found) return [item.name, ...found];
        }
      }
      return null;
    };

    const activeChain = findActiveMenu(menuLinks);
    if (activeChain) {
      setOpenMenus(prev => [...new Set([...prev, ...activeChain])]);
    }
  }, [location.pathname]);

  const toggleMenu = (name, depth) => {
    setOpenMenus(prev => {
      const isCurrentlyOpen = prev.includes(name);
      if (isCurrentlyOpen) {
        return prev.filter(m => m !== name);
      } else {
        const newState = prev.filter((_, index) => index < depth);
        return [...newState, name];
      }
    });
  };

  const MenuItem = ({ item, depth = 0 }) => {
    // LABEL RENDER LOGIC
    if (item.type === 'label') {
      return (isOpen || window.innerWidth < 768) ? (
        <div className="px-8 mt-2">
          <span className="text-[10px] font-bold bg-[#FF9507] text-white/80 px-2 py-0.5 rounded uppercase tracking-tighter">
            {item.label}
          </span>
        </div>
      ) : <div className="h-px bg-white/10 my-2 mx-4" />;
    }

    const isExpanded = openMenus.includes(item.name);
    const isActive = location.pathname === item.path; 
    const children = item.subMenu || item.children;
    const hasChildren = children && children.length > 0;

    const handleItemClick = () => {
      if (hasChildren) {
        toggleMenu(item.name, depth);
      } else if (item.path) {
        navigate(item.path);
        if (window.innerWidth < 768) setIsOpen(false);
      }
    };

    return (
      <div className={`w-full overflow-hidden transition-all duration-300 
        ${isExpanded && depth === 0 ? 'bg-white/[0.03] border-y border-white/5' : ''}`}>
        
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={handleItemClick}
          className={`group flex items-center justify-between py-3 px-4 cursor-pointer relative transition-all duration-300
            ${isActive || isExpanded ? 'text-white' : 'text-gray-400 hover:text-white'}
            ${depth === 0 ? 'hover:bg-white/[0.05]' : 'hover:bg-white/[0.02]'}
            ${isActive ? 'bg-white/[0.08]' : ''}`}
        >
          {(isActive || (isExpanded && depth === 0)) && (
            <motion.div 
              layoutId="activeTab"
              className="absolute left-0 top-1 bottom-1 w-[4px] bg-[#ffa001] rounded-r-full shadow-[0_0_10px_#ffa001]" 
            />
          )}

          <div className="flex items-center gap-4 relative">
            {depth > 0 && (isOpen || window.innerWidth < 768) && (
               <div className={`absolute -left-5 top-1/2 w-2 h-2 rounded-full border transition-colors
                ${isActive ? 'bg-[#FF9C01] border-[#FF9C01]' : 'border-[#FF9C01]'}`} />
            )}
            
            {item.icon ? (
              <span className={`transition-all duration-300 
                ${isActive || isExpanded ? 'text-[#ffa001] scale-110' : 'text-gray-500 group-hover:text-[#ffa001]'}`}>
                {item.icon}
              </span>
            ) : (
              <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all -ml-2 
                ${isActive ? 'opacity-100 text-[#FF9703]' : 'text-gray-600 group-hover:text-[#FF9703]'}`} />
            )}
            
            {(isOpen || window.innerWidth < 768) && (
              <span className={`whitespace-nowrap capitalize tracking-wide select-none transition-all duration-300
                ${isActive ? 'text-[#ffa001] font-bold' : depth === 0 ? 'text-[15px] font-bold' : 'text-[14px] font-medium'}`}>
                {item.name}
              </span>
            )}
          </div>

          {(isOpen || window.innerWidth < 768) && hasChildren && (
            <motion.div 
              animate={{ rotate: isExpanded ? 180 : 0, color: (isExpanded || isActive) ? '#ffa001' : '#6b7280' }}
              className="shrink-0"
            >
              <ChevronDown size={16} strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`bg-black/20 border-l-[1px] border-[#FF9C01] ml-6 my-1 rounded-bl-xl overflow-hidden`}
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
      animate={{ 
        width: isOpen ? 300 : (window.innerWidth < 768 ? 300 : 80),
        x: window.innerWidth < 768 ? (isOpen ? 0 : -300) : 0 
      }}
      className="fixed left-0 top-0 h-screen bg-[#001b3a] text-gray-100 flex flex-col z-50 shadow-[5px_0_25px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      <div className="h-[80px] flex items-center px-5 bg-gradient-to-br from-[#ffa001] to-[#ff8c00] shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
        <div className="flex items-center gap-4 z-10">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-orange-200"
          >
            <GraduationCap className="text-[#ffa001] w-7 h-7" />
          </motion.div>
          {(isOpen || window.innerWidth < 768) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <span className="text-xl font-black text-white leading-tight tracking-tight">MentorERP</span>
              <span className="text-[11px] text-white/70 font-bold uppercase tracking-[0.2em]">Enterprise Solution</span>
            </motion.div>
          )}
        </div>
      </div>

      <nav className="flex-1 mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-[#ffa001]/30 pb-10">
        {menuLinks.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </nav>
      <style jsx="true">{`
        nav::-webkit-scrollbar { width: 5px; }
        nav::-webkit-scrollbar-thumb { border-radius: 10px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;