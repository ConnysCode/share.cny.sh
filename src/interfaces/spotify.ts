export interface ISpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ISpotifySearchResult {
  tracks: ISpotifyTracks;
}

export interface ISpotifyTracks {
  href: string;
  items: ISpotifyItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface ISpotifyItem {
  album: ISpotifyAlbum;
  artists: ISpotifyArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ISpotifyExternalIDS;
  external_urls: ISpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
}

export interface ISpotifyAlbum {
  album_type: string;
  artists: ISpotifyArtist[];
  external_urls: ISpotifyExternalUrls;
  href: string;
  id: string;
  images: ISpotifyImage[];
  is_playable: boolean;
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ISpotifyArtist {
  external_urls: ISpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ISpotifyExternalUrls {
  spotify: string;
}

export interface ISpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface ISpotifyExternalIDS {
  isrc: string;
}
