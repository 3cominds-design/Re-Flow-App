import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Recycle, X, ArrowRight } from 'lucide-react';

interface TriggerFloatingToastProps {
  onQuickAction: () => void;
}

export const TriggerFloatingToast: React.FC<TriggerFloatingToastProps> = ({ onQuickAction }) => {
  const [currentTriggerIndex, setCurrentTriggerIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const triggers = [
    {
      id: 'trigger-1',
      title: 'Aksi Hijau FEB Terkini',
      message: 'Mahasiswa S1 Akuntansi baru saja menyetor 12 kg kertas di Drop Point Gedung SFD FEB! 🌿',
      icon: Recycle,
      iconColor: 'bg-cyan-100 text-cyan-700',
      actionText: 'Setor Sampah',
    },
    {
      id: 'trigger-2',
      title: 'Pengingat Streak Eco-Hero 🔥',
      message: 'Jangan lupa setor sampahmu minggu ini untuk menjaga Streak Eco-Hero kamu di FEB!',
      icon: Flame,
      iconColor: 'bg-amber-100 text-amber-600',
      actionText: 'Jaga Streak',
    },
    {
      id: 'trigger-3',
      title: 'Peluang Peringkat FEB 🏆',
      message: 'S1 Administrasi Perkantoran butuh 8 kg lagi untuk naik ke posisi #2 FEB Green Challenge!',
      icon: Sparkles,
      iconColor: 'bg-emerald-100 text-emerald-700',
      actionText: 'Dukung Prodi',
    },
  ];

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTriggerIndex((prev) => (prev + 1) % triggers.length);
        setIsVisible(true);
      }, 500);
    }, 9000);

    return () => clearInterval(interval);
  }, [isDismissed, triggers.length]);

  if (isDismissed) return null;

  const currentTrigger = triggers[currentTriggerIndex];
  const Icon = currentTrigger.icon;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 max-w-[340px] sm:max-w-sm transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      }`}
    >
      <div 
        className="rounded-3xl p-3.5 glass-aero-card border border-white/95 shadow-[0_15px_35px_-5px_rgba(6,182,212,0.25)] relative overflow-hidden backdrop-blur-2xl"
      >
        {/* Specular gloss top reflection */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, transparent 100%)' }}
        />

        <div className="relative z-10 flex items-start gap-3">
          {/* Glossy Icon */}
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${currentTrigger.iconColor}`}>
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                {currentTrigger.title}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <p className="text-xs text-slate-700 font-semibold leading-snug mt-0.5">
              {currentTrigger.message}
            </p>

            <button
              onClick={() => {
                onQuickAction();
              }}
              className="mt-2 text-[11px] font-extrabold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 group"
            >
              <span>{currentTrigger.actionText}</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Tutup notifikasi"
            className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center shrink-0 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
