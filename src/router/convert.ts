import createCnyShRedirect from "../api/cny-sh/create-redirect";
import performSpotifySearch from "../api/spotify/perform-spotify-search";
import getSongTitle from "../utils/get-song-title";
import debug from "../utils/debug-log";
import { Context } from "elysia";
import { random, isEmpty, get, toString } from "lodash";
import replaceLastOccurrence from "../utils/replace-last-occurence";

type reqBody = {
  url?: string;
};

export default async ({ body, set }: Context) => {
  const { url } = body as reqBody;
  if (!url) {
    set.status = 400;
    return;
  }

  const requestId = `${random(1, 1000)}`;

  try {
    const urlObject = new URL(toString(url));
    const appleMusicId = urlObject.searchParams.get("i");

    debug(requestId, "Starting conversion...", { url: urlObject, appleMusicId });

    if (isEmpty(appleMusicId)) {
      debug(requestId, 'No "i" parameter found in URL.', { url: urlObject });
      set.status = 400;
      return;
    }

    const songTitle = replaceLastOccurrence(
      (await getSongTitle(toString(urlObject))) || "",
      " by ",
      ", "
    );

    debug(requestId, "Song title", { songTitle });

    const searchResult = await performSpotifySearch(songTitle, 1, "DE");
    const spotifyUrl = get(searchResult, "tracks.items[0].external_urls.spotify");

    if (!spotifyUrl) {
      debug(requestId, "No Spotify URL found");
      set.status = 404;
      return;
    } else {
      debug(requestId, "Spotify URL", { spotifyUrl });
    }

    const cnyUrl = await createCnyShRedirect(spotifyUrl);

    debug(requestId, "CNY.SH URL", { cnyUrl });

    set.status = 200;
    return {
      appleMusicId,
      songTitle,
      spotifyUrl,
      redirectUrl: cnyUrl.redirect,
    };
  } catch (error) {
    debug(requestId, "Error", { error });
    set.status = 400;
    return;
  }
};
