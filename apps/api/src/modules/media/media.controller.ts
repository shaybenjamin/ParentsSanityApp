import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
  CreateMediaItemDto,
  UpdateMediaItemDto,
} from './media.dto';
import { MediaType, PlaylistMood } from '@prisma/client';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('playlists')
  findAllPlaylists(
    @Query('mood') mood?: PlaylistMood,
    @Query('type') type?: MediaType,
  ) {
    return this.mediaService.findAllPlaylists({ mood, type });
  }

  @Get('playlists/:id')
  findPlaylistById(@Param('id') id: string) {
    return this.mediaService.findPlaylistById(id);
  }

  @Post('playlists')
  createPlaylist(@Body() dto: CreatePlaylistDto) {
    return this.mediaService.createPlaylist(dto);
  }

  @Patch('playlists/:id')
  updatePlaylist(@Param('id') id: string, @Body() dto: UpdatePlaylistDto) {
    return this.mediaService.updatePlaylist(id, dto);
  }

  @Patch('playlists/:id/favorite')
  toggleFavorite(@Param('id') id: string) {
    return this.mediaService.toggleFavorite(id);
  }

  @Delete('playlists/:id')
  deletePlaylist(@Param('id') id: string) {
    return this.mediaService.deletePlaylist(id);
  }

  @Post('playlists/:id/items')
  addItem(@Param('id') playlistId: string, @Body() dto: CreateMediaItemDto) {
    return this.mediaService.addItem(playlistId, dto);
  }

  @Patch('items/:id')
  updateItem(@Param('id') itemId: string, @Body() dto: UpdateMediaItemDto) {
    return this.mediaService.updateItem(itemId, dto);
  }

  @Delete('items/:id')
  deleteItem(@Param('id') itemId: string) {
    return this.mediaService.deleteItem(itemId);
  }
}
