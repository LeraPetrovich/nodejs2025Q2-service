import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTracks(): string {
    return 'Get all Tracks';
  }
}
