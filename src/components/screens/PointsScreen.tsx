import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Gift, 
  Sparkles, 
  CheckCircle, 
  Utensils, 
  Store, 
  Printer, 
  Sprout, 
  Award, 
  X, 
  History,
  Leaf,
  Trash2,
  Package,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialRewards } from '../../data/mockData';
import { PointTransaction, RewardItem } from '../../types/reflow';

interface PointsScreenProps {
  userPoints: number;
  userName: string;
  userFaculty: string;
  transactions: PointTransaction[];
  onBack: () => void;
  onRedeemReward: (reward: RewardItem) => void;
  onConfirmContribution: (points: number, rupiah: number, projectTitle: string) => void;
  onNavigateVouchers?: () => void;
  onNavigateHistory?: () => void;
}

export const PointsScreen: React.FC<PointsScreenProps> = ({
  userPoints,
  userName,
  userFaculty,
  transactions,
  onBack,
  onRedeemReward,
  onConfirmContribution,
  onNavigateVouchers,
  onNavigateHistory,
}) => {
  // Main Segmented Tab Switcher: 'redeem' ("Tukar Voucher") vs 'contribute' ("Donasi Kampus")
  const [activeTrack, setActiveTrack] = useState<'redeem' | 'contribute'>('redeem');

  // Filter chips for "Tukar Voucher"
  const [selectedMerchant, setSelectedMerchant] = useState<'semua' | 'kantin' | 'koperasi' | 'percetakan' | 'merchandise'>('semua');

  // Filter chips for "Donasi Kampus"
  const [selectedDonationCategory, setSelectedDonationCategory] = useState<'semua' | 'bibit' | 'vertical' | 'smartbin'>('semua');

  // Modal State for Redeem Confirmation & Feedback
  const [pendingRedeemReward, setPendingRedeemReward] = useState<RewardItem | null>(null);
  const [redeemSuccessResult, setRedeemSuccessResult] = useState<{
    reward: RewardItem;
    remainingPoints: number;
  } | null>(null);

  // CONTRIBUTE State & Feedback
  const [selectedDonationTier, setSelectedDonationTier] = useState<number>(100);
  const [contributionSuccessResult, setContributionSuccessResult] = useState<{
    points: number;
    rupiah: number;
    projectTitle: string;
  } | null>(null);

  // Donation projects (Green Fund FEB)
  const donationTiers = [
    {
      id: 'bibit',
      points: 50,
      rupiah: 5000,
      title: 'Proyek Bibit Tanaman Kampus FEB',
      category: 'bibit',
      description: 'Penyediaan bibit pohon peneduh & tanaman hias untuk penghijauan area Gedung SFD FEB.',
      impact: '1 bibit pohon peneduh',
    },
    {
      id: 'vertical',
      points: 100,
      rupiah: 10000,
      title: 'Proyek Vertical Garden FEB',
      category: 'vertical',
      description: 'Pembuatan instalasi vertical garden ramah lingkungan di koridor dan dinding Fakultas Ekonomi dan Bisnis.',
      impact: '1 modul vertical garden',
    },
    {
      id: 'smartbin',
      points: 200,
      rupiah: 20000,
      title: 'Pengadaan Smart Bin & Kompos FEB',
      category: 'smartbin',
      description: 'Fasilitas pemilahan sampah pintar berdaya sensor dan instalasi komposter di Area Kantin Blok M FEB.',
      impact: 'Dukungan fasilitas smart bin',
    },
  ];

  const currentDonationInfo = donationTiers.find((t) => t.points === selectedDonationTier) || donationTiers[1];

  // Filter rewards by merchant
  const filteredRewards = initialRewards.filter((r) => {
    if (selectedMerchant === 'semua') return true;
    return r.merchantType === selectedMerchant;
  });

  // Filter donation projects by category
  const filteredDonations = donationTiers.filter((tier) => {
    if (selectedDonationCategory === 'semua') return true;
    return tier.category === selectedDonationCategory;
  });

  // Handle Redeem Submission
  const handleConfirmRedeem = () => {
    if (!pendingRedeemReward) return;
    if (userPoints < pendingRedeemReward.pointsCost) return;

    const remaining = userPoints - pendingRedeemReward.pointsCost;

    onRedeemReward(pendingRedeemReward);
    setRedeemSuccessResult({
      reward: pendingRedeemReward,
      remainingPoints: remaining,
    });
    setPendingRedeemReward(null);

    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#10b981', '#06b6d4', '#34d399', '#38bdf8', '#fbbf24'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Contribute Submission
  const handleConfirmDonation = () => {
    if (userPoints < currentDonationInfo.points) return;

    onConfirmContribution(currentDonationInfo.points, currentDonationInfo.rupiah, currentDonationInfo.title);
    setContributionSuccessResult({
      points: currentDonationInfo.points,
      rupiah: currentDonationInfo.rupiah,
      projectTitle: currentDonationInfo.title,
    });

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#0284c7', '#38bdf8', '#fbbf24'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. TOP HEADER DENGAN TOMBOL TOP RIGHT SIMETRIS (50:50) */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200/80 active:scale-95 transition-all"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            RE-FLOW Points
          </h1>
        </div>

        {/* Symmetric Top Right Header Buttons Container (50:50) */}
        <div className="flex items-center p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-200/70 shadow-sm w-52 sm:w-56">
          {/* Tombol Voucher Saya (50%) */}
          <button
            onClick={onNavigateVouchers}
            className="w-1/2 h-8 px-2 rounded-xl text-[11px] sm:text-xs font-bold text-slate-600 hover:text-emerald-800 bg-transparent hover:bg-emerald-50/70 flex items-center justify-center gap-1.5 transition-all duration-200 select-none"
          >
            <Gift className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span className="truncate">Voucher Saya</span>
          </button>

          {/* Tombol Riwayat Poin (50%) */}
          <button
            onClick={onNavigateHistory}
            className="w-1/2 h-8 px-2 rounded-xl text-[11px] sm:text-xs font-bold text-slate-600 hover:text-emerald-800 bg-transparent hover:bg-emerald-50/70 flex items-center justify-center gap-1.5 transition-all duration-200 select-none"
          >
            <History className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span className="truncate">Riwayat Poin</span>
          </button>
        </div>
      </div>

      {/* Saldo Poin Mahasiswa (Frutiger Aero Green Glossy Card) */}
      <div className="relative rounded-3xl p-5 text-white shadow-xl overflow-hidden glass-aero-green">
        <div 
          className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, #34d399 70%, transparent 100%)' }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Glowing Yellow Eco-Coin */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 text-amber-950 font-black text-2xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1.5px_2px_rgba(255,255,255,0.9)] ring-2 ring-white/40">
              R
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block">
                Total Poin Mahasiswa
              </span>
              <div className="text-4xl font-extrabold tracking-tight tabular-nums mt-0.5 drop-shadow-md">
                {userPoints.toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-emerald-100/90 block">
              Nilai Konversi
            </span>
            <span className="text-xs font-extrabold text-emerald-950 bg-white/90 px-2.5 py-1 rounded-full inline-block mt-0.5 shadow-sm">
              Rp {(userPoints * 100).toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEGMENTED TAB SWITCHER 2 PILIHAN (SIMETRIS & MODERN - CLEAN UI) */}
      <div className="p-1.5 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/90 shadow-[0_4px_20px_-4px_rgba(6,182,212,0.12)] grid grid-cols-2 gap-1.5">
        {/* Tab 1: Tukar Voucher */}
        <button
          onClick={() => setActiveTrack('redeem')}
          className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden select-none ${
            activeTrack === 'redeem'
              ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.35)] scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-100/60'
          }`}
        >
          {activeTrack === 'redeem' && (
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)' }}
            />
          )}
          <Gift className={`w-4 h-4 shrink-0 ${activeTrack === 'redeem' ? 'text-white' : 'text-emerald-700'}`} />
          <span className="tracking-tight">Tukar Voucher</span>
        </button>

        {/* Tab 2: Donasi Kampus */}
        <button
          onClick={() => setActiveTrack('contribute')}
          className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden select-none ${
            activeTrack === 'contribute'
              ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.35)] scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-100/60'
          }`}
        >
          {activeTrack === 'contribute' && (
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)' }}
            />
          )}
          <Sprout className={`w-4 h-4 shrink-0 ${activeTrack === 'contribute' ? 'text-white' : 'text-emerald-700'}`} />
          <span className="tracking-tight">Donasi Kampus</span>
        </button>
      </div>

      {/* 3. KATEGORI FILTER MENGIKUTI TAB YANG DIPILIH */}
      {activeTrack === 'redeem' ? (
        /* Filter Chips untuk Tukar Voucher */
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'semua', label: 'Semua Mitra', icon: Sparkles },
            { id: 'kantin', label: 'Kantin FEB', icon: Utensils },
            { id: 'koperasi', label: 'FEB Mart', icon: Store },
            { id: 'percetakan', label: 'Percetakan', icon: Printer },
            { id: 'merchandise', label: 'Merchandise FEB', icon: Package },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedMerchant === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedMerchant(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Filter Chips untuk Donasi Kampus */
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'semua', label: 'Semua Program', icon: Sparkles },
            { id: 'bibit', label: 'Bibit Tanaman', icon: Sprout },
            { id: 'vertical', label: 'Vertical Garden', icon: Leaf },
            { id: 'smartbin', label: 'Smart Bin FEB', icon: Trash2 },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedDonationCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedDonationCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* JALUR A: KATALOG VOUCHER REWARD (TUKAR VOUCHER) */}
      {activeTrack === 'redeem' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredRewards.map((reward) => {
              const canAfford = userPoints >= reward.pointsCost;

              return (
                <div
                  key={reward.id}
                  className="glass-aero-card rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-300 transition-all border border-white/90 relative overflow-hidden group shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-md">
                      {reward.merchant}
                    </span>

                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-[9px] font-black text-amber-950">
                        R
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 tabular-nums">
                        {reward.pointsCost} poin
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {reward.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {reward.description}
                    </p>
                  </div>

                  {/* Tombol "Tukar Poin" */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-400">
                      Sisa poin: {userPoints} pt
                    </span>

                    <button
                      onClick={() => setPendingRedeemReward(reward)}
                      disabled={!canAfford}
                      className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all shadow-sm ${
                        canAfford
                          ? 'gloss-pill-btn'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Tukar Poin' : 'Poin Kurang'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* JALUR B: ALOKASI KE CAMPUS GREEN FUND (DONASI KAMPUS) */}
      {activeTrack === 'contribute' && (
        <div className="space-y-4">
          {/* Banner Campus Green Fund */}
          <div 
            className="rounded-3xl p-5 text-white shadow-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)'
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <div className="max-w-[210px]">
                <span className="text-[10px] font-extrabold text-cyan-200 uppercase tracking-wider block">
                  Ekonomi Berkelanjutan FEB
                </span>
                <h3 className="text-lg font-extrabold tracking-tight mt-0.5">
                  Campus Green Fund
                </h3>
                <p className="text-xs text-cyan-100 mt-1 leading-relaxed">
                  Alokasikan poinmu untuk proyek pohon peneduh, vertical garden, dan fasilitas smart bin FEB!
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                <Sprout className="w-8 h-8 text-cyan-200" />
              </div>
            </div>
          </div>

          {/* Opsi Alokasi Poin */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block px-1">
              Pilih Opsi Alokasi Poin:
            </label>

            <div className="space-y-2.5">
              {filteredDonations.map((tier) => {
                const isSelected = selectedDonationTier === tier.points;
                const canAffordTier = userPoints >= tier.points;

                return (
                  <div
                    key={tier.points}
                    onClick={() => setSelectedDonationTier(tier.points)}
                    className={`glass-aero-card rounded-2xl p-4 cursor-pointer transition-all border-2 relative overflow-hidden ${
                      isSelected
                        ? 'border-cyan-500 ring-4 ring-cyan-200/80 bg-gradient-to-r from-cyan-50/80 to-sky-50/80 shadow-md'
                        : 'border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                            isSelected
                              ? 'border-cyan-600 bg-cyan-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">
                              {tier.points} RE-FLOW Points
                            </span>
                            <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
                              Rp {tier.rupiah.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-800 mt-1">
                            {tier.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {tier.description}
                          </p>

                          <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>Dampak: {tier.impact}</span>
                          </div>
                        </div>
                      </div>

                      {!canAffordTier && (
                        <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full shrink-0">
                          Poin Kurang
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA: Donasi Sekarang */}
          <div className="pt-2">
            <button
              onClick={handleConfirmDonation}
              disabled={userPoints < currentDonationInfo.points}
              className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${
                userPoints >= currentDonationInfo.points
                  ? 'gloss-pill-cyan'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Sprout className="w-5 h-5 text-white" />
              <span>Donasikan {currentDonationInfo.points} Poin (Rp {currentDonationInfo.rupiah.toLocaleString('id-ID')})</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL 1: Konfirmasi Penukaran Poin */}
      {pendingRedeemReward && (
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

            <button
              onClick={() => setPendingRedeemReward(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <Gift className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
                Konfirmasi Penukaran
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                {pendingRedeemReward.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tukar <span className="font-extrabold text-emerald-700">{pendingRedeemReward.pointsCost} poin</span> untuk voucher ini?
              </p>
            </div>

            <div className="p-3 bg-white/80 rounded-2xl border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Merchant / Lokasi:</span>
                <span className="font-bold text-slate-800">{pendingRedeemReward.merchant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nilai Voucher:</span>
                <span className="font-bold text-emerald-700">{pendingRedeemReward.nominalText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sisa Poin Anda:</span>
                <span className="font-bold text-slate-800">{userPoints - pendingRedeemReward.pointsCost} pt</span>
              </div>
            </div>

            <button
              onClick={handleConfirmRedeem}
              className="w-full py-3 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md"
            >
              Konfirmasi Tukar Sekarang
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Sukses Penukaran Poin (REDEEM) - Clean Redesign without QR Code */}
      {redeemSuccessResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden border border-white/95"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 250, 0.92) 100%)',
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

            {/* Glowing Big Green Success Icon with animated pulse */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 text-white flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.38)] ring-8 ring-emerald-100/80 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, transparent 100%)'
                  }}
                />
                <CheckCircle className="w-10 h-10 stroke-[2.8] drop-shadow-sm" />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest block">
                PENUKARAN BERHASIL!
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                {redeemSuccessResult.reward.title}
              </h3>
            </div>

            {/* Voucher Card Summary Box (Glassmorphism Frutiger Aero) */}
            <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-200/80 shadow-sm text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  Mitra Kampus
                </span>
                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-md">
                  {redeemSuccessResult.reward.merchant}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  Nilai Keuntungan
                </span>
                <span className="text-xs font-black text-emerald-700">
                  {redeemSuccessResult.reward.nominalText}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">
                  Sisa Poin Kamu:
                </span>
                <span className="text-xs font-black text-slate-800 tabular-nums bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {redeemSuccessResult.remainingPoints.toLocaleString('id-ID')} pt
                </span>
              </div>
            </div>

            {/* Petunjuk Swipe to Redeem */}
            <p className="text-xs text-slate-600 leading-relaxed px-1">
              Voucher telah ditambahkan ke koleksimu. Tunjukkan dan geser (swipe) voucher ini di kasir saat transaksi.
            </p>

            {/* 2 CTA Buttons */}
            <div className="space-y-2 pt-1">
              {/* Tombol Utama (Primary Button - Hijau Glossy) */}
              <button
                onClick={() => {
                  setRedeemSuccessResult(null);
                  if (onNavigateVouchers) {
                    onNavigateVouchers();
                  }
                }}
                className="w-full py-3.5 rounded-2xl gloss-pill-btn font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                <span>Lihat Voucher Saya</span>
              </button>

              {/* Tombol Kedua (Secondary Button - Outlined/Transparan) */}
              <button
                onClick={() => setRedeemSuccessResult(null)}
                className="w-full py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                Tukar Voucher Lain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Sukses Donasi Green Fund (CONTRIBUTE) */}
      {contributionSuccessResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden border border-white/90"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.35), inset 0 1px 2px rgba(255, 255, 255, 1)'
            }}
          >
            {/* Top Gloss Reflection */}
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)'
              }}
            />

            {/* Sprout Award Icon */}
            <div className="w-16 h-16 rounded-full bg-cyan-100 text-cyan-600 mx-auto flex items-center justify-center shadow-lg ring-8 ring-cyan-50">
              <Award className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-cyan-600 uppercase tracking-widest block">
                Sertifikat Apresiasi Green Fund
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Terima Kasih, {userName}!
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Alokasi donasi sebesar <span className="font-bold text-cyan-700">{contributionSuccessResult.points} poin (Rp {contributionSuccessResult.rupiah.toLocaleString('id-ID')})</span> telah berhasil disalurkan untuk <span className="font-semibold text-slate-800">{contributionSuccessResult.projectTitle}</span> atas nama <span className="font-bold text-slate-900">{userFaculty}</span>.
              </p>
            </div>

            <div className="p-3 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl border border-cyan-200 text-xs text-cyan-900 font-semibold flex items-center justify-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Kontribusimu membantu kampus FEB lebih asri & hijau!</span>
            </div>

            <button
              onClick={() => setContributionSuccessResult(null)}
              className="w-full py-3 rounded-2xl gloss-pill-cyan font-extrabold text-xs shadow-md"
            >
              Tutup & Lihat Saldo Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
