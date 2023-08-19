import { toString } from "lodash";
import createCnyShRedirect from "../api/cny-sh/create-redirect";
import performSpotifySearch from "../api/spotify/perform-spotify-search";
import getSongTitle from "../utils/get-song-title";
import replaceLastOccurrence from "../utils/replace-last-occurence";
import { Request, Response } from "express";
import debug from "../utils/debug-log";

export default async (req: Request, res: Response) => {
  const requestId = `${Math.floor(Math.random() * 1000) + 1}`;
  try {
    const url = new URL(toString(req.body.url));
    const appleMusicId = url.searchParams.get("i");

    debug(requestId, "Starting conversion...", { url, appleMusicId });

    if (!appleMusicId) {
      debug(requestId, 'No "i" parameter found in URL.', { url });
      res.status(400).send();
      return;
    }

    const songTitle = replaceLastOccurrence(
      (await getSongTitle(toString(url))) || "",
      " by ",
      ", "
    );

    debug(requestId, "Song title", { songTitle });

    const searchResult = await performSpotifySearch(songTitle, 1, "DE");
    const spotifyItem = searchResult?.tracks?.items[0];
    const spotifyUrl = spotifyItem?.external_urls?.spotify;

    if (!spotifyUrl) {
      debug(requestId, "No Spotify URL found");
      res.status(404).send();
      return;
    } else {
      debug(requestId, "Spotify URL", { spotifyUrl });
    }

    const cnyUrl = await createCnyShRedirect(spotifyUrl);

    debug(requestId, "CNY.SH URL", { cnyUrl });

    res.status(200).send({
      appleMusicId,
      songTitle,
      spotifyUrl,
      redirectUrl: cnyUrl.redirect,
    });
  } catch (error) {
    debug(requestId, "Error", { error });
    res.status(400).send();
  }
};
