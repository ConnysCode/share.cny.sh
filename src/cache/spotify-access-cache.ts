import NodeCache from "node-cache";
import requesSpotifyToken from "../api/spotify/request-spotify-token";
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const saveSpotifyAccessToken = (token: string, ttl: number) => {
  cache.set("token", token, ttl);
};

const getSpotifyAccessToken = async () => {
  const currentToken = cache.get("token");
  if (currentToken) return currentToken;

  try {
    const tokenResponse = await requesSpotifyToken();
    saveSpotifyAccessToken(
      tokenResponse.access_token,
      tokenResponse.expires_in
    );
    return tokenResponse.access_token;
  } catch (error) {
    return null;
  }
};

export { saveSpotifyAccessToken, getSpotifyAccessToken };
