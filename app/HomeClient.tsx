"use client";

import { useState } from "react";
import { HeroBannerNv } from "./components/nv-ui/HeroNv";
import { FunnelNv } from "./components/nv-ui/FunnelNv";
import { BannerNv } from "./components/nv-ui/BannerNv";
import { NewsLetterNv } from "./components/nv-ui/NewsLetterNv";
import { PopUpNv } from "./components/nv-ui/PopUpNv";
import { EventSectionNv } from "./components/nv-ui/EventSectionNv";
import { Evento } from "./types/evento";
import { EventsNv } from "./components/nv-ui/EventsNv";

import SpotifyEmbed from "./components/nv-ui/Spotify";
import YouTubeEmbed from "./components/nv-ui/Youtube";
import Instagram from "./components/nv-ui/Instagram";

export default function HomeClient({ eventos }: { eventos: Evento[] }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-dark font-sans ">
      <HeroBannerNv
        title1="Edo Caroe"
        title2="No Tiene Show"
        description1="Prepárate para una experiencia cargada"
        description2="de humor, improvización y risas aseguradas"
        ctaText="Consigue tu ticket"
        ctaLink="#Tickets"
        buttonTextColor="dark"
        imageUrlDesktop="https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/HeroBanners/Tomas+Felds/Header-1.webp"
        imageUrlMobile="https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/HeroBanners/Tomas+Felds/Img-banner-2.webp"
      />
      {eventos.length > 0 && (
        <EventsNv title="Consigue tu ticket" events={eventos} id="Tickets" />
      )}
      <YouTubeEmbed
        id="Youtube"
        videoUrl="https://youtu.be/rSu-uwONxTE?si=JIG-iRXx8fQmK4ms"
        title="Un poco más de mi show"
      />
      <FunnelNv
        title="Tiéntate con este contenido gratis"
        subtitle="y confirma que vale la pena suscribirte"
        buttonText="Obtén tu acceso gratuito"
        buttonTextColor="dark"
        imageFunnel={[
          {
            src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/newFunnel-1.webp",
            alt: "",
          },
          {
            src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/newFunnel-2.webp",
            alt: "",
          },
          {
            src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/newFunnel-3.webp",
            alt: "",
          },
        ]}
      />
      <BannerNv imageBanner="https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/Lolabanner_2520x720.webp" />
      <NewsLetterNv
        title="Novedades, estrenos y sorpresas. Súmate a nuestro newsletter semanal."
        buttonText="Unirme ahora"
        onOpenPopup={() => setIsPopupOpen(true)}
      />
      <PopUpNv
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        variant="form"
        title="Suscríbete a nuestro newsletter"
        description="Recibe novedades, estrenos y contenido exclusivo directo en tu correo."
        imageUrl="https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/imagencardexample1080x1350.jpg"
      />
    </main>
  );
}
