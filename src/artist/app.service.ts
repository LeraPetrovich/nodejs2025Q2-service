import { Injectable } from '@nestjs/common';
import { CreateArtistTo } from 'src/validate/CreateNewArtist';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import type { Prisma, Artist } from '@prisma/client';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getArtists(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }
  async getArtist(id: Prisma.ArtistWhereUniqueInput): Promise<Artist | null> {
    return this.prisma.artist.findUnique({ where: id });
  }
  async createArtist(artist: CreateArtistTo): Promise<Artist> {
    const id = uuidv4();
    const newArtistData: Prisma.ArtistUncheckedCreateInput = {
      id,
      grammy: artist.grammy,
      name: artist.name,
    };
    const newArtist = this.prisma.artist.create({ data: newArtistData });
    return newArtist;
  }
  async updateArtist(
    id: Prisma.ArtistWhereUniqueInput,
    artistBody: CreateArtistTo,
  ) {
    const artist = await this.prisma.artist.findUnique({ where: id });
    if (!artist) {
      return null;
    }
    return this.prisma.artist.update({
      where: id,
      data: {
        ...(artistBody.name !== undefined && { name: artistBody.name }),
        ...(artistBody.grammy !== undefined && { grammy: artistBody.grammy }),
      },
    });
  }
  async deleteArtist(id: string): Promise<Artist | null> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      return null;
    }

    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    const tracks = await this.prisma.track.findMany();
    console.log(tracks);

    const favoritesUpdate = await this.prisma.favorites.findMany({
      where: { artists: { has: id } },
    });

    await Promise.all(
      favoritesUpdate.map((fav) =>
        this.prisma.favorites.update({
          where: { id: fav.id },
          data: {
            artists: fav.artists.filter((artistId) => artistId !== id),
          },
        }),
      ),
    );

    return this.prisma.artist.delete({ where: { id } });
  }
}
