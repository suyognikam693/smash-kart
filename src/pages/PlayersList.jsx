import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PlayersList() {
  const location = useLocation();
  const event_id = location.state?.event_id || 'evt-2';
  
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${event_id}/players`)
      .then(res => res.json())
      .then(data => {
        if(data.success) setPlayers(data.players);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [event_id]);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-8">
        <div className="space-y-2 text-center">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Official Roster</span>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-on-surface uppercase inline-flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl hidden md:block">groups</span>
            Registered Players
          </h2>
          <p className="text-on-surface-variant font-medium">Tournament ID: {event_id}</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 md:p-6 bg-surface-container border-b border-outline-variant/20 hidden md:grid">
            <div className="col-span-8 text-xs font-bold text-on-surface-variant uppercase tracking-widest pl-4">Driver Details</div>
            <div className="col-span-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Status</div>
          </div>
          
          <div className="divide-y divide-outline-variant/10">
            {loading ? <p className="p-8 text-center">Loading drivers...</p> : players.map((pt, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-4 p-4 md:p-6 items-center transition-colors hover:bg-surface-container/30">
                <div className="col-span-8 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-surface-container text-primary">
                    <span className="material-symbols-outlined">sports_motorsports</span>
                  </div>
                  <div>
                    <h5 className="font-black uppercase tracking-tight text-lg text-on-surface">{pt.name}</h5>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{pt.smash_kart_id}</span>
                  </div>
                </div>
                <div className="col-span-4 flex justify-end items-center gap-2 mt-2 md:mt-0 text-right pr-2">
                  <span className="font-black italic text-xl text-on-surface uppercase">{pt.status}</span>
                </div>
              </div>
            ))}
            {!loading && players.length===0 && <p className="text-center p-8">No players registered yet.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
