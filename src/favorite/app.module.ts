import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FavoritesService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoriteModule {}
