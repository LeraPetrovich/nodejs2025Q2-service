import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateTrack } from 'src/validate/CreateTrack';

import { PrismaService } from 'src/prisma.service';
import { FavoritesService } from 'src/favorite/app.service';
import type { Prisma, Track } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private favorite: FavoritesService,
  ) {}

  //GET
  async getTracks(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  //GET:id
  async getTrack(id: Prisma.TrackWhereUniqueInput): Promise<Track> {
    return this.prisma.track.findUnique({ where: id });
  }

  //POST
  async createTrack(track: CreateTrack): Promise<Track> {
    if (track.albumId != null) {
      const currentAlbum = await this.prisma.album.findUnique({
        where: {
          id: track.albumId,
        },
      });
      if (!currentAlbum) {
        throw new NotFoundException('Album not found');
      }
    }

    if (track.artistId != null) {
      const currentArtist = await this.prisma.artist.findUnique({
        where: {
          id: track.artistId,
        },
      });
      if (!currentArtist) {
        throw new NotFoundException('Artist not found');
      }
    }
    const id = uuidv4();

    const newData: Prisma.TrackUncheckedCreateInput = {
      id,
      name: track.name,
      artistId: track.artistId ? track.artistId : null,
      albumId: track.albumId ? track.albumId : null,
      duration: track.duration,
    };
    return this.prisma.track.create({ data: newData });
  }

  //PUT
  async updateTrack(
    id: Prisma.TrackWhereUniqueInput,
    newTrack: CreateTrack,
  ): Promise<Track | null> {
    const currentTrack = await this.prisma.track.findUnique({ where: id });

    if (!currentTrack) {
      return null;
    }

    if (newTrack.albumId != null) {
      const currentAlbum = await this.prisma.album.findUnique({
        where: {
          id: newTrack.albumId,
        },
      });
      if (!currentAlbum) {
        throw new NotFoundException('Album not found');
      }
    }

    if (newTrack.artistId != null) {
      const currentArtist = await this.prisma.artist.findUnique({
        where: {
          id: newTrack.artistId,
        },
      });
      if (!currentArtist) {
        throw new NotFoundException('Artist not found');
      }
    }

    return this.prisma.track.update({
      where: id,
      data: {
        ...(newTrack.name !== undefined && { name: newTrack.name }),
        ...(newTrack.duration !== undefined && { duration: newTrack.duration }),
        ...(newTrack.albumId !== undefined && { albumId: newTrack.albumId }),
        ...(newTrack.artistId !== undefined && { artistId: newTrack.artistId }),
      },
    });
  }

  //DELETE
  async deleteTrack(id: string): Promise<Track | null> {
    const currentTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!currentTrack) {
      return null;
    }

    const favorites = await this.prisma.favorites.findFirst();

    if (favorites && favorites.tracks.includes(id)) {
      await this.favorite.deleteFavTrack(id);
    }

    return this.prisma.track.delete({ where: { id } });
  }
}
