import React, { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Upload, 
  FileSpreadsheet, 
  FileDown,
  CheckCircle2
} from 'lucide-react';

const RegistrationExcel = () => {
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    academicYear: 'Select Academic Year',
    section: 'Select Section',
    group: 'Select Group',
    category: 'Select Category',
    idType: 'Select Student ID Type'
  });

  const fileInputRef = useRef(null);

  const options = {
    academicYear: ['2017', '2018', '2019', '2020', '2023', '2021-2022'],
    section: ['Section A', 'Section B', 'Section C'],
    group: ['Science', 'Commerce', 'Arts'],
    category: ['Regular', 'Private', 'Scholarship'],
    idType: ['Auto Generated', 'Manual/Custom ID']
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
    setSearchTerm('');
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const SmartDropdown = ({ label, field }) => (
    <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
      <label className="text-[10px] font-bold text-slate-500 mb-1 block tracking-widest uppercase ml-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <button 
        onClick={() => setOpenDropdown(openDropdown === field ? null : field)}
        className={`w-full flex justify-between items-center px-4 py-3 border border-gray-400 rounded-xl bg-white transition-all duration-300 ${
          openDropdown === field ? 'border-[#2D3192] ring-2 ring-[#2D3192]/3 shadow-sm' : 'border-slate-300 hover:border-[#2D3192]'
        }`}
      >
        <span className={formData[field].includes('Select') ? 'text-slate-400 text-xs' : 'text-slate-900 font-semibold text-xs'}>
          {formData[field]}
        </span>
        <ChevronDown size={16} className={`text-[#2D3192] transition-transform duration-300 ${openDropdown === field ? 'rotate-180' : ''}`} />
      </button>

      {openDropdown === field && (
        <div className="absolute z-[100] w-full mt-1 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-2 bg-slate-50 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 text-slate-400" size={12} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search..." 
                className="w-full pl-8 pr-3 py-1 text-[13px] border border-slate-300 rounded-lg focus:outline-none focus:border-[#2D3192]"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          </div>
          <ul className="max-h-48 overflow-y-auto py-1">
            {options[field]
              .filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(opt => (
                <li 
                  key={opt}
                  onClick={() => handleSelect(field, opt)}
                  className="px-4 py-2 hover:bg-[#2D3192] hover:text-white cursor-pointer transition-colors text-xs flex items-center justify-between"
                >
                  {opt}
                  {formData[field] === opt && <CheckCircle2 size={12} className="text-white" />}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-3 md:p-6 font-sans text-slate-700">
      <div className="container mx-auto bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header - Compact */}
        <div className="flex justify-between items-center px-7 py-5 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D3192] rounded-xl flex items-center justify-center shadow-lg shadow-[#2D3192]/20">
              <FileSpreadsheet className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#2D3192] tracking-tight leading-tight">Registration Excel Form</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Student Management Portal</p>
            </div>
          </div>
          <div className="p-1.5 bg-red-50 rounded-full hover:bg-red-100 transition-colors cursor-pointer group">
            <HelpCircle className="text-red-500 group-hover:scale-110 transition-transform" size={22} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          
          {/* Left Side: Form Area - Compact Padding */}
          <div className="flex-[1.6] p-7 md:px-9 border-r border-slate-50">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-px w-6 bg-[#2D3192]"></div>
              <span className="text-[10px] font-black text-[#2D3192] uppercase tracking-[0.3em]">Configuration</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SmartDropdown label="Academic Year" field="academicYear" />
              <SmartDropdown label="Section" field="section" />
              <SmartDropdown label="Group" field="group" />
              <SmartDropdown label="Category" field="category" />
              <div className="col-span-1 md:col-span-2">
                <SmartDropdown label="Student ID Type" field="idType" />
              </div>

              {/* Upload Box - Smaller Height */}
              <div className="col-span-1 md:col-span-2">
                <label className="text-[10px] font-bold text-slate-500 mb-1 block tracking-widest uppercase ml-1">Attachment</label>
                <div 
                  onClick={handleUploadClick}
                  className="group relative border-2 border-dashed border-slate-200 rounded-[1rem] py-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-white hover:border-[#2D3192] transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                    <Upload size={22} className="text-[#2D3192]" />
                  </div>
                  <p className="text-xs font-bold text-slate-600">Click or drag Excel file</p>
                  <input type="file" ref={fileInputRef} className="hidden" />
                </div>
              </div>

              {/* Main Action Button */}
              <div className="col-span-1 md:col-span-2">
                <button 
                  onClick={handleUploadClick}
                  className="w-full md:w-auto px-10 py-3.5 bg-[#2D3192] text-white font-black text-[10px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-[#2D3192]/30 hover:bg-[#1e216b] transition-all transform active:scale-95 uppercase"
                >
                  <Upload size={16} />
                  Upload Data
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Downloads Area - Compact */}
          <div className="flex-1 bg-slate-50/50 p-7 flex flex-col justify-center">
            <div className="mb-6 text-center">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Templates</span>
            </div>
            
            <div className="space-y-5">
              {[
                { name: 'Auto ID Format', color: 'from-blue-600 to-[#2D3192]' },
                { name: 'Custom ID Format', color: 'from-indigo-600 to-blue-700' }
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="p-6 flex flex-col items-center">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-500">
                      <FileSpreadsheet className="text-emerald-500" size={28} />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-800">{item.name}</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Excel Template</p>
                  </div>
                  
                  <button className={`w-full py-3 bg-gradient-to-r ${item.color} text-white text-[9px] font-black tracking-[0.15em] flex items-center justify-center gap-2 hover:opacity-90 uppercase`}>
                    <FileDown size={14} />
                    Download XLSX
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/50 rounded-xl border border-dashed border-slate-200">
              <p className="text-[10px] leading-snug text-slate-400 font-medium italic text-center">
                "Ensure all required fields are filled before uploading."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistrationExcel;