import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, Upload, FileSpreadsheet, FileDown, CheckCircle2 } from 'lucide-react';

const RegistrationExcel = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({
    academicYear: 'Select Academic Year',
    section: 'Select Section',
    group: 'Select Group',
    category: 'Select Category',
    idType: 'Select Student ID Type'
  });

  const options = {
    academicYear: ['2025', '2024', '2023'],
    section: ['PLAY-Morning-A', 'PLAY-Day-B', 'Nursery-A'],
    group: ['N/A', 'Science', 'Arts', 'Commerce'],
    category: ['A', 'General', 'BGB'],
    idType: ['Auto Generated ID', 'Manual/Custom ID']
  };

  const SmartDropdown = ({ label, field }) => (
    <div className="relative mb-3">
      <label className="text-[12px] font-bold text-[#4247a1] mb-1 block uppercase tracking-tight">
        {label} <span className="text-red-600">*</span>
      </label>
      <button 
        onClick={() => setOpenDropdown(openDropdown === field ? null : field)}
        className={`w-full flex justify-between items-center px-3 py-2 border-2 rounded-lg bg-white transition-all ${
          openDropdown === field ? 'border-[#3368fa] ring-2 ring-[#3368fa]/10' : 'border-slate-300 hover:border-[#3368fa]'
        }`}
      >
        <span className={`text-[13px] font-semibold ${formData[field].includes('Select') ? 'text-slate-400' : 'text-slate-900'}`}>
          {formData[field]}
        </span>
        <ChevronDown size={18} className="text-[#3368fa]" />
      </button>

      {openDropdown === field && (
        <div className="absolute z-[100] w-full mt-1 bg-white border-2 border-slate-200 shadow-xl rounded-xl overflow-hidden">
          <ul className="max-h-48 overflow-y-auto">
            {options[field].map(opt => (
              <li 
                key={opt}
                onClick={() => {
                  setFormData({...formData, [field]: opt});
                  setOpenDropdown(null);
                }}
                className={`px-4 py-2 text-[13px] cursor-pointer border-b border-slate-50 last:border-0 flex items-center justify-between ${
                  formData[field] === opt ? 'bg-[#3368fa] text-white font-bold' : 'hover:bg-[#ecfdf5] text-slate-700'
                }`}
              >
                {opt}
                {formData[field] === opt && <CheckCircle2 size={16} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-2 md:p-4 font-sans antialiased">
      <div className="container mx-auto bg-white shadow-xl rounded-xl border border-slate-200 overflow-hidden">
        
        {/* Top Header - Compact */}
        <div className="flex justify-between items-center px-6 py-3.5 bg-[#4247a1] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileSpreadsheet size={22} />
            </div>
            <h1 className="text-lg font-black uppercase tracking-wide">Student Registration Excel Form</h1>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-colors shadow-lg">
            <HelpCircle size={22} strokeWidth={2.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Panel - Inputs (Compact Padding) */}
          <div className="lg:col-span-7 p-6 border-r border-slate-100">
            <h2 className="text-[12px] font-black text-[#4247A1] uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
              <span className="w-6 h-1 bg-[#3368fa] rounded-full"></span>
              Auto/Custom Student ID
            </h2>
            
            <div className="space-y-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SmartDropdown label="Academic Year" field="academicYear" />
                <SmartDropdown label="Section" field="section" />
              </div>
              <SmartDropdown label="Group" field="group" />
              <SmartDropdown label="Category" field="category" />
              <SmartDropdown label="Student ID Type" field="idType" />

              {/* Upload Section - Reduced Padding */}
              <div className="mt-4">
                <label className="text-[12px] font-bold text-[#4247a1] mb-1.5 block uppercase tracking-tight">Upload Excel File</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50 flex flex-col items-center justify-center hover:bg-[#ecfdf5]/20 hover:border-[#3368fa] transition-all cursor-pointer group">
                  <Upload size={24} className="text-[#3368fa] mb-2" />
                  <p className="text-base font-bold text-slate-800 tracking-tight">Click to browse file</p>
                  <p className="text-[11px] text-slate-500 font-medium">(.xlsx, .xls)</p>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="bg-gradient-to-r from-[#3368fa] to-[#4247a1] text-white px-8 py-2.5 rounded-lg font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Upload size={16} strokeWidth={3} /> Upload
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Downloads (Compact) */}
          <div className="lg:col-span-5 p-6 bg-slate-50/50">
            <h2 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.1em] mb-4 text-center">Required Samples</h2>
            
            <div className="space-y-4">
              {[
                { title: 'Auto ID Template' },
                { title: 'Custom ID Template' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-[#ecfdf5] rounded-xl">
                      <FileSpreadsheet size={24} className="text-[#3368fa]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4247a1] text-[14px] uppercase tracking-tight">{item.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Excel Format</p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-[#4247a1] text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3368fa] transition-colors">
                    <FileDown size={16} /> Download XLSX
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white border border-dashed border-slate-200 rounded-xl">
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed italic text-center opacity-80">
                "Note: Use correct template format."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistrationExcel;