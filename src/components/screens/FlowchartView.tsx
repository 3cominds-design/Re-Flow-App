import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Trash2, 
  MapPin, 
  Scale, 
  Database, 
  Gift, 
  Sprout, 
  FileCheck, 
  Trophy, 
  LayoutDashboard, 
  Recycle, 
  CheckCircle,
  HelpCircle,
  ArrowDown
} from 'lucide-react';

interface FlowchartViewProps {
  onBack: () => void;
  onNavigateScreen: (screenId: string) => void;
}

export const FlowchartView: React.FC<FlowchartViewProps> = ({ onBack, onNavigateScreen }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const steps = [
    {
      id: 'mulai',
      type: 'terminator',
      title: 'Mulai',
      desc: 'Mahasiswa memulai inisiatif pengelolaan sampah di lingkungan kampus.',
      icon: Play,
      color: '#10b981',
    },
    {
      id: 'pilah',
      type: 'process',
      title: 'Pilah Sampah',
      desc: 'Mahasiswa memilah sampah anorganik (plastik, kertas, kardus, logam) yang bersih.',
      icon: Trash2,
      actionScreen: 'setor',
      actionLabel: 'Buka Setor Sampah',
    },
    {
      id: 'droppoint',
      type: 'process',
      title: 'Setor ke RE-FLOW Drop Point',
      desc: 'Sampah diserahkan ke titik penyetoran drop point yang tersedia di fakultas.',
      icon: MapPin,
      actionScreen: 'setor',
      actionLabel: 'Pilih Drop Point',
    },
    {
      id: 'timbang',
      type: 'process',
      title: 'Timbang & Verifikasi',
      desc: 'Sampah ditimbang berdasarkan jenis dan beratnya, lalu diverifikasi oleh operator.',
      icon: Scale,
      actionScreen: 'setor',
      actionLabel: 'Simulasi Timbangan',
    },
    {
      id: 'konversi',
      type: 'process',
      title: 'Pencatatan & Konversi Poin',
      desc: 'Data setoran dicatat otomatis ke sistem dan dikonversi menjadi RE-FLOW Points.',
      icon: Database,
      actionScreen: 'points',
      actionLabel: 'Lihat Saldo Poin',
    },
    {
      id: 'decision',
      type: 'decision',
      title: 'Pilih Penggunaan Poin?',
      desc: 'Mahasiswa bebas memilih apakah ingin menukar reward konsumtif atau mendonasikan poin untuk kelestarian kampus.',
      icon: HelpCircle,
      branches: [
        {
          id: 'redeem',
          title: 'REDEEM: Tukar dengan Reward',
          desc: 'Mahasiswa menukarkan poin dengan voucher makan, kopi, merchandise, dsb.',
          icon: Gift,
          actionScreen: 'redeem',
          actionLabel: 'Katalog Reward',
          color: '#10b981',
        },
        {
          id: 'contribute',
          title: 'CONTRIBUTE: Alokasikan ke Campus Green Fund',
          desc: 'Poin didonasikan untuk program penghijauan dan keberlanjutan kampus.',
          icon: Sprout,
          actionScreen: 'contribute',
          actionLabel: 'Donasi Green Fund',
          color: '#0284c7',
        },
      ],
    },
    {
      id: 'kontribusi',
      type: 'process',
      title: 'Kontribusi Tercatat',
      desc: 'Setoran tercatat sebagai kontribusi mahasiswa dan program studi.',
      icon: FileCheck,
      actionScreen: 'ranking',
      actionLabel: 'Cek Kontribusi',
    },
    {
      id: 'ranking',
      type: 'process',
      title: 'Ranking & FEB Green Challenge',
      desc: 'Kontribusi digunakan untuk melihat peringkat mahasiswa dan 5 program studi di lingkungan FEB.',
      icon: Trophy,
      actionScreen: 'ranking',
      actionLabel: 'Buka Leaderboard FEB',
    },
    {
      id: 'dashboard',
      type: 'process',
      title: 'FEB Green Dashboard',
      desc: 'Data pengelolaan sampah dan partisipasi dapat dipantau oleh pengelola FEB secara transparan.',
      icon: LayoutDashboard,
      actionScreen: 'faculty',
      actionLabel: 'Buka Dashboard FEB',
    },
    {
      id: 'daurulang',
      type: 'process',
      title: 'Pengelolaan Sampah',
      desc: 'Sampah disalurkan kepada mitra pengelola / industri daur ulang (Circular Economy).',
      icon: Recycle,
    },
    {
      id: 'selesai',
      type: 'terminator',
      title: 'Selesai',
      desc: 'Siklus sirkular ekonomi berlanjut untuk menciptakan kampus bebas sampah.',
      icon: CheckCircle,
      color: '#059669',
    },
  ];

  return (
    <div className="space-y-4 pb-20 max-w-xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200/80 active:scale-95"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Alur Diagram Kerja RE-FLOW
          </h1>
          <p className="text-xs text-slate-500">
            Sirkular ekonomi hijau kampus dari pemilahan hingga daur ulang
          </p>
        </div>
      </div>

      {/* Legend Card */}
      <div className="glass-aero-card rounded-2xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-2.5 rounded-full bg-emerald-600 inline-block" />
          <span className="text-slate-600 font-medium">Mulai / Selesai</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3 rounded-md bg-emerald-100 border border-emerald-500 inline-block" />
          <span className="text-slate-600 font-medium">Proses</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rotate-45 bg-purple-100 border border-purple-500 inline-block" />
          <span className="text-slate-600 font-medium">Keputusan</span>
        </div>
      </div>

      {/* Flowchart Vertical Diagram */}
      <div className="space-y-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;

          if (step.type === 'decision') {
            return (
              <div key={step.id} className="space-y-3">
                {/* Decision Diamond Node */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-emerald-400" />
                  <div
                    onClick={() => setSelectedNode(step.id)}
                    className="p-4 rounded-3xl bg-purple-50 border-2 border-purple-400 text-center shadow-md max-w-xs cursor-pointer hover:border-purple-600 transition-all relative"
                  >
                    <span className="text-xs font-extrabold text-purple-900 block">
                      ★ {step.title}
                    </span>
                    <p className="text-[11px] text-purple-700 mt-1">
                      {step.desc}
                    </p>
                  </div>
                  <div className="w-0.5 h-6 bg-emerald-400" />
                </div>

                {/* Two Branch Cards: REDEEM vs CONTRIBUTE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.branches?.map((branch) => {
                    const BIcon = branch.icon;
                    return (
                      <div
                        key={branch.id}
                        className="glass-aero-card rounded-2xl p-3.5 border-2 border-emerald-300 space-y-2 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: branch.color }}
                          >
                            <BIcon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            {branch.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {branch.desc}
                        </p>
                        <button
                          onClick={() => onNavigateScreen(branch.actionScreen)}
                          className="w-full py-1.5 rounded-lg text-xs font-bold text-white shadow-sm"
                          style={{ backgroundColor: branch.color }}
                        >
                          {branch.actionLabel} &gt;
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          if (step.type === 'terminator') {
            return (
              <div key={step.id} className="flex flex-col items-center">
                {idx > 0 && <div className="w-0.5 h-6 bg-emerald-400" />}
                <div
                  className="px-6 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2"
                  style={{ backgroundColor: step.color }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{step.title}</span>
                </div>
                {idx === 0 && <div className="w-0.5 h-6 bg-emerald-400" />}
              </div>
            );
          }

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                onClick={() => setSelectedNode(step.id)}
                className="w-full glass-aero-card rounded-2xl p-3.5 border border-emerald-200 hover:border-emerald-400 cursor-pointer shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {step.actionScreen && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateScreen(step.actionScreen!);
                      }}
                      className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 hover:bg-emerald-200 px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap ml-2"
                    >
                      Buka
                    </button>
                  )}
                </div>
              </div>

              {idx < steps.length - 1 && <div className="w-0.5 h-6 bg-emerald-400" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
