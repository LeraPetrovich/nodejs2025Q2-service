import { tracks, favorites } from 'src/db/db';

const checkFavTrack = (id: string) => {
  const index = favorites.tracks.findIndex((item) => item === id);
  if (index !== -1) {
    favorites.tracks.splice(index, 1);
  }
};

export const deleteTrack = (id: string) => {
  const index = tracks.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }

  checkFavTrack(id);
  const [deleteTrack] = tracks.splice(index, 1);
  return deleteTrack;
};
