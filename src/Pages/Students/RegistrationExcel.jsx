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
      {/* Label সাইজ বাড়ানো হয়েছে */}
      <label className="text-xs font-bold text-slate-500 mb-2 block tracking-wider uppercase ml-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <button 
        onClick={() => setOpenDropdown(openDropdown === field ? null : field)}
        className={`w-full flex justify-between items-center px-4 py-3.5 border rounded-xl bg-white transition-all duration-300 ${
          openDropdown === field ? 'border-[#2D3192] ring-2 ring-[#2D3192]/10 shadow-sm' : 'border-slate-300 hover:border-[#2D3192]'
        }`}
      >
        {/* টেক্সট সাইজ বাড়ানো হয়েছে */}
        <span className={formData[field].includes('Select') ? 'text-slate-400 text-sm' : 'text-slate-900 font-semibold text-sm'}>
          {formData[field]}
        </span>
        <ChevronDown size={18} className={`text-[#2D3192] transition-transform duration-300 ${openDropdown === field ? 'rotate-180' : ''}`} />
      </button>

      {openDropdown === field && (
        <div className="absolute z-[100] w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-3 bg-slate-50 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={16} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#2D3192]"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto py-2">
            {options[field]
              .filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(opt => (
                <li 
                  key={opt}
                  onClick={() => handleSelect(field, opt)}
                  className="px-4 py-3 hover:bg-[#2D3192] hover:text-white cursor-pointer transition-colors text-sm flex items-center justify-between"
                >
                  {opt}
                  {formData[field] === opt && <CheckCircle2 size={16} className="text-white" />}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-700">
      <div className="container mx-auto max-w-6xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2D3192] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2D3192]/20">
              <FileSpreadsheet className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#2D3192] tracking-tight">Registration Excel Form</h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Student Management Portal</p>
            </div>
          </div>
          <div className="p-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors cursor-pointer group">
            <HelpCircle className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          
          {/* Left Side: Form Area */}
          <div className="flex-[1.6] p-8 md:p-10 border-r border-slate-50">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-[#2D3192]"></div>
              <span className="text-xs font-black text-[#2D3192] uppercase tracking-[0.3em]">Configuration</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SmartDropdown label="Academic Year" field="academicYear" />
              <SmartDropdown label="Section" field="section" />
              <SmartDropdown label="Group" field="group" />
              <SmartDropdown label="Category" field="category" />
              <div className="col-span-1 md:col-span-2">
                <SmartDropdown label="Student ID Type" field="idType" />
              </div>

              {/* Upload Box */}
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 mb-2 block tracking-widest uppercase ml-1">Attachment</label>
                <div 
                  onClick={handleUploadClick}
                  className="group relative border-2 border-dashed border-slate-200 rounded-[1.5rem] py-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-white hover:border-[#2D3192] transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Upload size={28} className="text-[#2D3192]" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Click or drag Excel file here</p>
                  <p className="text-xs text-slate-400 mt-1">Supports .xlsx, .xls files</p>
                  <input type="file" ref={fileInputRef} className="hidden" />
                </div>
              </div>

              {/* Main Action Button */}
              <div className="col-span-1 md:col-span-2 pt-4">
                <button 
                  onClick={handleUploadClick}
                  className="w-full md:w-auto px-12 py-4 bg-[#2D3192] text-white font-black text-xs tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-[#2D3192]/30 hover:bg-[#1e216b] transition-all transform active:scale-95 uppercase"
                >
                  <Upload size={18} />
                  Upload Data Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Downloads Area */}
          <div className="flex-1 bg-slate-50/50 p-8 flex flex-col justify-center">
            <div className="mb-8 text-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Required Templates</span>
            </div>
            
            <div className="space-y-6">
              {[
                { name: 'Auto ID Format', color: 'from-blue-600 to-[#2D3192]' },
                { name: 'Custom ID Format', color: 'from-indigo-600 to-blue-700' }
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="p-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                      <FileSpreadsheet className="text-emerald-500" size={32} />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-800">{item.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ready for download</p>
                  </div>
                  
                  <button className={`w-full py-4 bg-gradient-to-r ${item.color} text-white text-xs font-black tracking-[0.15em] flex items-center justify-center gap-2 hover:opacity-90 uppercase transition-opacity`}>
                    <FileDown size={18} />
                    Download XLSX
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white/80 rounded-2xl border border-dashed border-slate-200 shadow-sm">
              <p className="text-xs leading-relaxed text-slate-500 font-medium italic text-center">
                "Please double-check all required fields in the Excel template before uploading to avoid errors."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistrationExcel;