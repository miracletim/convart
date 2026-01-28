import dotenv from "dotenv";

dotenv.config();

export async function getMostPopular(req, res) {
  const {
    part = "snippet,statistics",
    chart = "mostPopular",
    regionCode = "UG",
    videoCategoryId = "10",
    maxResults = 10,
  } = req.body;

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");

  url.search = new URLSearchParams({
    part,
    chart,
    regionCode,
    videoCategoryId,
    maxResults,
    key: process.env.YOUTUBE_API_KEY,
  });

  const response = await fetch(url);
  const data = await response.json();
  return res.json(data);
}
