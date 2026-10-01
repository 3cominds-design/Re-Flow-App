import React from 'react';
import { X, Award, Shield, Recycle, Leaf, School } from 'lucide-react';
import { initialUser } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: typeof initialUser;
  onOpenFacultyDashboard: () => void;
  onOpenFlowchart: () => void;
  onOpenMyVouchers?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenFacultyDashboard,
  onOpenFlowchart,
  onOpenMyVouchers,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            Profil Mahasiswa Eco-Leader
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Digital Student Eco Card (Frutiger Aero ID) */}
        <div 
          className="rounded-3xl p-4 text-white relative overflow-hidden shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%)'
          }}
        >
          {/* Top gloss specular shine */}
          <div 
            className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)'
            }}
          />

          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="font-extrabold text-base leading-tight text-white drop-shadow-sm">
                {user.fullName}
              </h4>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                NIM: {user.nim}
              </p>
              <div className="text-[10px] text-emerald-200 font-semibold flex items-center gap-1 mt-0.5">
                <School className="w-3 h-3" />
                <span>{user.faculty}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-sm">
              <span className="text-[10px] text-emerald-100 uppercase font-semibold block">Total Sampah</span>
              <span className="text-sm font-bold text-white">{user.totalWasteKg} kg</span>
            </div>
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-sm">
              <span className="text-[10px] text-emerald-100 uppercase font-semibold block">CO2 Dicegah</span>
              <span className="text-sm font-bold text-white">{user.co2SavedKg} kg CO₂</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2 pt-1">
          {onOpenMyVouchers && (
            <button
              onClick={() => {
                onClose();
                onOpenMyVouchers();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 flex items-center justify-between transition-all"
            >
              <span>🎟️ Buka Voucher Saya (FEB)</span>
              <span>&rarr;</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onOpenFacultyDashboard();
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-900 bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-between"
          >
            <span>💻 Buka Faculty Green Dashboard</span>
            <span>&rarr;</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenFlowchart();
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-cyan-900 bg-cyan-100/80 hover:bg-cyan-200 border border-cyan-300 flex items-center justify-between"
          >
            <span>🔄 Buka Diagram Alur Kerja (Flowchart)</span>
            <span>&rarr;</span>
          </button>
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
