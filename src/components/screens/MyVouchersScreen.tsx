import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Utensils, 
  Coffee, 
  ShoppingBag, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  X, 
  Sparkles, 
  ChevronRight, 
  AlertCircle,
  ShieldCheck,
  Check,
  Gift,
  History
} from 'lucide-react';
import { UserVoucher } from '../../types/reflow';

interface MyVouchersScreenProps {
  vouchers: UserVoucher[];
  onBack: () => void;
  onUseVoucher: (voucherId: string) => void;
  onNavigateHistory?: () => void;
}

export const MyVouchersScreen: React.FC<MyVouchersScreenProps> = ({
  vouchers,
  onBack,
  onUseVoucher,
  onNavigateHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'aktif' | 'terpakai' | 'kadaluwarsa'>('aktif');
  const [selectedVoucher, setSelectedVoucher] = useState<UserVoucher | null>(null);
  
  // Slider state for cashier swipe
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [usedSuccessDetails, setUsedSuccessDetails] = useState<{ title: string; merchant: string; date: string } | null>(null);

  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const activeVouchers = vouchers.filter((v) => v.status === 'aktif');
  const usedVouchers = vouchers.filter((v) => v.status === 'terpakai');
  const expiredVouchers = vouchers.filter((v) => v.status === 'kadaluwarsa');

  const getVoucherIcon = (category: string) => {
    switch (category) {
      case 'kantin':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'kopi':
        return <Coffee className="w-5 h-5 text-emerald-600" />;
      case 'koperasi':
        return <ShoppingBag className="w-5 h-5 text-cyan-600" />;
      case 'percetakan':
        return <Printer className="w-5 h-5 text-sky-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kantin':
        return {
          bg: 'bg-amber-100',
          border: 'border-amber-300',
          text: 'text-amber-800',
          badge: 'Stand Kantin Blok M FEB',
        };
      case 'kopi':
        return {
          bg: 'bg-emerald-100',
          border: 'border-emerald-300',
          text: 'text-emerald-800',
          badge: 'Edura Cafe / Store',
        };
      case 'koperasi':
        return {
          bg: 'bg-cyan-100',
          border: 'border-cyan-300',
          text: 'text-cyan-800',
          badge: 'FEB Mart',
        };
      case 'percetakan':
        return {
          bg: 'bg-sky-100',
          border: 'border-sky-300',
          text: 'text-sky-800',
          badge: 'Daksin Fotokopi',
        };
      default:
        return {
          bg: 'bg-emerald-100',
          border: 'border-emerald-300',
          text: 'text-emerald-800',
          badge: 'Mitra FEB',
        };
    }
  };

  // Slider drag handlers
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !sliderTrackRef.current) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const offsetX = Math.max(0, Math.min(clientX - rect.left - 24, rect.width - 48));
    const percentage = (offsetX / (rect.width - 48)) * 100;
    setSliderPosition(percentage);

    // If swiped >= 85%, trigger usage
    if (percentage >= 85) {
      triggerVoucherRedemption();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (sliderPosition < 85) {
      // Snap back if not fully dragged
      setSliderPosition(0);
    }
  };

  const triggerVoucherRedemption = () => {
    setIsDragging(false);
    setSliderPosition(100);

    if (selectedVoucher) {
      const now = new Date();
      const dateStr = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

      setUsedSuccessDetails({
        title: selectedVoucher.title,
        merchant: selectedVoucher.merchant,
        date: dateStr,
      });

      // Call parent action
      onUseVoucher(selectedVoucher.id);
      
      // Close detail and open confirmation
      setSelectedVoucher(null);
      setSliderPosition(0);
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Header & Top Bar with Symmetric 50:50 Top Right Buttons */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200/80 active:scale-95 transition-all"
            aria-label="Kembali ke Katalog"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
              Voucher Saya
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold">
              Kupon mitra kampus FEB
            </p>
          </div>
        </div>

        {/* Symmetric Top Right Header Buttons Container (50:50) */}
        <div className="flex items-center p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-200/70 shadow-sm w-52 sm:w-56">
          {/* Tombol Voucher Saya (50% - ACTIVE STATE) */}
          <button
            className="w-1/2 h-8 px-2 rounded-xl text-[11px] sm:text-xs font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-md flex items-center justify-center gap-1.5 transition-all duration-300 relative overflow-hidden select-none"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
              }}
            />
            <Gift className="w-3.5 h-3.5 shrink-0 text-white" />
            <span className="truncate">Voucher Saya</span>
          </button>

          {/* Tombol Riwayat Poin (50% - Inactive) */}
          <button
            onClick={onNavigateHistory}
            className="w-1/2 h-8 px-2 rounded-xl text-[11px] sm:text-xs font-bold text-slate-500 hover:text-slate-800 bg-transparent hover:bg-slate-100/50 flex items-center justify-center gap-1.5 transition-all duration-300 select-none"
          >
            <History className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">Riwayat Poin</span>
          </button>
        </div>
      </div>

      {/* Segmented Control / Tab Switcher */}
      <div className="p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 grid grid-cols-3 gap-1 shadow-inner">
        <button
          onClick={() => setActiveTab('aktif')}
          className={`py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'aktif'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Aktif ({activeVouchers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('terpakai')}
          className={`py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'terpakai'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Sudah Dipakai ({usedVouchers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('kadaluwarsa')}
          className={`py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'kadaluwarsa'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Kadaluwarsa ({expiredVouchers.length})</span>
        </button>
      </div>

      {/* 2. List Card Voucher (Tab Aktif) */}
      {activeTab === 'aktif' && (
        <div className="space-y-3">
          {activeVouchers.length === 0 ? (
            <div className="glass-aero-card rounded-3xl p-8 text-center space-y-3 border border-white">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800">
                  Belum Ada Voucher Aktif
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Tukarkan RE-FLOW Points kamu dengan voucher makan kantin, kopi, atau percetakan FEB!
                </p>
              </div>
            </div>
          ) : (
            activeVouchers.map((voucher) => {
              const theme = getCategoryColor(voucher.category);

              return (
                <div
                  key={voucher.id}
                  onClick={() => {
                    setSelectedVoucher(voucher);
                    setSliderPosition(0);
                  }}
                  className="glass-aero-card rounded-3xl p-4 sm:p-5 border border-white/95 shadow-md relative overflow-hidden group hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer"
                >
                  {/* Frutiger Aero top gloss reflection */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
                  />

                  {/* Left accent color strip */}
                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-2xl ${theme.bg} ${theme.border} border flex items-center justify-center shadow-inner shrink-0`}>
                        {getVoucherIcon(voucher.category)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${theme.bg} ${theme.text} border ${theme.border}`}>
                            {voucher.merchant}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                          {voucher.title}
                        </h3>

                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Lokasi: {voucher.location}</span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-0.5">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>{voucher.validUntil}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Visual Status Indicator: "STATUS: AKTIF (BELUM DIPAKAI)" */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                      STATUS: AKTIF (BELUM DIPAKAI)
                    </span>

                    <span className="text-xs font-black text-emerald-700">
                      Buka & Geser &rarr;
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab: Sudah Dipakai */}
      {activeTab === 'terpakai' && (
        <div className="space-y-3">
          {usedVouchers.length === 0 ? (
            <div className="glass-aero-card rounded-3xl p-8 text-center space-y-2 border border-white">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">
                Belum Ada Riwayat Voucher Digunakan
              </h3>
              <p className="text-xs text-slate-500">
                Voucher yang sudah kamu pakai di kasir akan tersimpan di sini.
              </p>
            </div>
          ) : (
            usedVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="rounded-3xl p-4 bg-slate-100/70 border border-slate-200/80 shadow-sm opacity-80 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {voucher.merchant} · {voucher.location}
                    </span>
                    <h3 className="text-sm font-bold text-slate-700 line-through">
                      {voucher.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Digunakan pada: {voucher.usedAt || '30 Sep 2026, 12:45 WIB'}
                    </span>
                  </div>

                  <span className="text-[10px] font-extrabold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-full border border-slate-300">
                    TELAH TERPAKAI
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Kadaluwarsa */}
      {activeTab === 'kadaluwarsa' && (
        <div className="glass-aero-card rounded-3xl p-8 text-center space-y-2 border border-white">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">
            Tidak Ada Voucher Kadaluwarsa
          </h3>
          <p className="text-xs text-slate-500">
            Semua voucher FEB berlaku hingga 30 Nov 2026.
          </p>
        </div>
      )}

      {/* 3. Detail Layar Voucher & Mekanisme Geser/Swipe Kasir (TANPA QR CODE) */}
      {selectedVoucher && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 select-none"
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          <div 
            className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl relative overflow-hidden border border-white/95"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 250, 0.92) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Top specular reflection */}
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
            />

            {/* Close button */}
            <button
              onClick={() => {
                setSelectedVoucher(null);
                setSliderPosition(0);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center z-20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Instruction banner for cashier (NO QR CODE) */}
            <div className="text-center pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Tunjukkan layar ini kepada kasir kantin/tenant</span>
              </div>
            </div>

            {/* Voucher Hero Card inside Modal */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-inner text-center space-y-2 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center mx-auto shadow-md">
                {getVoucherIcon(selectedVoucher.category)}
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase text-emerald-700 tracking-wider">
                  {selectedVoucher.merchant}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5 leading-snug">
                  {selectedVoucher.title}
                </h3>
                <span className="text-sm font-extrabold text-emerald-600 block mt-1">
                  Nilai: {selectedVoucher.nominalText}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lokasi: {selectedVoucher.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Masa Berlaku: {selectedVoucher.validUntil}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 text-left pt-1 leading-relaxed">
                {selectedVoucher.terms}
              </p>
            </div>

            {/* Frutiger Aero Interactive Slider Button ("👉 Geser di Depan Kasir untuk Menggunakan") */}
            <div className="space-y-2 pt-1 relative z-10">
              <div
                ref={sliderTrackRef}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative h-14 w-full rounded-2xl p-1 bg-gradient-to-r from-slate-200 via-emerald-100 to-teal-100 border border-emerald-300 shadow-inner overflow-hidden select-none cursor-pointer"
              >
                {/* Progress fill track */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl transition-all pointer-events-none"
                  style={{ width: `${sliderPosition}%`, opacity: sliderPosition > 0 ? 1 : 0 }}
                />

                {/* Guide Text in Track */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                  <span className={`text-xs font-black tracking-tight transition-opacity ${
                    sliderPosition > 35 ? 'text-white' : 'text-slate-700'
                  }`}>
                    👉 Geser di Depan Kasir untuk Menggunakan
                  </span>
                </div>

                {/* Draggable Thumb Knob */}
                <div
                  onTouchStart={handleTouchStart}
                  onMouseDown={() => setIsDragging(true)}
                  className="absolute top-1 bottom-1 w-12 rounded-xl flex items-center justify-center text-white cursor-grab active:cursor-grabbing shadow-lg transition-transform active:scale-95"
                  style={{
                    left: `calc(${sliderPosition}% * 0.85 + 4px)`,
                    background: 'linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)',
                    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4), inset 0 1px 1px #ffffff',
                  }}
                >
                  <ChevronRight className="w-6 h-6 stroke-[3]" />
                </div>
              </div>

              {/* Fast Tap alternative for convenience */}
              <button
                onClick={triggerVoucherRedemption}
                className="w-full text-center text-[10px] font-bold text-slate-400 hover:text-emerald-700 underline py-1"
              >
                Atau klik di sini untuk konfirmasi manual kasir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Status Feedback Modal (Centang Hijau Besar & Tanggal/Jam) */}
      {showSuccessModal && usedSuccessDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden border border-white/95"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 250, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Top specular reflection */}
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, transparent 100%)' }}
            />

            {/* Big Green Checkmark */}
            <div className="pt-2">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-100 relative overflow-hidden animate-bounce"
                style={{
                  background: 'linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.5), inset 0 2px 2px #ffffff',
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-full"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
                />
                <Check className="w-10 h-10 text-white stroke-[3.5] drop-shadow-md" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider block">
                Transaksi Sukses
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Voucher Berhasil Digunakan!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Terima kasih telah menukarkan poin sirkular kamu di mitra kampus FEB.
              </p>
            </div>

            {/* Note of Date & Time */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5 text-left">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Voucher:</span>
                <span className="text-slate-900 font-bold">{usedSuccessDetails.title}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Merchant / Stand:</span>
                <span className="text-slate-900 font-bold">{usedSuccessDetails.merchant}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-emerald-200/60 pt-1.5">
                <span className="text-slate-500">Waktu Transaksi:</span>
                <span className="text-emerald-800 font-mono font-black">{usedSuccessDetails.date}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Status Kartu:</span>
                <span className="text-slate-700 font-bold">Berpindah ke Tab [Sudah Dipakai]</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setActiveTab('terpakai');
              }}
              className="w-full py-3.5 rounded-2xl gloss-pill-btn font-black text-xs shadow-md active:scale-95"
            >
              Selesai & Lihat Riwayat Voucher
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
