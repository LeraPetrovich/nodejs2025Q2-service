import { Injectable } from '@nestjs/common';
import type { Album } from 'src/db/types';
import { CreateNewAlbumTo } from 'src/validate/CreateNewAlbum';
import { albums } from 'src/db/db';
import { createAlbumUtils } from './utils/createAlbum';
import { updateAlbumUtils } from './utils/ubdateAlbum';
import { deleteAlbumUtils } from './utils/deleteAlbum';

@Injectable()
export class AppService {
  getAlbums(): Album[] {
    return albums;
  }
  getAlbum(id: string): Album {
    return albums.find((item) => item.id === id);
  }
  createAlbum(newAlbum: CreateNewAlbumTo) {
    return createAlbumUtils(newAlbum);
  }
  updateAlbum(id: string, newData: CreateNewAlbumTo) {
    return updateAlbumUtils(id, newData);
  }
  deleteAlbum(id: string) {
    return deleteAlbumUtils(id);
  }
}
