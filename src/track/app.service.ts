import { Injectable } from '@nestjs/common';
import { tracks } from 'src/db/db';
import type { Track } from 'src/db/types';
import { CreateTrack } from 'src/validate/CreateTrack';
import { createTrackUtils } from './utils/createTrack';
import { updateTrackUtils } from './utils/updateTrack';

@Injectable()
export class AppService {
  getTracks(): Track[] {
    return tracks;
  }
  getTrack(id: string): Track {
    return tracks.find((item) => item.id === id);
  }
  createTrack(track: CreateTrack) {
    return createTrackUtils(track);
  }
  updateTrack(id: string, newTrack: CreateTrack): Track | undefined {
    return updateTrackUtils(id, newTrack);
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
