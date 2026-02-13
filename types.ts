export enum Category {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  ARCADE = 'Arcade',
  SPORTS = 'Sports',
  STRATEGY = 'Strategy'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: Category;
  tags: string[];
  isPopular?: boolean;
}