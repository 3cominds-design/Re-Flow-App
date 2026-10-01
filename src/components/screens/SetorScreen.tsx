import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Scale, 
  QrCode, 
  MapPin, 
  Sparkles, 
  Check, 
  Recycle,
  Wine,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { wasteCategories, dropPoints } from '../../data/mockData';
import { WasteCategory, DepositHistory } from '../../types/reflow';

interface SetorScreenProps {
  onBack: () => void;
  onAddDeposit: (deposit: DepositHistory) => void;
  depositHistory: DepositHistory[];
  onNavigatePoints: () => void;
}

export const SetorScreen: React.FC<SetorScreenProps> = ({
  onBack,
  onAddDeposit,
  depositHistory,
  onNavigatePoints,
}) => {
  // Form State
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory>('Plastik');
  const [weightKg, setWeightKg] = useState<number>(2.0);
  const [selectedDropPointId, setSelectedDropPointId] = useState<string>(dropPoints[0].id);

  // Verification & Feedback Modal State
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [depositSuccessResult, setDepositSuccessResult] = useState<{
    points: number;
    weight: number;
    category: string;
    location: string;
  } | null>(null);

  const selectedWasteInfo = wasteCategories.find((w) => w.id === selectedCategory) || wasteCategories[0];
  const calculatedPoints = Math.round(weightKg * selectedWasteInfo.pointsPerKg);
  const selectedDropPoint = dropPoints.find((dp) => dp.id === selectedDropPointId) || dropPoints[0];

  // Quick weight presets
  const weightPresets = [0.5, 1.0, 2.0, 5.0, 10.0];

  const handleOpenVerification = () => {
    setShowVerificationModal(true);
  };

  const handleConfirmVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const newDeposit: DepositHistory = {
        id: `dep-${Date.now()}`,
        type: selectedCategory,
        weightKg: Number(weightKg.toFixed(1)),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        pointsEarned: calculatedPoints,
        location: selectedDropPoint.name.split('(')[0].trim(),
        verifiedBy: `Operator ${selectedDropPoint.operatorName}`,
      };
      
      onAddDeposit(newDeposit);
      setDepositSuccessResult({
        points: calculatedPoints,
        weight: Number(weightKg.toFixed(1)),
        category: selectedCategory,
        location: selectedDropPoint.name.split('(')[0].trim(),
      });

      try {
        confetti({
          particleCount: 65,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#34d399', '#38bdf8', '#fbbf24'],
        });
      } catch (e) {
        console.error(e);
      }
    }, 1200);
  };

  const handleCloseSuccess = () => {
    setDepositSuccessResult(null);
    setShowVerificationModal(false);
  };

  // Frutiger Aero Glossy Category Icons
  const renderGlossyIcon = (id: WasteCategory) => {
    switch (id) {
      case 'Plastik':
        return (
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md overflow-hidden bg-gradient-to-tr from-cyan-600 via-cyan-500 to-sky-400">
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
            />
            <svg className="w-6 h-6 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="7" y="2" width="10" height="4" rx="1" />
              <path d="M6 6H18V18C18 20.2 16.2 22 14 22H10C7.8 22 6 20.2 6 18V6Z" />
              <path d="M10 11H14" />
            </svg>
          </div>
        );
      case 'Kertas/Kardus':
        return (
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md overflow-hidden bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400">
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
            />
            <svg className="w-6 h-6 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
              <path d="M14 2V8H20" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </div>
        );
      case 'Logam':
        return (
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md overflow-hidden bg-gradient-to-tr from-purple-600 via-indigo-500 to-indigo-400">
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
            />
            <svg className="w-6 h-6 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="7" ry="3" />
              <path d="M5 5V19C5 20.7 8.1 22 12 22C15.9 22 19 20.7 19 19V5" />
            </svg>
          </div>
        );
      case 'Botol Kaca':
        return (
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md overflow-hidden bg-gradient-to-tr from-sky-600 via-blue-500 to-cyan-400">
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
            />
            <Wine className="w-6 h-6 drop-shadow-sm" />
          </div>
        );
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Setor Sampah
          </h1>
        </div>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2.5 py-1 rounded-full">
          Kampus Hijau FEB
        </span>
      </div>

      {/* 1. Form / Pilihan Jenis Sampah Anorganik */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            1. Pilih Jenis Sampah Anorganik
          </label>
          <span className="text-[11px] text-slate-500">Pilah bersih & kering</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {wasteCategories.map((item) => {
            const isSelected = selectedCategory === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                className={`glass-aero-card rounded-2xl p-3.5 cursor-pointer transition-all relative border-2 ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/50 shadow-md scale-[1.01]'
                    : 'border-white/80 hover:border-emerald-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  {renderGlossyIcon(item.id)}

                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full tabular-nums">
                    +{item.pointsPerKg} pt/kg
                  </span>
                </div>

                <div className="mt-2.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {item.subtext}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Input Estimasi Berat (kg) & Lokasi Drop Point */}
      <div className="glass-aero-card rounded-3xl p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              2. Estimasi Berat Sampah
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="50"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                className="w-20 py-1 px-2 rounded-xl bg-white border border-slate-300 text-center font-extrabold text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
              <span className="font-bold text-slate-700 text-sm">kg</span>
            </div>
          </div>

          {/* Quick Preset Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {weightPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setWeightKg(preset)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  weightKg === preset
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {preset} kg
              </button>
            ))}
          </div>
        </div>

        {/* Drop Point Selector */}
        <div>
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            Titik Lokasi Drop Point FEB
          </label>
          <select
            value={selectedDropPointId}
            onChange={(e) => setSelectedDropPointId(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          >
            {dropPoints.map((dp) => (
              <option key={dp.id} value={dp.id}>
                {dp.name} ({dp.openHours})
              </option>
            ))}
          </select>
        </div>

        {/* Live Points Conversion Card (Frutiger Aero Green Gloss) */}
        <div className="rounded-2xl p-3.5 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-transparent border border-emerald-300/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-600 block">
              Estimasi Poin Diperoleh
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-extrabold text-emerald-700 tabular-nums">
                +{calculatedPoints}
              </span>
              <span className="text-xs font-bold text-emerald-600">RE-FLOW Points</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-medium block">
              Dampak Emisi
            </span>
            <span className="text-xs font-bold text-cyan-800 bg-cyan-100/90 px-2 py-0.5 rounded-md inline-block mt-0.5">
              {(weightKg * selectedWasteInfo.co2PerKg).toFixed(1)} kg CO₂e dicegah
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tombol Utama "Lanjutkan Ke Drop Point / Verifikasi Operator" */}
      <div className="pt-1">
        <button
          onClick={handleOpenVerification}
          className="w-full py-3.5 px-6 rounded-2xl gloss-pill-btn font-extrabold text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] group"
        >
          <Recycle className="w-5 h-5 text-white" />
          <span>Lanjutkan Ke Drop Point / Verifikasi Operator</span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 4. Section Riwayat Setoran Terakhir */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-800">
            Riwayat Setoran Terakhir
          </h2>
          <span className="text-xs text-slate-500">
            {depositHistory.length} setoran tercatat
          </span>
        </div>

        <div className="space-y-2">
          {depositHistory.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="glass-aero-card rounded-2xl p-3 flex items-center justify-between hover:border-emerald-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Recycle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    {item.type}
                  </h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">{item.weightKg} kg</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full tabular-nums">
                  +{item.pointsEarned} pt
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate max-w-[120px]">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Verifikasi Operator Drop Point */}
      {showVerificationModal && !depositSuccessResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm glass-aero rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl border border-white">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Verifikasi di Drop Point
                </h3>
              </div>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-xs text-slate-600">
                Tunjukkan QR token ini kepada operator di <span className="font-bold text-emerald-800">{selectedDropPoint.name.split('(')[0]}</span> untuk menimbang sampah.
              </p>

              {/* QR Graphic with gloss */}
              <div className="w-44 h-44 mx-auto p-3 bg-white rounded-2xl border-2 border-emerald-300 shadow-md flex flex-col items-center justify-center relative">
                <div 
                  className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none rounded-t-xl"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, transparent 100%)' }}
                />
                <QrCode className="w-32 h-32 text-slate-800" />
                <span className="text-[10px] font-mono font-bold text-slate-500 mt-1">
                  SETOR-{selectedCategory.slice(0, 3).toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-around">
              <div>
                <span className="text-slate-400 block text-[10px]">Kategori</span>
                <span className="font-bold text-slate-800">{selectedCategory}</span>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px]">Berat</span>
                <span className="font-bold text-slate-800">{weightKg} kg</span>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px]">Poin</span>
                <span className="font-extrabold text-emerald-600">+{calculatedPoints} pt</span>
              </div>
            </div>

            <button
              onClick={handleConfirmVerification}
              disabled={isVerifying}
              className="w-full py-3.5 rounded-2xl gloss-pill-btn font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Operator Sedang Menimbang...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulasi Verifikasi Operator Berhasil</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* FEEDBACK STATE: Glassmorphism Transparent Pop-up Sukses Setor Sampah */}
      {depositSuccessResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden border border-white/80"
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

            {/* Glowing Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg ring-8 ring-emerald-50">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-widest block">
                Setoran Berhasil Diverifikasi!
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 tabular-nums">
                +{depositSuccessResult.points} pt
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto leading-relaxed">
                Setoran <span className="font-bold text-slate-900">{depositSuccessResult.weight} kg {depositSuccessResult.category}</span> di {depositSuccessResult.location} telah tercatat dalam kontribusi Fakultas Ekonomi dan Bisnis (FEB).
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900 font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Poin langsung dapat ditukar reward atau didonasikan!</span>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  handleCloseSuccess();
                  onNavigatePoints();
                }}
                className="w-full py-3 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Buka RE-FLOW Points (Redeem / Donasi)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleCloseSuccess}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
