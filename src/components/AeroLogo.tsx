import React from 'react';

interface AeroLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const AeroLogo: React.FC<AeroLogoProps> = ({ size = 'md', showTagline = true }) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Glossy Leaf + Water Drop Icon */}
      <div 
        className={`relative flex items-center justify-center rounded-2xl overflow-hidden ${
          isSmall ? 'w-8 h-8' : isLarge ? 'w-12 h-12' : 'w-10 h-10'
        }`}
        style={{
          background: 'linear-gradient(135deg, #34d399 0%, #10b981 40%, #059669 80%, #047857 100%)',
          boxShadow: '0 6px 16px -2px rgba(16, 185, 129, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(4, 120, 87, 0.5)'
        }}
      >
        {/* Specular curved reflection highlight */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.15) 70%, rgba(255, 255, 255, 0) 100%)'
          }}
        />

        {/* Leaf & Aqua Droplet SVG */}
        <svg 
          className={`${isSmall ? 'w-5 h-5' : isLarge ? 'w-7 h-7' : 'w-6 h-6'} text-white relative z-10 drop-shadow-sm`} 
          viewBox="0 0 24 24" 
          fill="none"
        >
          {/* Natural leaf path */}
          <path 
            d="M12 3C7 3 3 8 3 13C3 18 7 21 12 21C14.5 21 16.8 20 18.4 18.4C20 16.8 21 14.5 21 12C21 7 17 3 12 3Z" 
            fill="currentColor"
            fillOpacity="0.85"
          />
          <path 
            d="M5 19C10 16 14 12 19 5" 
            stroke="#bbf7d0" 
            strokeWidth="1.75" 
            strokeLinecap="round"
          />
          {/* Aqua Drop on leaf */}
          <ellipse 
            cx="14" 
            cy="12" 
            rx="3.5" 
            ry="4.5" 
            transform="rotate(25 14 12)" 
            fill="#38bdf8" 
            fillOpacity="0.9"
          />
          <ellipse 
            cx="13.2" 
            cy="10.8" 
            rx="1.2" 
            ry="1.8" 
            transform="rotate(25 13.2 10.8)" 
            fill="white" 
            fillOpacity="0.8"
          />
        </svg>

        {/* Aqua glow halo */}
        <div 
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full blur-[4px] pointer-events-none"
          style={{ background: 'rgba(56, 189, 248, 0.5)' }}
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span 
            className={`font-extrabold tracking-tight ${
              isSmall ? 'text-lg' : isLarge ? 'text-2xl' : 'text-xl'
            }`}
            style={{
              background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0284c7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
            }}
          >
            RE-FLOW
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
        </div>
        {showTagline && (
          <span className="text-[10px] font-semibold text-emerald-700/80 tracking-wide uppercase">
            Small Actions, Big Impact
          </span>
        )}
      </div>
    </div>
  );
};
