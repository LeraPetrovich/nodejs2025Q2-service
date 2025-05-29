import { favorites } from 'src/db/db';
import { albums, artists, tracks } from 'src/db/db';
import { FavoritesResponse } from 'src/db/types';

export const getFavorites = (): FavoritesResponse => {
  const currentTracks = tracks.filter((item) =>
    favorites.tracks.includes(item.id),
  );
  const currentAlbum = albums.filter((item) =>
    favorites.albums.includes(item.id),
  );
  const currentArtist = artists.filter((item) =>
    favorites.artists.includes(item.id),
  );

  return {
    artists: currentArtist,
    albums: currentAlbum,
    tracks: currentTracks,
  };
};
