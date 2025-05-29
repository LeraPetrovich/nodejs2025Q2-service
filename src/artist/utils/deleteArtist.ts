import { albums, tracks, artists, favorites } from 'src/db/db';

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

const checkFavArtists = (id: string) => {
  const currentArtist = favorites.artists.findIndex((item) => item === id);
  if (currentArtist !== -1) {
    favorites.artists.splice(currentArtist, 1);
  }
};

export const deleteArtistUtils = (id: string) => {
  const index = artists.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  createNullArtistInTracks(id);
  createNullArtistInAlbums(id);
  checkFavArtists(id);
  const [deleteArtist] = artists.splice(index, 1);
  return deleteArtist;
};
