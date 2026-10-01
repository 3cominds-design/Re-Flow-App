import React, { useState } from 'react';
import { ArrowLeft, Sprout, Trash, BookOpen, CheckCircle, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContributeScreenProps {
  userPoints: number;
  userName: string;
  userFaculty: string;
  onBack: () => void;
  onConfirmContribution: (points: number, rupiah: number) => void;
}

export const ContributeScreen: React.FC<ContributeScreenProps> = ({
  userPoints,
  userName,
  userFaculty,
  onBack,
  onConfirmContribution,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const donationTiers = [
    { points: 50, rupiah: 5000 },
    { points: 100, rupiah: 10000 },
    { points: 200, rupiah: 20000 },
    { points: 500, rupiah: 50000 },
  ];

  const currentTier = donationTiers.find((t) => t.points === selectedAmount) || donationTiers[1];
  const canAfford = userPoints >= selectedAmount;

  const handleDonate = () => {
    if (!canAfford) return;
    onConfirmContribution(currentTier.points, currentTier.rupiah);
    setShowSuccessModal(true);

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
            CONTRIBUTE
          </h1>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-xs font-bold text-emerald-900">
          <span>{userPoints} pt</span>
        </div>
      </div>

      {/* Campus Green Fund Banner */}
      <div 
        className="relative rounded-3xl p-5 text-white shadow-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)'
        }}
      >
        {/* Specular gloss top reflection */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-[210px]">
            <h2 className="text-xl font-extrabold tracking-tight drop-shadow-sm">
              Campus Green Fund
            </h2>
            <p className="text-xs text-emerald-100 mt-1 font-medium leading-relaxed">
              Kontribusi poinmu untuk keberlanjutan lingkungan kampus!
            </p>
          </div>

          {/* Sprouting Plant Visual */}
          <div className="w-16 h-16 rounded-full bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/40 flex items-center justify-center shadow-inner">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center shadow-lg">
              <Sprout className="w-7 h-7 text-white drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Pilih Jumlah Poin Radio Options */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block px-1">
          Pilih Jumlah Poin
        </label>

        <div className="space-y-2.5">
          {donationTiers.map((tier) => {
            const isSelected = selectedAmount === tier.points;
            const affordable = userPoints >= tier.points;

            return (
              <div
                key={tier.points}
                onClick={() => setSelectedAmount(tier.points)}
                className={`glass-aero-card rounded-2xl p-3.5 cursor-pointer transition-all flex items-center justify-between border-2 ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/50'
                    : 'border-transparent hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <span className="font-bold text-sm text-slate-800">
                    {tier.points} poin
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500">
                    (Rp {tier.rupiah.toLocaleString('id-ID')})
                  </span>
                  {!affordable && (
                    <span className="block text-[10px] text-rose-500 font-bold">
                      Poin belum cukup
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button "Konfirmasi Kontribusi" */}
      <div className="pt-1">
        <button
          onClick={handleDonate}
          disabled={!canAfford}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
            canAfford
              ? 'gloss-pill-btn'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
          }`}
        >
          <Heart className="w-5 h-5 fill-current" />
          <span>Konfirmasi Kontribusi</span>
        </button>
      </div>

      {/* "Bagaimana Kontribusimu Digunakan?" Section */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider px-1">
          Bagaimana Kontribusimu Digunakan?
        </h3>

        <div className="space-y-2">
          {/* 1. Penghijauan kampus */}
          <div className="glass-aero-card rounded-2xl p-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">
                Penghijauan kampus
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Penyediaan bibit pohon peneduh, tanaman hias, dan vertical garden di lingkungan Fakultas Ekonomi dan Bisnis (FEB).
              </p>
            </div>
          </div>

          {/* 2. Fasilitas pemilahan sampah */}
          <div className="glass-aero-card rounded-2xl p-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5">
              <Trash className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">
                Fasilitas pemilahan sampah
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pengadaan smart bin daur ulang terpilah dan timbangan digital di Drop Point 1 (SFD) & Drop Point 2 (Kantin Blok M FEB).
              </p>
            </div>
          </div>

          {/* 3. Program lingkungan & edukasi */}
          <div className="glass-aero-card rounded-2xl p-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">
                Program lingkungan & edukasi
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Workshop circular economy, kompetisi FEB Green Challenge antar-prodi, dan pelatihan eco-enzyme mahasiswa FEB.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Appreciation Certificate Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-emerald-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner ring-8 ring-emerald-50">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                Campus Green Fund Certificate
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Terima Kasih, {userName}!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Donasi sebesar <span className="font-bold text-emerald-700">{currentTier.points} poin (Rp {currentTier.rupiah.toLocaleString('id-ID')})</span> telah berhasil dialokasikan atas nama <span className="font-semibold text-slate-800">{userFaculty}</span>.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-medium">
              🌱 Kontribusimu membantu penanaman bibit pohon peneduh di lingkungan FEB!
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                onBack();
              }}
              className="w-full py-3 rounded-2xl gloss-pill-btn font-bold text-sm shadow-md"
            >
              Kembali ke Points
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
