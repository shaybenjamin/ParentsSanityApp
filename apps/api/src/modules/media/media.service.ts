import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PlaylistMood, MediaType } from '@prisma/client';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
  CreateMediaItemDto,
  UpdateMediaItemDto,
} from './media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  findAllPlaylists(filters: { mood?: PlaylistMood; type?: MediaType } = {}) {
    return this.prisma.playlist.findMany({
      where: {
        ...(filters.mood && { mood: filters.mood }),
        ...(filters.type && { type: filters.type }),
      },
      include: { items: { orderBy: { order: 'asc' } } },
      orderBy: [{ isFavorite: 'desc' }, { title: 'asc' }],
    });
  }

  async findPlaylistById(id: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });
    if (!playlist) throw new NotFoundException(`Playlist ${id} not found`);
    return playlist;
  }

  async createPlaylist(dto: CreatePlaylistDto) {
    const { items, ...rest } = dto;
    return this.prisma.playlist.create({
      data: {
        ...rest,
        ...(items && { items: { create: items } }),
      },
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async updatePlaylist(id: string, dto: UpdatePlaylistDto) {
    await this.findPlaylistById(id);
    return this.prisma.playlist.update({
      where: { id },
      data: dto,
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async toggleFavorite(id: string) {
    const playlist = await this.findPlaylistById(id);
    return this.prisma.playlist.update({
      where: { id },
      data: { isFavorite: !playlist.isFavorite },
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async deletePlaylist(id: string) {
    await this.findPlaylistById(id);
    return this.prisma.playlist.delete({ where: { id } });
  }

  // ─── Media Items ────────────────────────────────────────────────────────

  async addItem(playlistId: string, dto: CreateMediaItemDto) {
    await this.findPlaylistById(playlistId);
    return this.prisma.mediaItem.create({
      data: { ...dto, playlistId },
    });
  }

  async updateItem(itemId: string, dto: UpdateMediaItemDto) {
    const item = await this.prisma.mediaItem.findUnique({
      where: { id: itemId },
    });
    if (!item) throw new NotFoundException(`Media item ${itemId} not found`);
    return this.prisma.mediaItem.update({ where: { id: itemId }, data: dto });
  }

  async deleteItem(itemId: string) {
    const item = await this.prisma.mediaItem.findUnique({
      where: { id: itemId },
    });
    if (!item) throw new NotFoundException(`Media item ${itemId} not found`);
    return this.prisma.mediaItem.delete({ where: { id: itemId } });
  }
}
