import axios from "axios";
import qs from "qs";

const requesSpotifyToken = async () => {
  let data = qs.stringify({
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  let config = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  };

  const res = await axios.request<{ access_token: string; expires_in: number }>(
    config
  );
  return res.data;
};

export default requesSpotifyToken;
