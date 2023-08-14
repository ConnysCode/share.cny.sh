import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import ogs from "open-graph-scraper";
import { toString } from "lodash";
import getSongTitle from "./utils/get-song-title";
import replaceLastOccurrence from "./utils/replace-last-occurence";
import requesSpotifyToken from "./api/spotify/request-spotify-token";
import performSpotifySearch from "./api/spotify/perform-spotify-search";
import createCnyShRedirect from "./api/cny-sh/create-redirect";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("share.cny.sh");
});

app.get("/convert", async (req: Request, res: Response) => {
  try {
    const url = new URL(toString(req.body.url));
    const appleMusicId = url.searchParams.get("i");

    if (!appleMusicId) {
      res.status(400).send();
    }

    const songTitle = replaceLastOccurrence(
      (await getSongTitle(toString(url))) || "",
      " by ",
      ", "
    );

    const searchResult = await performSpotifySearch(songTitle, 1, "DE");
    const spotifyUrl = searchResult.tracks.items[0];
    if (!spotifyUrl) {
      res.status(404).send();
    }

    const cnyUrl = await createCnyShRedirect(spotifyUrl.external_urls.spotify);

    res.status(200).send({
      appleMusicId,
      songTitle,
      spotifyUrl: spotifyUrl.external_urls.spotify,
      redirectUrl: cnyUrl.redirect,
    });
  } catch (error) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`share.cny.sh is running on port ${port}`);
});
