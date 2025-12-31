import React from "react";
import { SmartImage } from "./ui/SmartImage";

interface FooterProps {
  logoDesktop: { src: string; alt: string };
  logoMobile: { src: string; alt: string };
  Links_1?: { text: string; href: string; target?: string }[];
  Links_2?: { text: string; href: string; target?: string }[];
  Contacto?: { text: string; href: string; target?: string }[];
  AppLinks?: { text: string; href: string; target?: string }[];
  Giftcard?: boolean;
  RRSS?: { src: string; href: string; alt: string; target?: string }[];
}

export const FooterNv: React.FC<FooterProps> = ({
  logoDesktop,
  logoMobile,
  Links_1,
  Links_2,
  Contacto,
  AppLinks,
  Giftcard,
  RRSS,
}) => {
  return (
    <footer className="flex flex-col items-center justify-center text-center lg:text-start bg-[#242424] text-light w-full ">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start w-full max-w-7xl lg:h-80 py-10">
        <div className="py-8 lg:py-0 w-full lg:max-w-1/4 flex justify-center lg:justify-start">
          <div className="h-10 flex lg:hidden">
            <SmartImage
              src={logoMobile.src}
              alt={logoMobile.alt}
              className="mx-auto"
            />
          </div>

          <SmartImage
            src={logoDesktop.src}
            alt={logoDesktop.alt}
            className="w-1/2 hidden lg:block"
          />
        </div>
        {Links_1 ? (
          <div className="py-4 lg:py-0 mx-2 lg:mx-0">
            <p className="text-2xl font-bold">Otros sitios de interés</p>
            <ul className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-2 flex-wrap justify-center">
              {Links_1.map((link, i) => (
                <li key={i} className="text-[#cccccc] font-bold">
                  <a href={link.href} target={link.target}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex flex-col justify-between h-full">
          {Links_2 ? (
            <div className="py-4 pb-8 lg:py-0 mx-2 lg:mx-0">
              <p className="text-2xl font-bold">Más información</p>
              <ul className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-2 flex-wrap justify-center">
                {Links_2.map((link, i) => (
                  <li key={i} className="text-[#cccccc] font-bold">
                    <a href={link.href} target={link.target}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {Contacto ? (
            <div className="">
              <p className="text-2xl font-bold">Contacto</p>
              <ul className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-2 flex-wrap justify-center">
                {Contacto.map((link, i) => (
                  <li key={i} className="text-[#cccccc] font-bold">
                    <a href={link.href} target={link.target}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-between h-full">
          {AppLinks ? (
            <div className="py-4  lg:py-0">
              <p className="text-2xl font-bold">Descarga la App</p>
              <ul className="flex gap-3 mt-2 flex-wrap justify-center lg:justify-start">
                {AppLinks.map((link, i) => (
                  <li key={i} className="text-[#cccccc] font-bold">
                    <a href={link.href} target={link.target}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {Giftcard ? (
            <div className="py-4">
              <p className="text-2xl font-bold">Giftcard</p>
              <div className="flex gap-3 mt-2 flex-wrap justify-center lg:justify-start">
                <a
                  href="https://www.estudiosneverland.com/gifts/purchases/new"
                  className="text-[#cccccc] font-bold"
                  target="_blank"
                >
                  Regala una Giftcard
                </a>
              </div>
            </div>
          ) : null}
        </div>
        {RRSS ? (
          <div className="py-4 flex lg:hidden gap-4 mt-2 flex-wrap justify-center">
            {RRSS.map((link, i) => (
              <a href={link.href} key={i} target={link.target}>
                <SmartImage src={link.src} alt={link.alt} className="h-10" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <div className="w-full bg-dark flex justify-center">
        <div className="py-8 lg:py-2 px-4 lg:mx-0  w-full flex items-center justify-between max-w-7xl ">
          <p className="text-base lg:text-xl font-bold">
            © 2025 Estudios Neverland, Todos los derechos reservados.
          </p>
          {RRSS ? (
            <div className="py-4 hidden lg:flex gap-8 mt-2 flex-wrap justify-center items-center">
              {RRSS.map((link, i) => (
                <a href={link.href} key={i} target="_blank">
                  <SmartImage
                    src={link.src}
                    alt={link.alt}
                    className="lg:h-12"
                  />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};
