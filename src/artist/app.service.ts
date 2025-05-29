import { Injectable } from '@nestjs/common';
import type { Artist } from 'src/db/types';
import { artists } from 'src/db/db';
import { CreateArtistTo } from 'src/validate/CreateNewArtist';
import { v4 as uuidv4 } from 'uuid';
import { deleteArtistUtils } from './utils/deleteArtist';
@Injectable()
export class AppService {
  getArtists(): Artist[] {
    return artists;
  }
  getArtist(id: string): Artist {
    return artists.find((item) => item.id === id);
  }
  createArtist(artist: CreateArtistTo) {
    const id = uuidv4();
    const newArtist = {
      id,
      grammy: artist.grammy,
      name: artist.name,
    };
    artists.push(newArtist);
    return newArtist;
  }
  updateArtist(id: string, artistBody: CreateArtistTo) {
    const artist = artists.find((item) => item.id === id);
    if (!artist) {
      return;
    }
    if ('name' in artistBody) {
      artist.name = artistBody.name;
    }
    if ('grammy' in artistBody) {
      artist.grammy = artistBody.grammy;
    }
    return artist;
  }
  deleteArtist(id: string) {
    return deleteArtistUtils(id);
  }
}
