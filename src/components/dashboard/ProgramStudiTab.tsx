import React, { useState } from 'react';
import { 
  Building, 
  Trophy, 
  Scale, 
  Coins, 
  Users, 
  Layers, 
  Award, 
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const ProgramStudiTab: React.FC = () => {
  const [selectedProdiId, setSelectedProdiId] = useState('pap');

  // FEB Study program options
  const prodiList = [
    {
      id: 'pap',
      name: 'S1 Pendidikan Administrasi Perkantoran',
      code: 'PAP',
      rank: 1,
      totalWasteKg: 88.5,
      totalPoints: 30800,
      activeStudents: 480,
      totalEnrolled: 620,
      dominantWaste: 'Kertas & Plastik (46%)',
      wasteBreakdown: [
        { type: 'Kertas', weightKg: 40.7, percentage: 46, color: '#84cc16' },
        { type: 'Plastik', weightKg: 24.8, percentage: 28, color: '#06b6d4' },
        { type: 'Logam', weightKg: 13.3, percentage: 15, color: '#0ea5e9' },
        { type: 'Kaca', weightKg: 9.7, percentage: 11, color: '#10b981' },
      ],
      topStudents: [
        { rank: 1, name: 'Amanda Clarissa', nim: '1107621045', wasteKg: 23.4, points: 2340, badge: 'Eco Champion' },
        { rank: 2, name: 'Rizky Pratama', nim: '1107621030', wasteKg: 19.8, points: 1980, badge: 'Green Hero' },
        { rank: 3, name: 'Tiara Andini', nim: '1107621012', wasteKg: 16.2, points: 1620, badge: 'Green Hero' },
        { rank: 4, name: 'Fikri Haikal', nim: '1107621098', wasteKg: 14.5, points: 1450, badge: 'Pilah Pertama' },
        { rank: 5, name: 'Salsabila Putri', nim: '1107621055', wasteKg: 12.0, points: 1200, badge: 'Pilah Pertama' },
      ],
    },
    {
      id: 'akt',
      name: 'S1 Akuntansi',
      code: 'AKT',
      rank: 2,
      totalWasteKg: 58.3,
      totalPoints: 20200,
      activeStudents: 295,
      totalEnrolled: 380,
      dominantWaste: 'Kertas (42%)',
      wasteBreakdown: [
        { type: 'Kertas', weightKg: 24.5, percentage: 42, color: '#84cc16' },
        { type: 'Plastik', weightKg: 19.8, percentage: 34, color: '#06b6d4' },
        { type: 'Logam', weightKg: 8.2, percentage: 14, color: '#0ea5e9' },
        { type: 'Kaca', weightKg: 5.8, percentage: 10, color: '#10b981' },
      ],
      topStudents: [
        { rank: 1, name: 'Budi Santoso', nim: '1107621088', wasteKg: 18.5, points: 1850, badge: 'Green Hero' },
        { rank: 2, name: 'Farhan Maulana', nim: '1107621074', wasteKg: 14.0, points: 1400, badge: 'Green Hero' },
        { rank: 3, name: 'Rani Permata', nim: '1107621063', wasteKg: 11.2, points: 1120, badge: 'Pilah Pertama' },
        { rank: 4, name: 'Aldo Kusuma', nim: '1107621021', wasteKg: 9.8, points: 980, badge: 'Pilah Pertama' },
        { rank: 5, name: 'Maya Citra', nim: '1107621040', wasteKg: 8.5, points: 850, badge: 'Pilah Pertama' },
      ],
    },
    {
      id: 'man',
      name: 'S1 Manajemen',
      code: 'MAN',
      rank: 3,
      totalWasteKg: 46.2,
      totalPoints: 16100,
      activeStudents: 240,
      totalEnrolled: 320,
      dominantWaste: 'Plastik (40%)',
      wasteBreakdown: [
        { type: 'Plastik', weightKg: 18.5, percentage: 40, color: '#06b6d4' },
        { type: 'Kertas', weightKg: 14.8, percentage: 32, color: '#84cc16' },
        { type: 'Kaca', weightKg: 6.9, percentage: 15, color: '#10b981' },
        { type: 'Logam', weightKg: 6.0, percentage: 13, color: '#0ea5e9' },
      ],
      topStudents: [
        { rank: 1, name: 'Siti Rahayu', nim: '1107622014', wasteKg: 15.0, points: 1500, badge: 'Green Hero' },
        { rank: 2, name: 'Dewi Lestari', nim: '1107621062', wasteKg: 12.8, points: 1280, badge: 'Green Hero' },
        { rank: 3, name: 'Putri Ayu', nim: '1107622031', wasteKg: 9.5, points: 950, badge: 'Pilah Pertama' },
        { rank: 4, name: 'Nisa Amelia', nim: '1107622045', wasteKg: 8.1, points: 810, badge: 'Pilah Pertama' },
        { rank: 5, name: 'Hani Widya', nim: '1107622008', wasteKg: 7.0, points: 700, badge: 'Pilah Pertama' },
      ],
    },
    {
      id: 'doa',
      name: 'D4 Digital Office Administration',
      code: 'DOA',
      rank: 4,
      totalWasteKg: 38.0,
      totalPoints: 13200,
      activeStudents: 185,
      totalEnrolled: 250,
      dominantWaste: 'Plastik (38%)',
      wasteBreakdown: [
        { type: 'Plastik', weightKg: 14.4, percentage: 38, color: '#06b6d4' },
        { type: 'Kertas', weightKg: 12.5, percentage: 33, color: '#84cc16' },
        { type: 'Logam', weightKg: 6.5, percentage: 17, color: '#0ea5e9' },
        { type: 'Kaca', weightKg: 4.6, percentage: 12, color: '#10b981' },
      ],
      topStudents: [
        { rank: 1, name: 'Nabila Putri', nim: '1107621115', wasteKg: 12.4, points: 1240, badge: 'Green Hero' },
        { rank: 2, name: 'Danang Tri', nim: '1107621102', wasteKg: 9.6, points: 960, badge: 'Pilah Pertama' },
        { rank: 3, name: 'Anisa Rahma', nim: '1107621128', wasteKg: 8.2, points: 820, badge: 'Pilah Pertama' },
        { rank: 4, name: 'Gita Savitri', nim: '1107621133', wasteKg: 7.1, points: 710, badge: 'Pilah Pertama' },
        { rank: 5, name: 'Reza Pahlevi', nim: '1107621140', wasteKg: 6.0, points: 600, badge: 'Pilah Pertama' },
      ],
    },
    {
      id: 'bisdig',
      name: 'S1 Bisnis Digital',
      code: 'BISDIG',
      rank: 5,
      totalWasteKg: 34.5,
      totalPoints: 12050,
      activeStudents: 145,
      totalEnrolled: 200,
      dominantWaste: 'Plastik & Logam',
      wasteBreakdown: [
        { type: 'Plastik', weightKg: 13.8, percentage: 40, color: '#06b6d4' },
        { type: 'Logam', weightKg: 9.3, percentage: 27, color: '#0ea5e9' },
        { type: 'Kertas', weightKg: 7.6, percentage: 22, color: '#84cc16' },
        { type: 'Kaca', weightKg: 3.8, percentage: 11, color: '#10b981' },
      ],
      topStudents: [
        { rank: 1, name: 'Dimas Prasetyo', nim: '1107620092', wasteKg: 11.5, points: 1150, badge: 'Green Hero' },
        { rank: 2, name: 'Wahyu Saputro', nim: '1107620084', wasteKg: 9.0, points: 900, badge: 'Pilah Pertama' },
        { rank: 3, name: 'Melati Indah', nim: '1107620071', wasteKg: 7.8, points: 780, badge: 'Pilah Pertama' },
        { rank: 4, name: 'Arief Budiman', nim: '1107620055', wasteKg: 6.5, points: 650, badge: 'Pilah Pertama' },
        { rank: 5, name: 'Cynthia Dewi', nim: '1107620068', wasteKg: 5.4, points: 540, badge: 'Pilah Pertama' },
      ],
    },
  ];

  const currentProdi = prodiList.find((p) => p.id === selectedProdiId) || prodiList[0];

  return (
    <div className="space-y-6">
      {/* 1. Komponen Filter Utama: Dropdown Pilihan Program Studi FEB */}
      <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
            Filter Agregat Akademik FEB
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Rekapan Per Program Studi FEB
          </h2>
          <p className="text-xs text-slate-500">
            Pilih program studi di lingkungan Fakultas Ekonomi dan Bisnis untuk memantau performa spesifik
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="w-full sm:w-80">
          <label className="text-[11px] font-bold text-slate-600 mb-1 block">
            Pilih Program Studi FEB:
          </label>
          <select
            value={selectedProdiId}
            onChange={(e) => setSelectedProdiId(e.target.value)}
            className="w-full p-3 rounded-2xl bg-white border border-emerald-300 font-bold text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          >
            {prodiList.map((p) => (
              <option key={p.id} value={p.id}>
                #{p.rank} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Dashboard Rekapan Khusus Prodi Tersebut */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Sampah Terkumpul oleh Prodi ini */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Sampah Terkumpul
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">
              {currentProdi.totalWasteKg} kg
            </div>
            <span className="text-xs font-bold text-emerald-600 block mt-1">
              Menyumbang {((currentProdi.totalWasteKg / 248.5) * 100).toFixed(1)}% dari total FEB
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
        </div>

        {/* Total Poin & Peringkat Prodi di Campus Green Challenge */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Poin & Peringkat Challenge
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1 flex items-baseline gap-2">
              <span>#{currentProdi.rank}</span>
              <span className="text-sm font-extrabold text-amber-600">di FEB</span>
            </div>
            <span className="text-xs font-bold text-amber-700 block mt-1">
              {currentProdi.totalPoints.toLocaleString('id-ID')} RE-FLOW Points
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        {/* Jumlah Mahasiswa Aktif */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Mahasiswa Aktif Partisipan
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">
              {currentProdi.activeStudents}
            </div>
            <span className="text-xs font-bold text-cyan-700 block mt-1">
              {Math.round((currentProdi.activeStudents / currentProdi.totalEnrolled) * 100)}% dari {currentProdi.totalEnrolled} total mahasiswa
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shadow-inner">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Breakdown Jenis Sampah & Top 5 Mahasiswa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breakdown Jenis Sampah yang Paling Banyak Disetor */}
        <div className="glass-aero-card rounded-3xl p-5 sm:p-6 border border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Breakdown Jenis Sampah
              </h3>
              <p className="text-xs text-slate-500">
                Komposisi daur ulang mahasiswa {currentProdi.name}
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Dominan: {currentProdi.dominantWaste}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {currentProdi.wasteBreakdown.map((item) => (
              <div key={item.type} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-extrabold">{item.percentage}%</span>
                    <span className="text-slate-400 font-medium">({item.weightKg} kg)</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden shadow-inner flex">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage * 2}%`,
                      backgroundColor: item.color,
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.7)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel Top 5 Mahasiswa Penyumbang Terbanyak di Prodi Ini */}
        <div className="glass-aero-card rounded-3xl p-5 sm:p-6 border border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Top 5 Mahasiswa Teraktif
              </h3>
              <p className="text-xs text-slate-500">
                Penyumbang sampah & poin terbanyak di {currentProdi.code}
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
              Leaderboard Prodi
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-black">
                  <th className="pb-2">Peringkat</th>
                  <th className="pb-2">Mahasiswa</th>
                  <th className="pb-2 text-right">Sampah</th>
                  <th className="pb-2 text-right">Poin</th>
                  <th className="pb-2 text-center">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {currentProdi.topStudents.map((stu) => (
                  <tr key={stu.nim} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-2.5 font-bold">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                        stu.rank === 1 ? 'bg-amber-400 text-amber-950 font-black' :
                        stu.rank === 2 ? 'bg-slate-300 text-slate-900 font-bold' :
                        stu.rank === 3 ? 'bg-amber-700 text-white font-bold' : 'bg-slate-100 text-slate-600'
                      }`}>
                        #{stu.rank}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className="font-bold text-slate-900 block leading-tight">{stu.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{stu.nim}</span>
                    </td>
                    <td className="py-2.5 text-right font-black text-slate-900 tabular-nums">
                      {stu.wasteKg} kg
                    </td>
                    <td className="py-2.5 text-right font-black text-emerald-700 tabular-nums">
                      +{stu.points} pt
                    </td>
                    <td className="py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-300">
                        {stu.badge}
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
