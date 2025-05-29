import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('artist')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getArtists(): string {
    return this.appService.getArtists();
  }
}
