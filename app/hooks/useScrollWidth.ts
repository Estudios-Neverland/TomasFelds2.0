import { useEffect, useRef, useState } from "react";

export type Progress = {
  visiblePercent: number; // 0..100 (width%)
  leftPercent: number; // 0..(100-visiblePercent)
  totalWidth: number; // px
  visibleWidth: number; // px
};

export function useHorizontalScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState<Progress>({
    visiblePercent: 0,
    leftPercent: 0,
    totalWidth: 0,
    visibleWidth: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;

    const calculate = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const visibleWidth = el.clientWidth;
        const totalWidth = el.scrollWidth || visibleWidth; // fallback

        const visiblePercent =
          totalWidth === 0 ? 100 : (visibleWidth / totalWidth) * 100;

        const maxScroll = Math.max(0, totalWidth - visibleWidth);
        // normalize scrollLeft (some browsers use small negative values in RTL etc)
        const rawScrollLeft = el.scrollLeft;
        const scrollLeft = Math.min(Math.max(rawScrollLeft, 0), maxScroll);

        const scrollFraction = maxScroll === 0 ? 0 : scrollLeft / maxScroll;
        let leftPercent = scrollFraction * (100 - visiblePercent);

        // --- Normalización para evitar micro-gaps ---
        // Si el leftPercent es minúsculo por subpixel jitter, déjalo en 0
        if (Math.abs(leftPercent) < 0.25) leftPercent = 0;

        // Si leftPercent está por encima del máximo por redondeo, clampa
        leftPercent = Math.min(Math.max(leftPercent, 0), 100 - visiblePercent);

        // Redondeos para estabilidad visual (evita 0.0000001)
        const round = (v: number) => Math.round(v * 10000) / 10000;

        setProgress({
          visiblePercent: round(visiblePercent),
          leftPercent: round(leftPercent),
          totalWidth,
          visibleWidth,
        });
      });
    };

    // inicial
    calculate();

    const resizeObserver = new ResizeObserver(calculate);
    resizeObserver.observe(el);

    el.addEventListener("scroll", calculate, { passive: true });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", calculate);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return { ref, progress };
}
