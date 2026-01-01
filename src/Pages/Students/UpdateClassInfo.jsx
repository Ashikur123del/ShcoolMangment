import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  HelpCircle, 
  RotateCw 
} from 'lucide-react';

const UpdateClassInfo = () => {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("PLAY-Morning-A");
  const [sectionSearch, setSectionSearch] = useState("");
  const dropdownRef = useRef(null);

  // --- SEARCH STATES ---
  const [searchId, setSearchId] = useState("");
  const [searchRoll, setSearchRoll] = useState("");
  const [searchName, setSearchName] = useState("");

  // --- PAGINATION & SELECTION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Test করার জন্য ৫ দিলাম
  const [selectedIds, setSelectedIds] = useState([]);

  // Mock Data (বেশি ডাটা দেওয়া হয়েছে যাতে প্যাজিনেশন চেক করা যায়)
  const allStudents = [
    { id: "6556724", roll: "1", name: "Rozy akteer", group: "N/A", category: "General" },
    { id: "6557124", roll: "2", name: "Md. Abdullah", group: "N/A", category: "General" },
    { id: "6560724", roll: "20", name: "Efraj", group: "N/A", category: "General" },
    { id: "6562525", roll: "20", name: "Robin", group: "N/A", category: "General" },
    { id: "6560824", roll: "21", name: "sabbir", group: "N/A", category: "General" },
    { id: "6560924", roll: "22", name: "rita", group: "N/A", category: "General" },
    { id: "6562625", roll: "30", name: "Nirob", group: "N/A", category: "General" },
    { id: "6562425", roll: "100", name: "Md Sumon", group: "N/A", category: "General" },
    { id: "6562426", roll: "101", name: "Hasan Mahmud", group: "N/A", category: "General" },
    { id: "6562427", roll: "102", name: "Mitu Akter", group: "N/A", category: "General" },
    { id: "6562428", roll: "103", name: "Arif Hossain", group: "N/A", category: "General" },
    { id: "6562429", roll: "104", name: "Sonia Akter", group: "N/A", category: "General" },
  ];

  const sections = ["PLAY-Morning-A", "PLAY-Day-BOYS", "NURSERY-Day-A", "ONE-Morning-A", "SIX-Day-BOYS", "SIX-Day-GIRLS"];

  // --- FILTER LOGIC ---
  const filteredStudents = allStudents.filter(s => 
    s.id.toLowerCase().includes(searchId.toLowerCase()) &&
    s.roll.toLowerCase().includes(searchRoll.toLowerCase()) &&
    s.name.toLowerCase().includes(searchName.toLowerCase())
  );

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  // Checkbox: Select all logic for current page
  const handleSelectAll = (e) => {
    const currentIds = currentItems.map(s => s.id);
    if (e.target.checked) {
      setSelectedIds(prev => [...new Set([...prev, ...currentIds])]);
    } else {
      setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleRowSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setCurrentPage(num);
  };

  // Reset page when search or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchId, searchRoll, searchName, itemsPerPage]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsSectionOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-4 font-sans text-slate-800">
      {/* Title */}
      <div className="flex justify-center items-center relative mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-[#5551FF] text-xl font-bold uppercase tracking-tight">Class Related Information Update</h1>
        <div className="absolute right-0 bg-[#FF0000] text-white rounded-full w-6 h-6 flex items-center justify-center cursor-help">
          <HelpCircle size={16} fill="white" stroke="#FF0000" />
        </div>
      </div>

      {/* Search Filter Section */}
      <div className="flex justify-center mb-10">
        <div className="border border-indigo-100 p-8 w-full max-w-2xl flex justify-center items-end gap-4 bg-white shadow-sm rounded-lg relative">
          <div className="w-64 relative" ref={dropdownRef}>
            <label className="text-[#2D3192] text-sm mb-1.5 block font-bold">Section<span className="text-red-500">*</span></label>
            <div 
              onClick={() => setIsSectionOpen(!isSectionOpen)}
              className="border border-gray-300 rounded px-3 py-1.5 flex justify-between items-center cursor-pointer bg-white text-sm"
            >
              <span>{selectedSection}</span>
              <span className="text-[#2D3192] text-[10px]">▼</span>
            </div>
            {isSectionOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-xl z-50 mt-1 rounded-md overflow-hidden">
                <div className="p-2 border-b">
                  <div className="relative">
                    <input 
                      type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 pr-8 outline-none text-sm" 
                      placeholder="Search section..." value={sectionSearch} onChange={(e) => setSectionSearch(e.target.value)}
                    />
                    <Search size={14} className="absolute right-2 top-2.5 text-gray-400" />
                  </div>
                </div>
                <ul className="max-h-48 overflow-y-auto">
                  {sections.filter(s => s.toLowerCase().includes(sectionSearch.toLowerCase())).map((item) => (
                    <li key={item} onClick={() => { setSelectedSection(item); setIsSectionOpen(false); }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50 ${selectedSection === item ? 'bg-[#3F3B9B] text-white' : ''}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button className="bg-[#2D3192] text-white px-8 py-2 rounded flex items-center gap-2 text-sm font-bold h-[38px] shadow-sm hover:bg-[#1e2163]">
            <Search size={16} /> Search
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-[#F8F9FE] px-4 py-2 border border-slate-300 border-b-0 flex justify-between items-center rounded-t-md">
        <div className="flex items-center gap-2">
          <span className="text-[#2D3192] font-bold text-sm">Student List</span>
          <span className="text-[#FF51BB] text-[11px] italic font-medium">( Check the box to update fields )</span>
        </div>
        <span className="text-[#2D3192] font-bold text-sm">Total Found: {filteredStudents.length}</span>
      </div>

      {/* Main Table */}
      <div className="border border-slate-300 overflow-x-auto bg-white rounded-b-md shadow-sm">
        <table className="w-full border-collapse">
          <thead className="text-[#2D3192] text-[13px] uppercase">
            <tr className="border-b border-slate-300">
              <th className="border-r border-slate-300 p-3 w-12 text-center">
                <input 
                  type="checkbox" className="w-4 h-4 cursor-pointer accent-[#2D3192]" 
                  onChange={handleSelectAll}
                  checked={currentItems.length > 0 && currentItems.every(s => selectedIds.includes(s.id))}
                />
              </th>
              <th className="border-r border-slate-300 p-0 min-w-[130px]">
                <div className="px-3 pt-2 font-bold">Student ID</div>
                <div className="px-2 pb-3 pt-1">
                    <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="w-full border border-gray-300 rounded h-7 px-2 outline-none font-normal normal-case" placeholder="Filter..." />
                </div>
              </th>
              <th className="border-r border-slate-300 p-0 min-w-[100px]">
                <div className="px-3 pt-2 font-bold">Roll No.</div>
                <div className="px-2 pb-3 pt-1">
                    <input type="text" value={searchRoll} onChange={(e) => setSearchRoll(e.target.value)} className="w-full border border-gray-300 rounded h-7 px-2 outline-none font-normal normal-case" placeholder="Filter..." />
                </div>
              </th>
              <th className="border-r border-slate-300 p-0 min-w-[350px]">
                <div className="px-3 pt-2 font-bold text-left">Name</div>
                <div className="px-2 pb-3 pt-1">
                    <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-full border border-gray-300 rounded h-7 px-2 outline-none font-normal normal-case" placeholder="Filter name..." />
                </div>
              </th>
              <th className="border-r border-slate-300 p-3 font-bold text-left">Group</th>
              <th className="p-3 font-bold text-left">Category</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700">
            {currentItems.length > 0 ? (
              currentItems.map((student) => (
                <tr key={student.id} className={`border-b border-slate-200 hover:bg-slate-50 ${selectedIds.includes(student.id) ? 'bg-indigo-50' : ''}`}>
                  <td className="p-3 border-r border-slate-300 text-center">
                    <input 
                      type="checkbox" className="w-4 h-4 accent-[#2D3192] cursor-pointer" 
                      checked={selectedIds.includes(student.id)}
                      onChange={() => handleRowSelect(student.id)}
                    />
                  </td>
                  <td className="p-3 border-r border-slate-300 font-medium">{student.id}</td>
                  <td className="p-3 border-r border-slate-300">{student.roll}</td>
                  <td className="p-3 border-r border-slate-300 font-semibold">{student.name}</td>
                  <td className="p-3 border-r border-slate-300">{student.group}</td>
                  <td className="p-3">{student.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-400 italic">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION CONTROLS --- */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <div className="flex bg-white border border-gray-300 rounded p-1 shadow-sm">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-20 cursor-pointer">
            <ChevronsLeft size={18} />
          </button>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-20 cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          
          <div className="px-4 flex items-center font-bold text-xs gap-2 border-x border-gray-100">
             <span className="text-gray-500">Page</span>
             <span className="bg-[#3F3B9B] text-white min-w-[24px] h-6 flex items-center justify-center rounded-sm shadow-sm px-1">{currentPage}</span>
             <span className="text-gray-500">of {totalPages || 1}</span>
          </div>
          
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-20 cursor-pointer">
            <ChevronRight size={18} />
          </button>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-20 cursor-pointer">
            <ChevronsRight size={18} />
          </button>
        </div>

        <select 
          value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-bold text-gray-600 outline-none cursor-pointer"
        >
          <option value={5}>Show 5</option>
          <option value={10}>Show 10</option>
          <option value={20}>Show 20</option>
        </select>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        {['Update Category', 'Update Group', 'Update Section'].map((label) => (
          <button key={label} className="bg-[#2D3192] text-white px-6 py-2.5 rounded flex items-center gap-2 text-sm font-bold shadow hover:bg-[#1e2163] transition-all active:scale-95">
            <RotateCw size={14} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UpdateClassInfo;