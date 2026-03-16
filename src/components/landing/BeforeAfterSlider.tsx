import { useState, useRef } from 'react';
import heroBefore from '@/assets/hero-before.jpg';
import heroAfter from '@/assets/hero-after.png';

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-xl overflow-hidden cursor-col-resize hero-glow select-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After (background removed - checkered) */}
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-conic-gradient(#e2e8f0 0% 25%, #ffffff 0% 50%)', backgroundSize: '20px 20px' }}>
        <img src={heroAfter} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <img src={heroBefore} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Slider line */}
      <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
        <div className="w-0.5 h-full bg-primary-foreground/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full gradient-primary border-2 border-primary-foreground/80 flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8H12M4 8L6 6M4 8L6 10M12 8L10 6M12 8L10 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded bg-foreground/70 text-primary-foreground">Before</span>
      <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded bg-primary/90 text-primary-foreground">After</span>
    </div>
  );
};

export default BeforeAfterSlider;
