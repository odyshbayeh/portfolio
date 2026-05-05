import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const TOAST_SUCCESS =
  "Thank you. I will get back to you as soon as possible.";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 4800);
    return () => clearTimeout(id);
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  // EmailJS: IDs are public by design. Optional overrides: VITE_EMAILJS_* in .env
  // If send fails with 412 + "Invalid grant" / "reconnect Gmail", fix it in the EmailJS
  // dashboard → Email Services → your Gmail service → Reconnect account (not in this repo).
  const SERVICE_ID =
    import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_eiq64vq";
  const MAIN_TEMPLATE_ID =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_3a0u83o";
  const AUTO_REPLY_TEMPLATE_ID =
    import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID ??
    "template_su0i2ob";
  const PUBLIC_KEY =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "rnoYJ9MEmYxDJkL6Y";

  const sendErrorMessage = (error) => {
    const text = typeof error?.text === "string" ? error.text : "";
    const gmailGrant =
      error?.status === 412 &&
      (text.includes("Invalid grant") || text.includes("Gmail"));

    if (import.meta.env.DEV && gmailGrant) {
      return `EmailJS / Gmail: ${text}\n\nFix: https://dashboard.emailjs.com/admin → Email Services → reconnect Gmail for this service.`;
    }
    if (gmailGrant) {
      return "We could not send your message right now. Please try again later or reach the site owner another way.";
    }
    return "Something went wrong. Please try again.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // First email: Send the contact form to yourself
    emailjs
      .send(
        SERVICE_ID,
        MAIN_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "ody shbayeh",
          from_email: form.email,
          to_email: "odyshbayeh41@gmail.com", // Change to your email
          message: form.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        // Second email: Send auto-reply to the person who contacted you
        return emailjs.send(
          SERVICE_ID,
          AUTO_REPLY_TEMPLATE_ID,
          {
            to_name: form.name, // Send to the person who contacted you
            email: form.email, // Their email address
            from_name: "Ody Shbayeh",
            original_message: form.message, // Include their original message
          },
          PUBLIC_KEY
        );
      })
      .then(() => {
        setLoading(false);
        setToast({ variant: "success", message: TOAST_SUCCESS });
        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setToast({ variant: "error", message: sendErrorMessage(error) });
      });
  };

  const toastUi =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast.variant + toast.message.slice(0, 24)}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="pointer-events-none fixed inset-x-0 z-[10050] flex justify-center"
                style={{
                  top: "calc(5rem + env(safe-area-inset-top, 0px))",
                  paddingLeft: "max(0.75rem, env(safe-area-inset-left, 0px))",
                  paddingRight: "max(0.75rem, env(safe-area-inset-right, 0px))",
                }}
              >
                <div
                  className={`w-full max-w-md rounded-xl border-2 px-3 py-2.5 shadow-lg backdrop-blur-md sm:px-5 sm:py-3.5 max-h-[min(50svh,15rem)] overflow-y-auto overscroll-y-contain sm:max-h-none sm:overflow-visible [-webkit-overflow-scrolling:touch] ${
                    toast.variant === "success"
                      ? "border-emerald-400/90 bg-[#0d0a1f]/95 text-emerald-50 shadow-emerald-500/15"
                      : "border-rose-400/85 bg-[#0d0a1f]/95 text-rose-50 shadow-rose-500/15"
                  }`}
                >
                  <p className="pointer-events-none text-center text-[0.8125rem] font-medium leading-snug sm:text-sm sm:leading-relaxed md:text-[0.95rem] whitespace-pre-line">
                    {toast.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <div className="xl:mt-1 xl:flex-row flex-col-reverse flex gap-8 overflow-hidden">
      {toastUi}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-6 sm:p-8 rounded-2xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className={styles.sectionSubText}>Get in touch</p>
            <h3 className={styles.sectionHeadText}>Contact</h3>
          </div>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-1 flex flex-col gap-4"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary self-start py-3 px-7 outline-none text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[500px] h-[320px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
