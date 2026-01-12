import React from "react";
import { CardNv } from "./CardNv";
import { ButtonNv } from "./ButtonNv";

interface FunnelProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonTextColor?: "light" | "dark";
  imageFunnel: { src: string; alt: string }[];
}

export const FunnelNv: React.FC<FunnelProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  buttonTextColor,
  imageFunnel,
}) => {
  return (
    <section className="w-full px-4 xl:px-0 lg:pb-28 bg-dark h-auto text-white flex flex-col items-center lg:justify-start justify-around overflow-x-hidden transition-all duration-300">
      <div className="flex flex-col w-full px-2 py-4 text-center justify-center items-center lg:max-w-7xl">
        <h3 className="font-bold text-2xl lg:text-3xl xl:text-5xl text-center">
          {title}
        </h3>
        <p className="text-sm lg:text-xl 2xl:text-2xl">{subtitle}</p>
      </div>
      <div
        className="
          w-full
          flex gap-4 
          overflow-x-auto 
          overflow-y-hidden 
          snap-x snap-mandatory 
          scrollbar-hide 
          
          mx-4
          justify-start
          lg:justify-center
          lg:mx-0

          lg:grid
          lg:grid-cols-3
          lg:gap-6
          lg:overflow-visible
          lg:auto-rows-[1fr]
          xl:max-w-6xl 2xl:max-w-7xl
          
        "
      >
        {imageFunnel.map((image, index) => (
          <CardNv
            solid={true}
            variant="horizontal"
            bgimageUrl={image.src}
            key={index}
            className="snap-start shrink-0 h-56 lg:h-full"
          />
        ))}
      </div>
      <ButtonNv
        link={buttonLink}
        className="my-8"
        buttonTextColor={buttonTextColor}
      >
        {buttonText}
      </ButtonNv>
    </section>
  );
};
