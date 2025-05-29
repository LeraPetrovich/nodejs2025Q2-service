import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getArtists(): string {
    return 'Get all Artists';
  }
}
