import dotenv from "dotenv";

dotenv.config();

export async function getMostPopular(req, res) {
  const regionCode = req.query.regionCode;

  const url = new URL(process.env.URL);

  url.search = new URLSearchParams({
    part: process.env.PART,
    chart: process.env.CHART,
    regionCode: regionCode,
    videoCategoryId: process.env.VIDEO_CATEGORY_ID,
    maxResults: process.env.MAX_RESULTS,
    key: process.env.YOUTUBE_API_KEY,
  });

  const response = await fetch(url);
  const data = await response.json();
  return res.json(data);
}
