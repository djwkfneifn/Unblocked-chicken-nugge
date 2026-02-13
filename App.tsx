
import React, { useState, useMemo, useEffect } from 'react';
import { GAMES_DATA, CATEGORIES } from './constants.tsx';
import { Game, Category } from './types.ts';
import { GameCard } from './components/GameCard.tsx';
import { GameFrame } from './components/GameFrame.tsx';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isPanicMode, setIsPanicMode] = useState(false);

  // Cloaking Logic: Panic Mode redirects or hides UI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.location.href = 'https://classroom.google.com';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesCategory = selectedCategory === Category.ALL || game.category === selectedCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen pb-20 z-10">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#050507]/90 backdrop-blur-xl border-b border-violet-900/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedCategory(Category.ALL)}>
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:bg-violet-500 transition-all group-hover:rotate-6">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-tight">Chicken Nugget</h1>
              <p className="text-[10px] text-violet-400 font-mono tracking-widest leading-none">SPACE HUB</p>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-violet-950/20 border border-violet-800/30 rounded-full px-4 py-2 w-full max-w-md ml-8 focus-within:border-violet-500/50 transition-all backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search space nuggets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-zinc-100 px-3 w-full focus:outline-none text-sm placeholder:text-violet-700"
            />
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-violet-300">
               <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
               {GAMES_DATA.length} Orbits Active
             </div>
             <button 
                title="Panic Button (Press Escape)"
                onClick={() => window.location.href = 'https://classroom.google.com'}
                className="p-2 bg-red-950/20 hover:bg-red-600/20 border border-red-900/30 rounded-lg text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Panic
              </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 mt-12 relative z-10">
        
        {/* Categories Bar */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/30 scale-105' 
                : 'bg-violet-950/20 text-violet-300 border-violet-900/50 hover:border-violet-600 hover:text-white backdrop-blur-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-8 border-l-4 border-violet-600 pl-4">
           <div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {selectedCategory === Category.ALL ? 'Universal Feed' : selectedCategory}
              </h2>
              <p className="text-violet-400/60 text-sm">Transmitting {filteredGames.length} sectors</p>
           </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={(g) => setActiveGame(g)}
            />
          ))}
          {filteredGames.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center border border-dashed border-violet-900/40 rounded-3xl bg-violet-950/5 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-violet-400">Deep Space Empty</h3>
              <p className="text-violet-500/50 text-sm mt-1 max-w-xs mx-auto">No game signals detected in this quadrant.</p>
            </div>
          )}
        </div>
      </main>

      {/* Game Modal */}
      {activeGame && (
        <GameFrame 
          game={activeGame} 
          onClose={() => setActiveGame(null)} 
        />
      )}

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-violet-900/30 px-6 bg-[#050507]/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
             <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
               <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center">
                 <span className="text-white font-black text-xs">C</span>
               </div>
               <span className="font-black text-lg text-white tracking-tighter uppercase">Chicken Nugget Games</span>
             </div>
             <p className="text-violet-400/60 text-sm max-w-sm">The interstellar portal for unblocked entertainment. Press ESC in case of emergencies.</p>
           </div>
           <p className="text-[10px] text-violet-700 font-mono">© 2025 CHICKEN NUGGET COSMOS.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
