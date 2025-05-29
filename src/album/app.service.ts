import { Injectable } from '@nestjs/common';
import type { Album } from 'src/db/types';
import { CreateNewAlbumTo } from 'src/validate/CreateNewAlbum';
import { albums } from 'src/db/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  getAlbums(): Album[] {
    return albums;
  }
  getAlbum(id: string): Album {
    return albums.find((item) => item.id === id);
  }
  createAlbum(newAlbum: CreateNewAlbumTo) {
    const id = uuidv4();
    const newData = {
      id,
      name: newAlbum.name,
      year: newAlbum.year,
      artistId: newAlbum.artistId ?? null,
    };
    albums.push(newData);
    return newData;
  }
  updateAlbum(id: string, newData: CreateNewAlbumTo) {
    const album = albums.find((item) => item.id === id);
    if (!album) {
      return;
    }
    if (newData.name !== undefined) {
      album.name = newData.name;
    }
    if (newData.year !== undefined) {
      album.year = newData.year;
    }
    if (newData.artistId !== undefined) {
      album.artistId = newData.artistId;
    }

    return album;
  }
  deleteAlbum(id: string) {
    const index = albums.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    const [deleteAlbum] = albums.splice(index, 1);
    return deleteAlbum;
  }
}
