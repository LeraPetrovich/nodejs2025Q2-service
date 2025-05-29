import { Injectable } from '@nestjs/common';
import { tracks } from 'src/db/db';
import type { Track } from 'src/db/types';
import { CreateTrack } from 'src/validate/CreateTrack';
import { createTrackUtils } from './utils/createTrack';
import { updateTrackUtils } from './utils/updateTrack';
import { deleteTrack } from './utils/deleteTrack';

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
    return deleteTrack(id);
  }
}
