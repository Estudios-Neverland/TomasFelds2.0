import React from "react";
import { CardNv } from "./CardNv";

interface BannerProps {
  imageBanner?: string;
}

export const BannerNv: React.FC<BannerProps> = ({ imageBanner }) => {
  return (
    <section className="bg-dark w-full px-8 lg:px-6 2xl:px-0 pb-12 lg:pb-16">
      <div className="grid grid-cols-2 gap-4 xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Abajo full ancho */}
        <CardNv
          variant="banner"
          bgimageUrl={imageBanner}
          className="w-full col-span-2"
        />
      </div>
    </section>
  );
};
