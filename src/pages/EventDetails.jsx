import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setEvent(data.event);
        setLoading(false);
      });

    fetch(`${BASE_URL}/api/events/${id}/players`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPlayers(data.players || []);
      });
  }, [id]);

  const handleJoinRoom = () => {
    // For gating purposes, we simulate passing an email right now. 
    // Usually this comes from Auth context. Let's act like we are this user for testing.
    const mockUserEmail = prompt("Enter your registered email to join:", "player@example.com");
    if (!mockUserEmail) return;

    fetch(`${BASE_URL}/api/events/${id}/join?email=${encodeURIComponent(mockUserEmail)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          window.open(data.match_link, '_blank');
        } else {
          alert('Access Denied: ' + data.message);
        }
      });
  };

  if (loading) return <div className="text-center py-20 font-bold">Loading...</div>;
  if (!event) return <div className="text-center py-20 font-bold">Event Not Found</div>;

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl relative min-h-[40vh] flex items-end p-8 md:p-12">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-container via-primary to-transparent"></div>
          <div className="relative z-10 space-y-4">
            <div className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label text-[10px] uppercase tracking-widest font-bold">
              {event.status === 'live' ? 'Live Now' : 'Upcoming Event'}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold italic tracking-tighter text-white uppercase leading-none">
              {event.title}
            </h1>
            <p className="text-on-primary text-xl font-medium max-w-2xl opacity-90">
              The ultimate showdown at {event.venue}. Only the best survive.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl w-full">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">gavel</span>
                Tournament Rules
              </h3>
              <ul className="space-y-4">
                {event.rules?.rules?.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary-container mt-1">check_circle</span>
                    <span className="font-semibold text-on-surface-variant text-lg">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface-container p-6 rounded-2xl border-4 border-primary">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                  <span className="uppercase text-xs font-bold tracking-widest text-on-surface-variant">Date</span>
                  <span className="font-black text-lg">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                  <span className="uppercase text-xs font-bold tracking-widest text-on-surface-variant">Time</span>
                  <span className="font-black text-lg">{event.time}</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                  <span className="uppercase text-xs font-bold tracking-widest text-on-surface-variant">Duration</span>
                  <span className="font-black text-lg">{event.duration}</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                  <span className="uppercase text-xs font-bold tracking-widest text-on-surface-variant">Venue</span>
                  <span className="font-black text-lg">{event.venue}</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                  <span className="uppercase text-xs font-bold tracking-widest text-on-surface-variant">Entry Fee</span>
                  <span className="font-black text-lg text-primary italic">₹{event.fee}</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                  <span className="uppercase text-xs font-bold tracking-widest text-secondary-container">Dynamic Grand Prize</span>
                  <span className="font-black text-2xl text-secondary-container italic">₹{players.length * event.fee}</span>
                </div>
              </div>

              {event.status === 'live' ? (
                <Button variant="secondary" fullWidth className="py-5" onClick={handleJoinRoom}>
                  Join Match Room
                </Button>
              ) : (
                <Button variant="primary" fullWidth className="py-5" onClick={() => navigate('/registration', { state: { event_id: event.id, fee: event.fee } })}>
                  Register Now
                </Button>
              )}
              <div className="mt-4 text-center">
                <button onClick={() => navigate('/players', { state: { event_id: event.id } })} className="text-xs uppercase tracking-widest font-bold text-primary hover:underline">
                  View Player Roster
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
