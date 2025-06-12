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
import { CreateArtistTo } from 'src/validate/CreateNewArtist';
import { validate as isUUID } from 'uuid';
import type { Artist } from '@prisma/client';

@Controller('artist')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  async getArtists(): Promise<Artist[]> {
    return await this.appService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  async getArtist(@Param('id') id: string): Promise<Artist> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artist = await this.appService.getArtist({ id });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  @HttpCode(201)
  async createNewArtist(
    @Body() createArtistTo: CreateArtistTo,
  ): Promise<Artist> {
    return await this.appService.createArtist(createArtistTo);
  }

  @Put(':id')
  @HttpCode(200)
  async updateArtist(
    @Param('id') id: string,
    @Body() createArtistTo: CreateArtistTo,
  ): Promise<Artist> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artist = await this.appService.updateArtist({ id }, createArtistTo);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const artist = await this.appService.deleteArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
