import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Award, 
  Scale, 
  Coins, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  History, 
  GraduationCap, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

interface StudentRecord {
  id: string;
  avatar: string;
  name: string;
  nim: string;
  prodi: string;
  faculty: string;
  frequency: number;
  totalWasteKg: number;
  totalPoints: number;
  highestBadge: string;
  tier: string;
  accountStatus: 'Eco-Leader' | 'Aktif' | 'Reguler';
  email: string;
  joinedDate: string;
  recentTx: Array<{ date: string; type: string; weight: number; points: number; location: string }>;
}

export const MahasiswaTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProdi, setSelectedProdi] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<StudentRecord | null>(null);

  const studentList: StudentRecord[] = [
    {
      id: 'mhs-1',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      name: 'Amanda Clarissa',
      nim: '1107621045',
      prodi: 'S1 Pendidikan Administrasi Perkantoran',
      faculty: 'Fakultas Ekonomi dan Bisnis',
      frequency: 18,
      totalWasteKg: 23.4,
      totalPoints: 2340,
      highestBadge: 'Eco Champion',
      tier: 'Gold',
      accountStatus: 'Eco-Leader',
      email: 'amanda.clarissa@mhs.unj.ac.id',
      joinedDate: '10 Februari 2025',
      recentTx: [
        { date: '25 Apr 2025', type: 'Plastik', weight: 2.5, points: 25, location: 'Drop Point 1: Pelataran Gedung SFD FEB' },
        { date: '20 Apr 2025', type: 'Kertas', weight: 3.0, points: 30, location: 'Drop Point 2: Area Kantin Blok M FEB' },
        { date: '15 Apr 2025', type: 'Kaca', weight: 2.0, points: 30, location: 'Drop Point 1: Pelataran Gedung SFD FEB' },
        { date: '10 Apr 2025', type: 'Logam', weight: 1.2, points: 36, location: 'Drop Point 2: Area Kantin Blok M FEB' },
      ],
    },
    {
      id: 'mhs-2',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      name: 'Budi Santoso',
      nim: '1107621088',
      prodi: 'D4 Digital Office Administration',
      faculty: 'Fakultas Ekonomi dan Bisnis',
      frequency: 14,
      totalWasteKg: 18.5,
      totalPoints: 1850,
      highestBadge: 'Green Hero',
      tier: 'Silver',
      accountStatus: 'Aktif',
      email: 'budi.santoso@mhs.unj.ac.id',
      joinedDate: '12 Februari 2025',
      recentTx: [
        { date: '25 Apr 2025', type: 'Kertas', weight: 3.8, points: 38, location: 'Drop Point 1: Pelataran Gedung SFD FEB' },
        { date: '22 Apr 2025', type: 'Plastik', weight: 2.1, points: 21, location: 'Drop Point 2: Area Kantin Blok M FEB' },
      ],
    },
    {
      id: 'mhs-3',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      name: 'Siti Rahayu',
      nim: '1107622014',
      prodi: 'S1 Akuntansi',
      faculty: 'Fakultas Ekonomi dan Bisnis',
      frequency: 12,
      totalWasteKg: 15.0,
      totalPoints: 1500,
      highestBadge: 'Green Hero',
      tier: 'Silver',
      accountStatus: 'Aktif',
      email: 'siti.rahayu@mhs.unj.ac.id',
      joinedDate: '15 Februari 2025',
      recentTx: [
        { date: '24 Apr 2025', type: 'Kaca', weight: 2.0, points: 30, location: 'Drop Point 1: Pelataran Gedung SFD FEB' },
      ],
    },
    {
      id: 'mhs-4',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      name: 'Dimas Prasetyo',
      nim: '1107620092',
      prodi: 'S1 Manajemen',
      faculty: 'Fakultas Ekonomi dan Bisnis',
      frequency: 9,
      totalWasteKg: 11.5,
      totalPoints: 1150,
      highestBadge: 'Green Hero',
      tier: 'Bronze',
      accountStatus: 'Reguler',
      email: 'dimas.prasetyo@mhs.unj.ac.id',
      joinedDate: '20 Februari 2025',
      recentTx: [
        { date: '24 Apr 2025', type: 'Logam', weight: 1.4, points: 42, location: 'Drop Point 2: Area Kantin Blok M FEB' },
      ],
    },
    {
      id: 'mhs-5',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      name: 'Nabila Putri',
      nim: '1107621115',
      prodi: 'S1 Manajemen',
      faculty: 'Fakultas Ekonomi dan Bisnis',
      frequency: 10,
      totalWasteKg: 12.4,
      totalPoints: 1240,
      highestBadge: 'Green Hero',
      tier: 'Silver',
      accountStatus: 'Aktif',
      email: 'nabila.putri@mhs.unj.ac.id',
      joinedDate: '18 Februari 2025',
      recentTx: [
        { date: '23 Apr 2025', type: 'Plastik', weight: 1.8, points: 18, location: 'Drop Point 1: Pelataran Gedung SFD FEB' },
      ],
    },
    {
      id: 'mhs-6',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
      name: 'Zahra Anindya',
      nim: '1107622080',
      prodi: 'S1 Bisnis Digital',
      faculty: 'Fakultas Ekonomi dan Bisnis',
      frequency: 8,
      totalWasteKg: 10.2,
      totalPoints: 1020,
      highestBadge: 'Green Hero',
      tier: 'Bronze',
      accountStatus: 'Reguler',
      email: 'zahra.anindya@mhs.unj.ac.id',
      joinedDate: '22 Februari 2025',
      recentTx: [
        { date: '22 Apr 2025', type: 'Kaca', weight: 3.1, points: 46, location: 'Drop Point 2: Area Kantin Blok M FEB' },
      ],
    },
    {
      id: 'mhs-7',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      name: 'Farhan Maulana',
      nim: '1107621074',
      prodi: 'S1 Akuntansi',
      faculty: 'Fakultas Ekonomi dan Bisnis',
      frequency: 16,
      totalWasteKg: 19.8,
      totalPoints: 1980,
      highestBadge: 'Green Hero',
      tier: 'Silver',
      accountStatus: 'Eco-Leader',
      email: 'farhan.maulana@mhs.unj.ac.id',
      joinedDate: '08 Februari 2025',
      recentTx: [
        { date: '23 Apr 2025', type: 'Kertas', weight: 4.5, points: 45, location: 'Drop Point 1: Pelataran Gedung SFD FEB' },
      ],
    },
  ];

  const filteredStudents = studentList.filter((stu) => {
    const matchesSearch = stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stu.nim.includes(searchQuery) ||
                          stu.prodi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProdi = selectedProdi === 'all' || stu.prodi.toLowerCase().includes(selectedProdi.toLowerCase());
    const matchesTier = selectedTier === 'all' || stu.tier.toLowerCase() === selectedTier.toLowerCase();
    return matchesSearch && matchesProdi && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Filters */}
      <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
            Monitoring Data Partisipasi Personal
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Manajemen Data Mahasiswa
          </h2>
          <p className="text-xs text-slate-500">
            Pantau kontribusi individu, status akun sirkular, dan riwayat penimbangan per mahasiswa
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama mahasiswa atau NIM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Prodi FEB */}
            <select
              value={selectedProdi}
              onChange={(e) => setSelectedProdi(e.target.value)}
              className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none shadow-sm"
            >
              <option value="all">Semua Program Studi FEB</option>
              <option value="Administrasi Perkantoran">S1 Pendidikan Administrasi Perkantoran</option>
              <option value="Akuntansi">S1 Akuntansi</option>
              <option value="Manajemen">S1 Manajemen</option>
              <option value="Digital Office">D4 Digital Office Administration</option>
              <option value="Bisnis Digital">S1 Bisnis Digital</option>
            </select>

            {/* Filter Tier Eco Badge */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none shadow-sm"
            >
              <option value="all">Semua Tier Badge</option>
              <option value="gold">Gold Eco-Leader</option>
              <option value="silver">Silver Eco-Ambassador</option>
              <option value="bronze">Bronze Eco-Starter</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Tabel Daftar Seluruh Mahasiswa Partisipan */}
      <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan <strong className="text-slate-800">{filteredStudents.length}</strong> mahasiswa aktif</span>
          <span className="text-emerald-700 font-bold">Total 1.248 mahasiswa terdaftar di sistem FIP</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-black tracking-wider">
                <th className="pb-3">Mahasiswa</th>
                <th className="pb-3">Program Studi</th>
                <th className="pb-3 text-center">Frekuensi</th>
                <th className="pb-3 text-right">Total Sampah</th>
                <th className="pb-3 text-right">RE-FLOW Points</th>
                <th className="pb-3">Badge Tertinggi</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-300 shadow-sm shrink-0">
                        <img src={stu.avatar} alt={stu.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block leading-tight">{stu.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{stu.nim}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 font-semibold text-slate-600">
                    {stu.prodi}
                  </td>
                  <td className="py-3 text-center font-bold text-slate-800">
                    {stu.frequency}x
                  </td>
                  <td className="py-3 text-right font-extrabold text-slate-900 tabular-nums">
                    {stu.totalWasteKg} kg
                  </td>
                  <td className="py-3 text-right font-black text-emerald-700 tabular-nums">
                    {stu.totalPoints.toLocaleString('id-ID')} pt
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-block">
                      {stu.highestBadge}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      stu.accountStatus === 'Eco-Leader'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : stu.accountStatus === 'Aktif'
                        ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {stu.accountStatus}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => setSelectedStudentDetail(stu)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 font-bold border border-emerald-300 shadow-sm transition-all text-[11px] active:scale-95 inline-flex items-center gap-1"
                    >
                      <span>Detail</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Modal Detail Profil & Riwayat Transaksi Mahasiswa */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-aero rounded-3xl p-6 space-y-4 shadow-2xl border border-white max-h-[90vh] overflow-y-auto">
            {/* Top header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md">
                  <img src={selectedStudentDetail.avatar} alt={selectedStudentDetail.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {selectedStudentDetail.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    NIM: {selectedStudentDetail.nim} · {selectedStudentDetail.prodi}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick KPI stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Disetor</span>
                <span className="text-lg font-black text-slate-900">{selectedStudentDetail.totalWasteKg} kg</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Poin Kumulatif</span>
                <span className="text-lg font-black text-emerald-700">{selectedStudentDetail.totalPoints} pt</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Frekuensi</span>
                <span className="text-lg font-black text-cyan-700">{selectedStudentDetail.frequency} kali</span>
              </div>
            </div>

            {/* Bio info */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Email Kampus:</span>
                <span className="font-semibold text-slate-900">{selectedStudentDetail.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tier Keaktifan:</span>
                <span className="font-bold text-amber-700">{selectedStudentDetail.tier} ({selectedStudentDetail.accountStatus})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Terdaftar Sejak:</span>
                <span className="font-semibold text-slate-900">{selectedStudentDetail.joinedDate}</span>
              </div>
            </div>

            {/* Riwayat Setoran Terakhir */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <History className="w-3.5 h-3.5 text-emerald-600" />
                <span>Riwayat Setoran Terbaru Mahasiswa</span>
              </div>

              <div className="space-y-1.5">
                {selectedStudentDetail.recentTx.map((tx, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{tx.type} ({tx.weight} kg)</span>
                      <span className="text-[10px] text-slate-400 block">{tx.date} · {tx.location}</span>
                    </div>
                    <span className="font-black text-emerald-700">+{tx.points} pt</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedStudentDetail(null)}
              className="w-full py-3 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md"
            >
              Tutup Rincian Mahasiswa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
