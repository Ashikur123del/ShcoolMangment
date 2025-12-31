import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './Pages/Dashboards/Dashboard';
import Root from './RootLayout/Root';
import StudentRegistration from './Pages/Students/StudentRegistration';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {sidebarOpen && windowWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[45] lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <Routes>
        <Route 
          path="/" 
          element={
            <Root 
              sidebarOpen={sidebarOpen} 
              setSidebarOpen={setSidebarOpen} 
              windowWidth={windowWidth} 
            />
          }
        >
          {/* Dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Student Information */}
          <Route path="students">
            <Route path="registration/form" element={<StudentRegistration />} />
            <Route path="registration/excel" element={<div>Student Excel Form</div>} />
            <Route path="update/profile" element={<div>Student Profile Update</div>} />
            <Route path="update/basic-info" element={<div>Student Basic Info Update</div>} />
            <Route path="update/class-info" element={<div>Student Class Info Update</div>} />
            <Route path="update/status" element={<div>Student Profile Status</div>} />
            <Route path="migration/with-merit" element={<div>Migration With Merit</div>} />
            <Route path="migration/without-merit" element={<div>Migration Without Merit</div>} />
            <Route path="migration/pushback" element={<div>Migration Pushback</div>} />
            <Route path="summary/view" element={<div>Student Summary View</div>} />
            <Route path="details/list" element={<div>Student List</div>} />
            <Route path="details/taught" element={<div>Taught List</div>} />
            <Route path="details/migrated" element={<div>Migrated List</div>} />
            <Route path="details/glance" element={<div>At a Glance</div>} />
            <Route path="details/search" element={<div>Quick Search</div>} />
          </Route>

          {/* Teacher Information */}
          <Route path="teachers">
            <Route path="registration/form" element={<div>Teacher Registration Form</div>} />
            <Route path="registration/excel" element={<div>Teacher Excel Form</div>} />
            <Route path="assign/shift" element={<div>Shift Assign</div>} />
            <Route path="assign/class" element={<div>Class Teacher Assign</div>} />
            <Route path="assign/subject" element={<div>Subject Teacher Assign</div>} />
            <Route path="update/profile" element={<div>Teacher Profile Update</div>} />
            <Route path="update/basic" element={<div>Teacher Basic Info</div>} />
            <Route path="update/status" element={<div>Teacher Status</div>} />
            <Route path="details/list" element={<div>Teacher List</div>} />
          </Route>

          {/* Student Attendance */}
          <Route path="attendance/student">
            <Route path="mapping" element={<div>Device Mapping</div>} />
            <Route path="time-config" element={<div>Time Config</div>} />
            <Route path="sms-template" element={<div>SMS Template</div>} />
            <Route path="take/section" element={<div>Section Attendance</div>} />
            <Route path="take/exam" element={<div>Exam Attendance</div>} />
            <Route path="report/sheet" element={<div>Attendance Sheet</div>} />
            <Route path="report/status" element={<div>Attendance Status</div>} />
          </Route>

          {/* Exams (Semester & Class Test) */}
          <Route path="exams">
            <Route path="setting/startup" element={<div>Exam Startup</div>} />
            <Route path="input/section" element={<div>Mark Input Section Wise</div>} />
            <Route path="result/merit" element={<div>Merit Position Process</div>} />
            <Route path="details/marksheet" element={<div>Mark Sheet View</div>} />
          </Route>

          <Route path="class-text">
            <Route path="setting/create" element={<div>Create Class Test</div>} />
            <Route path="input/section" element={<div>CT Mark Input</div>} />
          </Route>

          {/* Fees Management */}
          <Route path="fees">
            <Route path="setting/startup" element={<div>Fees Startup</div>} />
            <Route path="collection/quick" element={<div>Quick Collection</div>} />
            <Route path="details/payment-info" element={<div>Payment Info</div>} />
          </Route>

          {/* Accounts Management */}
          <Route path="accounts">
            <Route path="setting/ledger" element={<div>Create Ledger</div>} />
            <Route path="voucher/payment" element={<div>Payment Voucher</div>} />
            <Route path="reports/balance-sheet" element={<div>Balance Sheet</div>} />
          </Route>

          {/* Settings & Support */}
          <Route path="settings/core/basic" element={<div>Basic Configuration</div>} />
          <Route path="support/token/submit" element={<div>Submit Support Token</div>} />

          {/* 404 Page */}
          <Route path="*" element={<div className="p-10 text-center text-xl font-bold text-red-500">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;