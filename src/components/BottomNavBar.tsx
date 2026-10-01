import React from 'react';
import { Home, Trash2, Coins, Trophy, User } from 'lucide-react';

export type NavTab = 'beranda' | 'setor' | 'points' | 'ranking' | 'profil';

interface BottomNavBarProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'beranda' as NavTab, label: 'Beranda', icon: Home },
    { id: 'setor' as NavTab, label: 'Setor', icon: Trash2 },
    { id: 'points' as NavTab, label: 'Points', icon: Coins },
    { id: 'ranking' as NavTab, label: 'Ranking', icon: Trophy },
    { id: 'profil' as NavTab, label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-xl border-t border-white/80 shadow-[0_-4px_24px_rgba(6,182,212,0.12)]">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-all relative group select-none ${
                isActive ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* If active / opened: Elevated 3D Glossy Pop-Up Button (like initial Setor button) */}
              {/* If not active: Standard clean flat icon like initial Beranda button */}
              {isActive ? (
                <div
                  className="w-12 h-12 -mt-5 rounded-full flex items-center justify-center text-white shadow-xl ring-4 ring-emerald-100/90 transition-all duration-300 scale-105 relative overflow-hidden active:scale-95"
                  style={{
                    background: 'linear-gradient(180deg, #34d399 0%, #10b981 40%, #059669 85%, #047857 100%)',
                    boxShadow: '0 8px 20px -2px rgba(16, 185, 129, 0.55), inset 0 1.5px 2px rgba(255, 255, 255, 0.9), inset 0 -2px 3px rgba(4, 120, 87, 0.6)'
                  }}
                >
                  {/* Specular gloss top reflection */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-full"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
                  />

                  <Icon className="w-5 h-5 text-white drop-shadow-sm relative z-10 stroke-[2.2]" />
                </div>
              ) : (
                <div className="flex items-center justify-center h-7 transition-all duration-200">
                  <Icon className="w-5 h-5 text-slate-500 group-hover:text-slate-800 stroke-[1.8] group-hover:scale-110 transition-transform" />
                </div>
              )}

              {/* Label */}
              <span
                className={`text-[11px] tracking-tight transition-all duration-200 ${
                  isActive 
                    ? 'font-black text-emerald-800 -translate-y-0.5' 
                    : 'font-medium text-slate-500 group-hover:text-slate-800 mt-1'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
