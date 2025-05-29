import { Module } from '@nestjs/common';

import { UserModule } from './user/app.module';
import { AlbumModule } from './album/app.module';
import { ArtistModule } from './artist/app.module';
import { FavoriteModule } from './favorite/app.module';
import { TrackModule } from './track/app.module';

@Module({
  imports: [UserModule, AlbumModule, ArtistModule, FavoriteModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
