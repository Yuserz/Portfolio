import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  PROFILE,
  SOCIAL_LINKS,
  gmailComposeUrl,
  staggerContainer,
  fadeInUp,
} from "../../constants";

/**
 * `> ./contact` — terminal-style contact section: big email CTA
 * (copy-to-clipboard + mailto compose), social links, status line.
 */
const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  const handleCopy = useCallback(async () => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      // Clear any pending reset so rapid clicks keep the flash alive.
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions/secure context) — no feedback needed.
    }
  }, []);

  const channels = SOCIAL_LINKS.length + 1;

  return (
    <section id="contact" className="flex flex-col gap-stack-md">
      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="term-section-head">
          <h2 className="term-section-title">&gt; ./contact</h2>
          <span className="term-section-meta">{channels} channels open</span>
        </div>

        {/* Email CTA */}
        <motion.div
          variants={fadeInUp}
          className="mt-stack-md border border-inverse-surface rounded-lg bg-primary p-8 md:p-12 flex flex-col items-center text-center gap-6"
        >
          <div className="term-prompt">
            $ echo &quot;{PROFILE.email}&quot; <span className="cursor-block" aria-hidden="true" />
          </div>

          <a
            href={gmailComposeUrl(PROFILE.email)}
            target="_blank"
            rel="noreferrer"
            className="font-headline text-headline-lg md:text-headline-xl text-on-primary hover:text-secondary-fixed transition-colors duration-200 break-all"
          >
            {PROFILE.email}
          </a>

          <div className="flex gap-4 flex-wrap justify-center">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-ghost cursor-pointer"
              aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
              aria-live="polite"
            >
              {copied ? (
                <span className="text-success">email copied ✓</span>
              ) : (
                "$ cp email → clipboard"
              )}
            </button>
            <a
              href={gmailComposeUrl(PROFILE.email)}
              target="_blank"
              rel="noreferrer"
              className="btn-solid"
            >
              $ compose --mailto
            </a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeInUp}
          className="mt-gutter flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-inverse-surface rounded px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.05em] text-inverse-primary hover:text-on-primary hover:border-outline transition-all duration-200"
            >
              <img src={social.icon} alt="" className="w-4 h-4" />
              {social.label}
            </a>
          ))}
        </motion.div>

        {/* Status line */}
        <motion.div
          variants={fadeInUp}
          className="mt-gutter text-center font-mono text-label-mono text-on-primary-container"
        >
          $ status --check{" "}
          <span className="text-success">OPEN_TO_WORK</span>{" "}
          <span className="cursor-block" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
