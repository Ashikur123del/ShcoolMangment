import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, HelpCircle, Check, 
  Trash2, Ban, ChevronLeft, ChevronsLeft, 
  ChevronsRight, ChevronRight 
} from 'lucide-react';

const UpdateStatus = () => {
  const [activeTab, setActiveTab] = useState('disable'); 
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("PLAY-Morning-A");
  const [searchQuery, setSearchQuery] = useState("");

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 

  const sections = [
    "PLAY-Morning-A", "PLAY-Day-BOYS", "NURSERY-Day-A", 
    "ONE-Morning-A", "SIX-Day-BOYS", "SIX-Day-GIRLS"
  ];

  // Sample data expanded for pagination visibility
  const studentData = [
    { id: "6556724", roll: "1", name: "Rozy akteer", gender: "Female", mobile: "01978344361" },
    { id: "6557124", roll: "2", name: "Md. Abdullah", gender: "Male", mobile: "01757049105" },
    { id: "6560724", roll: "20", name: "Efraj", gender: "Male", mobile: "01688667870" },
    { id: "6562525", roll: "20", name: "Robin", gender: "Male", mobile: "01688667870" },
    { id: "6560824", roll: "21", name: "sabbir", gender: "Male", mobile: "01875432290" },
    { id: "6560924", roll: "22", name: "rita", gender: "Female", mobile: "01893254600" },
    { id: "6562625", roll: "30", name: "Nirob", gender: "Male", mobile: "01701716101" },
    { id: "6562425", roll: "100", name: "Md Sumon Mrtidhga", gender: "Male", mobile: "01911292927" },
  ];

  // --- Fixed Pagination Logic ---
  const totalPages = Math.ceil(studentData.length / itemsPerPage);
  
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return studentData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, itemsPerPage, studentData]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-4 font-sans text-slate-700">
      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto mb-6 bg-white border border-gray-200 p-3 rounded-sm flex justify-between items-center shadow-sm">
        <h1 className="flex-1 text-center text-[#5551FF] text-xl font-bold">Student Status Update</h1>
        <div className="bg-[#FF0000] rounded-full p-1 cursor-pointer hover:bg-red-700 transition-colors">
          <HelpCircle size={18} color="white" strokeWidth={3} />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-2">
        
        {/* --- TO DISABLE SECTION --- */}
        <div className="border border-gray-300 rounded-sm overflow-hidden bg-white shadow-sm">
          <button 
            onClick={() => setActiveTab(activeTab === 'disable' ? null : 'disable')}
            className="w-full bg-[#3F51B5] text-white flex items-center gap-3 px-4 py-2.5 text-sm font-semibold"
          >
            <motion.div animate={{ rotate: activeTab === 'disable' ? 0 : -90 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
            To Disable
          </button>

          <AnimatePresence>
            {activeTab === 'disable' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="p-8">
                  {/* Smart Search Box Area */}
                  <div className="flex justify-center mb-10">
                    <div className="w-full max-w-xl p-10 border border-indigo-50 rounded-sm shadow-sm flex items-end gap-4 bg-white relative">
                      <div className="flex-1 relative">
                        <label className="text-xs font-bold text-[#2D3192] mb-1.5 block">Section<span className="text-red-500 ml-0.5">*</span></label>
                        <div 
                          onClick={() => setIsSectionOpen(!isSectionOpen)}
                          className="border border-gray-300 rounded-sm px-3 py-2 flex justify-between items-center cursor-pointer text-sm bg-white hover:border-indigo-400 transition-all"
                        >
                          <span className="text-slate-600">{selectedSection}</span>
                          <ChevronDown size={16} className="text-[#2D3192]" />
                        </div>

                        <AnimatePresence>
                          {isSectionOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-2xl z-50 mt-1 rounded-sm overflow-hidden"
                            >
                              <div className="p-2 border-b bg-gray-50">
                                <div className="relative">
                                  <input 
                                    type="text" 
                                    placeholder="Search..."
                                    className="w-full border rounded-sm px-2 py-1.5 outline-none text-xs pr-8 focus:border-indigo-400"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                  />
                                  <Search size={14} className="absolute right-2 top-2 text-gray-400" />
                                </div>
                              </div>
                              <ul className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                                {sections.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).map(s => (
                                  <li 
                                    key={s} 
                                    onClick={() => { setSelectedSection(s); setIsSectionOpen(false); }}
                                    className={`px-4 py-2 text-xs cursor-pointer transition-colors ${selectedSection === s ? 'bg-[#3F51B5] text-white' : 'hover:bg-indigo-50 text-slate-700'}`}
                                  >
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <button className="bg-[#2D3192] hover:bg-[#1e2163] text-white px-8 py-2 rounded-sm flex items-center gap-2 text-sm font-bold shadow-md h-[38px] transition-all active:scale-95">
                        <Search size={18} /> Search
                      </button>
                    </div>
                  </div>

                  {/* Header Info Bar */}
                  <div className="bg-[#F4F6FA] px-4 py-2.5 border border-gray-200 flex justify-between items-center">
                    <div className="text-[12px] flex items-center gap-1">
                      <span className="text-[#2D3192] font-bold">Enable Student List</span>
                      <span className="text-[#FF51BB] italic font-medium">
                        ( Check the left box <input type="checkbox" disabled className="w-3.5 h-3.5 mx-1 translate-y-0.5" /> to disable Student data fields )
                      </span>
                    </div>
                    <span className="text-[#2D3192] font-bold text-xs uppercase">Total Found : {studentData.length}</span>
                  </div>

                  {/* Data Table */}
                  <div className="border border-t-0 border-gray-200 overflow-x-auto bg-white">
                    <table className="w-full text-left text-[13px] border-collapse">
                      <thead className="bg-white text-[#2D3192] border-b">
                        <tr>
                          <th className="p-2.5 border-r w-12 text-center"><input type="checkbox" className="w-4 h-4 accent-[#2D3192]" /></th>
                          <th className="p-2.5 border-r min-w-[140px]">
                            <div className="mb-1">Student ID</div>
                            <input type="text" className="w-full border rounded-sm h-7 px-2 outline-none font-normal focus:border-indigo-400" />
                          </th>
                          <th className="p-2.5 border-r min-w-[100px]">
                            <div className="mb-1">Roll No.</div>
                            <input type="text" className="w-full border rounded-sm h-7 px-2 outline-none font-normal focus:border-indigo-400" />
                          </th>
                          <th className="p-2.5 border-r min-w-[350px]">
                            <div className="mb-1">Name</div>
                            <input type="text" className="w-full border rounded-sm h-7 px-2 outline-none font-normal focus:border-indigo-400" />
                          </th>
                          <th className="p-2.5 border-r text-center">Gender</th>
                          <th className="p-2.5 text-center">Mobile No.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableData.map((s, i) => (
                          <tr key={s.id} className="border-b last:border-0 hover:bg-indigo-50/40 transition-colors group">
                            <td className="p-2.5 border-r text-center group-hover:bg-indigo-50/50"><input type="checkbox" className="w-4 h-4 accent-[#2D3192]" /></td>
                            <td className="p-2.5 border-r text-slate-600 font-medium">{s.id}</td>
                            <td className="p-2.5 border-r text-slate-500">{s.roll}</td>
                            <td className="p-2.5 border-r text-slate-800 font-medium">{s.name}</td>
                            <td className="p-2.5 border-r text-center text-slate-600">{s.gender}</td>
                            <td className="p-2.5 text-center text-slate-600">{s.mobile}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Section */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex-1 flex justify-center items-center gap-3">
                      <div className="flex border border-gray-300 rounded-sm overflow-hidden bg-white shadow-sm">
                        <button 
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className="p-1.5 border-r hover:bg-gray-50 text-gray-400 disabled:opacity-30 transition-colors"
                        >
                          <ChevronsLeft size={16} />
                        </button>
                        <button 
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-1.5 border-r hover:bg-gray-50 text-gray-400 disabled:opacity-30 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        
                        <button className="px-4 py-1 bg-[#2D3192] text-white text-xs font-extrabold">
                          {currentPage}
                        </button>
                        
                        <button 
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="p-1.5 border-l hover:bg-gray-50 text-gray-400 disabled:opacity-30 transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                        <button 
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className="p-1.5 border-l hover:bg-gray-50 text-gray-400 disabled:opacity-30 transition-colors"
                        >
                          <ChevronsRight size={16} />
                        </button>
                      </div>
                      
                      <select 
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="border border-gray-300 rounded-sm px-1.5 py-1 text-xs font-bold text-slate-600 outline-none focus:border-indigo-400"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    
                    <button className="bg-[#2D3192] hover:bg-[#1e2163] text-white px-8 py-2 rounded-sm flex items-center gap-2 text-xs font-bold shadow-md transition-all active:scale-95">
                      <Ban size={16} /> Disable
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- TO ENABLE SECTION --- */}
        <div className="border border-gray-300 rounded-sm overflow-hidden bg-white shadow-sm">
          <button 
            onClick={() => setActiveTab(activeTab === 'enable' ? null : 'enable')}
            className="w-full bg-[#3F51B5] text-white flex items-center gap-3 px-4 py-2.5 text-sm font-semibold"
          >
            <motion.div animate={{ rotate: activeTab === 'enable' ? 0 : -90 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={18} />
            </motion.div>
            To Enable
          </button>

          <AnimatePresence>
            {activeTab === 'enable' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="p-8">
                  <div className="bg-[#F4F6FA] px-4 py-2.5 border border-gray-200 flex justify-between items-center text-[12px]">
                    <div>
                      <span className="text-[#2D3192] font-bold uppercase">Disable Student List</span>
                      <span className="text-[#FF51BB] italic font-medium ml-1">( Check the left box to enable data fields )</span>
                    </div>
                    <span className="text-[#2D3192] font-bold text-xs uppercase">Total Found : 0</span>
                  </div>
                  
                  <div className="border border-t-0 border-gray-200 bg-white overflow-x-auto">
                    <table className="w-full text-left text-[13px] border-collapse">
                      <thead className="text-[#2D3192] border-b">
                        <tr>
                          <th className="p-2.5 border-r w-12 text-center bg-indigo-50/20"><input type="checkbox" checked readOnly className="w-4 h-4 accent-[#3F51B5]" /></th>
                          <th className="p-2.5 border-r min-w-[120px]">Student ID <input type="text" className="w-full border h-7 mt-1 outline-none focus:border-indigo-400 px-2 font-normal" /></th>
                          <th className="p-2.5 border-r min-w-[80px]">Roll No. <input type="text" className="w-full border h-7 mt-1 outline-none focus:border-indigo-400 px-2 font-normal" /></th>
                          <th className="p-2.5 border-r min-w-[200px]">Name <input type="text" className="w-full border h-7 mt-1 outline-none focus:border-indigo-400 px-2 font-normal" /></th>
                          <th className="p-2.5 border-r min-w-[80px]">Class</th>
                          <th className="p-2.5 border-r min-w-[80px]">Shift</th>
                          <th className="p-2.5 border-r min-w-[150px]">Section <input type="text" className="w-full border h-7 mt-1 outline-none focus:border-indigo-400 px-2 font-normal" /></th>
                          <th className="p-2.5 border-r min-w-[80px]">Gender</th>
                          <th className="p-2.5 min-w-[120px]">Mobile No.</th> 
                        </tr>
                      </thead>
                    </table>
                    <div className="p-14 text-center text-sm text-gray-400 italic">No records found</div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button className="bg-[#2D3192] hover:bg-[#1e2163] text-white px-8 py-2 rounded-sm flex items-center gap-2 text-xs font-bold shadow-md transition-all active:scale-95">
                      <Check size={18} /> Enable
                    </button>
                    <button className="bg-[#E91E63] hover:bg-[#c2185b] text-white px-8 py-2 rounded-sm flex items-center gap-2 text-xs font-bold shadow-md transition-all active:scale-95">
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default UpdateStatus;