
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative bg-violet-950/10 border border-violet-900/30 rounded-2xl overflow-hidden cursor-pointer hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-violet-500/20 backdrop-blur-sm"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 rounded-xl transition-all shadow-lg shadow-violet-900/40">
            Launch Game
          </button>
        </div>
        {game.isPopular && (
          <div className="absolute top-3 left-3 bg-violet-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg shadow-violet-950/50 border border-violet-400/30">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white group-hover:text-violet-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] bg-violet-900/40 text-violet-200 px-2 py-0.5 rounded-full border border-violet-700/50">
            {game.category}
          </span>
        </div>
        <p className="text-xs text-violet-300/60 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
    </div>
  );
};