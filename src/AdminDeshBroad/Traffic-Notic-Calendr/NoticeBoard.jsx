export default function NoticeBoard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow h-[420px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Notice Board</h2>

      <Notice color="bg-teal-400" />
      <Notice color="bg-yellow-400" />
      <Notice color="bg-pink-500" />
    </div>
  )
}

function Notice({ color }) {
  return (
    <div className="mb-6">
      <span className={`${color} text-white text-sm px-3 py-1 rounded-full`}>
        16 June, 2019
      </span>
      <p className="font-semibold mt-3">
        Great School manag mene esom text of the printing.
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Jennyfar Lopez / 5 min ago
      </p>
      <hr className="mt-4" />
    </div>
  )
}
