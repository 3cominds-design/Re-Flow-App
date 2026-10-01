import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trophy, 
  Award, 
  Sprout, 
  Shield, 
  Star, 
  Crown, 
  Flame, 
  ShieldCheck, 
  Lock, 
  Check, 
  TrendingUp, 
  TrendingDown, 
  Recycle, 
  Users, 
  Sparkles, 
  X,
  Share2,
  Calendar,
  Building
} from 'lucide-react';
import { studentRankings, prodiRankings, ecoBadges } from '../../data/mockData';
import { EcoBadgeItem } from '../../types/reflow';

interface RankingBadgeScreenProps {
  onBack: () => void;
  defaultMainTab?: 'ranking' | 'badge';
}

export const RankingBadgeScreen: React.FC<RankingBadgeScreenProps> = ({
  onBack,
  defaultMainTab = 'ranking',
}) => {
  const [mainTab, setMainTab] = useState<'ranking' | 'badge'>(defaultMainTab);
  const [leaderboardFilter, setLeaderboardFilter] = useState<'mahasiswa' | 'prodi'>('mahasiswa');
  const [selectedBadge, setSelectedBadge] = useState<EcoBadgeItem | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // 3D Glossy Icon Renderer for Eco Badges
  const render3DGlossyIcon = (badge: EcoBadgeItem) => {
    const isUnlocked = badge.unlocked;

    return (
      <div 
        className={`relative w-16 h-16 rounded-3xl flex items-center justify-center p-2.5 transition-transform group-hover:scale-105 ${
          isUnlocked 
            ? 'shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4),0_0_0_1px_rgba(255,255,255,0.9)_inset]' 
            : 'shadow-sm opacity-60 grayscale'
        }`}
        style={{
          background: isUnlocked
            ? `radial-gradient(circle at 35% 30%, #ffffff 0%, ${badge.color} 45%, #064e3b 100%)`
            : 'linear-gradient(135deg, rgba(226,232,240,0.8) 0%, rgba(203,213,225,0.6) 100%)',
        }}
      >
        {/* Curved 3D Specular Light Reflection (Frutiger Aero signature) */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 75%, transparent 100%)'
          }}
        />

        {/* Ambient Halo behind icon if unlocked */}
        {isUnlocked && (
          <div 
            className="absolute -inset-1 rounded-3xl blur-md opacity-50 -z-10"
            style={{ backgroundColor: badge.color }}
          />
        )}

        {/* Inner SVG Icon */}
        <div className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {badge.icon === 'sprout' && <Sprout className="w-8 h-8 stroke-[2.2]" />}
          {badge.icon === 'shield' && <Shield className="w-8 h-8 stroke-[2.2]" />}
          {badge.icon === 'award' && <Award className="w-8 h-8 stroke-[2.2]" />}
          {badge.icon === 'star' && <Star className="w-8 h-8 stroke-[2.2] fill-amber-300 text-amber-100" />}
          {badge.icon === 'crown' && <Crown className="w-8 h-8 stroke-[2.2] fill-amber-300 text-amber-100" />}
          {badge.icon === 'shield-check' && <ShieldCheck className="w-8 h-8 stroke-[2.2]" />}
          {badge.icon === 'flame' && <Flame className="w-8 h-8 stroke-[2.2]" />}
          {badge.icon === 'lock' && <Lock className="w-8 h-8 stroke-[2.2]" />}
        </div>

        {/* Sparkle highlight point on top-left */}
        {isUnlocked && (
          <span className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
        )}
      </div>
    );
  };

  const handleShareBadge = () => {
    if (selectedBadge) {
      navigator.clipboard?.writeText(`Saya berhasil meraih Eco Badge "${selectedBadge.title}" di RE-FLOW Kampus Hijau! 🌱`);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200/80 active:scale-95"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Ranking FEB
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Kompetisi 5 Program Studi Fakultas Ekonomi dan Bisnis
            </p>
          </div>
        </div>

        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full shadow-sm">
          Lingkup FEB
        </span>
      </div>

      {/* Main Tab Segmented Switch: Ranking vs Eco Badge */}
      <div className="p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 grid grid-cols-2 gap-1 shadow-inner">
        <button
          onClick={() => setMainTab('ranking')}
          className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
            mainTab === 'ranking'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Leaderboard</span>
        </button>

        <button
          onClick={() => setMainTab('badge')}
          className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
            mainTab === 'badge'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Koleksi Eco Badge</span>
        </button>
      </div>

      {/* 1. TAB LEADERBOARD (Top Mahasiswa vs Top Program Studi) */}
      {mainTab === 'ranking' && (
        <div className="space-y-3">
          {/* Pilihan Toggle Filter: "Top Mahasiswa" vs "Top Program Studi (Campus Green Challenge)" */}
          <div className="p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 gap-1">
            <button
              onClick={() => setLeaderboardFilter('mahasiswa')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                leaderboardFilter === 'mahasiswa'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Top Mahasiswa</span>
            </button>

            <button
              onClick={() => setLeaderboardFilter('prodi')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                leaderboardFilter === 'prodi'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Top Program Studi</span>
            </button>
          </div>

          {/* VIEW: TOP MAHASISWA (1-10 dengan Highlight Amanda #8) */}
          {leaderboardFilter === 'mahasiswa' && (
            <div className="space-y-2">
              <div className="px-1 flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                <span>Peringkat & Mahasiswa</span>
                <span>Akumulasi Sampah & Poin</span>
              </div>

              <div className="space-y-2">
                {studentRankings.map((student) => {
                  const isTop3 = student.rank <= 3;
                  const isCurrentUser = student.isCurrentUser;

                  return (
                    <div
                      key={student.name}
                      className={`rounded-2xl p-3.5 transition-all relative overflow-hidden ${
                        isCurrentUser
                          ? 'glass-aero border-2 border-emerald-500 ring-4 ring-emerald-200/80 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 shadow-lg scale-[1.01]'
                          : 'glass-aero-card hover:border-emerald-300'
                      }`}
                    >
                      {/* Highlight Banner on Current User */}
                      {isCurrentUser && (
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-500 text-white text-[9px] font-black px-3 py-0.5 rounded-bl-xl shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>POSISI KAMU</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Rank Medal / Number */}
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-sm ${
                              student.rank === 1
                                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 ring-2 ring-amber-200'
                                : student.rank === 2
                                ? 'bg-gradient-to-b from-slate-200 to-slate-400 text-slate-900 ring-2 ring-slate-200'
                                : student.rank === 3
                                ? 'bg-gradient-to-b from-amber-600 to-amber-800 text-white ring-2 ring-amber-300'
                                : isCurrentUser
                                ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {student.rank}
                          </div>

                          {/* Avatar with glossy ring */}
                          <div className={`relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 ${
                            isCurrentUser ? 'border-emerald-500 ring-2 ring-emerald-300 shadow-md' : 'border-white shadow-sm'
                          }`}>
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div 
                              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-full"
                              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)' }}
                            />
                          </div>

                          {/* Student Details */}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className={`text-xs sm:text-sm font-bold leading-tight ${
                                isCurrentUser ? 'text-emerald-950 font-black' : 'text-slate-900'
                              }`}>
                                {student.name}
                              </h3>
                              <span className="text-[10px] font-bold text-slate-500">
                                ({student.faculty})
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5 font-medium truncate max-w-[150px]">
                              {student.major}
                            </p>
                          </div>
                        </div>

                        {/* Stats: Waste & Points */}
                        <div className="text-right shrink-0">
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-xs sm:text-sm font-extrabold text-emerald-700 tabular-nums">
                              {student.points.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">pt</span>
                          </div>

                          <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 mt-0.5">
                            <span className="font-semibold text-slate-700 tabular-nums">{student.wasteKg} kg</span>
                            <span aria-hidden="true">·</span>
                            <span className={`font-bold flex items-center ${
                              student.change && student.change > 0 ? 'text-emerald-600' : student.change && student.change < 0 ? 'text-rose-500' : 'text-slate-400'
                            }`}>
                              {student.change && student.change > 0 ? (
                                <>▲ {student.change}</>
                              ) : student.change && student.change < 0 ? (
                                <>▼ {Math.abs(student.change)}</>
                              ) : (
                                '-'
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW: TOP PROGRAM STUDI (Campus Green Challenge) */}
          {leaderboardFilter === 'prodi' && (
            <div className="space-y-3">
              {/* FEB Green Challenge Info Card */}
              <div 
                className="rounded-3xl p-4 text-white shadow-xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%)'
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-200 uppercase tracking-widest block">
                      FEB Green Challenge
                    </span>
                    <h3 className="text-base font-extrabold tracking-tight mt-0.5">
                      Kompetisi 5 Program Studi FEB
                    </h3>
                    <p className="text-xs text-emerald-100 mt-1 leading-snug">
                      S1 Akuntansi memimpin di Posisi #1, disusul S1 Manajemen dan S1 Pendidikan Administrasi Perkantoran!
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg shrink-0">
                    <Trophy className="w-6 h-6 text-amber-300" />
                  </div>
                </div>
              </div>

              {/* List Peringkat Program Studi */}
              <div className="space-y-2">
                {prodiRankings.map((prodi) => {
                  const isUserFaculty = prodi.isUserFaculty;

                  return (
                    <div
                      key={prodi.name}
                      className={`rounded-2xl p-4 transition-all space-y-2.5 relative ${
                        isUserFaculty
                          ? 'glass-aero border-2 border-emerald-500 ring-2 ring-emerald-300 bg-emerald-50/50 shadow-md'
                          : 'glass-aero-card hover:border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                              prodi.rank === 1
                                ? 'bg-amber-400 text-amber-950 shadow-sm'
                                : prodi.rank === 2
                                ? 'bg-slate-300 text-slate-800 shadow-sm'
                                : prodi.rank === 3
                                ? 'bg-amber-700 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            #{prodi.rank}
                          </span>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                {prodi.name}
                              </h4>
                              {isUserFaculty && (
                                <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-200/90 px-1.5 py-0.2 rounded">
                                  Prodi Kamu
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">
                              {prodi.activeStudents.toLocaleString('id-ID')} mahasiswa aktif FEB
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-extrabold text-emerald-700 tabular-nums">
                            {prodi.points.toLocaleString('id-ID')} pt
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            {prodi.wasteKg} kg sampah
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Kontribusi */}
                      <div className="space-y-1">
                        <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden flex">
                          <div
                            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${prodi.percentage * 3.8}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                          <span>Kontribusi Kampus: {prodi.percentage}%</span>
                          <span className="text-emerald-700">▲ {prodi.change >= 0 ? `+${prodi.change}` : prodi.change} peringkat</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. TAB KOLEKSI "ECO BADGE" (3D Glossy Badges) */}
      {mainTab === 'badge' && (
        <div className="space-y-4">
          {/* Header Summary Card */}
          <div className="glass-aero-card rounded-3xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                Pencapaian Mahasiswa
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                Koleksi Eco Badge Amanda
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                5 dari 8 Lencana Terbuka · Terus setor untuk membuka Lencana Legendaris!
              </p>
            </div>

            <div className="text-center px-3 py-1.5 rounded-2xl bg-emerald-100/90 border border-emerald-300">
              <span className="text-xl font-black text-emerald-800 tabular-nums">5/8</span>
              <span className="text-[9px] font-bold text-emerald-700 block uppercase">Badge</span>
            </div>
          </div>

          {/* Grid Koleksi Lencana 3D Glossy */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ecoBadges.map((badge) => {
              const isUnlocked = badge.unlocked;

              return (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`rounded-3xl p-3.5 flex flex-col items-center text-center cursor-pointer transition-all relative overflow-hidden group border ${
                    isUnlocked
                      ? 'glass-aero border-white/90 hover:border-emerald-300 hover:shadow-lg'
                      : 'bg-white/40 border-slate-200/80 hover:bg-white/60'
                  }`}
                >
                  {/* 3D Glossy Badge Icon */}
                  {render3DGlossyIcon(badge)}

                  {/* Title & Description */}
                  <div className="mt-2.5 flex-1">
                    <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                      {badge.description}
                    </p>
                  </div>

                  {/* Status Indicator Pill */}
                  <div className="mt-2 w-full">
                    {isUnlocked ? (
                      <span className="w-full py-1 rounded-full text-[9px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 flex items-center justify-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Terbuka</span>
                      </span>
                    ) : (
                      <span className="w-full py-1 rounded-full text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200 flex items-center justify-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>{badge.statusText}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* POP-UP DETAIL ECO BADGE (Glassmorphism Transparent Frutiger Aero Modal) */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden border border-white/90"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 250, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.35), inset 0 1px 2px rgba(255, 255, 255, 1)'
            }}
          >
            {/* Top Gloss Reflection */}
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)'
              }}
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Big 3D Badge Graphic */}
            <div className="pt-2 flex justify-center">
              <div 
                className={`relative w-24 h-24 rounded-3xl flex items-center justify-center p-3 shadow-xl ${
                  selectedBadge.unlocked 
                    ? 'ring-4 ring-emerald-200' 
                    : 'opacity-70 grayscale'
                }`}
                style={{
                  background: selectedBadge.unlocked
                    ? `radial-gradient(circle at 35% 30%, #ffffff 0%, ${selectedBadge.color} 45%, #064e3b 100%)`
                    : '#94a3b8',
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, transparent 100%)'
                  }}
                />
                <div className="relative z-10 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] scale-125">
                  {selectedBadge.icon === 'sprout' && <Sprout className="w-10 h-10" />}
                  {selectedBadge.icon === 'shield' && <Shield className="w-10 h-10" />}
                  {selectedBadge.icon === 'award' && <Award className="w-10 h-10" />}
                  {selectedBadge.icon === 'star' && <Star className="w-10 h-10 fill-amber-300" />}
                  {selectedBadge.icon === 'crown' && <Crown className="w-10 h-10 fill-amber-300" />}
                  {selectedBadge.icon === 'shield-check' && <ShieldCheck className="w-10 h-10" />}
                  {selectedBadge.icon === 'flame' && <Flame className="w-10 h-10" />}
                  {selectedBadge.icon === 'lock' && <Lock className="w-10 h-10" />}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Rarity: {selectedBadge.rarity || 'Spesial'}
                </span>
                {selectedBadge.unlocked && (
                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedBadge.earnedDate}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mt-1.5">
                {selectedBadge.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto leading-relaxed">
                {selectedBadge.description}
              </p>
            </div>

            {/* Status card */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200 text-xs space-y-1">
              <span className="text-slate-500 font-medium block">
                Status Pencapaian:
              </span>
              <span className={`font-bold text-sm block ${selectedBadge.unlocked ? 'text-emerald-700' : 'text-slate-600'}`}>
                {selectedBadge.unlocked ? '🎉 Telah Terbuka & Diverifikasi Sistem' : selectedBadge.statusText}
              </span>
              {selectedBadge.targetVal && !selectedBadge.unlocked && (
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${((selectedBadge.currentVal || 0) / selectedBadge.targetVal) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-1">
              {selectedBadge.unlocked ? (
                <button
                  onClick={handleShareBadge}
                  className="w-full py-3 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShare ? 'Teks Berhasil Disalin!' : 'Bagikan Lencana Ini'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md"
                >
                  Tutup & Lanjutkan Misi
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
