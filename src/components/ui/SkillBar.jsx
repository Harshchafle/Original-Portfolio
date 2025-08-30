import React, { useState, useEffect, useRef } from 'react';

const SkillBar = React.memo(function SkillBar({ skill, delay = 0 }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setTimeout(() => {
            setProgress(skill.level);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold: 0.5, rootMargin: '20px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [skill.level, delay, hasAnimated]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-white font-semibold text-lg">{skill.name}</span>
        </div>
        <span className="text-blue-300 font-mono text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
        <div
          className={`${skill.color} h-3 rounded-full transition-all duration-2000 ease-out shadow-lg relative`}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
});

export default SkillBar;
