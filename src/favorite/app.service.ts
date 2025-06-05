import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from 'src/db/types';
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  private async validateUUID(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
  }

  //GET
  async getFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new UnprocessableEntityException('Favorites record not found');
    }

    const [artists, albums, tracks] = await Promise.all([
      this.prisma.artist.findMany({
        where: { id: { in: favorites.artists } },
      }),
      this.prisma.album.findMany({
        where: { id: { in: favorites.albums } },
      }),
      this.prisma.track.findMany({
        where: { id: { in: favorites.tracks } },
      }),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  //POST TRACK
  async createNewFavTrack(id: string): Promise<{ message: string }> {
    await this.validateUUID(id);

    const currentTrack = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!currentTrack) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new UnprocessableEntityException('Favorites record not found');
    }

    if (favorites.tracks.includes(id)) {
      throw new ConflictException('Track is already in favorites');
    }

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        tracks: {
          push: id,
        },
      },
    });
    return { message: 'Track added to favorites' };
  }

  //DELETE TRACK
  async deleteFavTrack(id: string): Promise<{ message: string }> {
    await this.validateUUID(id);

    const currentTrack = await this.prisma.track.findUnique({
      where: { id },
    });

    console.log(currentTrack);

    if (!currentTrack) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favorites = await this.prisma.favorites.findFirst();
    console.log(favorites);

    if (!favorites) {
      throw new UnprocessableEntityException('Favorites record not found');
    }

    if (!favorites.tracks.includes(id)) {
      throw new NotFoundException('Track is not in favorites');
    }

    const updatedTracks = favorites.tracks.filter((trackId) => trackId !== id);
    await this.prisma.favorites.update({
      where: {
        id: favorites.id,
      },
      data: {
        tracks: {
          set: updatedTracks,
        },
      },
    });
    return { message: 'Track removed from favorites' };
  }

  //POST ALBUM

  async createNewFavAlbum(id: string): Promise<{ message: string }> {
    await this.validateUUID(id);

    const currentAlbum = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!currentAlbum) {
      throw new UnprocessableEntityException('Album not found');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new UnprocessableEntityException('Favorites record not found');
    }

    if (favorites.albums.includes(id)) {
      throw new ConflictException('Album is already in favorites');
    }

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        albums: {
          push: id,
        },
      },
    });

    return { message: 'Album added to favorites' };
  }

  //DELETE ALBUM
  async deleteFavAlbum(id: string): Promise<{ message: string }> {
    await this.validateUUID(id);

    const currentAlbum = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!currentAlbum) {
      throw new UnprocessableEntityException('Album not found');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new UnprocessableEntityException('Favorites record not found');
    }

    if (!favorites.albums.includes(id)) {
      throw new NotFoundException('Album removed from favorites');
    }

    const updatedAlbums = favorites.albums.filter((albumId) => albumId !== id);
    await this.prisma.favorites.update({
      where: {
        id: favorites.id,
      },
      data: {
        albums: {
          set: updatedAlbums,
        },
      },
    });
    return { message: 'Album remove in favorites' };
  }

  //POST ARTIST

  async createNewFavArtist(id: string): Promise<{ message: string }> {
    await this.validateUUID(id);

    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!currentArtist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new UnprocessableEntityException('Favorites record not found');
    }

    if (favorites.artists.includes(id)) {
      throw new ConflictException('Artist is already in favorites');
    }

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        artists: {
          push: id,
        },
      },
    });

    return { message: 'Album added to favorites' };
  }

  //DELETE ARTIST

  async deleteFavArtist(id: string): Promise<{ message: string }> {
    await this.validateUUID(id);

    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!currentArtist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      throw new UnprocessableEntityException('Favorites record not found');
    }

    if (!favorites.artists.includes(id)) {
      throw new NotFoundException('Artist is not in favorites');
    }

    const updatedArtists = favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    await this.prisma.favorites.update({
      where: {
        id: favorites.id,
      },
      data: {
        artists: {
          set: updatedArtists,
        },
      },
    });
    return { message: 'Artist remove in favorites' };
  }
}
