import React from 'react';

export const AeroBackgroundBubbles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft gradient light orbs */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(52, 211, 153, 0.25) 50%, transparent 70%)'
        }}
      />
      <div 
        className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-3xl opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(14, 165, 233, 0.2) 60%, transparent 70%)'
        }}
      />
      <div 
        className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(110, 231, 183, 0.2) 60%, transparent 70%)'
        }}
      />

      {/* Floating Frutiger Aero Water Bubbles */}
      <div 
        className="absolute top-20 right-12 w-12 h-12 rounded-full bubble-gloss opacity-60 animate-bounce"
        style={{ animationDuration: '6s' }}
      />
      <div 
        className="absolute top-1/2 left-6 w-8 h-8 rounded-full bubble-gloss opacity-50 animate-bounce"
        style={{ animationDuration: '8s', animationDelay: '1s' }}
      />
      <div 
        className="absolute bottom-40 right-8 w-14 h-14 rounded-full bubble-gloss opacity-45 animate-bounce"
        style={{ animationDuration: '7s', animationDelay: '2s' }}
      />
      <div 
        className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bubble-gloss opacity-40 animate-bounce"
        style={{ animationDuration: '9s', animationDelay: '3s' }}
      />
    </div>
  );
};
