import React, { useState } from 'react';
import { 
  Trash2, 
  Users, 
  Coins, 
  TrendingUp, 
  Trophy, 
  Search,
  CheckCircle2
} from 'lucide-react';

interface DashboardOverviewTabProps {
  wasteDistribution: Array<{ type: string; percentage: number; weightKg: number; color: string; labelColor: string }>;
  prodiContributions: Array<{ name: string; short: string; weightKg: number; percentage: number; students: number; points: number; color: string }>;
  recentDepositActivities: Array<{ id: string; time: string; studentName: string; nim: string; prodi: string; category: string; weightKg: number; points: number; dropPoint: string; operator: string; status: string }>;
  onViewAllSetoran: () => void;
}

export const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({
  wasteDistribution,
  prodiContributions,
  recentDepositActivities,
  onViewAllSetoran,
}) => {
  const [selectedDonutSegment, setSelectedDonutSegment] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* 1. Stat Cards (Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Sampah Terkumpul */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div 
            className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full blur-xl opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
          />
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Sampah Terkumpul
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1 drop-shadow-sm">
              248.5 kg
            </div>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12% dari periode lalu</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Setara 372.8 kg CO₂e dicegah
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner shrink-0">
            <Trash2 className="w-7 h-7" />
          </div>
        </div>

        {/* Total Mahasiswa Aktif */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-cyan-300 transition-all">
          <div 
            className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full blur-xl opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
          />
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Mahasiswa Aktif Partisipasi
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1 drop-shadow-sm">
              1.248 Mahasiswa
            </div>
            <div className="text-xs font-bold text-cyan-700 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8% dari periode lalu</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              68% dari total mahasiswa FEB
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shadow-inner shrink-0">
            <Users className="w-7 h-7" />
          </div>
        </div>

        {/* Total Points */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-amber-300 transition-all">
          <div 
            className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full blur-xl opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
          />
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total RE-FLOW Points
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1 drop-shadow-sm">
              86.420 Points
            </div>
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+15% dari periode lalu</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Teredistribusi & terkonversi sirkular
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner shrink-0">
            <Coins className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 2. Charts Section: Pie/Donut & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart: Distribusi Jenis Sampah */}
        <div className="glass-aero-card rounded-3xl p-5 sm:p-6 border border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Distribusi Jenis Sampah
              </h2>
              <p className="text-xs text-slate-500">
                Warna Frutiger: Aqua, Lime, Cyan, Emerald
              </p>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Total: 248.5 kg
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
            <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90 drop-shadow-md" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                {/* Plastik (42%) Aqua */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="12"
                  strokeDasharray="100.28 238.76"
                  strokeDashoffset="0"
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => setSelectedDonutSegment('Plastik')}
                />
                {/* Kertas (28%) Lime */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#84cc16"
                  strokeWidth="12"
                  strokeDasharray="66.85 238.76"
                  strokeDashoffset="-100.28"
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => setSelectedDonutSegment('Kertas')}
                />
                {/* Logam (18%) Cyan */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="12"
                  strokeDasharray="42.98 238.76"
                  strokeDashoffset="-167.13"
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => setSelectedDonutSegment('Logam')}
                />
                {/* Kaca (12%) Emerald */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray="28.65 238.76"
                  strokeDashoffset="-210.11"
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => setSelectedDonutSegment('Kaca')}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-md shadow-inner flex flex-col items-center justify-center border border-white">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    {selectedDonutSegment || 'Total'}
                  </span>
                  <span className="text-lg font-black text-slate-900 leading-none mt-0.5">
                    {selectedDonutSegment 
                      ? `${wasteDistribution.find(w => w.type === selectedDonutSegment)?.weightKg} kg`
                      : '248.5 kg'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 mt-0.5">
                    {selectedDonutSegment
                      ? `${wasteDistribution.find(w => w.type === selectedDonutSegment)?.percentage}%`
                      : '100%'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 w-full sm:w-auto">
              {wasteDistribution.map((item) => (
                <div 
                  key={item.type}
                  onClick={() => setSelectedDonutSegment(item.type)}
                  className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between sm:justify-start gap-4 text-xs ${
                    selectedDonutSegment === item.type
                      ? 'bg-emerald-100/90 ring-2 ring-emerald-400 font-bold'
                      : 'hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                    <span className="font-bold text-slate-800">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 tabular-nums">{item.percentage}%</span>
                    <span className="text-slate-500 text-[11px] font-medium">({item.weightKg} kg)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart: Kontribusi Program Studi */}
        <div className="glass-aero-card rounded-3xl p-5 sm:p-6 border border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Kontribusi Program Studi FEB
              </h2>
              <p className="text-xs text-slate-500">
                Peringkat akumulasi setoran sampah prodi FEB
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full border border-cyan-300">
              5 Prodi FEB
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {prodiContributions.map((prodi) => (
              <div key={prodi.short} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 flex items-center gap-1.5 truncate max-w-[240px]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: prodi.color }} />
                    {prodi.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-extrabold tabular-nums">{prodi.weightKg} kg</span>
                    <span className="text-slate-400 font-medium">({prodi.percentage}%)</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden shadow-inner flex">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${prodi.percentage * 2.5}%`,
                      backgroundColor: prodi.color,
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.7)'
                    }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>{prodi.students} mahasiswa aktif</span>
                  <span>{prodi.points.toLocaleString('id-ID')} poin</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: FEB Green Challenge & Feed Setoran Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget: FEB Green Challenge */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              FEB Green Challenge
            </span>
            <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
              Peringkat #1
            </span>
          </div>

          <div 
            className="p-4 rounded-2xl text-white relative overflow-hidden shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)'
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'
              }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center shadow-md shrink-0">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest block">
                  Klasemen Internal FEB
                </span>
                <h3 className="text-xl font-extrabold text-white leading-tight">
                  Posisi #1 S1 Akuntansi
                </h3>
                <span className="text-xs font-semibold text-emerald-100">
                  Keunggulan +31.7 kg dari Manajemen
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between font-semibold">
              <span className="text-slate-600">Total Akumulasi FEB:</span>
              <span className="text-emerald-700 font-extrabold">248.5 kg / 86.420 pt</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between font-semibold">
              <span className="text-slate-600">Target Semester:</span>
              <span className="text-amber-700 font-extrabold">Trofi Dekan FEB</span>
            </div>
          </div>
        </div>

        {/* Feed Setoran Terbaru */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Feed Setoran Terbaru
              </h3>
              <p className="text-xs text-slate-500">
                Aktivitas penimbangan terkini di Drop Point
              </p>
            </div>

            <button
              onClick={onViewAllSetoran}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all"
            >
              Buka Data Setoran &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-extrabold">
                  <th className="pb-2">Waktu</th>
                  <th className="pb-2">Mahasiswa</th>
                  <th className="pb-2">Jenis</th>
                  <th className="pb-2 text-right">Berat</th>
                  <th className="pb-2 text-right">Poin</th>
                  <th className="pb-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentDepositActivities.slice(0, 4).map((act) => (
                  <tr key={act.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-2.5 font-mono text-[11px] text-slate-500">
                      {act.time}
                    </td>
                    <td className="py-2.5">
                      <span className="font-bold text-slate-900 block leading-tight">{act.studentName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{act.nim} · {act.prodi}</span>
                    </td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-100 text-slate-800">
                        {act.category}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-slate-900 tabular-nums">
                      {act.weightKg} kg
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-emerald-700 tabular-nums">
                      +{act.points} pt
                    </td>
                    <td className="py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
