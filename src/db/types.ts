interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export type { User, Artist, Track, Album, Favorites, FavoritesResponse };
