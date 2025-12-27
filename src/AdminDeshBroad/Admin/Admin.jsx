import React from 'react';
import { Users, UserCheck, UserPlus, Banknote, MoreHorizontal } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import DailyLifeManagement from './DailyLifeManagement';
import SocialCounter from './SocialCounter';

// --- Data for Charts ---
const areaData = [
  { name: 'Mon', total: 10, fees: 40 },
  { name: 'Tue', total: 40, fees: 15 },
  { name: 'Wed', total: 25, fees: 50 },
  { name: 'Thu', total: 70, fees: 20 },
  { name: 'Fri', total: 45, fees: 70 },
  { name: 'Sat', total: 60, fees: 50 },
  { name: 'Sun', total: 90, fees: 75 },
];

const barData = [
  { name: 'Jan', value: 125000 },
  { name: 'Feb', value: 100000 },
  { name: 'Mar', value: 75000 },
];

const pieData = [
  { name: 'Female Students', value: 45000 },
  { name: 'Male Students', value: 105000 },
];

const COLORS = ['#3F51B5', '#FFA500'];

const Admin = () => {
  const stats = [
    { label: 'Students', value: '150000', icon: <Users size={30} />, color: 'bg-[#E7F7EF]', iconColor: 'text-[#3BB77E]' },
    { label: 'Teachers', value: '2250', icon: <UserCheck size={30} />, color: 'bg-[#E9F2FF]', iconColor: 'text-[#3F8CFF]' },
    { label: 'Parents', value: '5690', icon: <UserPlus size={30} />, color: 'bg-[#FFF5E9]', iconColor: 'text-[#FF9F43]' },
    { label: 'Earnings', value: '$193000', icon: <Banknote size={30} />, color: 'bg-[#FFE9E9]', iconColor: 'text-[#FF5B5B]' },
  ];

  return (
    <div className="ml-10  md:ml-0 p-8 bg-[#F0F1F3] min-h-screen font-sans text-gray-800">
      
      {/* 1. Header & Breadcrumb */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center text-sm mt-1">
          <span className="text-gray-400">Home</span>
          <span className="mx-2 text-gray-400 font-bold">{'>'}</span>
          <span className="text-orange-400 font-semibold uppercase tracking-wider text-xs">Admin</span>
        </div>
      </div>

      {/* 2. Top Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-md shadow-sm flex items-center justify-between border border-gray-100">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${item.color} ${item.iconColor}`}>
              {item.icon}
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm font-medium">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Charts Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Earnings Area Chart */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Earnings</h3>
            <MoreHorizontal className="text-gray-300 cursor-pointer" />
          </div>
          <div className="flex gap-4 mb-6 text-[12px] font-medium">
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Total Collections</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Fees Collection</div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="none" fill="#3b82f6" fillOpacity={0.8} />
                <Area type="monotone" dataKey="fees" stroke="none" fill="#ff0000" fillOpacity={0.9} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses Bar Chart */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 text-center">
          <div className="flex justify-between items-center mb-6 text-left">
            <h3 className="text-lg font-bold">Expenses</h3>
            <MoreHorizontal className="text-gray-300 cursor-pointer" />
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" barSize={35}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#40E0D0' : index === 1 ? '#4169E1' : '#FFA500'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students Donut Chart */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Students</h3>
            <MoreHorizontal className="text-gray-300 cursor-pointer" />
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={65} outerRadius={85} paddingAngle={0} dataKey="value" startAngle={90} endAngle={450}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2">
            <div className="text-center border-r border-gray-100 px-2">
              <div className="w-full h-1 bg-blue-600 mb-2 rounded-full mx-auto"></div>
              <p className="text-gray-400 text-[10px] uppercase font-bold">Female Students</p>
              <p className="font-bold text-lg">45,000</p>
            </div>
            <div className="text-center px-2">
              <div className="w-full h-1 bg-orange-400 mb-2 rounded-full mx-auto"></div>
              <p className="text-gray-400 text-[10px] uppercase font-bold">Male Students</p>
              <p className="font-bold text-lg">1,05,000</p>
            </div>
          </div>
        </div>

      </div>
      <DailyLifeManagement />
      <SocialCounter />
    </div>
  );
};

export default Admin;