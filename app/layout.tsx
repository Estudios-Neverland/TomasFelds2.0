import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderNv } from "./components/nv-ui/HeaderNv";
import { FooterNv } from "./components/nv-ui/FooterNv";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tomás Felds",
  description:
    "Sitio oficial de Edo Caroe. ¿Ya viste Edo Caroe No Tiene Show? Próximos shows, información de giras y más.",
  openGraph: {
    title: "Tomás Felds",
    description:
      "Sitio oficial de Edo Caroe. ¿Ya viste Edo Caroe No Tiene Show? Próximos shows, información de giras y más.",
    url: "https://www.tomasfelds.cl",
    siteName: "Edo Caroe",
    images: [
      {
        url: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/Logos/Tomas+Felds/3-Felds.png",
        width: 360,
        height: 360,
        alt: "Tomás Felds",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans overflow-x-hidden`}
      >
        <HeaderNv
          urlLogo="https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/Logos/Tomas+Felds/Logo-felds-1.webp"
          altLogo="Estudios Neverland Logo"
          navLinks={[
            { text: "Tickets", href: "#Tickets" },
            { text: "YouTube", href: "#Youtube" },
            {
              text: "Contacto",
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@estudiosneverland.cl",
              target: "_blank",
            },
          ]}
          buttonTextColor="dark"
          neverland={false}
        />
        {children}

        <FooterNv
          logoDesktop={{
            src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/Logos/Tomas+Felds/Logo-felds-2.webp",
            alt: "Logo Tomás Felds",
          }}
          logoMobile={{
            src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/Logos/Tomas+Felds/Logo-felds-2.webp",
            alt: "Logo Tomás Felds",
          }}
          Links_1={[
            {
              text: "Estudios Neverland",
              href: "https://www.estudiosneverland.com/",
            },
            { text: "Tomás Va a Morir", href: "https://www.tomasvaamorir.cl/" },
            { text: "Edo Caroe", href: "https://www.edocaroe.cl/" },
            { text: "El Chiringuito", href: "https://www.elchiringuito.cl/" },
          ]}
          Contacto={[
            {
              text: "Escríbenos aquí",
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@estudiosneverland.cl",
            },
          ]}
          AppLinks={[
            {
              text: "Google Play",
              href: "https://play.google.com/store/apps/details?id=tv.uscreen.estudiosneverland&hl=es_419",
            },
            {
              text: "App Store",
              href: "https://apps.apple.com/cl/app/neverland/id1641589786",
            },
          ]}
          Giftcard={true}
          RRSS={[
            {
              src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/RRSS/Instagram.webp",
              href: "https://insta.openinapp.co/vxpyw",
              alt: "Instagram",
            },
            {
              src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/RRSS/Youtube.webp",
              href: "https://yt.openinapp.co/evp7a",
              alt: "YouTube",
            },
            {
              src: "https://edo-caroe-neverland-public.s3.us-east-2.amazonaws.com/RRSS/Tik-Tok.webp",
              href: "https://openinapp.link/4ms72",
              alt: "TikTok",
            },
          ]}
        />
      </body>
    </html>
  );
}
