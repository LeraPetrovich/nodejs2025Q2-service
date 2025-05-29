import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('favs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getFavorites(): string {
    return this.appService.getFavorites();
  }
}
