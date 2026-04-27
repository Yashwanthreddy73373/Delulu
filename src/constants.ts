import { Track, Direction } from './types.ts';

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cyber Synth',
    artist: 'AI Producer Unit',
    coverUrl: 'https://picsum.photos/seed/cyber/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '6:12',
  },
  {
    id: '2',
    title: 'Neon Drift',
    artist: 'Digital Dreamer',
    coverUrl: 'https://picsum.photos/seed/neon/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '7:05',
  },
  {
    id: '3',
    title: 'Bass Nexus',
    artist: 'Circuit Breaker',
    coverUrl: 'https://picsum.photos/seed/bass/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '5:48',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = Direction.UP;
export const GAME_SPEED = 150;
