import dotenv from "dotenv";
dotenv.config();
import { supabase } from "../config/superbase.js";

export async function getMostPopular(req, res) {
  const region = req.query.regionCode;

  const { error } = await supabase
    .from("requestlogs")
    .insert({ route: req.path, region: req.query.regionCode });

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");

  url.search = new URLSearchParams({
    part: process.env.PART,
    chart: process.env.CHART,
    regionCode: region,
    videoCategoryId: process.env.VIDEO_CATEGORY_ID,
    maxResults: process.env.MAX_RESULTS,
    key: process.env.YOUTUBE_API_KEY,
  }).toString();

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !Array.isArray(data.items)) {
    console.error("YouTube error:", data);
    return res.status(500).json(data);
  }

  const videos = data.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl:
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url,
    viewCount: item.statistics.viewCount,
    publishedAt: item.snippet.publishedAt,
    videoUrl: process.env.VIDEO_URL + item.id,
  }));

  return res.status(200).json({ region, videos });
}
