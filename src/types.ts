export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: string;
}

export interface GameState {
  snake: Point[];
  food: Point;
  direction: Direction;
  isGameOver: boolean;
  score: number;
  highScore: number;
}

export interface Point {
  x: number;
  y: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
