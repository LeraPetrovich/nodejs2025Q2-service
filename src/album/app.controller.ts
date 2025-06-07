import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { AppService } from './app.service';
import type { Album } from '@prisma/client';
import { CreateNewAlbumTo } from 'src/validate/CreateNewAlbum';

@Controller('album')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  async getAlbums(): Promise<Album[]> {
    return await this.appService.getAlbums();
  }
  @Get(':id')
  @HttpCode(200)
  async getAlbum(@Param('id') id: string): Promise<Album> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = await this.appService.getAlbum({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  @HttpCode(201)
  async createNewAlbum(
    @Body() createAlbumTo: CreateNewAlbumTo,
  ): Promise<Album> {
    return await this.appService.createAlbum(createAlbumTo);
  }

  @Put(':id')
  @HttpCode(200)
  async updateAlbum(
    @Param('id') id: string,
    @Body() createAlbumTo: CreateNewAlbumTo,
  ): Promise<Album | null> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = await this.appService.updateAlbum({ id }, createAlbumTo);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const album = await this.appService.deleteAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }
}
