import { albums, tracks, favorites } from 'src/db/db';

const clearAlbumFromTracks = (albumId: string) => {
  for (const track of tracks) {
    if (track.albumId === albumId) {
      track.albumId = null;
    }
  }
};

const checkFavAlbum = (id: string) => {
  const index = favorites.albums.findIndex((item) => item === id);
  if (index !== -1) {
    favorites.albums.splice(index, 1);
  }
};

export const deleteAlbumUtils = (id: string) => {
  const index = albums.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  clearAlbumFromTracks(id);
  checkFavAlbum(id);
  const [deleteAlbum] = albums.splice(index, 1);
  return deleteAlbum;
};
