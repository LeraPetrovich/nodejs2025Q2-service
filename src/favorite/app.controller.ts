import { Controller, Get, Post, Delete, HttpCode, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FavoritesResponse } from 'src/db/types';

@Controller('favs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getFavorites(): FavoritesResponse {
    return this.appService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  createNewFavTrack(@Param('id') id: string) {
    return this.appService.createNewFavTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteFavTrack(@Param('id') id: string) {
    return this.appService.deleteFavTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  createNewFavAlbum(@Param('id') id: string) {
    return this.appService.createNewFavAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteFavAlbum(@Param('id') id: string) {
    return this.appService.deleteFavAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  createNewFavArtist(@Param('id') id: string) {
    return this.appService.createNewFavArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteFavArtist(@Param('id') id: string) {
    return this.appService.deleteFavArtist(id);
  }
}
