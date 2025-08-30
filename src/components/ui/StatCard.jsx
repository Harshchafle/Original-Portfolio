import React from 'react';
import AnimatedCounter from '../common/AnimatedCounter';
import GlassCard from '../common/GlassCard';

const StatCard = React.memo(function StatCard({ 
  title, 
  value, 
  suffix = '', 
  icon, 
  color, 
  loading = false 
}) {
  return (
    <GlassCard className="p-6 text-center group">
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-3xl font-black mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
        {loading ? '...' : <AnimatedCounter end={value} suffix={suffix} />}
      </div>
      <div className="text-sm text-gray-400 group-hover:text-white transition-colors">
        {title}
      </div>
    </GlassCard>
  );
});

export default StatCard;
