import React from 'react';
import { Coffee, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 relative z-10 glass-panel mt-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-6">
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all duration-300"
          >
            <Music className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-sm text-slate-300 group-hover:text-cyan-100">TikTok</span>
          </a>
          
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-amber-400/50 hover:bg-amber-950/30 transition-all duration-300"
          >
            <Coffee className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
            <span className="text-sm text-slate-300 group-hover:text-amber-100">Support</span>
          </a>
        </div>
        
        <p className="text-xs text-slate-600 tracking-widest uppercase">
          © {new Date().getFullYear()} Astral Archives. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;