import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('track')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTracks(): string {
    return this.appService.getTracks();
  }
}
