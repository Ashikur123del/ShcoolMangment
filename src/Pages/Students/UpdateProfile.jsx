import React, { useState } from 'react';
import { Search, RotateCw, CloudDownload, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

const UpdateProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("PLAY-Morning-A");

  const sections = [
    "PLAY-Morning-A",
    "PLAY-Day-BOYS",
    "NURSERY-Day-A",
    "ONE-Morning-A",
    "SIX-Day-BOYS",
    "SIX-Day-GIRLS"
  ];

  return (
    <section className="bg-white min-h-screen font-sans p-4">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-center items-center relative mb-8 border-b-2 border-[#5551FF] pb-4">
          <h1 className="text-[#5551FF] text-2xl font-medium">Student Profile Update</h1>
          <div className="absolute right-0 bg-[#FF0000] text-white rounded-full p-1 cursor-pointer">
            <HelpCircle size={20} fill="white" stroke="#FF0000" />
          </div>
        </div>

        {/* Custom Dropdown Search Section */}
        <div className="flex justify-center mb-12">
          <div className="border-2 rounded-sm border-[#E5E0FF] p-6 w-full max-w-2xl relative flex justify-center items-end gap-4">
            <div className="relative w-64">
              <label className="text-[#5551FF] text-sm mb-1 block">Section<span className="text-red-500">*</span></label>
              
              {/* Dropdown Toggle */}
              <div 
                onClick={() => setIsOpen(!isOpen)}
                className="border border-[#B4B1FF] rounded px-3 py-1.5 flex justify-between items-center cursor-pointer text-gray-600 bg-white"
              >
                {selectedSection}
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </div>

              {/* Dropdown Menu (Screenshot 21 matching) */}
              {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-50 mt-1 rounded-sm">
                  <div className="p-2 border-b">
                    <div className="relative">
                      <input type="text" className="w-full border border-gray-400 rounded px-2 py-1 pr-8 outline-none text-sm" />
                      <Search size={14} className="absolute right-2 top-2 text-gray-400" />
                    </div>
                  </div>
                  <ul className="max-h-48 overflow-y-auto custom-scrollbar">
                    {sections.map((item) => (
                      <li 
                        key={item}
                        onClick={() => { setSelectedSection(item); setIsOpen(false); }}
                        className={`px-4 py-2 text-sm cursor-pointer ${selectedSection === item ? 'bg-[#3F51B5] text-white' : 'hover:bg-gray-100'}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button className="bg-[#2D3192] text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-opacity-95 shadow-sm h-[38px]">
              <Search size={16} /> Search
            </button>
          </div>
        </div>

        {/* Student List Table (Screenshot 20 matching) */}
        <div className="border border-gray-200 rounded-sm">
          <div className="bg-[#F8F9FE] px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-[#2D3192] font-bold text-sm">Student List</h2>
            <span className="text-[#5551FF] font-bold text-sm">Total Found : 8</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="text-[#2D3192] text-sm">
                <tr>
                  <th className="border-r border-gray-200 p-0 align-top w-1/6">
                    <div className="p-3 pb-1 font-bold">Student ID</div>
                    <div className="p-2 pt-0">
                      <input type="text" className="w-full border border-gray-200 rounded h-10 px-2 outline-none shadow-inner" />
                    </div>
                  </th>
                  <th className="border-r border-gray-200 p-0 align-top w-24">
                    <div className="p-3 pb-1 font-bold">Roll No.</div>
                    <div className="p-2 pt-0">
                      <input type="text" className="w-full border border-gray-200 rounded h-10 px-2 outline-none shadow-inner" />
                    </div>
                  </th>
                  <th className="border-r border-gray-200 p-0 align-top">
                    <div className="p-3 pb-1 font-bold">Name</div>
                    <div className="p-2 pt-0">
                      <input type="text" className="w-full border border-gray-200 rounded h-10 px-2 outline-none shadow-inner" />
                    </div>
                  </th>
                  <th className="border-r border-gray-200 p-3 font-bold align-middle">Gender</th>
                  <th className="border-r border-gray-200 p-3 font-bold align-middle text-left">Mobile No.</th>
                  <th className="border-r border-gray-200 p-3 font-bold align-middle">Religion</th>
                  <th className="p-3 font-bold align-middle">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 border-t border-gray-200">
                <tr className="border-b border-gray-100">
                  <td className="p-4 border-r border-gray-200">6556724</td>
                  <td className="p-4 border-r border-gray-200 text-center">1</td>
                  <td className="p-4 border-r border-gray-200">Rozy akteer</td>
                  <td className="p-4 border-r border-gray-200">Female</td>
                  <td className="p-4 border-r border-gray-200 text-left">01978344361</td>
                  <td className="p-4 border-r border-gray-200">Islam</td>
                  <td className="p-4 flex gap-1 justify-center">
                    <button className="bg-[#2D3192] text-white p-1.5 rounded hover:scale-105 transition"><RotateCw size={18} /></button>
                    <button className="bg-[#5551FF] text-white p-1.5 rounded hover:scale-105 transition"><CloudDownload size={18} /></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 border-r border-gray-200">6556724</td>
                  <td className="p-4 border-r border-gray-200 text-center">1</td>
                  <td className="p-4 border-r border-gray-200">Rozy akteer</td>
                  <td className="p-4 border-r border-gray-200">Female</td>
                  <td className="p-4 border-r border-gray-200 text-left">01978344361</td>
                  <td className="p-4 border-r border-gray-200">Islam</td>
                  <td className="p-4 flex gap-1 justify-center">
                    <button className="bg-[#2D3192] text-white p-1.5 rounded hover:scale-105 transition"><RotateCw size={18} /></button>
                    <button className="bg-[#5551FF] text-white p-1.5 rounded hover:scale-105 transition"><CloudDownload size={18} /></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 border-r border-gray-200">6556724</td>
                  <td className="p-4 border-r border-gray-200 text-center">1</td>
                  <td className="p-4 border-r border-gray-200">Rozy akteer</td>
                  <td className="p-4 border-r border-gray-200">Female</td>
                  <td className="p-4 border-r border-gray-200 text-left">01978344361</td>
                  <td className="p-4 border-r border-gray-200">Islam</td>
                  <td className="p-4 flex gap-1 justify-center">
                    <button className="bg-[#2D3192] text-white p-1.5 rounded hover:scale-105 transition"><RotateCw size={18} /></button>
                    <button className="bg-[#5551FF] text-white p-1.5 rounded hover:scale-105 transition"><CloudDownload size={18} /></button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 border-r border-gray-200">6556724</td>
                  <td className="p-4 border-r border-gray-200 text-center">1</td>
                  <td className="p-4 border-r border-gray-200">Rozy akteer</td>
                  <td className="p-4 border-r border-gray-200">Female</td>
                  <td className="p-4 border-r border-gray-200 text-left">01978344361</td>
                  <td className="p-4 border-r border-gray-200">Islam</td>
                  <td className="p-4 flex gap-1 justify-center">
                    <button className="bg-[#2D3192] text-white p-1.5 rounded hover:scale-105 transition"><RotateCw size={18} /></button>
                    <button className="bg-[#5551FF] text-white p-1.5 rounded hover:scale-105 transition"><CloudDownload size={18} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
            <div className="text-sm text-gray-500 italic">Showing 1 to 1 of 8 entries</div>
            <div className="flex gap-1">
              <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-400"><ChevronLeft size={16} /></button>
              <button className="px-3.5 py-1.5 border border-[#2D3192] bg-[#2D3192] text-white rounded font-medium">1</button>
              <button className="px-3.5 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-gray-50">2</button>
              <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;