import React, { useState, useEffect, useCallback } from 'react';
import { Settings, HelpCircle, Save, RotateCcw, ChevronDown, Search, Users, CheckCircle2 } from 'lucide-react';

const StudentRegistration = () => {
  const [rowCount, setRowCount] = useState(5);
  const [rows, setRows] = useState(Array.from({ length: 6 }, () => createEmptyRow()));
  const [activeSelect, setActiveSelect] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sendSms, setSendSms] = useState(false);

  const THEME_COLOR = "#FF9606"; 
  const NAVY_BLUE = "#2D3192";

  function createEmptyRow() {
    return {
      id: Math.random().toString(36).substr(2, 9),
      selected: false,
      name: '',
      gender: '',
      religion: '',
      category: '',
      designation: '',
      mobile: '',
      isValidMobile: true
    };
  }

  // কাউন্টার ক্যালকুলেশন
  const selectedCount = rows.filter(r => r.selected).length;
  const isAllSelected = rows.length > 0 && rows.every(r => r.selected);

  const handleSelectAll = () => {
    const newValue = !isAllSelected;
    setRows(rows.map(r => ({ ...r, selected: newValue })));
  };

  const handleProcess = () => {
    const count = Math.min(Math.max(Number(rowCount), 1), 50);
    setRows(Array.from({ length: count }, () => createEmptyRow()));
  };

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    
    if (field === 'mobile') {
      const cleaned = value.replace(/\D/g, '').slice(0, 11);
      newRows[index][field] = cleaned;
      newRows[index].isValidMobile = cleaned.length === 0 || /^01[3-9]\d{8}$/.test(cleaned);
    } else {
      newRows[index][field] = value;
    }

    // অটো সিলেকশন লজিক
    if (value !== "" && field !== 'selected') {
      newRows[index].selected = true;
    }
    
    setRows(newRows);
    
    if (['gender', 'religion', 'category', 'designation'].includes(field)) {
      setActiveSelect(null);
      setSearchTerm("");
    }
  };

  // ক্লিয়ার ফাংশন
  const resetForm = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setRows(Array.from({ length: 6 }, () => createEmptyRow()));
      setRowCount(5);
    }
  };

  const optionsData = {
    gender: ['Male', 'Female', 'Other'],
    religion: ['Islam', 'Hindu', 'Christian', 'Buddhist'],
    category: ['General', 'Staff', 'Internal'],
    designation: ['BEP', 'Headmaster', 'Director', 'Principal', 'Senior Teacher', 'Lecturer']
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-[1440px] mx-auto border border-gray-200 rounded-2xl bg-white shadow-xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-white">
           <div className="flex items-center gap-3">
              <div className="bg-[#2D3192] p-2 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-black text-[#2D3192] tracking-tight uppercase">Enlistment <span className="text-[#FF9606]">Terminal</span></h1>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase">System Status</span>
                <span className="text-[12px] font-bold text-green-500 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live & Secure
                </span>
              </div>
              <HelpCircle size={28} className="text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
           </div>
        </div>

        {/* Action Control Panel */}
        <div className="bg-gray-50/50 p-6 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="relative">
                  <input
                    type="number"
                    value={rowCount}
                    onChange={(e) => setRowCount(e.target.value)}
                    className="w-32 border-2 border-gray-200 rounded-xl px-4 py-3 text-xl font-bold focus:border-[#FF9606] outline-none transition-all"
                  />
                  <span className="absolute -top-2.5 left-3 bg-white px-2 text-[10px] font-bold text-[#2D3192] uppercase">Rows</span>
               </div>
               <button
                onClick={handleProcess}
                className="bg-[#2D3192] hover:bg-[#1e2163] px-8 py-3.5 rounded-xl text-white font-bold text-sm flex items-center gap-3 transition-all shadow-lg active:scale-95"
              >
                <Settings size={18} className="animate-spin-slow" /> GENERATE SHEET
              </button>
            </div>

            <div className="flex gap-4">
               <div className="bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                  <CheckCircle2 className="text-[#FF9606]" size={20} />
                  <div>
                    <p className="text-[10px] font-bold border border-gray-300 text-gray-400 uppercase leading-none">Selected</p>
                    <p className="text-lg font-black text-[#2D3192] leading-none">{selectedCount}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#2D3192]">
                <th className="p-4 w-20">
                  <button 
                    onClick={handleSelectAll}
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isAllSelected ? 'bg-[#FF9606] border-[#FF9606]' : 'border-white/30 hover:border-white'}`}
                  >
                    {isAllSelected && <div className="w-3 h-2 border-l-2 border-b-2 border-white -rotate-45 mb-1" />}
                  </button>
                </th>
                {['Full Name', 'Gender', 'Religion', 'Category', 'Designation', 'Mobile No.'].map(h => (
                  <th key={h} className="p-4 text-left text-[12px] font-extrabold text-white uppercase tracking-wider border-r border-white/10">
                    {h} <span className="text-orange-400">*</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, index) => (
                <tr key={row.id} className={`group transition-colors ${row.selected ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => updateRow(index, 'selected', !row.selected)}
                      className={`w-5 h-5 mx-auto rounded border-2 flex items-center justify-center transition-all ${row.selected ? 'bg-[#FF9606] border-[#FF9606]' : 'border-gray-300 group-hover:border-[#FF9606]'}`}
                    >
                      {row.selected && <div className="w-2.5 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />}
                    </button>
                  </td>
                  <td className="p-2 border-r border-gray-200">
                    <input 
                      type="text" value={row.name} onChange={(e) => updateRow(index, 'name', e.target.value)}
                      placeholder="Type name..." 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:bg-white outline-none text-[14px] font-medium transition-all bg-transparent focus:ring-2 focus:ring-orange-100" 
                    />
                  </td>
                  {['gender', 'religion', 'category', 'designation'].map((field) => (
                    <td key={field} className="p-2 border-r border-gray-200">
                      <CustomSelect 
                        index={index} 
                        field={field} 
                        value={row[field]} 
                        options={optionsData[field]} 
                        activeSelect={activeSelect}
                        setActiveSelect={setActiveSelect}
                        updateRow={updateRow}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                      />
                    </td>
                  ))}
                  <td className="p-2">
                    <input 
                      type="text" value={row.mobile} onChange={(e) => updateRow(index, 'mobile', e.target.value)}
                      placeholder="01XXXXXXXXX" 
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-[14px] font-bold transition-all bg-transparent focus:ring-2 ${!row.isValidMobile ? 'text-red-500 bg-red-50 focus:ring-red-100' : 'text-[#FF9606] focus:ring-orange-100'}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="p-8 flex flex-col md:flex-row justify-between items-center bg-gray-50 border-t border-gray-100 gap-6">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => setSendSms(!sendSms)}
          >
              <div className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${sendSms ? 'bg-[#FF9606]' : 'bg-gray-300'}`}>
                <div className={`bg-white w-5 h-5 rounded-full shadow-lg transition-all transform duration-300 ${sendSms ? 'translate-x-7' : 'translate-x-0'}`} />
              </div>
              <span className="text-[13px] font-bold text-gray-500 uppercase group-hover:text-gray-700">Send SMS Confirmation</span>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={resetForm}
              className="flex-1 md:flex-none px-8 py-3.5 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-[13px] hover:bg-white hover:border-red-200 hover:text-red-500 transition-all uppercase tracking-widest"
            >
              <RotateCcw size={16} className="inline mr-2" /> Reset
            </button>
            <button 
              className="flex-1 md:flex-none px-12 py-3.5 rounded-xl text-white font-bold text-[13px] shadow-xl hover:brightness-110 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
              style={{ backgroundColor: THEME_COLOR }}
            >
              <Save size={18} /> Save Data Record
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f9fafb; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f9fafb; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF9606; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
};

// মেমোরাইজড কাস্টম সিলেক্ট কম্পোনেন্ট
const CustomSelect = ({ index, field, value, options, activeSelect, setActiveSelect, updateRow, searchTerm, setSearchTerm }) => {
  const isOpen = activeSelect === `${index}-${field}`;
  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      <div 
        onClick={() => {
          setActiveSelect(isOpen ? null : `${index}-${field}`);
          setSearchTerm("");
        }}
        className={`flex items-center justify-between px-4 py-2.5 rounded-lg bg-white border cursor-pointer transition-all text-[14px] ${
          isOpen ? 'border-[#FF9606] ring-4 ring-orange-50' : 'border-gray-100 hover:border-gray-300'
        }`}
      >
        <span className={value ? "text-gray-900 font-semibold" : "text-gray-400 italic"}>
          {value || `Select...`}
        </span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF9606]' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-2 border-b border-gray-50 bg-gray-50/50">
            <div className="relative">
              <input
                autoFocus
                className="w-full pl-8 pr-4 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-[#FF9606] bg-white"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => updateRow(index, field, opt)}
                  className="px-4 py-2.5 text-[13px] text-gray-700 hover:bg-orange-50 hover:text-[#FF9606] cursor-pointer transition-colors font-medium border-b border-gray-50 last:border-0"
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-[12px] text-gray-400 text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistration;