import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Gift, 
  History, 
  Recycle, 
  Utensils, 
  Coffee, 
  Sprout, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Clock
} from 'lucide-react';
import { PointTransaction } from '../../types/reflow';

interface PointsHistoryScreenProps {
  transactions: PointTransaction[];
  userPoints: number;
  onBack: () => void;
  onNavigateVouchers: () => void;
}

export const PointsHistoryScreen: React.FC<PointsHistoryScreenProps> = ({
  transactions,
  userPoints,
  onBack,
  onNavigateVouchers,
}) => {
  const [activeFilter, setActiveFilter] = useState<'semua' | 'deposit' | 'redeem' | 'contribute'>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate stats
  const totalEarned = transactions
    .filter((tx) => tx.points > 0)
    .reduce((sum, tx) => sum + tx.points, 0);

  const totalSpent = Math.abs(
    transactions
      .filter((tx) => tx.points < 0)
      .reduce((sum, tx) => sum + tx.points, 0)
  );

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = activeFilter === 'semua' || tx.type === activeFilter;
    const matchesSearch = 
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.details && tx.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tx.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTransactionIcon = (tx: PointTransaction) => {
    switch (tx.type) {
      case 'deposit':
        return (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md relative overflow-hidden shrink-0">
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)' }}
            />
            <Recycle className="w-5 h-5 drop-shadow-sm" />
          </div>
        );
      case 'redeem':
        return (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-md relative overflow-hidden shrink-0">
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)' }}
            />
            <Gift className="w-5 h-5 drop-shadow-sm" />
          </div>
        );
      case 'contribute':
        return (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white flex items-center justify-center shadow-md relative overflow-hidden shrink-0">
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)' }}
            />
            <Sprout className="w-5 h-5 drop-shadow-sm" />
          </div>
        );
      default:
        return (
          <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* 1. TOP HEADER DENGAN TOMBOL TOP RIGHT SIMETRIS (50:50) */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200/80 active:scale-95 transition-all"
            aria-label="Kembali ke Points"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
              Riwayat Poin
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold">
              Catatan transaksi sirkular FEB
            </p>
          </div>
        </div>

        {/* Symmetric Top Right Header Buttons Container (50:50) */}
        <div className="flex items-center p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-200/70 shadow-sm w-52 sm:w-56">
          {/* Tombol Voucher Saya (50% - Inactive) */}
          <button
            onClick={onNavigateVouchers}
            className="w-1/2 h-8 px-2 rounded-xl text-[11px] sm:text-xs font-bold text-slate-500 hover:text-slate-800 bg-transparent hover:bg-slate-100/50 flex items-center justify-center gap-1.5 transition-all duration-300 select-none"
          >
            <Gift className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">Voucher Saya</span>
          </button>

          {/* Tombol Riwayat Poin (50% - ACTIVE STATE) */}
          <button
            className="w-1/2 h-8 px-2 rounded-xl text-[11px] sm:text-xs font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-md flex items-center justify-center gap-1.5 transition-all duration-300 relative overflow-hidden select-none"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
              }}
            />
            <History className="w-3.5 h-3.5 shrink-0 text-white" />
            <span className="truncate">Riwayat Poin</span>
          </button>
        </div>
      </div>

      {/* 2. STATS RINGKASAN POIN (Frutiger Aero Glassmorphism) */}
      <div className="relative rounded-3xl p-5 text-white shadow-xl overflow-hidden glass-aero-green">
        <div 
          className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, #34d399 70%, transparent 100%)' }}
        />

        <div className="relative z-10 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
              Ringkasan Aktivitas Akun
            </span>
            <span className="text-[10px] font-extrabold uppercase text-emerald-950 bg-white/90 px-2.5 py-0.5 rounded-full shadow-sm">
              FEB UNJ
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/20 text-center">
            {/* Total Poin Masuk */}
            <div className="p-2.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
              <span className="text-[10px] font-bold text-emerald-100 uppercase block flex items-center justify-center gap-1">
                <ArrowDownLeft className="w-3 h-3 text-emerald-300" />
                Poin Masuk
              </span>
              <span className="text-base sm:text-lg font-black text-white tabular-nums mt-0.5 block">
                +{totalEarned} pt
              </span>
            </div>

            {/* Total Poin Keluar */}
            <div className="p-2.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
              <span className="text-[10px] font-bold text-emerald-100 uppercase block flex items-center justify-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-amber-300" />
                Poin Keluar
              </span>
              <span className="text-base sm:text-lg font-black text-white tabular-nums mt-0.5 block">
                -{totalSpent} pt
              </span>
            </div>

            {/* Saldo Aktif */}
            <div className="p-2.5 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/30 shadow-inner">
              <span className="text-[10px] font-bold text-emerald-100 uppercase block">
                Saldo Aktif
              </span>
              <span className="text-base sm:text-lg font-black text-white tabular-nums mt-0.5 block">
                {userPoints.toLocaleString('id-ID')} pt
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER TABS */}
      <div className="space-y-2.5">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari transaksi, drop point, atau tanggal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'semua', label: 'Semua Transaksi' },
            { id: 'deposit', label: 'Poin Masuk (Setor)' },
            { id: 'redeem', label: 'Tukar Voucher' },
            { id: 'contribute', label: 'Donasi Green Fund' },
          ].map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. DAFTAR KARTU RIWAYAT (GLASSMORPHISM SCROLLABLE LIST) */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="glass-aero-card rounded-3xl p-8 text-center space-y-3 border border-white">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto shadow-inner">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Tidak Ada Transaksi Ditemukan
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Coba sesuaikan kata kunci pencarian atau ubah filter transaksi.
              </p>
            </div>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isPositive = tx.points > 0;

            return (
              <div
                key={tx.id}
                className="glass-aero-card rounded-3xl p-4 sm:p-5 border border-white/95 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all relative overflow-hidden group"
              >
                {/* Top specular reflection */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
                />

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    {getTransactionIcon(tx)}

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          tx.type === 'deposit'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : tx.type === 'redeem'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                        }`}>
                          {tx.type === 'deposit' ? 'Setor Sampah' : tx.type === 'redeem' ? 'Tukar Voucher' : 'Donasi'}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        {tx.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold pt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{tx.date}</span>
                      </div>

                      {tx.details && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium pt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{tx.details}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nominal Poin */}
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-2xl text-xs sm:text-sm font-black tabular-nums shadow-sm ${
                        isPositive
                          ? 'text-emerald-800 bg-emerald-100/90 border border-emerald-300'
                          : 'text-rose-700 bg-rose-50 border border-rose-200'
                      }`}
                    >
                      {isPositive ? `+${tx.points}` : tx.points} pt
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 block mt-1">
                      {isPositive ? 'Poin Masuk' : 'Poin Terpotong'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
