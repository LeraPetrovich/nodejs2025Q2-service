import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getFavorites(): string {
    return 'Get all Favorites';
  }
}
