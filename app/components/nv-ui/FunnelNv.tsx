import React from "react";
import { CardNv } from "./CardNv";
import { ButtonNv } from "./ButtonNv";

interface FunnelProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonTextColor?: "dark" | "light";
  imageFunnel: { src: string; alt: string }[];
}

export const FunnelNv: React.FC<FunnelProps> = ({
  title,
  subtitle,
  buttonText,
  imageFunnel,
  buttonTextColor = "dark",
}) => {
  return (
    <section className="w-full px-8 lg:px-6 2xl:px-0 mb-6 lg:mb-10 bg-dark h-auto text-white flex flex-col items-center lg:justify-start justify-around overflow-x-hidden transition-all duration-300">
      <div className="flex flex-col w-full px-2 py-4 text-center justify-center items-center lg:max-w-7xl">
        <h3 className="font-bold text-2xl lg:text-2xl xl:text-4xl 2xl:text-6xl">
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
          px-8
          lg:px-6
          2xl:px-0
          justify-start
          lg:justify-center
          lg:mx-0

          lg:grid
          lg:grid-cols-3
          lg:gap-6
          lg:overflow-visible
          lg:auto-rows-[1fr]
          lg:max-w-7xl
          
        "
      >
        {imageFunnel.map((image, index) => (
          <CardNv
            solid={true}
            variant="horizontal"
            bgimageUrl={image.src}
            key={index}
            className="snap-start shrink-0"
          />
        ))}
      </div>
      <ButtonNv link="#" className="my-8" buttonTextColor={buttonTextColor}>
        {buttonText}
      </ButtonNv>
    </section>
  );
};
