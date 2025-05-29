import {
  User,
  Track,
  Artist,
  Album,
  FavoritesResponse,
  Favorites,
} from './types';

export const users: User[] = [];
export const tracks: Track[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
