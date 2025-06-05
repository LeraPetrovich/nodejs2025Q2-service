import { Controller, Get, Post, Delete, HttpCode, Param } from '@nestjs/common';
import { FavoritesService } from './app.service';
import { FavoritesResponse } from 'src/db/types';

@Controller('favs')
export class AppController {
  constructor(private readonly appService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async getFavorites(): Promise<FavoritesResponse> {
    return await this.appService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  async createNewFavTrack(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.appService.createNewFavTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavTrack(@Param('id') id: string): Promise<{ message: string }> {
    return await this.appService.deleteFavTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async createNewFavAlbum(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.appService.createNewFavAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavAlbum(@Param('id') id: string): Promise<{ message: string }> {
    return await this.appService.deleteFavAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async createNewFavArtist(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.appService.createNewFavArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavArtist(@Param('id') id: string): Promise<{ message: string }> {
    return await this.appService.deleteFavArtist(id);
  }
}
