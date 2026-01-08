"use client";

import React, { useState } from "react";
import MauticNewsletterForm from "./News-letter-mautic-nv";
import { SmartImage } from "./ui/SmartImage";

interface PopUpNvProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "cta" | "form";
  title: string;
  description: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const PopUpNv: React.FC<PopUpNvProps> = ({
  isOpen,
  onClose,
  variant,
  title,
  description,
  imageUrl,
  mobileImageUrl,
  ctaText,
  ctaLink,
}) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCTAClick = () => {
    if (ctaLink) window.location.href = ctaLink;
    onClose();
  };

  const handleSuccess = () => {
    setSubmitted(true); // Cambiar a modo "éxito"
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-[95%] max-w-4xl bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl">
        <div className="md:w-1/2 w-full h-[300px] md:h-auto hidden lg:block">
          <SmartImage
            src={imageUrl}
            alt="popup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full  md:h-auto block lg:hidden">
          <SmartImage
            src={mobileImageUrl || imageUrl}
            alt="popup"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-6 flex flex-col justify-center gap-6 text-center relative text-dark">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-xl font-bold text-zinc-500 hover:text-black"
          >
            ✕
          </button>

          {!submitted && (
            <>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-zinc-600">{description}</p>

              {variant === "cta" && (
                <button
                  onClick={handleCTAClick}
                  className="mx-auto bg-[#b3003c] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  {ctaText}
                </button>
              )}

              {variant === "form" && (
                <MauticNewsletterForm onSubmitSuccess={handleSuccess} />
              )}
            </>
          )}

          {submitted && (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-bold text-dark">
                Registrado exitosamente
              </h2>

              <p className="text-dark">
                Gracias por registrarte. Pronto recibiras novedades en tu
                correo.
              </p>

              <button
                onClick={onClose}
                className="mx-auto bg-primary text-dark px-6 py-3 rounded-[10px] font-semibold hover:opacity-90 transition cursor-pointer w-8/10"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
