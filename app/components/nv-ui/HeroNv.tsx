import React from "react";
import { ButtonNv } from "./ButtonNv";
import { SmartImage } from "./ui/SmartImage";

interface HeroBannerProps {
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  ctaText: string;
  ctaLink: string;
  imageUrlDesktop: string;
  imageUrlMobile?: string;
  imageUrl?: string;
  imageAlt?: string;
  buttonTextColor?: "dark" | "light";
}

export const HeroBannerNv: React.FC<HeroBannerProps> = ({
  title1,
  title2,
  description1,
  description2,
  ctaText,
  ctaLink,
  imageUrlDesktop,
  imageUrlMobile,
  imageUrl,
  imageAlt = "Hero Image",
  buttonTextColor = "light",
}) => {
  return (
    <section
      style={
        {
          "--bg-mobile": `url(${imageUrlMobile})`,
          "--bg-desktop": `url(${imageUrlDesktop})`,
        } as React.CSSProperties
      }
      className="
    w-svw h-svh
    bg-(image:--bg-mobile)
    lg:bg-(image:--bg-desktop)
    bg-cover bg-center bg-no-repeat
    lg:px-20 xl:px-36
    text-light
    flex flex-col lg:flex-row-reverse
    items-center lg:justify-between justify-around
    overflow-x-hidden
    transition-all duration-300 mb-10
  "
    >
      <div className="h-22 w-full lg:hidden"></div>
      {/* Image */}
      {imageUrl ? (
        <div className="w-11/12 lg:w-1/2 aspect-21/9 lg:aspect-auto lg:h-auto">
          <SmartImage
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-0 lg:w-1/2"></div>
      )}

      {/* Content */}
      <div className="w-full  2xl:w-2/6 max-w-fit px-6 py-10 lg:py-0 flex flex-col items-center lg:items-start justify-center text-center lg:text-left gap-6">
        <h3 className="text-3xl sm:text-4xl md:text-3xl 2xl:text-5xl 2xl:leading-[1.2] min-[1920px]:text-[100px] font-extrabold lg:whitespace-nowrap">
          <span className="lg:block">{title1}</span>
          <span className="lg:block">{title2}</span>
        </h3>
        <div className="">
          <p className="text-base sm:text-lg md:text-2xl lg:text-2xl 2xl:text-2xl font-semibold max-w-xl mt-4 2xl:leading-10 lg:whitespace-nowrap">
            <span className="block">{description1}</span>
            <span className="block">{description2}</span>
          </p>
          <ButtonNv
            variant="primary"
            link={ctaLink}
            buttonTextColor={buttonTextColor}
            className="text-sm sm:text-base w-full lg:w-8/10 2xl:w-full lg:text-xl 2xl:text-2xl px-6 py-2 h-14 lg:h-14 2xl:h-20 mt-4"
          >
            {ctaText}
          </ButtonNv>
        </div>
      </div>
    </section>
  );
};
