import { toString } from "lodash";
import ogs from "open-graph-scraper";

const getSongTitle = async (appleMusicUrl: string) => {
  const url = toString(appleMusicUrl);

  const opg = await ogs({ url });
  if (opg.error) {
    throw new Error("Couldn't resolve song title");
  }

  const ogTitle = opg.result.ogTitle;

  return ogTitle;
};

export default getSongTitle;
