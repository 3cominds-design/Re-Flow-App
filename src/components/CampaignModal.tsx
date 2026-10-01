import React from 'react';
import { X, Globe2, Sparkles, CheckCircle2, MapPin, Recycle } from 'lucide-react';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSetor: () => void;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  onStartSetor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Kampanye FEB Hijau
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white space-y-1">
          <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">
            Gerakan Bersama Mahasiswa FEB
          </span>
          <h4 className="text-sm font-extrabold">
            Bersama kita wujudkan FEB yang lebih hijau dan bersih!
          </h4>
          <p className="text-xs text-emerald-50 mt-1 leading-relaxed">
            RE-FLOW mengubah setiap gram sampah anorganik yang kamu kumpulkan di lingkungan FEB menjadi poin reward atau donasi fasilitas kampus FEB.
          </p>
        </div>

        {/* 3 Steps to Participate */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-800 uppercase text-[11px] block">
            Cara Ikutan Mudah:
          </span>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              1
            </div>
            <div>
              <span className="font-bold text-slate-800">Pilah Sampahmu</span>
              <p className="text-[11px] text-slate-500">Kumpulkan botol plastik, kertas tugas bekas, kardus, atau kaleng minuman.</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              2
            </div>
            <div>
              <span className="font-bold text-slate-800">Bawa ke Drop Point FEB</span>
              <p className="text-[11px] text-slate-500">Tersedia di Pelataran Gedung SFD FEB dan Area Kantin Blok M FEB.</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              3
            </div>
            <div>
              <span className="font-bold text-slate-800">Dapatkan Poin & Naikkan Ranking FEB</span>
              <p className="text-[11px] text-slate-500">Tukar voucher kantin Blok M, kopi Edura, FEB Mart, atau dukung prodimu di klasemen FEB!</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            onStartSetor();
          }}
          className="w-full py-3 rounded-2xl gloss-pill-btn font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
        >
          <Recycle className="w-4 h-4" />
          <span>Mulai Setor Sampah Sekarang</span>
        </button>
      </div>
    </div>
  );
};
