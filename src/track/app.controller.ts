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

import type { Track } from 'src/db/types';
import { CreateTrack } from 'src/validate/CreateTrack';

@Controller('track')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getTracks(): Array<Track> {
    return this.appService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id') id: string): Track {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = this.appService.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  createNewTrack(@Body() createTrackTo: CreateTrack): Track {
    return this.appService.createTrack(createTrackTo);
  }

  @Put(':id')
  @HttpCode(200)
  updateUserPassword(
    @Param('id') id: string,
    @Body() createTrackTo: CreateTrack,
  ): Track {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = this.appService.updateTrack(id, createTrackTo);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const track = this.appService.deleteTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
  }
}
