import { albums, tracks, artists } from 'src/db/db';

const createNullArtistInTracks = (id: string) => {
  tracks.forEach((track) => {
    if (track.artistId === id) {
      track.artistId = null;
    }
  });
};

const createNullArtistInAlbums = (id: string) => {
  albums.forEach((album) => {
    if (album.artistId === id) {
      album.artistId = null;
    }
  });
};

export const deleteArtistUtils = (id: string) => {
  const index = artists.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  createNullArtistInTracks(id);
  createNullArtistInAlbums(id);
  const [deleteArtist] = artists.splice(index, 1);
  return deleteArtist;
};
