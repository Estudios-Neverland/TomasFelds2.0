import { NextResponse } from "next/server";
import {
  readInstagramCache,
  writeInstagramCache,
} from "@/app/lib/instagram-s3-cache";

const IG_USER_ID = process.env.IG_USER_ID!;
const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN!;

export async function GET() {
  try {
    const url =
      `https://graph.instagram.com/v24.0/${IG_USER_ID}/media` +
      `?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp` +
      `&limit=12&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Instagram API error");

    const json = await res.json();

    const normalized = json.data.map((item: any) => ({
      id: item.id,
      type: item.media_type,
      permalink: item.permalink,
      caption: item.caption ?? "",
      image: item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
    }));

    // 👉 Guarda SIEMPRE lo último válido
    await writeInstagramCache(normalized);

    return NextResponse.json(normalized);
  } catch (error) {
    console.warn("Instagram API failed, using S3 cache");

    const cached = await readInstagramCache();

    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }

    // Si no hay cache → no rompemos el sitio
    return NextResponse.json([], { status: 200 });
  }
}
