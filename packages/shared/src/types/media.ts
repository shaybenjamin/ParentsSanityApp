export type MediaType = 'MUSIC' | 'VIDEO' | 'MIXED';
export type PlaylistMood = 'CALM' | 'ENERGETIC' | 'BEDTIME' | 'BACKGROUND';

export interface MediaItem {
  id: string;
  playlistId: string;
  title: string;
  titleHe: string;
  url?: string;
  thumbnailUrl?: string;
  durationSec?: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Playlist {
  id: string;
  title: string;
  titleHe: string;
  type: MediaType;
  mood: PlaylistMood;
  isFavorite: boolean;
  items: MediaItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlaylistDto {
  title: string;
  titleHe: string;
  type: MediaType;
  mood: PlaylistMood;
}

export interface CreateMediaItemDto {
  title: string;
  titleHe: string;
  url?: string;
  thumbnailUrl?: string;
  durationSec?: number;
  order: number;
}
