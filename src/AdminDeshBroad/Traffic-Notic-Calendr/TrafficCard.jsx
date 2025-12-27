export default function TrafficCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-2">Website Traffic</h2>
      <p className="text-gray-400">Unique Visitors</p>
      <h1 className="text-3xl font-bold mb-4">2,590</h1>

      {/* Progress Bar */}
      <div className="flex h-2 rounded-full overflow-hidden mb-6">
        <div className="bg-emerald-400 w-1/2"></div>
        <div className="bg-blue-500 w-[27%]"></div>
        <div className="bg-yellow-400 w-[8%]"></div>
        <div className="bg-red-500 w-[7%]"></div>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <Stat color="bg-emerald-400" label="Direct" value="12,890" percent="50%" />
        <Stat color="bg-blue-500" label="Search" value="7,245" percent="27%" />
        <Stat color="bg-yellow-400" label="Referrals" value="4,256" percent="8%" />
        <Stat color="bg-red-500" label="Social" value="500" percent="7%" />
      </div>
    </div>
  )
}

function Stat({ color, label, value, percent }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${color}`}></span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex gap-6 font-medium">
        <span>{value}</span>
        <span>{percent}</span>
      </div>
    </div>
  )
}
