import React from 'react'
import CalendarCard from '../Traffic-Notic-Calendr/CalendarCard'
import TrafficCard from '../Traffic-Notic-Calendr/TrafficCard'
import NoticeBoard from '../Traffic-Notic-Calendr/NoticeBoard'


const DailyLifeManagement = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 bg-[#F0F1F3]">
      <CalendarCard />
      <TrafficCard />
      <NoticeBoard />
      
    </div>
  )
}

export default DailyLifeManagement
