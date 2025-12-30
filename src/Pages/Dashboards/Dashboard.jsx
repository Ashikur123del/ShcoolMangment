import React from 'react';
import Admin from '../../AdminDeshBroad/Admin/Admin';
import { motion } from 'framer-motion';
import DailyLifeManagement from '../../AdminDeshBroad/Admin/DailyLifeManagement';
import SocialCounter from '../../AdminDeshBroad/Admin/SocialCounter';

const Dashboard = () => {
  return (
    // motion.div ব্যবহার করা হয়েছে যাতে পেজটি লোড হওয়ার সময় একটি স্মুথ অ্যানিমেশন হয়
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 bg-[#F0F1F3]" // কন্টেন্টের চারদিকে প্যাডিং যোগ করা হয়েছে
    >
      <Admin />
      <DailyLifeManagement />
      <SocialCounter />
    </motion.div>
  );
};

export default Dashboard;