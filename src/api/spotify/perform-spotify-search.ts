import axios from "axios";
import { getSpotifyAccessToken } from "../../cache/spotify-access-cache";
import { ISpotifySearchResult } from "../../interfaces/spotify";

const performSpotifySearch = async (
  searchTerm: string,
  limit: number = 1,
  market: string = "DE"
) => {
  const token = await getSpotifyAccessToken();
  if (!token) {
    throw new Error("No token found");
  }

  let config = {
    method: "get",
    url: `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&market=${market}&limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const searchRes = await axios.request<ISpotifySearchResult>(config);

  return searchRes.data;
};

export default performSpotifySearch;
