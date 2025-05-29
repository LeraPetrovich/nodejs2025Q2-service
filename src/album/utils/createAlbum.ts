import { v4 as uuidv4 } from 'uuid';
import { CreateNewAlbumTo } from 'src/validate/CreateNewAlbum';
import { albums, artists } from 'src/db/db';
import { NotFoundException } from '@nestjs/common';

const checkIsValidArtist = (id: string) => {
  return artists.find((item) => item.id === id);
};

export const createAlbumUtils = (newAlbum: CreateNewAlbumTo) => {
  const id = uuidv4();

  if (newAlbum.artistId != null && !checkIsValidArtist(newAlbum.artistId)) {
    throw new NotFoundException('Artist not found');
  }

  const newData = {
    id,
    name: newAlbum.name,
    year: newAlbum.year,
    artistId: newAlbum.artistId ?? null,
  };
  albums.push(newData);
  return newData;
};
