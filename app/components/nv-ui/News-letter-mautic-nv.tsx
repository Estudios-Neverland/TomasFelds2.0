import { useEffect, useRef } from "react";
import { useMauticForm } from "../../hooks/useMauticForm";

interface MauticNewsletterFormProps {
  onSubmitSuccess?: () => void;
}

export default function MauticNewsletterForm({
  onSubmitSuccess,
}: MauticNewsletterFormProps) {
  useMauticForm({
    domain: "https://mailing.estudiosneverland.com",
    scriptUrl:
      "https://mailing.estudiosneverland.com/media/js/mautic-form.js?v607737bc",
  });

  const messageRef = useRef<HTMLDivElement | null>(null);

  /** Detectar envío exitoso con MutationObserver */
  useEffect(() => {
    const wrapper = document.getElementById(
      "mauticform_wrapper_newsletterneverlandcom"
    );
    if (!wrapper) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // Caso 1: Mautic reemplaza el form con mensaje
        const successMessage = wrapper.querySelector(".mautic-message");
        if (successMessage && successMessage.textContent?.trim() !== "") {
          onSubmitSuccess?.();
          return;
        }

        // Caso 2: Mautic escribe dentro de su propio div
        const msgDiv = document.getElementById(
          "mauticform_newsletterneverlandcom_message"
        );
        if (msgDiv && msgDiv.textContent?.trim() !== "") {
          onSubmitSuccess?.();
          return;
        }
      }
    });

    observer.observe(wrapper, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [onSubmitSuccess]);

  return (
    <div id="mauticform_wrapper_newsletterneverlandcom">
      <form
        method="post"
        action="https://mailing.estudiosneverland.com/form/submit?formId=5"
        id="mauticform_newsletterneverlandcom"
        data-mautic-form="newsletterneverlandcom"
        className="space-y-4"
      >
        {/* Mautic errors */}
        <div
          id="mauticform_newsletterneverlandcom_error"
          className="text-red-600"
        ></div>

        {/* Mautic success message (usamos ref para detectarlo) */}
        <div
          id="mauticform_newsletterneverlandcom_message"
          ref={messageRef}
          className="text-green-600"
        ></div>

        {/* Hidden honeypot */}
        <div style={{ display: "none" }}>
          <input
            type="text"
            name="mauticform[cap]"
            id="mauticform_input_newsletterneverlandcom_cap"
          />
        </div>

        {/* Email input */}
        <div>
          <label
            htmlFor="mauticform_input_newsletterneverlandcom_email_form"
            className="block mb-1 text-sm font-medium text-[#111]"
          >
            Correo electrónico
          </label>

          <input
            type="email"
            name="mauticform[email_form]"
            id="mauticform_input_newsletterneverlandcom_email_form"
            required
            className="w-full p-3 rounded bg-light text-[#111] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          name="mauticform[submit]"
          value="1"
          id="mauticform_input_newsletterneverlandcom_submit"
          className="px-4 py-2 bg-primary text-dark rounded-[10px] cursor-pointer transition inline-flex font-bold focus:outline-none items-center justify-center w-8/10 hover:bg-dark md:border-2 border-transparent hover:text-primary hover:border-primary  duration-300 ease-in-out"
        >
          Enviar
        </button>

        {/* Hidden fields */}
        <input
          type="hidden"
          name="mauticform[formId]"
          id="mauticform_newsletterneverlandcom_id"
          value="5"
        />
        <input
          type="hidden"
          name="mauticform[return]"
          id="mauticform_newsletterneverlandcom_return"
          value=""
        />
        <input
          type="hidden"
          name="mauticform[formName]"
          id="mauticform_newsletterneverlandcom_name"
          value="newsletterneverlandcom"
        />
      </form>
    </div>
  );
}
