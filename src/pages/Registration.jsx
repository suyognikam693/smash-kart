import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

export default function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const event_id = location.state?.event_id || 'evt-2';
  const fee = location.state?.fee || 50;

  const [formData, setFormData] = useState({ name: '', uid: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/join-room', { state: { ...formData, event_id, fee } });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8 md:p-12 border-t-8 border-primary">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex bg-primary-container text-on-primary-container p-4 rounded-full mb-2">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight italic uppercase">Secure Your Spot</h2>
            <p className="text-on-surface-variant font-medium">Tournament Entry • Entry Fee: ₹{fee}</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-on-surface">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">person</span>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 font-bold text-on-surface focus:ring-2 focus:ring-primary placeholder:font-normal outline-none" placeholder="Enter your full name" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-on-surface">Smash Kart Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">sports_esports</span>
                  <input type="text" value={formData.uid} onChange={e => setFormData({ ...formData, uid: e.target.value })} className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 font-bold text-on-surface focus:ring-2 focus:ring-primary placeholder:font-normal outline-none" placeholder="e.g. TheBolt99" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-on-surface">Email ID</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">mail</span>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 font-bold text-on-surface focus:ring-2 focus:ring-primary placeholder:font-normal outline-none" placeholder="player@example.com" required />
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-outline-variant/20">
              <Button variant="primary" fullWidth className="py-5 text-lg" type="submit">
                Proceed to Payment (₹{fee})
              </Button>
              <button type="button" onClick={() => navigate(-1)} className="w-full mt-4 py-3 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
