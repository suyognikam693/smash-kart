import React from 'react';
import Button from './Button';

export default function HighlightCard({ highlight }) {
  return (
    <div className="group relative bg-surface-container-lowest rounded-lg overflow-hidden shadow-lg border border-outline-variant/10 hover:shadow-2xl transition-all duration-300">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={highlight.image} 
          alt="Highlights" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-white text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_circle
          </span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{highlight.date}</div>
        <h5 className="text-lg font-extrabold text-on-background leading-tight">{highlight.title}</h5>
        <Button variant="outline" fullWidth className="py-3 text-[10px]" onClick={() => alert('Watch highlight')}>
          Watch Highlights
        </Button>
      </div>
    </div>
  );
}
