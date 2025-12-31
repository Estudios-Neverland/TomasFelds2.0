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
          "mauticform_newslettertomasfeldscl_message"
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
        action="https://mailing.estudiosneverland.com/form/submit?formId=7"
        id="mauticform_newslettertomasfeldscl"
        data-mautic-form="newslettertomasfeldscl"
        className="space-y-4"
      >
        {/* Mautic errors */}
        <div
          id="mauticform_newslettertomasfeldscl_error"
          className="text-red-600"
        ></div>

        {/* Mautic success message (usamos ref para detectarlo) */}
        <div
          id="mauticform_newslettertomasfeldscl_error"
          ref={messageRef}
          className="text-green-600"
        ></div>

        {/* Hidden honeypot */}
        <div style={{ display: "none" }}>
          <input
            type="text"
            name="mauticform[cap]"
            id="mauticform_newslettertomasfeldscl_cap"
          />
        </div>

        {/* Email input */}
        <div>
          <label
            htmlFor="mauticform_newslettertomasfeldscl_email_form"
            className="block mb-1 text-sm font-medium text-[#111]"
          >
            Correo electrónico
          </label>

          <input
            type="email"
            name="mauticform[email_form]"
            id="mauticform_newslettertomasfeldscl_email_form"
            required
            className="w-full p-3 rounded bg-light text-[#111] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          name="mauticform[submit]"
          value="1"
          id="mauticform_newslettertomasfeldscl_submit"
          className="px-4 py-2 bg-primary text-dark rounded-[10px] cursor-pointer transition inline-flex font-bold focus:outline-none items-center justify-center w-8/10 hover:bg-dark md:border-2 border-transparent hover:text-primary hover:border-primary  duration-300 ease-in-out"
        >
          Enviar
        </button>

        {/* Hidden fields */}
        <input
          type="hidden"
          name="mauticform[formId]"
          id="mauticform_newslettertomasfeldscl_id"
          value="7"
        />
        <input
          type="hidden"
          name="mauticform[return]"
          id="mauticform_newslettertomasfeldscl_return"
          value=""
        />
        <input
          type="hidden"
          name="mauticform[formName]"
          id="mauticform_newslettertomasfeldscl_name"
          value="newslettertomasfeldscl"
        />
      </form>
    </div>
  );
}
