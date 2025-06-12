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
import { validate as isUUID } from 'uuid';

import type { Track } from '@prisma/client';
import { CreateTrack } from 'src/validate/CreateTrack';

@Controller('track')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  async getTracks(): Promise<Track[]> {
    return await this.appService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  async getTrack(@Param('id') id: string): Promise<Track> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = await this.appService.getTrack({ id });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  async createNewTrack(@Body() createTrackTo: CreateTrack): Promise<Track> {
    return await this.appService.createTrack(createTrackTo);
  }

  @Put(':id')
  @HttpCode(200)
  async updateTrack(
    @Param('id') id: string,
    @Body() createTrackTo: CreateTrack,
  ): Promise<Track> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = await this.appService.updateTrack({ id }, createTrackTo);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const track = await this.appService.deleteTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
  }
}
