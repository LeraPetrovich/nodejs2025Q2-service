import { CreateTrack } from 'src/validate/CreateTrack';
import { tracks, albums, artists } from 'src/db/db';
import { NotFoundException } from '@nestjs/common';

const checkIsValidArtist = (id: string) => {
  return artists.find((item) => item.id === id);
};

const checkIsValidAlbum = (id: string) => {
  return albums.find((item) => item.id === id);
};

export const updateTrackUtils = (id: string, newTrack: CreateTrack) => {
  const track = tracks.find((item) => item.id === id);
  if (!track) return;

  if ('name' in newTrack) {
    track.name = newTrack.name;
  }

  if ('duration' in newTrack) {
    track.duration = newTrack.duration;
  }

  if ('albumId' in newTrack) {
    if (newTrack.albumId !== null && !checkIsValidAlbum(newTrack.albumId)) {
      throw new NotFoundException('Album not found');
    }
    track.albumId = newTrack.albumId;
  }

  if ('artistId' in newTrack) {
    if (newTrack.artistId !== null && !checkIsValidArtist(newTrack.artistId)) {
      throw new NotFoundException('Artist not found');
    }
    track.artistId = newTrack.artistId;
  }

  return track;
};
