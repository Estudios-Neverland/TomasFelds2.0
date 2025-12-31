import { useEffect } from "react";

interface UseMauticFormProps {
  domain: string;     // Ej: "http://mailing.estudiosneverland.com"
  scriptUrl: string;  // Ej: "http://mailing.estudiosneverland.com/media/js/mautic-form.js?v607737bc"
}

export function useMauticForm({ domain, scriptUrl }: UseMauticFormProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as any;

    // Evitar que Mautic se cargue más de una vez
    if (!w.MauticSDKLoaded) {
      w.MauticSDKLoaded = true;
      w.MauticDomain = domain;
      w.MauticLang = { submittingMessage: "Please wait..." };

      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = () => {
        if (w.MauticSDK) {
          w.MauticSDK.onLoad();
        }
      };

      document.head.appendChild(script);
    } else {
      // SDK ya cargado → solo disparar nuevamente onLoad()
      if (w.MauticSDK) {
        w.MauticSDK.onLoad();
      }
    }
  }, [domain, scriptUrl]);
}
