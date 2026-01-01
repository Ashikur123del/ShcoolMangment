import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  HelpCircle, 
  RotateCw,
  Check
} from 'lucide-react';

const UpdateBasicInfo = () => {
  const [activeTab, setActiveTab] = useState('INFORMATION');
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("PLAY-Morning-A");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Original Data
  const students = [
    { id: "6556724", roll: "1", name: "Rozy akteer", father: "Mohor ali", mother: "Mazeda Begum", dob: "12/03/2019", gender: "Female", religion: "Islam", blood: "A+", mobile: "01978344361" },
    { id: "6557124", roll: "2", name: "Md. Abdullah", father: "Masud Rana", mother: "Nabija Khatun", dob: "06/02/2023", gender: "Male", religion: "Islam", blood: "A+", mobile: "01757049105" },
    { id: "6560724", roll: "20", name: "Efraj", father: "Masud Ahmed", mother: "Selina Begum", dob: "22/05/2018", gender: "Male", religion: "Islam", blood: "A-", mobile: "01688667870" },
    { id: "6562525", roll: "20", name: "Robin", father: "Joynal Abedin", mother: "Lipi Khatun", dob: "10/10/2017", gender: "Male", religion: "Islam", blood: "B+", mobile: "01688667870" },
    { id: "6562526", roll: "21", name: "sabbir", father: "Mamun", mother: "Amina", dob: "04/09/2000", gender: "Male", religion: "Islam", blood: "B+", mobile: "01875432290" }
  ];

  const sections = ["PLAY-Morning-A", "PLAY-Day-BOYS", "NURSERY-Day-A", "ONE-Morning-A", "SIX-Day-BOYS"];

  // Smart Filter Logic for Dropdown
  const filteredSections = useMemo(() => 
    sections.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())), 
    [searchTerm]
  );

  const handleSelectAll = (e) => {
    setSelectedStudents(e.target.checked ? students.map(s => s.id) : []);
  };

  const handleSelectRow = (id) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white min-h-screen font-sans p-4 select-none">
      <div className="container mx-auto max-w-[1600px]">
        
        {/* Header */}
        <div className="flex justify-center items-center relative mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-[#5551FF] text-2xl font-medium uppercase tracking-wider">Update Basic Information</h1>
          <div className="absolute right-0 bg-[#FF0000] text-white rounded-full w-7 h-7 flex items-center justify-center cursor-help shadow-md hover:bg-red-700 transition-colors">
            <HelpCircle size={18} fill="white" stroke="#FF0000" />
          </div>
        </div>

        {/* Tabs - Smart Transition */}
        <div className="flex gap-1 mb-8 border-b-2 border-[#8E8BFF]">
          {['INFORMATION', 'STUDENT ID', 'PHOTO'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 text-sm font-bold rounded-t-md transition-all duration-300 relative ${
                activeTab === tab 
                ? 'bg-[#3F3B9B] text-white' 
                : 'bg-[#DADAFF] text-[#3F3B9B] hover:bg-[#c6c6ff]'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-[#3F3B9B]" />}
            </button>
          ))}
        </div>

        {activeTab === 'INFORMATION' && (
          <div className="animate-in fade-in duration-500">
            {/* Search Box - Smart Dropdown */}
            <div className="flex justify-center mb-10">
              <div className="border border-[#E5E0FF] p-10 w-full max-w-2xl flex justify-center items-end gap-4 shadow-sm bg-white rounded-sm">
                <div className="w-64 relative">
                  <label className="text-[#5551FF] text-sm mb-1 block font-semibold">Section<span className="text-red-500">*</span></label>
                  <div 
                    onClick={() => setIsSectionOpen(!isSectionOpen)}
                    className={`border rounded px-3 py-2 flex justify-between items-center cursor-pointer transition-all ${isSectionOpen ? 'border-[#3F3B9B] ring-1 ring-[#3F3B9B]' : 'border-[#B4B1FF]'}`}
                  >
                    <span className="text-gray-700">{selectedSection}</span>
                    <span className={`text-[#5551FF] text-[10px] transition-transform ${isSectionOpen ? 'rotate-180' : ''}`}>▼</span>
                  </div>

                  {isSectionOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-2xl z-50 mt-1 rounded-sm overflow-hidden">
                      <div className="p-2 border-b">
                        <div className="relative">
                          <input 
                            autoFocus
                            type="text" 
                            className="w-full border rounded px-2 py-1.5 pr-8 outline-none text-sm focus:border-[#5551FF]" 
                            placeholder="Type to search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <Search size={14} className="absolute right-2 top-2.5 text-gray-400" />
                        </div>
                      </div>
                      <ul className="max-h-48 overflow-y-auto custom-scrollbar">
                        {filteredSections.map((item) => (
                          <li 
                            key={item}
                            onClick={() => { setSelectedSection(item); setIsSectionOpen(false); }}
                            className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between ${selectedSection === item ? 'bg-[#3F3B9B] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                          >
                            {item}
                            {selectedSection === item && <Check size={14} />}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <button className="bg-[#2D3192] text-white px-8 py-2 rounded flex items-center gap-2 hover:bg-[#1e2163] transition-all shadow-md h-[40px] active:scale-95">
                  <Search size={16} /> Search
                </button>
              </div>
            </div>

            {/* List Header */}
            <div className="bg-[#F8F9FE] px-4 py-2.5 border border-gray-200 border-b-0 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[#2D3192] font-bold text-sm">Student List</span>
                <span className="text-[#FF51BB] text-[11px] font-semibold italic bg-pink-50 px-2 py-0.5 rounded">
                  ( Check the left box to update edit fields )
                </span>
              </div>
              <span className="text-[#5551FF] font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">Total Found : {students.length}</span>
            </div>

            {/* Smart Table */}
            <div className="border border-gray-200 overflow-x-auto rounded-t-sm shadow-sm">
              <table className="w-full border-collapse">
                <thead className="bg-white text-[#2D3192] text-[13px]">
                  <tr className="border-b border-gray-200">
                    <th className="border-r border-gray-200 p-3 w-12 text-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 cursor-pointer accent-[#2D3192]" 
                        checked={selectedStudents.length === students.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="border-r border-gray-200 p-0 text-left min-w-[120px]">
                      <div className="px-3 pt-2 font-bold">Roll No. <span className="text-red-500">*</span></div>
                      <div className="px-2 pb-3 pt-1"><input type="text" className="w-full border border-gray-200 rounded h-10 px-2 outline-none focus:border-[#5551FF] shadow-inner transition-colors" /></div>
                    </th>
                    <th className="border-r border-gray-200 p-0 text-left min-w-[220px]">
                      <div className="px-3 pt-2 font-bold">Name <span className="text-red-500">*</span></div>
                      <div className="px-2 pb-3 pt-1"><input type="text" className="w-full border border-gray-200 rounded h-10 px-2 outline-none focus:border-[#5551FF] shadow-inner transition-colors" /></div>
                    </th>
                    <th className="border-r border-gray-200 p-3 font-bold">Father's Name *</th>
                    <th className="border-r border-gray-200 p-3 font-bold">Mother's Name *</th>
                    <th className="border-r border-gray-200 p-3 font-bold text-center">Date of Birth</th>
                    <th className="border-r border-gray-200 p-3 font-bold text-center">Gender *</th>
                    <th className="border-r border-gray-200 p-3 font-bold text-center">Religion *</th>
                    <th className="border-r border-gray-200 p-3 font-bold text-center">Blood Group</th>
                    <th className="p-3 font-bold">Mobile No. *</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {students.map((student) => (
                    <tr 
                      key={student.id} 
                      className={`border-b border-gray-100 transition-colors ${selectedStudents.includes(student.id) ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="p-3 border-r border-gray-200 text-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 cursor-pointer accent-[#2D3192]" 
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectRow(student.id)}
                        />
                      </td>
                      <td className="p-4 border-r border-gray-200">{student.roll}</td>
                      <td className="p-4 border-r border-gray-200 font-semibold text-gray-800">{student.name}</td>
                      <td className="p-4 border-r border-gray-200">{student.father}</td>
                      <td className="p-4 border-r border-gray-200">{student.mother}</td>
                      <td className="p-4 border-r border-gray-200 text-center">{student.dob}</td>
                      <td className="p-4 border-r border-gray-200 text-center">{student.gender}</td>
                      <td className="p-4 border-r border-gray-200 text-center">{student.religion}</td>
                      <td className="p-4 border-r border-gray-200 text-center font-bold">{student.blood}</td>
                      <td className="p-4">{student.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination & Update */}
            <div className="flex flex-col mt-0 shadow-sm">
              <div className="bg-[#F8F9FE] border border-gray-200 border-t-0 h-14 flex items-center px-4">
                <div className="flex items-center justify-center w-full gap-2 text-[#2D3192]">
                  <ChevronsLeft size={18} className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
                  <ChevronLeft size={18} className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
                  <div className="bg-[#3F3B9B] text-white px-3.5 py-1.5 rounded-sm font-bold text-sm shadow-sm">1</div>
                  <ChevronRight size={18} className="cursor-pointer hover:scale-110 transition-transform" />
                  <ChevronsRight size={18} className="cursor-pointer hover:scale-110 transition-transform" />
                  <div className="relative ml-2">
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none bg-white cursor-pointer hover:border-[#3F3B9B]">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-[#3F3B9B] text-white px-8 py-2.5 rounded flex items-center gap-2 hover:bg-[#2e2b7a] shadow-lg font-semibold text-sm transition-all active:scale-95 group">
                  <RotateCw size={16} className="group-hover:rotate-180 transition-transform duration-500" /> 
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Smart Tooltip Style for help icon */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #B4B1FF; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3F3B9B; }
      `}</style>
    </section>
  );
};

export default UpdateBasicInfo;