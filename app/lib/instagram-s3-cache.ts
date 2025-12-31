import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET!;
const KEY = "instagram.json"; // ← UN SOLO ARCHIVO, se sobreescribe siempre

async function streamToString(stream: any): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

export async function writeInstagramCache(data: any) {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: KEY,
        Body: JSON.stringify(data), // 🔑 CLAVE
        ContentType: "application/json", // 🔑 CLAVE
      })
    );
  } catch (error) {
    console.error("Error writing Instagram cache to S3", error);
  }
}

export async function readInstagramCache() {
  try {
    const res = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: KEY,
      })
    );

    const body = await streamToString(res.Body);
    return JSON.parse(body);
  } catch {
    return null;
  }
}
