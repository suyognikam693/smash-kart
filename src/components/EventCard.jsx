import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  
  // Safely parse date and format if displayDate is missing
  const dateObj = new Date(event.date || Date.now());
  const month = event.displayDate?.month || dateObj.toLocaleString('en-US', { month: 'short' });
  const day = event.displayDate?.day || dateObj.getDate().toString().padStart(2, '0');
  const tags = event.tags || [];
  const fee = event.entryFee || event.fee || '0';
  
  return (
    <div className={`bg-surface-container-lowest p-6 rounded-lg shadow-[0_20px_40px_rgba(0,95,153,0.06)] space-y-6 flex flex-col hover:scale-102 transition-transform duration-300 ${event.featured ? 'border-2 border-primary/20 scale-105 z-10 hover:scale-[1.07]' : 'border border-outline-variant/10'}`}>
      <div className="flex justify-between items-start">
        <div className={`${event.featured ? 'bg-primary text-white shadow-lg' : 'bg-surface-container-low'} px-4 py-2 rounded-2xl text-center`}>
          <div className={`text-xs font-black uppercase ${!event.featured && 'text-primary'}`}>{month}</div>
          <div className={`text-2xl font-black ${!event.featured && 'text-on-background'}`}>{day}</div>
        </div>
        {tags.length > 0 && (
          <div className={`${tags[0].type === 'error' ? 'bg-error-container text-white' : 'bg-secondary/10 text-secondary'} font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm`}>
            {tags[0].label}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h4 className="text-2xl font-extrabold tracking-tight text-on-background leading-none">{event.title}</h4>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1 text-on-surface-variant text-xs font-bold">
            <span className="material-symbols-outlined text-sm">schedule</span> {event.time}
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs font-bold">
            <span className="material-symbols-outlined text-sm">payments</span> ₹{fee} Entry
          </div>
        </div>
      </div>

      <div className="mt-auto flex-col space-y-3">
        {event.isRegistered ? (
          <Button variant="secondary" icon="login" fullWidth className="py-4 text-xs">
            Join Room
          </Button>
        ) : (
          <Button variant="primary" fullWidth className="py-4 text-xs" onClick={() => navigate(`/event/${event.id}`)}>
            Register Now
          </Button>
        )}
        <Button variant="outline" icon="person" fullWidth className="py-3 text-[10px]" onClick={() => navigate('/players', { state: { event_id: event.id } })}>
          View Players List
        </Button>
      </div>
    </div>
  );
}
