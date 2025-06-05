import { Injectable } from '@nestjs/common';
import { CreateNewAlbumTo } from 'src/validate/CreateNewAlbum';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from 'src/prisma.service';
import type { Prisma, Album } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  //GET
  async getAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  //GET:id

  getAlbum(id: Prisma.AlbumWhereUniqueInput): Promise<Album> {
    return this.prisma.album.findUnique({ where: id });
  }

  //POST

  async createAlbum(newAlbum: CreateNewAlbumTo): Promise<Album> {
    if (newAlbum.artistId !== null) {
      const currentArtist = await this.prisma.artist.findUnique({
        where: { id: newAlbum.artistId },
      });
      if (!currentArtist) {
        throw new NotFoundException('Artist not found');
      }
    }

    const id = uuidv4();
    const newData: Prisma.AlbumUncheckedCreateInput = {
      id,
      name: newAlbum.name,
      year: newAlbum.year,
      artistId: newAlbum.artistId ? newAlbum.artistId : null,
    };
    return this.prisma.album.create({ data: newData });
  }

  //PUT

  async updateAlbum(
    id: Prisma.AlbumWhereUniqueInput,
    newAlbum: CreateNewAlbumTo,
  ): Promise<Album | null> {
    const currentAlbum = await this.prisma.album.findUnique({ where: id });

    if (!currentAlbum) {
      return null;
    }

    if (newAlbum.artistId !== null) {
      const currentArtist = await this.prisma.artist.findUnique({
        where: { id: newAlbum.artistId },
      });
      if (!currentArtist) {
        throw new NotFoundException('Artist not found');
      }
    }

    return this.prisma.album.update({
      where: id,
      data: {
        name: newAlbum.name,
        year: newAlbum.year,
        artistId: newAlbum.artistId,
      },
    });
  }

  //DELETE

  async deleteAlbum(id: string): Promise<Album | null> {
    const currentAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!currentAlbum) {
      return null;
    }

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    const favoritesUpdate = await this.prisma.favorites.findMany({
      where: { albums: { has: id } },
    });

    await Promise.all(
      favoritesUpdate.map((fav) =>
        this.prisma.favorites.update({
          where: { id: fav.id },
          data: {
            albums: fav.albums.filter((albumId) => albumId !== id),
          },
        }),
      ),
    );

    return this.prisma.album.delete({ where: { id } });
  }
}
