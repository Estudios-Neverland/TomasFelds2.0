interface YouTubeEmbedProps {
  id: string;
  videoUrl: string;
  title?: string;
}

export default function YouTubeEmbed({
  videoUrl,
  title,
  id,
}: YouTubeEmbedProps) {
  // Extraer el ID del video desde distintas formas de URL
  const extractVideoId = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.slice(1);
      }
      if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v");
      }
      return null;
    } catch {
      return null;
    }
  };

  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-nv">
        URL de YouTube no válida
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section
      className="w-full mx-auto max-w-7xl mb-6 lg:mb-10 px-8 lg:px-6 2xl:px-0"
      id={id}
    >
      <h3 className="font-bold text-2xl lg:text-3xl xl:text-5xl text-center text-light mb-6">
        {title}
      </h3>
      <div className="relative w-full overflow-hidden rounded-nv shadow-lg aspect-video block max-w-7xl">
        <iframe
          src={embedUrl}
          title={title || "YouTube video player"}
          className="absolute top-0 left-0 w-full h-full rounded-2xl border-2 border-light"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}
