import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      {/* TopAppBar */}
      <nav className="bg-[#eff8ff] dark:bg-slate-950 docked full-width top-0 sticky z-50 shadow-[0_20px_40px_rgba(0,95,153,0.08)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#005f99] dark:text-[#2ea7ff] text-3xl">sports_esports</span>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tight text-3xl uppercase text-[#005f99] dark:text-[#2ea7ff]">SMASH EVENTS</h1>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link className="font-['Plus_Jakarta_Sans'] font-bold text-sm uppercase tracking-widest text-[#005f99] border-b-4 border-[#ffb400] transition-transform duration-300 hover:scale-105" to="/">Arena</Link>
            <Link className="font-['Plus_Jakarta_Sans'] font-bold text-sm uppercase tracking-widest text-[#233038] dark:text-slate-400 transition-transform duration-300 hover:scale-105 hover:text-[#2ea7ff]" to="/highlights">Hall of Fame</Link>
          </div>
          <div className="md:hidden">
          </div>
        </div>
      </nav>
      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center gap-12 items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl md:hidden shadow-[0_-10px_40px_rgba(0,95,153,0.12)] rounded-t-[3rem]">
        <Link className="flex flex-col items-center justify-center bg-[#2ea7ff] text-white rounded-full px-5 py-2 scale-110 shadow-lg active:scale-90 transition-all" to="/">
          <span className="material-symbols-outlined">home_app_logo</span>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-[10px] uppercase tracking-widest mt-0.5">Arena</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 p-2 hover:bg-[#eff8ff] dark:hover:bg-slate-800 rounded-full active:scale-90 transition-all" to="/highlights">
          <span className="material-symbols-outlined">military_tech</span>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-[10px] uppercase tracking-widest mt-0.5">Hall of Fame</span>
        </Link>
      </nav>
    </  >
  );
}
