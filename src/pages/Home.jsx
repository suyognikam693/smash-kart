import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import HighlightCard from '../components/HighlightCard';
import { highlights } from '../data/mockData';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if(data.success) setEvents(data.events);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
        <HeroSection />
        
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-outline-variant/30 pb-4">
            <h2 className="text-3xl font-black tracking-tight uppercase italic text-primary">Upcoming Events</h2>
            <button className="text-primary font-bold text-sm uppercase tracking-widest hover:underline">View All &gt;</button>
          </div>
          
          {loading ? (
            <div className="text-center py-12 font-bold animate-pulse text-outline-variant">Loading Arena Data...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((evt) => (
                <EventCard key={evt.id} event={{ ...evt, featured: evt.fee > 20 }} />
              ))}
              {events.length === 0 && <p className="text-center py-8 col-span-full">No upcoming events.</p>}
              
              <div className="bg-surface-container-lowest border border-dashed border-outline-variant/40 rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center opacity-60">
                <span className="material-symbols-outlined text-4xl mb-2 text-outline">calendar_month</span>
                <p className="font-bold text-outline-variant tracking-widest uppercase text-sm">Coming Soon</p>
              </div>
              <div className="bg-surface-container-lowest border border-dashed border-outline-variant/40 rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center opacity-60 hidden md:flex">
                <span className="material-symbols-outlined text-4xl mb-2 text-outline">calendar_month</span>
                <p className="font-bold text-outline-variant tracking-widest uppercase text-sm">Coming Soon</p>
              </div>
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-outline-variant/30 pb-4 mt-8">
            <h2 className="text-3xl font-black tracking-tight uppercase text-on-surface-variant">Rewatch the Glory</h2>
            <button className="text-on-surface-variant font-bold text-sm uppercase tracking-widest hover:underline">View All &gt;</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((hl) => (
              <HighlightCard key={hl.id} highlight={hl} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
