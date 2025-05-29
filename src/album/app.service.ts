import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAlbum(): string {
    return 'Get all album';
  }
}
