"use client";

import React from "react";
import { CardNv } from "./CardNv";
import { useHorizontalScrollProgress } from "../../hooks/useScrollWidth";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion } from "motion/react";

interface ProgramsProps {
  title?: string;
  subtitle?: string;
  cards: { src: string; alt: string; link: string }[];
}

export const ProgramasNv: React.FC<ProgramsProps> = ({
  title,
  subtitle,
  cards,
}) => {
  const { ref, progress } = useHorizontalScrollProgress<HTMLDivElement>();

  const getStep = (): number | null => {
    const el = ref.current;
    if (!el) return null;

    const firstChild = el.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const childRect = firstChild.getBoundingClientRect();
      const childStyle = window.getComputedStyle(firstChild);
      const secondChild = firstChild.nextElementSibling as HTMLElement | null;
      let gap = 0;

      if (secondChild) {
        const secondRect = secondChild.getBoundingClientRect();
        gap = Math.max(0, secondRect.left - (childRect.left + childRect.width));
      } else {
        const marginRight = parseFloat(childStyle.marginRight || "0") || 0;
        gap = marginRight;
      }

      const step = Math.round(childRect.width + gap);
      if (step > 0) return step;
    }

    return Math.round(el.clientWidth * 0.9);
  };

  const handleNext = () => {
    const el = ref.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  const handlePrev = () => {
    const el = ref.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-dark text-light overflow-x-hidden lg:pb-28">
      <div className="w-full lg:max-w-7xl mx-auto flex flex-col lg:flex-row lg:min-h-[550px] lg:px-0 px-4">
        {/* Títulos */}
        <div className="flex flex-col w-full px-2 py-4 text-center lg:text-left justify-center items-center lg:w-2/6">
          <h3 className="font-bold text-2xl lg:text-2xl xl:text-6xl 2xl:text-[56px] ">
            {title}
          </h3>
          <p className="text-sm lg:text-xl xl:text-2xl 2xl:text-2xl">
            {subtitle}
          </p>
        </div>

        {/* Carrusel */}
        <div className="w-full lg:w-4/6">
          {/* Barra + botones */}
          <div className="flex items-end justify-between pb-3">
            <div className="relative w-full h-1.5 bg-neutral-700 overflow-hidden">
              <motion.div
                style={{
                  width: `${progress.visiblePercent}%`,
                  left: `${progress.leftPercent}%`,
                  transform:
                    progress.leftPercent <= 2 ? "translateX(-10px)" : "none",
                }}
                className="absolute top-0 h-full bg-primary"
              />
            </div>

            <div className="flex">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center border border-neutral-600 cursor-pointer"
              >
                <IoChevronBack className="text-neutral-400 text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center border border-neutral-600 cursor-pointer"
              >
                <IoChevronForward className="text-white text-xl" />
              </button>
            </div>
          </div>

          {/* Contenedor scrollable */}
          <motion.div
            ref={ref}
            className="w-full flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-4 lg:px-0 lg:h-full lg:overflow-hidden"
          >
            {cards.map((c, i) => (
              <CardNv
                key={i}
                bgimageUrl={c.src}
                link={c.link}
                className="snap-start shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
