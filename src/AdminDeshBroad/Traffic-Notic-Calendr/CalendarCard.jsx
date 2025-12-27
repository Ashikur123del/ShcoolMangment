import { useState } from "react";

export default function CalendarCard() {
  const [view, setView] = useState("Month"); // Click handle korar jonno state
  
  const today = new Date();
  const monthName = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  
  // Dynamic dates calculation
  const firstDay = new Date(year, today.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

  return (
    <div className="bg-white rounded-2xl p-6 shadow max-w-sm">
      <h2 className="text-xl font-semibold mb-1">Event Calendar</h2>
      <p className="font-medium mb-4 text-gray-600">{monthName} {year}</p>

      {/* Dynamic Tabs with Click Action */}
      <div className="flex bg-gray-100 rounded-full p-1 w-fit mb-6">
        {["Day", "Week", "Month"].map((item) => (
          <button
            key={item}
            onClick={() => setView(item)}
            className={`px-4 py-1 transition-all duration-200 ${
              view === item 
                ? "bg-[#F50057] text-white rounded-full shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-center text-sm gap-y-3">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <p key={d} className="font-semibold text-gray-400">{d}</p>
        ))}
        
        {/* Empty slots for correct start day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Dynamic Days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate();
          
          return (
            <button 
              key={i} 
              className={`hover:bg-pink-50 rounded-lg py-1 transition-colors ${
                isToday ? "font-bold text-[#F50057] bg-pink-50" : "text-gray-700"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}