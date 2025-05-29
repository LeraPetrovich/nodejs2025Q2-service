import { CreateNewAlbumTo } from 'src/validate/CreateNewAlbum';
import { albums, artists } from 'src/db/db';
import { NotFoundException } from '@nestjs/common';

const checkIsValidArtist = (id: string) => {
  return artists.find((item) => item.id === id);
};

export const updateAlbumUtils = (id: string, newData: CreateNewAlbumTo) => {
  const album = albums.find((item) => item.id === id);
  if (!album) {
    return;
  }
  if ('name' in newData) {
    album.name = newData.name;
  }
  if ('year' in newData) {
    album.year = newData.year;
  }
  if ('artistId' in newData) {
    if (newData.artistId !== null && !checkIsValidArtist(newData.artistId)) {
      throw new NotFoundException('Artist not found');
    }
    album.artistId = newData.artistId;
  }

  return album;
};
