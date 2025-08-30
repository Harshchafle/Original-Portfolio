import React from 'react';

const GlassCard = React.memo(function GlassCard({ children, className = "", hover = true, onClick }) {
  return (
    <div 
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/20 hover:-translate-y-2' : ''}
        transition-all duration-500 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

export default GlassCard;
