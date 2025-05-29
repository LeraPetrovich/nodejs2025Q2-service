import { albums, tracks } from 'src/db/db';

const clearAlbumFromTracks = (albumId: string) => {
  for (const track of tracks) {
    if (track.albumId === albumId) {
      track.albumId = null;
    }
  }
};

export const deleteAlbumUtils = (id: string) => {
  const index = albums.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  clearAlbumFromTracks(id);
  const [deleteAlbum] = albums.splice(index, 1);
  return deleteAlbum;
};
