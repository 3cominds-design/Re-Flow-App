import React from 'react';
import { Bell } from 'lucide-react';
import { AeroLogo } from './AeroLogo';

interface HeaderNavbarProps {
  user: {
    name: string;
    facultyShort: string;
    avatarUrl: string;
    points: number;
  };
  unreadNotificationsCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  user,
  unreadNotificationsCount = 2,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-30 px-4 py-3 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_20px_-4px_rgba(6,182,212,0.08)]">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <AeroLogo size="md" showTagline={true} />

        {/* Right actions: Notifications & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifikasi"
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 hover:text-emerald-700 transition-all border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] active:scale-95"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-50/80 to-cyan-50/80 hover:from-emerald-100 hover:to-cyan-100 border border-emerald-200/60 shadow-sm transition-all active:scale-95 group text-left"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-emerald-400/80 shadow-sm">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Gloss shine over avatar */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 60%)'
                }}
              />
            </div>
            <div className="hidden xs:flex flex-col">
              <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 leading-none">
                {user.facultyShort}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
