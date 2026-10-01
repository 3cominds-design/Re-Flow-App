import React from 'react';
import { X, Bell, CheckCircle, Gift, Heart, Trophy } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Setoran Plastik Terverifikasi! (+25 pt)',
      time: 'Hari ini, 10:24 WIB',
      desc: 'Setoran 2.5 kg botol plastik di Drop Point 1: Pelataran Gedung SFD FEB telah diverifikasi oleh Operator Rian.',
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      id: '2',
      title: 'Prodi PAP Naik ke Posisi #3 FEB!',
      time: 'Kemarin, 14:10 WIB',
      desc: 'S1 Pendidikan Administrasi Perkantoran naik 1 peringkat dalam kompetisi antar-prodi FEB minggu ini.',
      icon: Trophy,
      color: 'text-amber-600 bg-amber-100',
    },
    {
      id: '3',
      title: 'Donasi Green Fund FEB Disalurkan',
      time: '3 hari lalu',
      desc: 'Poin kontribusimu telah dialokasikan untuk penanaman pohon peneduh & fasilitas smart bin di lingkungan FEB.',
      icon: Heart,
      color: 'text-cyan-600 bg-cyan-100',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Notifikasi RE-FLOW
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                  <span className="text-[10px] text-slate-400 block">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
