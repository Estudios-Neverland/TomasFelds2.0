"use client";
import { useEffect, useState } from "react";
import { SmartImage } from "@/app/components/nv-ui/ui/SmartImage";

interface InstaPost {
  id: string;
  type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  image: string;
  permalink: string;
  caption?: string;
}

interface InstagramProps {
  id: string;
  title?: string;
  imageUrlDesktop?: string;
}

export default function Instagram({
  id,
  title,
  imageUrlDesktop,
}: InstagramProps) {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: InstaPost[]) => {
        if (!Array.isArray(data) || data.length === 0) {
          setHasError(true);
          return;
        }

        setPosts(data.slice(0, 12));
      })
      .catch(() => setHasError(true));
  }, []);

  if (hasError || posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      {title && (
        <h3 className="font-bold text-2xl xl:text-4xl 2xl:text-6xl text-center mb-10">
          {title}
        </h3>
      )}
      <div
        style={{
          backgroundImage: `url(${imageUrlDesktop})`,
        }}
        className="relative w-full flex justify-center py-10 px-8 lg:px-6"
        id={id}
      >
        <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-linear-to-b from-dark to-transparent" />

        {/* Fade inferior */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-dark to-transparent" />
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-3 sm:grid-cols-4 border-2 border-light rounded-xl overflow-hidden ">
            {posts.map((post, index) => {
              const cornerRadius = [
                // Siempre
                index === 0 && "rounded-tl-xl",
                index === posts.length - 1 && "rounded-br-xl",

                // 📱 Mobile (3 cols)
                index === 2 && "rounded-tr-xl sm:rounded-none",
                index === 9 && "rounded-bl-xl sm:rounded-none",

                // 🖥 Desktop (4 cols)
                index === 3 && "sm:rounded-tr-xl",
                index === 8 && "sm:rounded-bl-xl",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative aspect-3/4 overflow-hidden group ${cornerRadius}`}
                >
                  <SmartImage
                    src={post.image}
                    alt={post.caption ?? "Instagram post"}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
