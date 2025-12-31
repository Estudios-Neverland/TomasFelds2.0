"use client";

import React, { useRef } from "react";
import { useHorizontalScrollProgress } from "../../hooks/useScrollWidth";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion } from "motion/react";
import type { Evento } from "../../types/evento";
import { DateNv } from "./DateNv";

interface EventSectionProps {
  title?: string;
  subtitle?: string;
  events: Evento[];
  className?: string;
}

export const EventSectionNv: React.FC<EventSectionProps> = ({
  title,
  subtitle,
  events,
  className,
}) => {
  const { ref, progress } = useHorizontalScrollProgress<HTMLDivElement>();

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

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
    el.scrollBy({ left: step * 2, behavior: "smooth" });
  };

  const handlePrev = () => {
    const el = ref.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    el.scrollBy({ left: -step * 2, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !isDragging.current) return;

    const dx = e.pageX - startX.current;
    el.scrollLeft = scrollStart.current - dx;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className={`w-full bg-dark text-light overflow-x-hidden lg:pb-28 mb-6 lg:mb-10 ${className}`}
    >
      <div className="w-full lg:max-w-7xl mx-auto flex flex-col lg:flex-row lg:min-h-137.5 lg:px-0 px-4">
        {/* Carrusel */}
        <div className="w-full lg:w-full">
          {/* Barra + botones */}
          <div className="flex items-end justify-between pb-3">
            <p className="text-base lg:text-2xl font-bold w-5/10 lg:w-2/10 uppercase">
              {title}
            </p>
            <div className="relative w-6/10 lg:w-8/10 h-1.5 bg-neutral-700 overflow-hidden">
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
                className="hidden lg:w-10  lg:h-10 lg:flex items-center justify-center border border-neutral-600 cursor-pointer"
              >
                <IoChevronBack className="text-neutral-400 text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="hidden w-6 lg:w-10 h-6 lg:h-10 lg:flex items-center justify-center border border-neutral-600 cursor-pointer"
              >
                <IoChevronForward className="text-light text-xl" />
              </button>
            </div>
          </div>

          {/* Contenedor scrollable */}
          <motion.div
            ref={ref}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
            onMouseUp={onMouseUp}
            onDragStart={(e) => e.preventDefault()}
            className="w-full flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-4 lg:px-0 lg:h-full lg:overflow-hidden fade-mask cursor-grab active:cursor-grabbing"
          >
            {events.map((evento) => (
              <DateNv key={evento.id} evento={evento} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
