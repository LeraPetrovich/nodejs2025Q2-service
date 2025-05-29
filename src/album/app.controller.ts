import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('album')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAlbum(): string {
    return this.appService.getAlbum();
  }
}
