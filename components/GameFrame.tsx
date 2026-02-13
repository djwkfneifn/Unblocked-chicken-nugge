
import React, { useRef } from 'react';
import { Game } from '../types';

interface GameFrameProps {
  game: Game;
  onClose: () => void;
}

export const GameFrame: React.FC<GameFrameProps> = ({ game, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in zoom-in duration-300">
      {/* Top Bar */}
      <div className="h-16 bg-[#050507] border-b border-violet-900/40 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-violet-900/30 rounded-full transition-colors group"
            title="Return to Space Hub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-violet-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="font-bold text-lg text-white leading-none mb-1">{game.title}</h2>
            <p className="text-xs text-violet-500 font-mono">Nugget Cosmos Engine v2.0.0</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullScreen}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-violet-600/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Full Screen
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="hidden sm:flex px-4 py-2 bg-violet-900/20 hover:bg-violet-900/40 text-violet-100 text-sm font-medium rounded-lg transition-colors items-center gap-2 border border-violet-800/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reload
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-sm font-medium rounded-lg transition-all"
          >
            Abort
          </button>
        </div>
      </div>

      {/* Game Iframe */}
      <div className="flex-grow bg-black relative overflow-hidden">
        <iframe 
          src={game.url}
          className="w-full h-full border-none"
          title={game.title}
          allow="autoplay; fullscreen; keyboard; gamepad"
          allowFullScreen
        />
        
        {/* Anti-Block Indicator / Overlay */}
        <div className="absolute bottom-4 right-4 bg-violet-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-violet-500/20 text-[10px] text-violet-400 pointer-events-none select-none">
          SECURE VOID CHANNEL STABLE
        </div>
      </div>
    </div>
  );
};