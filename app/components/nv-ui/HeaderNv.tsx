"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ButtonNv } from "./ButtonNv";
import { SmartImage } from "./ui/SmartImage";

interface NavLink {
  text: string;
  href: string;
  target?: string;
}

interface HeaderProps {
  urlLogo: string;
  altLogo: string;
  navLinks?: NavLink[];
  floating?: boolean;
  buttonTextColor?: "dark" | "light";
  neverland?: boolean;
}

export const HeaderNv: React.FC<HeaderProps> = ({
  urlLogo,
  altLogo,
  navLinks,
  floating = true,
  buttonTextColor = "light",
  neverland = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          h-22 flex items-center justify-around lg:justify-between px-6
          transition-all duration-300 overflow-x-hidden
          ${floating ? "fixed top-0 left-0 right-0 z-40" : "relative"}
          ${isAtTop ? "bg-transparent" : "bg-white/20 backdrop-blur-md"}
        `}
      >
        {/* Mobile Menu Icon */}
        <button
          className="text-light w-full max-w-12 sm:max-w-24 lg:max-w-52 block lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <AiOutlineMenu size={24} className="m-auto" />
        </button>

        {/* Logo + Desktop Nav */}
        <div className="flex gap-6 items-center">
          <SmartImage
            src={urlLogo}
            alt={altLogo}
            className="h-5 lg:h-8 w-auto opacity-100 2xl:h-9 cursor-pointer"
          />

          <ul className="hidden lg:flex text-light 2xl:text-xl font-semibold gap-4">
            {navLinks?.map((link) => (
              <li key={link.href} className="w-fit">
                <a
                  href={link.href}
                  target={link.target}
                  className="hover:text-gray-300 md:text-sm 2xl:text-lg"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="flex items-center w-fit gap-8">
          {neverland && (
            <ButtonNv
              variant="no-bg"
              buttonTextColor="light"
              link="https://www.estudiosneverland.com/sign_in"
              className="2xl:text-lg hidden lg:block text-sm font-bold"
            >
              Iniciar Sesión
            </ButtonNv>
          )}
          <ButtonNv
            variant="primary"
            link="https://www.estudiosneverland.com/pages/plans"
            buttonTextColor={buttonTextColor}
            className="text-xs sm:text-sm 2xl:text-lg w-fit"
          >
            <span className="block lg:hidden">Suscríbete</span>
            <span className="hidden lg:block">
              Suscríbete a Estudios Neverland
            </span>
          </ButtonNv>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-between text-white text-xl font-semibold transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } bg-dark`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <AiOutlineClose size={30} />
        </button>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-6 text-center mt-20">
          {navLinks?.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.target}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>

        {/* Footer Buttons */}
        <div className="flex flex-col gap-4 px-6 pb-10">
          {neverland && (
            <ButtonNv
              variant="no-bg"
              link="https://www.estudiosneverland.com/sign_in"
              buttonTextColor="light"
              className="border-light border font-bold py-2 text-center"
            >
              Iniciar Sesión
            </ButtonNv>
          )}
          <ButtonNv
            variant="primary"
            link="https://www.estudiosneverland.com/pages/plans"
            className="font-bold py-2"
            buttonTextColor={buttonTextColor}
          >
            Suscríbete
          </ButtonNv>
        </div>
      </div>
    </>
  );
};
