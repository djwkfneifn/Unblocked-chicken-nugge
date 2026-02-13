
import { Game, Category } from './types.ts';

export const GAMES_DATA: Game[] = [
  {
    id: 'schoolboy-runaway',
    title: 'SchoolBoy Runaway',
    description: 'Help the schoolboy escape from his house in this stealth-based puzzle adventure. Avoid parents and solve puzzles to find your way out!',
    thumbnail: 'https://cdn.jsdelivr.net/gh/genizy/web-port@main/schoolboy-runaway/TemplateData/favicon.ico',
    // Using a more robust proxy method
    url: 'https://images-opensocial.googleusercontent.com/gadgets/proxy?container=focus&url=https://djwkfneifn.github.io/WHO-MADE-THIS-/',
    category: Category.ACTION,
    tags: ['stealth', 'puzzle', '3d', 'escape'],
    isPopular: true
  }
];

export const CATEGORIES = Object.values(Category);
