import { Track, Artist, Album, Favorites } from './types';
export const tracks: Track[] = [
  {
    id: 'c569ae1a-7152-4c4d-8228-b84c1d0df816',
    name: 'Test track 1',
    artistId: null,
    albumId: null,
    duration: 300,
  },
  {
    id: '6549d606-8846-436a-8dd4-023b795ddb96',
    name: 'Test track 2',
    artistId: null,
    albumId: null,
    duration: 5000,
  },
];
export const artists: Artist[] = [
  {
    id: '7e1d3d31-d63f-42bc-9075-61455b230a10',
    grammy: false,
    name: 'Test artist 1',
  },
  {
    id: 'a12d40fe-d9ae-4a84-b148-993abbb4b854',
    grammy: true,
    name: 'Test artist 2',
  },
  {
    id: 'a12d40fe-d9ae-4a84-b148-993abbb4b859',
    grammy: true,
    name: 'Test artist 3',
  },
];
export const albums: Album[] = [
  {
    id: '42ef12ba-2ea2-45d8-818e-274be21e2f58',
    name: 'Test albums 1',
    year: 5,
    artistId: null,
  },
  {
    id: 'c0ede474-9a5e-4084-ae63-23901e937c62',
    name: 'Test albums 1',
    year: 5,
    artistId: null,
  },
];
export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
