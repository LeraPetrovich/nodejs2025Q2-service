import { Injectable } from '@nestjs/common';
import { favorites, tracks, albums, artists } from 'src/db/db';
import { FavoritesResponse } from 'src/db/types';
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { getFavorites } from './utils/getFavorites';

@Injectable()
export class AppService {
  getFavorites(): FavoritesResponse {
    return getFavorites();
  }

  createNewFavTrack(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const currentTrack = tracks.find((item) => item.id === id);
    if (!currentTrack) {
      throw new UnprocessableEntityException('Track not found');
    }
    if (favorites.tracks.some((track) => track === id)) {
      throw new ConflictException('Track is already in favorites');
    }

    favorites.tracks.push(currentTrack.id);

    return { message: 'Track added to favorites' };
  }
  deleteFavTrack(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const index = favorites.tracks.findIndex((trackId) => trackId === id);
    if (index === -1) {
      throw new NotFoundException('Track is not in favorites');
    }
    favorites.tracks.splice(index, 1);
    return { message: 'Track remove in favorites' };
  }

  createNewFavAlbum(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const currentAlbum = albums.find((item) => item.id === id);
    if (!currentAlbum) {
      throw new UnprocessableEntityException('Album not found');
    }
    if (favorites.albums.some((item) => item === id)) {
      throw new ConflictException('Albums is already in favorites');
    }
    favorites.albums.push(currentAlbum.id);

    return { message: 'Album added to favorites' };
  }
  deleteFavAlbum(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const index = favorites.albums.findIndex((item) => item === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    favorites.albums.splice(index, 1);
    return { message: 'Album remove in favorites' };
  }

  createNewFavArtist(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const currentArtist = artists.find((item) => item.id === id);
    if (!currentArtist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    if (favorites.artists.some((item) => item === id)) {
      throw new ConflictException('Artists is already in favorites');
    }

    favorites.artists.push(currentArtist.id);

    return { message: 'Album added to favorites' };
  }
  deleteFavArtist(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const index = favorites.artists.findIndex((item) => item === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    favorites.artists.splice(index, 1);
    return { message: 'Artist remove in favorites' };
  }
}
