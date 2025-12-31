"use client";

import React from "react";
import { ButtonNv } from "./ButtonNv";
import { SmartImage } from "./ui/SmartImage";

interface CardProps {
  title?: string;
  description?: string;
  variant?: "default" | "plan" | "solid" | "banner" | "horizontal";
  children?: React.ReactNode;
  plantext?: string;
  buttontext?: string;
  buttonlink?: string;
  solid?: boolean;
  className?: string;
  bgimageUrl?: string;
  link?: string;
}

export const CardNv: React.FC<CardProps> = ({
  title,
  description,
  variant = "default",
  plantext,
  buttontext,
  buttonlink,
  solid = false,
  className,
  bgimageUrl,
  children,
  link,
}) => {
  const baseClasses = `
    relative 
    w-9/10 
    lg:w-auto
    rounded-[10px] shadow-md
    ${
      variant === "horizontal"
        ? "aspect-4/3"
        : variant === "banner"
        ? "aspect-[3.5/1]"
        : "aspect-4/5"
    }
    ${solid ? "border-2 border-primary" : ""}
    overflow-hidden
    shrink-0  
    ${className}
  `;

  const Wrapper: React.ElementType = link ? "a" : "div";
  const wrapperProps = link ? { href: link } : {};

  return (
    <Wrapper className={baseClasses} {...wrapperProps}>
      {/* Imagen optimizada */}
      {bgimageUrl && (
        <SmartImage
          src={bgimageUrl}
          alt={title ?? "Card image"}
          fill
          className="absolute inset-0 w-full h-full object-cover"
          sizes={
            variant === "banner" ? "100vw" : "(min-width: 1024px) 33vw, 80vw"
          }
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Contenido */}
      <div className="relative z-10 p-4 flex flex-col h-full justify-between items-center">
        {variant === "plan" && (
          <div className="flex font-bold">
            <h3 className="bg-light text-dark px-2 py-1 text-sm rounded-l-xl lg:text-xl">
              NeverPass
            </h3>
            <span className="bg-dark text-light px-2 py-1 text-sm rounded-r-xl lg:text-xl">
              {title}
            </span>
          </div>
        )}

        <div className="w-full flex flex-col items-center mt-4 mb-2">
          <p className="text-primary lg:text-xl">{plantext}</p>
          <p className="font-bold text-sm mb-2 lg:text-xl">{description}</p>

          {variant === "plan" && (
            <ButtonNv
              variant="primary"
              link={buttonlink || "#"}
              buttonTextColor="dark"
              className="w-4/5 text-sm xl:text-xl"
            >
              {buttontext}
            </ButtonNv>
          )}
        </div>

        {children}
      </div>
    </Wrapper>
  );
};
