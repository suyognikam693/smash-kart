import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-xl bg-primary-container p-1 shadow-lg">
      <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-br from-primary-fixed to-primary-dim rounded-[2.8rem] min-h-[450px] overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)"></rect>
          </svg>
        </div>

        <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-secondary-container px-4 py-1.5 rounded-full shadow-md">
            <span className="material-symbols-outlined text-on-secondary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-secondary-container">GOAT</span>
          </div>
          <h2 className="text-white text-5xl md:text-7xl font-extrabold tracking-tighter leading-none italic">
            Ravikumar "THE BADASS"
          </h2>
          <p className="text-on-primary text-xl font-medium tracking-tight opacity-90">
            The Legend that we all admire !!!!!
          </p>
          <div className="pt-6">
            <Button variant="secondary" icon="arrow_forward" className="px-8 py-4 text-sm" onClick={() => navigate('/highlights')}>
              View Hall of Fame
            </Button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 h-[300px] md:h-[450px] flex items-center justify-center p-8">
          <div className="relative w-full h-full transform rotate-3 scale-110">
            <img
              src="https://www.hindustantimes.com/ht-img/img/2025/01/05/550x309/badass_1736055425521_1736055434692.jpg"
              alt="Champion"
              className="w-full h-full object-cover rounded-lg shadow-2xl border-4 border-secondary-container"
            />
          </div>
          {/* Accent elements 
          <div className="absolute top-10 right-10 bg-white/20 backdrop-blur-md p-4 rounded-full">
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
          </div>*/}
        </div>
      </div>
    </section>
  );
}
