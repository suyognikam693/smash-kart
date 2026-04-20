import React from 'react';
import Navbar from '../components/Navbar';
import HighlightCard from '../components/HighlightCard';
import { highlights } from '../data/mockData';

export default function Highlights() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-primary pb-8 gap-6">
          <div className="space-y-2">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Video Archive</span>
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-on-surface uppercase">
              COMING SOON !!!
            </h2>
            <p className="text-on-surface-variant font-medium">Relive the greatest moments in Smash Kart history.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-primary text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-md">All Time</button>
            <button className="bg-surface-container-high px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors">Season 4</button>
          </div>
        </div>
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map(hl => (
            <HighlightCard key={hl.id} highlight={hl} />
          ))}
          {/* Add a few more clones for the layout *
          {highlights.map(hl => (
            <HighlightCard key={`${hl.id}-clone`} highlight={hl} />
          ))}
        </div>*/}
      </main>
    </div>
  );
}
