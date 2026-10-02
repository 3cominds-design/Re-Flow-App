import React, { useState } from 'react';
import { ArrowLeft, Search, Coffee, Utensils, Printer, Gamepad2, Package, Sparkles, CheckCircle, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialRewards } from '../../data/mockData';
import { RewardItem } from '../../types/reflow';

interface RedeemScreenProps {
  userPoints: number;
  onBack: () => void;
  onRedeemReward: (reward: RewardItem) => void;
  onGoToMyVouchers?: (reward: RewardItem) => void;
}

export const RedeemScreen: React.FC<RedeemScreenProps> = ({
  userPoints,
  onBack,
  onRedeemReward,
  onGoToMyVouchers,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'semua' | 'kantin' | 'koperasi' | 'percetakan' | 'merchandise'>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRewardModal, setActiveRewardModal] = useState<RewardItem | null>(null);
  const [isRedeemedSuccess, setIsRedeemedSuccess] = useState<boolean>(false);

  const categories = [
    { id: 'semua', label: 'Semua Mitra' },
    { id: 'kantin', label: 'Kantin Kampus' },
    { id: 'koperasi', label: 'Koperasi' },
    { id: 'percetakan', label: 'Tempat Percetakan' },
    { id: 'merchandise', label: 'Merchandise' },
  ];

  const filteredRewards = initialRewards.filter((reward) => {
    const matchesCategory = selectedCategory === 'semua' || reward.merchantType === selectedCategory;
    const matchesSearch = reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'coffee':
        return <Coffee className="w-8 h-8 text-amber-800" />;
      case 'food':
        return <Utensils className="w-8 h-8 text-emerald-800" />;
      case 'tumbler':
        return <Package className="w-8 h-8 text-cyan-800" />;
      case 'print':
        return <Printer className="w-8 h-8 text-indigo-800" />;
      case 'game':
        return <Gamepad2 className="w-8 h-8 text-purple-800" />;
      default:
        return <Package className="w-8 h-8 text-emerald-800" />;
    }
  };

  const handleConfirmRedeem = () => {
    if (!activeRewardModal) return;
    if (userPoints < activeRewardModal.pointsCost) return;

    onRedeemReward(activeRewardModal);
    setIsRedeemedSuccess(true);

    try {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#10b981', '#06b6d4', '#34d399', '#38bdf8', '#fbbf24'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseModal = () => {
    setActiveRewardModal(null);
    setIsRedeemedSuccess(false);
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            REDEEM
          </h1>
        </div>

        {/* User Balance pill indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-xs font-bold text-emerald-900">
          <span>{userPoints} pt</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari reward..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
      </div>

      {/* Reward Grid (2 Columns as shown in sketch 4) */}
      <div className="grid grid-cols-2 gap-3">
        {filteredRewards.map((reward) => {
          const canAfford = userPoints >= reward.pointsCost;

          return (
            <div
              key={reward.id}
              className="glass-aero-card rounded-2xl p-3 flex flex-col justify-between hover:border-emerald-300 transition-all relative overflow-hidden group shadow-sm"
            >
              {/* Reward Image / Thumbnail container with Frutiger Aero gloss */}
              <div className="w-full h-28 rounded-xl bg-gradient-to-tr from-slate-100 via-emerald-50 to-cyan-50 border border-slate-200/80 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {/* Specular gloss reflection */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-xl"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
                />

                <div className="p-2 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm">
                  {getRewardIcon(reward.imagePlaceholder)}
                </div>

                {reward.badge && (
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-1.5 py-0.5 rounded-md">
                    {reward.badge}
                  </span>
                )}
              </div>

              {/* Title & Cost */}
              <div className="mt-2.5 flex-1">
                <h3 className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug">
                  {reward.title}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-[8px] font-black text-amber-950">
                    R
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 tabular-nums">
                    {reward.pointsCost} poin
                  </span>
                </div>
              </div>

              {/* Button "Tukar" */}
              <div className="mt-2.5">
                <button
                  onClick={() => {
                    setIsRedeemedSuccess(false);
                    setActiveRewardModal(reward);
                  }}
                  className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all ${
                    canAfford
                      ? 'gloss-pill-btn'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Tukar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redemption Modal */}
      {activeRewardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl">
            {!isRedeemedSuccess ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                      Konfirmasi Penukaran
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {activeRewardModal.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveRewardModal(null)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
                  >
                    Batal
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">Biaya Poin:</span>
                    <span className="font-bold text-emerald-700">{activeRewardModal.pointsCost} poin</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">Sisa Poin Kamu:</span>
                    <span className="font-bold text-slate-800">{userPoints - activeRewardModal.pointsCost} poin</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-emerald-200/60">
                    {activeRewardModal.terms}
                  </p>
                </div>

                <button
                  onClick={handleConfirmRedeem}
                  disabled={userPoints < activeRewardModal.pointsCost}
                  className="w-full py-3 rounded-2xl gloss-pill-btn font-bold text-sm shadow-md"
                >
                  Konfirmasi Tukar Sekarang
                </button>
              </>
            ) : (
              <>
                <div className="text-center space-y-3">
                  {/* Glowing Big Green Success Icon */}
                  <div className="relative mx-auto w-18 h-18 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 text-white flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.38)] ring-8 ring-emerald-100/80 relative overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-full"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, transparent 100%)'
                        }}
                      />
                      <CheckCircle className="w-9 h-9 stroke-[2.8] drop-shadow-sm" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest block">
                      PENUKARAN BERHASIL!
                    </span>
                    <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                      {activeRewardModal.title}
                    </h3>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-200/80 shadow-sm text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                        Mitra Kampus
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-md">
                        {activeRewardModal.merchant}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                        Nilai Keuntungan
                      </span>
                      <span className="text-xs font-black text-emerald-700">
                        {activeRewardModal.nominalText}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500">
                        Sisa Poin Kamu:
                      </span>
                      <span className="text-xs font-black text-slate-800 tabular-nums bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {(userPoints - activeRewardModal.pointsCost).toLocaleString('id-ID')} pt
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed px-1">
                    Voucher telah ditambahkan ke koleksimu. Tunjukkan dan geser (swipe) voucher ini di kasir saat transaksi.
                  </p>
                </div>

                {/* 2 CTA Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      const currentReward = activeRewardModal;
                      handleCloseModal();
                      if (onGoToMyVouchers && currentReward) {
                        onGoToMyVouchers(currentReward);
                      }
                    }}
                    className="w-full py-3.5 rounded-2xl gloss-pill-btn font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Lihat Voucher Saya</span>
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="w-full py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    Tukar Voucher Lain
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
