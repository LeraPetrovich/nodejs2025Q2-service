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

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export type { FavoritesResponse };
