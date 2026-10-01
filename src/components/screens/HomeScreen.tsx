import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, Recycle, TrendingUp, Award, Users, Flame } from 'lucide-react';
import { initialUser } from '../../data/mockData';

interface HomeScreenProps {
  user: typeof initialUser;
  onNavigateSetor: () => void;
  onNavigatePoints: () => void;
  onNavigateRanking: () => void;
  onOpenCampaignModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigateSetor,
  onNavigatePoints,
  onNavigateRanking,
  onOpenCampaignModal,
}) => {
  return (
    <div className="space-y-5 pb-24 px-1">
      {/* 1. Greeting Section & Habit Trigger Streak */}
      <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            Halo, {user.name}! <span className="animate-wave inline-block origin-bottom-right">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Terus jadi bagian dari perubahan di kampus kita!
          </p>
        </div>

        {/* Habit Streak Badge (Investment / Hook Model) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/20 border border-amber-300 text-amber-900 text-xs font-extrabold shadow-sm w-fit">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
          <span>Streak 3 Minggu Aktif</span>
        </div>
      </div>

      {/* Mini Pemicu / Trigger Notification Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 border border-emerald-300/80 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs font-bold text-emerald-950 leading-tight">
            Kontribusimu minggu ini naik <span className="text-emerald-700 font-black">12%</span> dari minggu lalu!
          </p>
        </div>

        <button
          onClick={onNavigateRanking}
          className="text-[10px] font-extrabold text-emerald-800 bg-white/90 hover:bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 transition-all active:scale-95"
        >
          Lihat Posisi
        </button>
      </div>

      {/* 2. Hero / Saldo Banner (Frutiger Aero Green Glossy Card) */}
      <div className="relative rounded-3xl p-5 sm:p-6 text-white shadow-xl overflow-hidden glass-aero-green">
        {/* Soft background light orb & bubbles inside card */}
        <div 
          className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, #34d399 70%, transparent 100%)' }}
        />
        <div className="absolute top-3 right-6 w-8 h-8 rounded-full bubble-gloss opacity-30 pointer-events-none" />
        <div className="absolute bottom-6 left-1/3 w-5 h-5 rounded-full bubble-gloss opacity-25 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-inner">
                {/* Glossy Yellow Eco-Coin */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 flex items-center justify-center text-amber-900 font-black text-[11px] shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.9)]">
                  R
                </div>
              </div>
              <span className="text-xs font-extrabold tracking-wide text-emerald-100 uppercase drop-shadow-sm">
                RE-FLOW Points
              </span>
            </div>

            {/* Pill button secondary: "Lihat Detail" */}
            <button
              onClick={onNavigatePoints}
              className="subordinate-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1 group"
            >
              <span>Lihat Detail</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-emerald-800" />
            </button>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums drop-shadow-md">
                {user.points.toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-semibold text-emerald-100">
                Poin Aktif
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-emerald-100 font-semibold">
              <span className="inline-flex items-center gap-1 bg-emerald-800/40 px-2 py-0.5 rounded-full backdrop-blur-sm border border-emerald-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Setara Rp {(user.points * 100).toLocaleString('id-ID')}
              </span>
              <span>· Dapat ditukar reward / donasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Stat Cepat (2 Cards Side-by-Side dengan Efek Kilatan Halus) */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Total Sampah Disetorkan */}
        <div className="glass-aero-card rounded-3xl p-4 flex flex-col justify-between relative group hover:border-emerald-300 transition-all border border-white/90">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-tight">
              Total Sampah Disetorkan
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-inner">
              <Recycle className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              {user.totalWasteKg.toString().replace('.', ',')} kg
            </div>
            <div className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3 inline" />
              <span>{user.growthKg}</span>
            </div>
          </div>
        </div>

        {/* Kontribusi Prodi */}
        <div className="glass-aero-card rounded-3xl p-4 flex flex-col justify-between relative group hover:border-cyan-300 transition-all border border-white/90">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight block leading-tight">
                Kontribusi Prodi
              </span>
              <span className="text-[10px] text-emerald-700 font-extrabold truncate block mt-0.5 max-w-[110px]" title={user.major}>
                {user.major}
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 shadow-inner">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              {user.prodiContribution.toString().replace('.', ',')}%
            </div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
              dari total kontribusi FEB
            </div>
          </div>
        </div>
      </div>

      {/* 4. PRIMARY CTA: Tombol utama menonjol "Setor Sampah Sekarang" dengan Kilatan Cahaya (Light Reflection Effect) */}
      <div className="pt-1">
        <button
          onClick={onNavigateSetor}
          className="w-full py-4 px-6 rounded-2xl gloss-pill-btn font-black text-base flex items-center justify-center gap-2.5 shadow-xl group active:scale-[0.98] shine-effect"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
            <Recycle className="w-4 h-4 text-white" />
          </div>
          <span>Setor Sampah Sekarang</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 text-white" />
        </button>
      </div>

      {/* 5. Quick Leaderboard / Ranking Widget */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            Ranking FEB
          </h2>
          <button
            onClick={onNavigateRanking}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5"
          >
            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {/* Ranking Mahasiswa */}
          <div
            onClick={onNavigateRanking}
            className="glass-aero-card rounded-3xl p-4 cursor-pointer hover:border-emerald-300 transition-all relative overflow-hidden group border border-white/90"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                Mahasiswa (Top 10 FEB)
              </span>
              <Users className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-700 tabular-nums">
                #{user.rankMahasiswa}
              </span>
              <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                ▲ {user.rankMahasiswaChange}
              </span>
            </div>

            <div className="text-[11px] text-slate-600 font-medium mt-1">
              <span className="font-bold text-slate-900 tabular-nums">{user.rankMahasiswaTotalPoints}</span> poin
            </div>
          </div>

          {/* Ranking Program Studi */}
          <div
            onClick={onNavigateRanking}
            className="glass-aero-card rounded-3xl p-4 cursor-pointer hover:border-cyan-300 transition-all relative overflow-hidden group border border-white/90"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                Program Studi
              </span>
              <Award className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-black text-cyan-700 tabular-nums">
                #{user.rankProdi}
              </span>
              <span className="text-[11px] font-extrabold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-md">
                FEB
              </span>
            </div>

            <div className="text-[11px] text-slate-600 font-medium mt-1">
              #{user.rankProdi} dari 5 prodi di FEB
            </div>
          </div>
        </div>
      </div>

      {/* 6. Section Edukasi / Campaign Banner (Frutiger Aero Green Campus) */}
      <div 
        onClick={onOpenCampaignModal}
        className="cursor-pointer relative rounded-3xl p-4 sm:p-5 overflow-hidden border border-emerald-200/80 transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-[0_10px_25px_-5px_rgba(16,185,129,0.25)]"
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 45%, #0284c7 100%)'
        }}
      >
        {/* Frutiger Aero top gloss reflection */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
          style={{ 
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 80%, transparent 100%)' 
          }}
        />

        <div className="relative z-10 flex items-center gap-4">
          {/* Earth Mascot / Green Globe Illustration with glossy bubbles */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-300 to-white p-0.5 shrink-0 shadow-lg relative">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-400 to-emerald-500 overflow-hidden flex items-center justify-center relative">
              <svg className="w-11 h-11" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" fill="#0284c7" />
                <path d="M7 16C10 12 16 11 20 13C23 15 25 12 28 14C30 16 32 20 30 25C27 28 21 27 18 31C15 35 10 32 8 28C6 24 5 19 7 16Z" fill="#34d399" />
                <path d="M22 6C24 4 28 5 31 8C33 11 31 15 27 15C24 15 21 12 22 6Z" fill="#10b981" />
                <circle cx="15" cy="18" r="2.2" fill="#0f172a" />
                <circle cx="25" cy="18" r="2.2" fill="#0f172a" />
                <circle cx="14" cy="17" r="0.8" fill="white" />
                <circle cx="24" cy="17" r="0.8" fill="white" />
                <path d="M16 23C18 26 22 26 24 23" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="22" r="1.5" fill="#f43f5e" opacity="0.6" />
                <circle cx="28" cy="22" r="1.5" fill="#f43f5e" opacity="0.6" />
              </svg>
              <div 
                className="absolute top-1 left-2 w-5 h-2.5 rounded-full pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
              />
            </div>
          </div>

          <div className="flex-1 text-white">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">
              Gerakan FEB Hijau
            </span>
            <p className="text-sm font-extrabold leading-tight mt-0.5 text-white drop-shadow-sm">
              Gerakan FEB Hijau - Bersama kita wujudkan FEB yang lebih hijau dan bersih!
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-100 font-bold mt-1 group-hover:underline">
              Pelajari aksi & tips pilah sampah FEB <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
