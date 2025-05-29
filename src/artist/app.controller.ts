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
import { AppService } from './app.service';
import type { Artist } from 'src/db/types';
import { CreateArtistTo } from 'src/validate/CreateNewArtist';
import { validate as isUUID } from 'uuid';

@Controller('artist')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getArtists(): Artist[] {
    return this.appService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  getArtist(@Param('id') id: string): Artist {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artist = this.appService.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  @HttpCode(201)
  createNewArtist(@Body() createArtistTo: CreateArtistTo): Artist {
    return this.appService.createArtist(createArtistTo);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(
    @Param('id') id: string,
    @Body() createArtistTo: CreateArtistTo,
  ): Artist {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artist = this.appService.updateArtist(id, createArtistTo);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const artist = this.appService.deleteArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
