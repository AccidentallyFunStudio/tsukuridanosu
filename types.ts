export interface Release {
  id: string;
  title: string;
  type: 'Single' | 'EP' | 'Album';
  year: string;
  coverUrl: string;
  spotifyUrl?: string;
  appleUrl?: string;
  youtubeUrl?: string;
  spotifyEmbedUrl?: string;
}

export interface StagePhoto {
  id: string;
  url: string;
  title: string;
  location: string;
  date: string;
}

export interface WordParticle {
  id: number;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}