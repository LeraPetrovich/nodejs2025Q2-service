import { Injectable } from '@nestjs/common';
import { tracks } from 'src/db/db';
import type { Track } from 'src/db/types';
import { CreateTrack } from 'src/validate/CreateTrack';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  getTracks(): Track[] {
    return tracks;
  }
  getTrack(id: string): Track {
    return tracks.find((item) => item.id === id);
  }
  createTrack(track: CreateTrack) {
    const id = uuidv4();
    const newTrack = {
      id,
      name: track.name,
      artistId: track.artistId || null,
      albumId: track.albumId || null,
      duration: track.duration,
    };
    tracks.push(newTrack);
    return newTrack;
  }
  updateTrack(id: string, newTrack: CreateTrack): Track | undefined {
    const track = tracks.find((item) => item.id === id);
    if (!track) return;

    if ('name' in newTrack) {
      track.name = newTrack.name;
    }

    if ('duration' in newTrack) {
      track.duration = newTrack.duration;
    }

    if ('albumId' in newTrack) {
      track.albumId = newTrack.albumId;
    }

    if ('artistId' in newTrack) {
      track.artistId = newTrack.artistId;
    }

    return track;
  }
  
  deleteTrack(id: string) {
    const index = tracks.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }

    const [deleteTrack] = tracks.splice(index, 1);
    return deleteTrack;
  }
}
