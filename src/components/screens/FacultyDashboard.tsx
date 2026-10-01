import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  GraduationCap, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Download, 
  CheckCircle2, 
  X,
  Building,
  Sparkles
} from 'lucide-react';
import { DashboardOverviewTab } from '../dashboard/DashboardOverviewTab';
import { DataSetoranTab } from '../dashboard/DataSetoranTab';
import { ProgramStudiTab } from '../dashboard/ProgramStudiTab';
import { MahasiswaTab } from '../dashboard/MahasiswaTab';
import { LaporanTab } from '../dashboard/LaporanTab';
import { PengaturanTab } from '../dashboard/PengaturanTab';

interface FacultyDashboardProps {
  onBackToStudentView: () => void;
}

export type FacultyNavMenu = 'dashboard' | 'setoran' | 'prodi' | 'mahasiswa' | 'laporan' | 'pengaturan';

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onBackToStudentView }) => {
  const [activeMenu, setActiveMenu] = useState<FacultyNavMenu>('dashboard');
  const [showAdminProfileModal, setShowAdminProfileModal] = useState<boolean>(false);
  const [showExportToast, setShowExportToast] = useState<boolean>(false);

  // Distribution of waste categories: Aqua, Lime, Cyan, Emerald
  const wasteDistribution = [
    { type: 'Plastik', percentage: 42, weightKg: 104.4, color: '#06b6d4', labelColor: 'bg-cyan-500' },     // Aqua
    { type: 'Kertas', percentage: 28, weightKg: 69.6, color: '#84cc16', labelColor: 'bg-lime-500' },       // Lime
    { type: 'Logam', percentage: 18, weightKg: 44.7, color: '#0ea5e9', labelColor: 'bg-sky-500' },          // Cyan
    { type: 'Kaca', percentage: 12, weightKg: 29.8, color: '#10b981', labelColor: 'bg-emerald-500' },      // Emerald
  ];

  // Study program contributions in FEB (5 Prodi FEB)
  const prodiContributions = [
    { name: 'S1 Akuntansi', short: 'AKT', weightKg: 94.2, percentage: 37.9, students: 310, points: 37900, color: '#059669' },
    { name: 'S1 Manajemen', short: 'MAN', weightKg: 62.5, percentage: 25.1, students: 245, points: 25100, color: '#0284c7' },
    { name: 'S1 Pendidikan Administrasi Perkantoran', short: 'PAP', weightKg: 42.8, percentage: 17.2, students: 190, points: 17200, color: '#10b981' },
    { name: 'D4 Digital Office Administration', short: 'DOA', weightKg: 28.5, percentage: 11.5, students: 140, points: 11500, color: '#38bdf8' },
    { name: 'S1 Bisnis Digital', short: 'BISDIG', weightKg: 20.5, percentage: 8.3, students: 115, points: 8300, color: '#6366f1' },
  ];

  // Real-time student deposit activity log in 2 Drop Points FEB
  const recentDepositActivities = [
    {
      id: 'SET-0428',
      time: '10:24 WIB',
      studentName: 'Amanda Clarissa',
      nim: '1107621045',
      prodi: 'Pendidikan Administrasi Perkantoran',
      category: 'Plastik',
      weightKg: 2.5,
      points: 25,
      dropPoint: 'Drop Point 1: Pelataran Gedung SFD FEB',
      operator: 'Rian H.',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-0427',
      time: '09:50 WIB',
      studentName: 'Farhan Maulana',
      nim: '1107621074',
      prodi: 'S1 Akuntansi',
      category: 'Kertas',
      weightKg: 3.8,
      points: 38,
      dropPoint: 'Drop Point 2: Area Kantin Blok M FEB',
      operator: 'Siti R.',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-0426',
      time: '09:15 WIB',
      studentName: 'Nabila Putri',
      nim: '1107621115',
      prodi: 'S1 Manajemen',
      category: 'Kaca',
      weightKg: 2.0,
      points: 30,
      dropPoint: 'Drop Point 1: Pelataran Gedung SFD FEB',
      operator: 'Rian H.',
      status: 'Terverifikasi',
    },
    {
      id: 'SET-0425',
      time: '08:42 WIB',
      studentName: 'Budi Santoso',
      nim: '1107621088',
      prodi: 'D4 Digital Office Administration',
      category: 'Logam',
      weightKg: 1.4,
      points: 42,
      dropPoint: 'Drop Point 2: Area Kantin Blok M FEB',
      operator: 'Siti R.',
      status: 'Terverifikasi',
    },
  ];

  // 6 Menu Utama Sidebar
  const sidebarNavItems: Array<{ id: FacultyNavMenu; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'setoran', label: 'Data Setoran', icon: Database },
    { id: 'prodi', label: 'Program Studi', icon: GraduationCap },
    { id: 'mahasiswa', label: 'Mahasiswa', icon: Users },
    { id: 'laporan', label: 'Laporan', icon: FileText },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  const handleQuickExport = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-slate-800 flex flex-col md:flex-row">
      {/* SIDEBAR ADMINISTRATOR FAKULTAS EKONOMI DAN BISNIS */}
      <aside className="w-full md:w-64 bg-[#064e3b] text-white flex flex-col justify-between shrink-0 shadow-2xl border-r border-emerald-900/40 relative z-20">
        <div>
          {/* Logo brand & Quick mode switch */}
          <div className="p-5 border-b border-emerald-800/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
                />
                <svg className="w-5 h-5 drop-shadow-sm text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 3C7 3 3 8 3 13C3 18 7 21 12 21C14.5 21 16.8 20 18.4 18.4C20 16.8 21 14.5 21 12C21 7 17 3 12 3Z" fill="#34d399" />
                </svg>
              </div>

              <div>
                <span className="font-black text-lg tracking-tight text-white block leading-tight">
                  RE-FLOW
                </span>
                <span className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase">
                  FEB Portal
                </span>
              </div>
            </div>

            <button
              onClick={onBackToStudentView}
              className="text-[10px] font-extrabold text-emerald-100 bg-emerald-800/90 hover:bg-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-600/50 md:hidden"
            >
              Mode Mahasiswa
            </button>
          </div>

          {/* 6 Menu Sidebar Navigasi Utama */}
          <nav className="p-3 space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-[1.02]'
                      : 'text-emerald-100/80 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Faculty Details & Back Button */}
        <div className="p-4 border-t border-emerald-800/60 space-y-3">
          <div className="p-3 rounded-2xl bg-emerald-900/70 border border-emerald-700/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-emerald-950 font-black text-sm flex items-center justify-center shadow-inner">
              FEB
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-extrabold text-white block truncate">
                Fakultas Ekonomi dan Bisnis
              </span>
              <span className="text-[10px] text-emerald-300 block truncate">
                Universitas Negeri Jakarta
              </span>
            </div>
          </div>

          <button
            onClick={onBackToStudentView}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-800/60 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-emerald-600/40"
          >
            <LogOut className="w-4 h-4" />
            <span>Kembali ke App Mahasiswa FEB</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* HEADER DASHBOARD: TOP BAR RINGKASAN STATUS & PROFIL ADMINISTRATOR */}
        <header className="glass-aero rounded-3xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-white shadow-sm">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Monitoring
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Semester Genap 2024/2025 · Update Real-time
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
              <span>FEB Green Dashboard</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg hidden sm:inline-block">
                FEB UNJ
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Pusat kendali sirkular ekonomi, monitoring Drop Point, dan audit dampak lingkungan Fakultas Ekonomi dan Bisnis.
            </p>
          </div>

          {/* Right Action: Ekspor Laporan & Tombol Profil Administrator */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleQuickExport}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ekspor Ringkas</span>
            </button>

            {/* Tombol Profil Administrator (Clickable) */}
            <button
              onClick={() => setShowAdminProfileModal(true)}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 border border-emerald-300 shadow-sm transition-all text-left group"
            >
              <div className="relative w-9 h-9 aspect-square rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0 flex items-center justify-center bg-emerald-100/50">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&crop=faces&q=80"
                  alt="Administrator"
                  className="w-full h-full object-cover object-center aspect-square"
                />
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-900 block leading-tight">
                  Dr. Amanda Clarissa
                </span>
                <span className="text-[10px] font-bold text-emerald-700 block leading-none">
                  Admin Pengelola FEB
                </span>
              </div>
            </button>
          </div>
        </header>

        {/* DYNAMIC TAB CONTENT ROUTING BASED ON 6 SIDEBAR MENUS */}
        <div className="transition-all duration-300">
          {activeMenu === 'dashboard' && (
            <DashboardOverviewTab
              wasteDistribution={wasteDistribution}
              prodiContributions={prodiContributions}
              recentDepositActivities={recentDepositActivities}
              onViewAllSetoran={() => setActiveMenu('setoran')}
            />
          )}

          {activeMenu === 'setoran' && (
            <DataSetoranTab />
          )}

          {activeMenu === 'prodi' && (
            <ProgramStudiTab />
          )}

          {activeMenu === 'mahasiswa' && (
            <MahasiswaTab />
          )}

          {activeMenu === 'laporan' && (
            <LaporanTab />
          )}

          {activeMenu === 'pengaturan' && (
            <PengaturanTab />
          )}
        </div>

        {/* MODAL PROFIL ADMINISTRATOR */}
        {showAdminProfileModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div 
              className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden border border-white/90"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 250, 0.85) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)'
                }}
              />

              <button
                onClick={() => setShowAdminProfileModal(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-4 border-emerald-400 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
                  alt="Admin Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
                  Koordinator Green Campus
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Dr. Amanda Clarissa, M.Pd.
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  NIP: 19850412 201012 2 001 · FEB UNJ
                </p>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hak Akses:</span>
                  <span className="font-bold text-slate-800">Super Administrator FEB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Unit Drop Point:</span>
                  <span className="font-bold text-slate-800">2 Drop Point Aktif FEB (SFD & Kantin Blok M)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Akun:</span>
                  <span className="font-bold text-emerald-700">Terverifikasi Aktif</span>
                </div>
              </div>

              <button
                onClick={() => setShowAdminProfileModal(false)}
                className="w-full py-3 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md"
              >
                Tutup Profil Administrator
              </button>
            </div>
          </div>
        )}

        {/* Export Toast */}
        {showExportToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce border border-emerald-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Laporan Sirkular & Emisi FEB (CSV) berhasil diekspor!</span>
          </div>
        )}
      </main>
    </div>
  );
};
