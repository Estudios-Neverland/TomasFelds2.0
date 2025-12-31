import React from "react";

type SpotifyEmbedProps = {
  id: string;
  title?: string;
  url: string;
  height?: number;
  className?: string;
  imageUrlDesktop?: string;
  children?: React.ReactNode;
};

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  id,
  title,
  className,
  url,
  height = 152,
  imageUrlDesktop,
}) => {
  return (
    <section
      style={{
        backgroundImage: `url(${imageUrlDesktop})`,
      }}
      className="relative bg-cover bg-center w-full px-6 pt-16 mb-6 lg:mb-10"
      id={id}
    >
      {/* Fade superior */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-linear-to-b from-dark to-transparent" />

      {/* Fade inferior */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-dark to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto text-white">
        {title && (
          <h3 className="font-bold text-2xl lg:text-3xl xl:text-5xl text-center pb-4">
            {title}
          </h3>
        )}

        <div className={`flex justify-center ${className ?? ""}`}>
          <div
            className={`w-full max-w-7xl m-auto
    ${className}`}
          >
            <iframe
              src={`https://open.spotify.com/embed/${url}`}
              width="100%"
              height={height}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifyEmbed;
