import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Scale, 
  Calendar, 
  MapPin, 
  FileText, 
  Download, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const DataSetoranTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDropPoint, setSelectedDropPoint] = useState('all');
  const [dateRange, setDateRange] = useState('april2025');

  const depositRecords = [
    {
      id: 'SET-2025-0428',
      dateTime: '25 Apr 2025, 10:24 WIB',
      studentName: 'Amanda Clarissa',
      nim: '1107621045',
      prodi: 'S1 Pendidikan Administrasi Perkantoran',
      category: 'Plastik',
      weightKg: 2.5,
      points: 25,
      dropPoint: 'Drop Point 1: Pelataran Gedung SFD FEB',
      operator: 'Rian Hidayat',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-2025-0427',
      dateTime: '25 Apr 2025, 09:50 WIB',
      studentName: 'Farhan Maulana',
      nim: '1107621074',
      prodi: 'S1 Akuntansi',
      category: 'Kertas',
      weightKg: 3.8,
      points: 38,
      dropPoint: 'Drop Point 2: Area Kantin Blok M FEB',
      operator: 'Siti Rahma',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-2025-0426',
      dateTime: '24 Apr 2025, 14:15 WIB',
      studentName: 'Nabila Putri',
      nim: '1107621115',
      prodi: 'S1 Manajemen',
      category: 'Kaca',
      weightKg: 2.0,
      points: 30,
      dropPoint: 'Drop Point 1: Pelataran Gedung SFD FEB',
      operator: 'Rian Hidayat',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-2025-0425',
      dateTime: '24 Apr 2025, 11:32 WIB',
      studentName: 'Budi Santoso',
      nim: '1107621088',
      prodi: 'D4 Digital Office Administration',
      category: 'Logam',
      weightKg: 1.4,
      points: 42,
      dropPoint: 'Drop Point 2: Area Kantin Blok M FEB',
      operator: 'Siti Rahma',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-2025-0424',
      dateTime: '23 Apr 2025, 13:40 WIB',
      studentName: 'Dewi Lestari',
      nim: '1107621062',
      prodi: 'S1 Bisnis Digital',
      category: 'Plastik',
      weightKg: 1.8,
      points: 18,
      dropPoint: 'Drop Point 1: Pelataran Gedung SFD FEB',
      operator: 'Rian Hidayat',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-2025-0423',
      dateTime: '23 Apr 2025, 09:12 WIB',
      studentName: 'Rizky Pratama',
      nim: '1107621030',
      prodi: 'S1 Akuntansi',
      category: 'Kertas',
      weightKg: 4.5,
      points: 45,
      dropPoint: 'Drop Point 2: Area Kantin Blok M FEB',
      operator: 'Siti Rahma',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-2025-0422',
      dateTime: '22 Apr 2025, 15:20 WIB',
      studentName: 'Dimas Prasetyo',
      nim: '1107620092',
      prodi: 'S1 Manajemen',
      category: 'Kaca',
      weightKg: 3.1,
      points: 46,
      dropPoint: 'Drop Point 1: Pelataran Gedung SFD FEB',
      operator: 'Rian Hidayat',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-2025-0421',
      dateTime: '22 Apr 2025, 10:05 WIB',
      studentName: 'Zahra Anindya',
      nim: '1107622080',
      prodi: 'S1 Bisnis Digital',
      category: 'Plastik',
      weightKg: 2.2,
      points: 22,
      dropPoint: 'Drop Point 2: Area Kantin Blok M FEB',
      operator: 'Siti Rahma',
      status: 'Terverifikasi',
    },
  ];

  const filteredRecords = depositRecords.filter((rec) => {
    const matchesSearch = rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.nim.includes(searchQuery) ||
                          rec.prodi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rec.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDropPoint = selectedDropPoint === 'all' || rec.dropPoint.includes(selectedDropPoint);
    return matchesSearch && matchesCategory && matchesDropPoint;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Plastik':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Kertas':
        return 'bg-lime-100 text-lime-800 border-lime-300';
      case 'Logam':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Kaca':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Fitur Kartu Ringkasan Atas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Berat Akumulasi */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Berat Akumulasi
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">
              248.5 kg
            </div>
            <span className="text-xs font-semibold text-emerald-600 block mt-1">
              Dari 118 transaksi penimbangan FEB
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
        </div>

        {/* Rata-rata Setoran Harian */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Rata-rata Setoran Harian
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">
              8.2 kg/hari
            </div>
            <span className="text-xs font-semibold text-cyan-700 block mt-1">
              Puncak tertinggi: Hari Jumat (14.5 kg)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shadow-inner">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Jenis Sampah Dominan */}
        <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Jenis Sampah Dominan
            </span>
            <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">
              Plastik (42%)
            </div>
            <span className="text-xs font-semibold text-amber-700 block mt-1">
              104.4 kg botol & kemasan PP/PET
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="glass-aero-card rounded-3xl p-4 sm:p-5 border border-white shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID setoran, nama mahasiswa, NIM, atau prodi FEB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Jenis */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none shadow-sm"
            >
              <option value="all">Semua Jenis Sampah</option>
              <option value="plastik">Plastik (Aqua)</option>
              <option value="kertas">Kertas (Lime)</option>
              <option value="logam">Logam (Cyan)</option>
              <option value="kaca">Kaca (Emerald)</option>
            </select>

            {/* Filter 2 Drop Point FEB */}
            <select
              value={selectedDropPoint}
              onChange={(e) => setSelectedDropPoint(e.target.value)}
              className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none shadow-sm"
            >
              <option value="all">Semua Drop Point FEB</option>
              <option value="SFD">Drop Point 1: Pelataran Gedung SFD FEB</option>
              <option value="Blok M">Drop Point 2: Area Kantin Blok M FEB</option>
            </select>

            {/* Filter Rentang Tanggal */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none shadow-sm"
            >
              <option value="today">Hari Ini</option>
              <option value="thisweek">Minggu Ini</option>
              <option value="april2025">Bulan Ini (April 2025)</option>
              <option value="semester">Semester Genap 2024/2025</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>Menampilkan <strong className="text-slate-800">{filteredRecords.length}</strong> data setoran terverifikasi</span>
          <span className="text-emerald-700 font-bold">Sinkronisasi 2 Drop Point FEB aktif</span>
        </div>
      </div>

      {/* 3. Tabel Riwayat Setoran Lengkap */}
      <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-black tracking-wider">
                <th className="pb-3">ID Setoran</th>
                <th className="pb-3">Tanggal & Waktu</th>
                <th className="pb-3">Mahasiswa</th>
                <th className="pb-3">Program Studi</th>
                <th className="pb-3">Jenis Sampah</th>
                <th className="pb-3 text-right">Berat (kg)</th>
                <th className="pb-3 text-right">Poin</th>
                <th className="pb-3">Operator Drop Point</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-slate-700">
                    {item.id}
                  </td>
                  <td className="py-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {item.dateTime}
                  </td>
                  <td className="py-3">
                    <span className="font-extrabold text-slate-900 block leading-tight">{item.studentName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.nim}</span>
                  </td>
                  <td className="py-3 font-semibold text-slate-600">
                    {item.prodi}
                  </td>
                  <td className="py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-slate-900 tabular-nums">
                    {item.weightKg} kg
                  </td>
                  <td className="py-3 text-right font-black text-emerald-700 tabular-nums">
                    +{item.points} pt
                  </td>
                  <td className="py-3 text-slate-600">
                    <span className="block font-semibold text-[11px]">{item.dropPoint}</span>
                    <span className="text-[10px] text-slate-400">Petugas: {item.operator}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-semibold">
          <span>Halaman 1 dari 12 (FEB)</span>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold">1</span>
            <button className="px-3 py-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700">2</button>
            <button className="px-3 py-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700">3</button>
            <button className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
