import React, { useState, useRef, useEffect } from 'react';
import { Settings, HelpCircle, Save, RotateCcw, ChevronDown, Search, Users, LayoutGrid } from 'lucide-react';

const StudentRegistration = () => {
  const [rowCount, setRowCount] = useState(1);
  const [rows, setRows] = useState(Array.from({ length: 1 }, () => createEmptyRow()));
  const [sendSms, setSendSms] = useState(false);

  function createEmptyRow() {
    return {
      id: Math.random().toString(36).substr(2, 9),
      roll: '', name: '', gender: '', religion: '', fatherName: '', motherName: '', mobile: ''
    };
  }

  const handleProcess = () => {
    const count = Math.min(Math.max(Number(rowCount), 1), 50);
    setRows(Array.from({ length: count }, () => createEmptyRow()));
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-2 md:p-6 font-sans antialiased text-slate-900">
      <div className="max-w-[1400px] mx-auto bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-xl border border-slate-200 overflow-visible">
        
        {/* Top Header - Smart & Minimal */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2D3192] rounded-lg shadow-md shadow-indigo-100">
              <LayoutGrid size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-[#2D3192]">
              Student Registration Enrollment
            </h1>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm">
            <HelpCircle size={18} />
          </button>
        </div>

        {/* Configuration Section */}
        <div className="p-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-visible">
            <div className="absolute -top-3 left-4 bg-white px-3 text-[11px] font-black uppercase tracking-widest text-[#2D3192]">
              Enrollment Parameters
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
              <SearchableSelect label="Academic Year" options={['2025', '2024', '2018']} />
              <SearchableSelect label="Category" options={['A', 'General', 'BGB']} />
              <SearchableSelect label="Section" options={['PLAY-Morning-A', 'PLAY-Day-B', 'Nursery-A']} />
              <SearchableSelect label="Group" options={['N/A', 'Science', 'Arts', 'Commerce']} />

              <div className="space-y-1.5 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[12px] font-bold text-slate-600 group-focus-within:text-[#FF9606] transition-colors">
                    No. of Rows <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] font-bold text-slate-400">Max 50</span>
                </div>
                <input 
                  type="number" 
                  value={rowCount}
                  onChange={(e) => setRowCount(e.target.value)}
                  className="w-full h-11 border border-slate-200 rounded-lg px-4 text-sm font-medium focus:ring-4 focus:ring-orange-50 focus:border-[#FF9606] outline-none transition-all duration-200 bg-slate-50/30 focus:bg-white" 
                />
              </div>

              <div className="flex items-end">
                <button 
                  onClick={handleProcess}
                  className="w-full h-11 bg-gradient-to-r from-[#3368f1] to-[#4247a1]  hover:bg-[#1e2163] text-white rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98]"
                >
                  <Settings size={18} className="animate-spin-slow" /> PROCESS DATA
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Entry Table */}
        <div className="px-6 pb-24 overflow-visible">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Users size={16} className="text-slate-400" />
            <h2 className="text-[13px] font-bold text-slate-500 uppercase tracking-tight">Student Information Sheet</h2>
          </div>
          
          <div className="border border-slate-200 rounded-xl overflow-visible bg-white">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 w-14 border-b border-slate-200 text-center rounded-tl-xl">
                    <input type="checkbox" className="w-4 h-4 accent-[#FF9606] cursor-pointer" />
                  </th>
                  {['Roll No.', 'Student Name', 'Gender', 'Religion', 'Father\'s Name', 'Mother\'s Name', 'Mobile No.'].map((h, i) => (
                    <th key={i} className={`p-4 border-b border-l border-slate-200 text-left text-[11px] font-extrabold text-slate-600 uppercase tracking-wider ${i === 6 ? 'rounded-tr-xl' : ''}`}>
                      {h} <span className="text-red-400">*</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 border-b border-slate-100 text-center">
                      <input type="checkbox" className="w-4 h-4 accent-[#FF9606]" />
                    </td>
                    <td className="p-3 border-b border-l border-slate-100">
                      <input type="text" placeholder="Roll" className="w-full bg-transparent p-2 text-xs border border-transparent group-hover:border-slate-200 rounded focus:bg-white focus:border-[#FF9606] outline-none transition-all" />
                    </td>
                    <td className="p-3 border-b border-l border-slate-100">
                      <input type="text" placeholder="Full Name" className="w-full bg-transparent p-2 text-xs font-semibold border border-transparent group-hover:border-slate-200 rounded focus:bg-white focus:border-[#FF9606] outline-none transition-all" />
                    </td>
                    <td className="p-3 border-b border-l border-slate-100 overflow-visible">
                      <SearchableSelect isTable options={['Male', 'Female', 'Other']} placeholder="Select" />
                    </td>
                    <td className="p-3 border-b border-l border-slate-100 overflow-visible">
                      <SearchableSelect isTable options={['Islam', 'Hindu', 'Christian']} placeholder="Select" />
                    </td>
                    <td className="p-3 border-b border-l border-slate-100">
                      <input type="text" className="w-full bg-transparent p-2 text-xs border border-transparent group-hover:border-slate-200 rounded focus:bg-white focus:border-[#FF9606] outline-none" />
                    </td>
                    <td className="p-3 border-b border-l border-slate-100">
                      <input type="text" className="w-full bg-transparent p-2 text-xs border border-transparent group-hover:border-slate-200 rounded focus:bg-white focus:border-[#FF9606] outline-none" />
                    </td>
                    <td className="p-3 border-b border-l border-slate-100">
                      <input type="text" placeholder="01XXX-XXXXXX" className="w-full bg-transparent p-2 text-xs font-black text-[#FF9606] border border-transparent group-hover:border-slate-200 rounded focus:bg-white outline-none" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Action Bar */}
       {/* Floating Action Bar */}
<div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-8 py-4 flex flex-row-reverse justify-between items-center gap-4 rounded-b-xl">
  
  {/* Right Side: Auto SMS */}
  <div className="flex items-center gap-4">
    
    <button className="flex items-center gap-2 bg-gradient-to-r from-[#3368f1] to-[#4247a1]   text-white px-10 py-3 rounded-lg font-bold text-xs transition-all shadow-lg shadow-indigo-100 active:scale-95 uppercase tracking-widest">
      <Save size={16}/> Save 
    </button>
    <button className="flex items-center gap-2  py-3 px-6 bg-gradient-to-r from-[#3368f1] to-[#4247a1]  rounded-lg text-white font-bold text-xs transition-colors uppercase tracking-widest">
      <RotateCcw size={14}/> Reset 
    </button>
  </div>
  
  {/* Left Side: Reset and Save Buttons */}
  <div className="flex gap-4">
    <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">Auto SMS</span>
    <div 
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${sendSms ? 'bg-[#FF9606] ring-4 ring-orange-100' : 'bg-slate-300'}`}
      onClick={() => setSendSms(!sendSms)}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ${sendSms ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
  </div>
</div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// Modern Searchable Select Component
const SearchableSelect = ({ label, options, placeholder, isTable = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filtered = options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <label className="text-[12px] font-bold text-slate-600 mb-1.5 block px-1">{label} <span className="text-red-500">*</span></label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between bg-slate-50/50 border border-slate-200 rounded-lg px-4 py-2.5 cursor-pointer text-xs transition-all duration-200 hover:bg-white hover:border-[#FF9606] ${isOpen ? 'ring-4 ring-orange-50 border-[#FF9606] bg-white shadow-sm' : ''} ${isTable ? 'py-2 px-3 bg-transparent border-transparent' : ''}`}
      >
        <span className={`font-medium ${selected ? 'text-slate-900' : 'text-slate-400'}`}>
          {selected || placeholder || options[0]}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF9606]' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-[9999] w-full mt-2 bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200 min-w-[180px]">
          <div className="p-3 border-b border-slate-100 bg-slate-50/30">
            <div className="relative">
              <input
                autoFocus
                className="w-full pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-[#2D3192] transition-all"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={14} className="absolute right-3 top-2.5 text-slate-300" />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length > 0 ? filtered.map((opt) => (
              <div
                key={opt}
                onClick={() => { setSelected(opt); setIsOpen(false); setSearchTerm(""); }}
                className={`px-3 py-2.5 text-xs rounded-lg cursor-pointer transition-all mb-1 last:mb-0 ${selected === opt ? 'bg-[#2D3192] text-white font-bold shadow-md' : 'hover:bg-slate-100 text-slate-700 font-medium'}`}
              >
                {opt}
              </div>
            )) : <div className="p-4 text-center text-slate-400 text-[11px] font-bold">No results found</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistration;