import React, { useRef, useState } from 'react';
import '../App.css';
import { TLXFactor } from './NASATLX';

interface TLXSliderProps {
  label: string;
  value: number | null;
  factor:  TLXFactor | undefined;
  modifiable : boolean;
  onChange: (newValue: number) => void;
}

const NUM_TICKS = 20;

export const TLXSlider: React.FC<TLXSliderProps> = ({ label, value, factor, modifiable, onChange }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);


   const getRelativePosition = (clientX: number): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(x / rect.width, 1));
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if(!modifiable) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = getRelativePosition(clientX);
    setDragPosition(pos);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if(!modifiable) return;
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = getRelativePosition(clientX);
    setDragPosition(pos);
  };

  const handleEnd = () => {
    if(!modifiable) return;
    if (dragPosition !== null) {
      const raw = dragPosition * NUM_TICKS;
      const snapped = Math.max(0, Math.min(NUM_TICKS, raw));
      onChange(snapped);
      setDragPosition(null);
      setSelected(Math.round(snapped));
    }
    setIsDragging(false);
  }; 

  const dashLeft =
    dragPosition !== null
      ? dragPosition * 100
      : value !== null
      ? ((value) / NUM_TICKS) * 100
      : null; 


  return (
    <div className="nasa-slider-container">
                  <div className="slider-bar"
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                  >
                    <div className="slider-track" />
                    <div className="slider-ticks" ref={trackRef}>
                      {Array.from({ length: NUM_TICKS}, (_, i) => (
                        <div key={i} className="tick-container">
                          <div
                            className={`tick ${i} ${i === Math.floor(NUM_TICKS / 2) ? 'tick-middle' : ''}`}
                          />
                          {
                            i===NUM_TICKS -1 &&
                            <div
                            className={`tick ${i+1} tick-end`}
                          />
                          }
                        </div>
                      ))}
                      
                    </div>

                    {dashLeft !== null && (
                      <div
                        className="red-dash"
                        style={{ left: `calc(${dashLeft}%)` }}
                      />
                    )}
                    <div className="label-ends">
                      <span className="label-left">{factor && factor.lower}</span>
                      <span className="label-right">{factor && factor.upper}</span>
                    </div>
                  </div>

                   {/*  <p className="selected-label">
                      {selected !== null ? `Selected: ${selected}` : 'Tap or drag to select'}
                    </p> */}
                </div>
  );
};
