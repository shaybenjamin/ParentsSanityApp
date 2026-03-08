import { api } from './client';
import type { Playlist, PlaylistMood, MediaType } from '@family-hub/shared';

export const mediaApi = {
  getPlaylists: (filters: { mood?: PlaylistMood; type?: MediaType } = {}) => {
    const params = new URLSearchParams();
    if (filters.mood) params.set('mood', filters.mood);
    if (filters.type) params.set('type', filters.type);
    const q = params.toString();
    return api.get<Playlist[]>(`/media/playlists${q ? `?${q}` : ''}`);
  },
  getPlaylist: (id: string) => api.get<Playlist>(`/media/playlists/${id}`),
  toggleFavorite: (id: string) =>
    api.patch<Playlist>(`/media/playlists/${id}/favorite`),
};
