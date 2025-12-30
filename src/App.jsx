import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Dashboard from './Pages/Dashboards/Dashboard';
import Root from './RootLayout/Root';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Responsive Sidebar Control
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
      {/* Mobile Sidebar Overlay */}
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
        {/* Root Layout wrapper */}
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
          {/* Dashboard Route */}
          <Route index element={<Dashboard />} />

          {/* Student Sub-routes */}
          <Route path="students">
            <Route path="setting" element={<div>Student Setting Page</div>} />
            <Route path="configuration" element={<div>Student Configuration Page</div>} />
            <Route path="registration" element={<div>Student Registration Page</div>} />
            <Route path="update" element={<div>Student Update Page</div>} />
            <Route path="reports" element={<div>Student Reports Page</div>} />
          </Route>

          {/* Teacher Sub-routes */}
          <Route path="teachers">
            <Route path="setting" element={<div>Teacher Setting Page</div>} />
            <Route path="registration" element={<div>Teacher Registration Page</div>} />
            <Route path="assign" element={<div>Teacher Assign Page</div>} />
            <Route path="reports" element={<div>Teacher Reports Page</div>} />
          </Route>

          {/* Account Sub-routes */}
          <Route path="student-accounts">
            <Route path="fee-collection" element={<div>Fee Collection Page</div>} />
            <Route path="reports" element={<div>Accounts Reports Page</div>} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<div className="p-10 text-center text-xl">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;