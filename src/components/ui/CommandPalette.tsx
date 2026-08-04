import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import {
  NAV_LINKS,
  PROFILE,
  SOCIAL_LINKS,
  gmailComposeUrl,
} from "../../constants";

interface PaletteCommand {
  /** Shell-like command shown in the result row. */
  cmd: string;
  /** Human label for the result. */
  label: string;
  /** Filterable keywords (name, category…). */
  hint: string;
  /** When true, also copy the email to the clipboard. */
  copiesEmail?: boolean;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const scrollTo = (target: string) =>
  scroller.scrollTo(target, { smooth: true, offset: -70, duration: 500 });

/** Build the command list once (stable refs). */
function buildCommands(): PaletteCommand[] {
  const nav: PaletteCommand[] = NAV_LINKS.map((link) => ({
    cmd: `cd ${link.section}`,
    label: link.text,
    hint: "navigate",
    run: () => scrollTo(link.section),
  }));

  const actions: PaletteCommand[] = [
    {
      cmd: "cat resume.pdf",
      label: "Open Resume",
      hint: "PDF",
      run: () => {
        window.open(PROFILE.resumeUrl, "_blank", "noreferrer");
      },
    },
    {
      cmd: "mailto " + PROFILE.email,
      label: "Compose Email",
      hint: "Gmail",
      copiesEmail: true,
      run: () => {
        window.open(gmailComposeUrl(PROFILE.email), "_blank", "noreferrer");
      },
    },
    ...SOCIAL_LINKS.map((social) => ({
      cmd: `open ${social.label.toLowerCase()}`,
      label: social.label,
      hint: "external",
      run: () => {
        window.open(social.href, "_blank", "noreferrer");
      },
    })),
  ];

  return [...nav, ...actions];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(buildCommands, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.cmd.toLowerCase().includes(q) ||
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Reset state each time the palette opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setCopied(false);
      // Focus after the mount animation starts.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keep the active item visible while navigating.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runCommand = useCallback(
    (command: PaletteCommand) => {
      command.run();
      if (command.copiesEmail && navigator.clipboard) {
        // Copy the address too — fast way to hand over an email. Always close,
        // even if the clipboard write is rejected.
        navigator.clipboard
          .writeText(PROFILE.email)
          .then(() => {
            setCopied(true);
            setTimeout(onClose, 350);
          })
          .catch(() => onClose());
      } else {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) runCommand(filtered[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center px-margin-mobile pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-container-max border border-inverse-surface bg-primary shadow-hard-dim"
        initial={{ y: -16, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -8, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prompt row */}
        <div className="flex items-center gap-2 border-b border-inverse-surface px-4 py-3">
          <span className="font-mono text-label-mono text-on-primary-container select-none">
            $&gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="type a command… (try: work, resume, email)"
            className="flex-1 bg-transparent font-mono text-body-md text-on-primary placeholder:text-on-primary-container/60 outline-none"
            aria-label="Command input"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-[0.05em] text-on-primary-container border border-inverse-surface px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-[45vh] overflow-y-auto"
          role="listbox"
          aria-label="Commands"
        >
          {filtered.length === 0 ? (
            <div className="px-4 py-6 font-mono text-body-md text-on-primary-container">
              no matching command: <span className="text-inverse-primary">{query}</span>
            </div>
          ) : (
            filtered.map((command, i) => {
              const isActive = i === active;
              return (
                <button
                  key={command.cmd + command.label}
                  data-index={i}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => runCommand(command)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left font-mono text-body-md transition-colors duration-100 ${
                    isActive
                      ? "bg-inverse-surface text-on-primary"
                      : "text-inverse-primary"
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="text-on-primary-container select-none">&gt;</span>
                    <span className="truncate">
                      {command.copiesEmail && copied ? (
                        <span className="text-success">email copied ✓</span>
                      ) : (
                        command.cmd
                      )}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.05em] text-on-primary-container">
                    {command.hint}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-inverse-surface px-4 py-2 font-mono text-[11px] uppercase tracking-[0.05em] text-on-primary-container">
          <span>↑↓ navigate · enter run</span>
          <span>ctrl+k toggle</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommandPalette;
