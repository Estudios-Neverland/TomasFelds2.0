"use client";

import React from "react";
import { ButtonNv } from "./ButtonNv";

interface NewsletterProps {
  title?: string;
  buttonText?: string;
  onOpenPopup?: () => void;
}

export const NewsLetterNv: React.FC<NewsletterProps> = ({
  title,
  buttonText,
  onOpenPopup,
}) => {
  return (
    <section className="bg-light w-dvw flex justify-center h-fit py-4">
      <div className="max-w-6xl w-full bg-light text-dark flex flex-col lg:flex-row items-center lg:justify-between gap-4 lg:gap-0">
        <p className="text-center font-bold px-4 lg:px-0">{title}</p>

        <ButtonNv
          variant="dark"
          buttonTextColor="light"
          className="p-4 lg:px-8"
          onClick={onOpenPopup}
        >
          {buttonText}
        </ButtonNv>
      </div>
    </section>
  );
};
