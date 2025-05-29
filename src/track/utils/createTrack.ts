import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { CreateTrack } from 'src/validate/CreateTrack';
import { tracks, artists, albums } from 'src/db/db';

const checkIsValidArtist = (id: string) => {
  return artists.find((item) => item.id === id);
};

const checkIsValidAlbum = (id: string) => {
  return albums.find((item) => item.id === id);
};

export const createTrackUtils = (track: CreateTrack) => {
  const id = uuidv4();

  if (track.albumId != null && !checkIsValidAlbum(track.albumId)) {
    throw new NotFoundException('Album not found');
  }
  if (track.artistId != null && !checkIsValidArtist(track.artistId)) {
    throw new NotFoundException('Artist not found');
  }

  const newTrack = {
    id,
    name: track.name,
    artistId: track.artistId || null,
    albumId: track.albumId || null,
    duration: track.duration,
  };
  tracks.push(newTrack);
  return newTrack;
};
