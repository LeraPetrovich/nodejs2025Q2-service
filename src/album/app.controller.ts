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
import type { Album } from 'src/db/types';
import { CreateNewAlbumTo } from 'src/validate/CreateNewAlbum';

@Controller('album')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getAlbums(): Album[] {
    return this.appService.getAlbums();
  }
  @Get(':id')
  @HttpCode(200)
  getAlbum(@Param('id') id: string): Album {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = this.appService.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  @HttpCode(201)
  createNewAlbum(@Body() createAlbumTo: CreateNewAlbumTo): Album {
    return this.appService.createAlbum(createAlbumTo);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(
    @Param('id') id: string,
    @Body() createAlbumTo: CreateNewAlbumTo,
  ): Album {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = this.appService.updateAlbum(id, createAlbumTo);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const album = this.appService.deleteAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }
}
