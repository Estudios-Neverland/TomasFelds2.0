import React from "react";
import { SmartImage } from "./ui/SmartImage";

interface ProductNvProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
}

export const ProductNv: React.FC<ProductNvProps> = ({
  imageSrc,
  imageAlt,
  title,
  text,
}) => {
  return (
    <section className="w-full bg-dark text-white pb-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-10">
        {/* Imagen */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative rounded-xl overflow-hidden border border-primary">
            <SmartImage
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left gap-8">
          <h2 className="font-bold text-2xl lg:text-3xl xl:text-5xl text-start">
            {title}
          </h2>

          <p className="text-sm lg:text-xl 2xl:text-2xl">{text}</p>
        </div>
      </div>
    </section>
  );
};
