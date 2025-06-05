import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavoriteModule } from 'src/favorite/app.module';

@Module({
  imports: [PrismaModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AlbumModule {}
