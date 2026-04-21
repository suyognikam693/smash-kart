import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinRoom() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative items-center justify-center p-6 bg-[#eff8ff] text-[#233038]">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 px-5 py-3 bg-white border-[3px] border-[#233038] rounded-xl font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#233038] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#233038] active:translate-y-2 active:shadow-none transition-all"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>

      {/* Main Content */}
      <div className="text-center space-y-12 max-w-3xl w-full">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic drop-shadow-md">
            Let the fun begin!!!!
          </h1>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase text-gray-600 tracking-widest">
            Join the room
          </h2>
        </div>

        <div className="pt-8 w-full flex justify-center">
          <a
            href="https://smashkarts.io/link/?mode=67111434&wpns=159212&room=in935428&arena=graveyard"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-6 md:px-16 md:py-8 bg-[#3b82f6] text-white rounded-2xl text-2xl md:text-5xl font-black uppercase tracking-widest border-4 border-[#1e3a8a] shadow-[0_12px_0_rgb(30,58,138),0_20px_25px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_16px_0_rgb(30,58,138),0_25px_30px_-5px_rgba(0,0,0,0.4)] active:translate-y-3 active:shadow-[0_0px_0_rgb(30,58,138),0_0px_0_rgba(0,0,0,0)] transition-all overflow-hidden"
          >
            {/* Glossy overlay effect for the cartoony feel */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-xl pointer-events-none"></div>
            Launch Smash Kart
          </a>
        </div>
      </div>
    </div>
  );
}
