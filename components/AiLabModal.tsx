"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { AiLabProject } from "@/lib/ai-labs-content";
import styles from "./AiLabModal.module.css";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AiLabModal({
  project,
  onClose,
}: {
  project: AiLabProject;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Real dialog behavior, not just a visually-modal box: trap Tab/Shift+Tab
  // inside the panel, move focus in on open and back to whatever opened it
  // on close, and exclude the rest of the page from keyboard/AT focus
  // while it's open (inert on every real ancestor-sibling up to <body>,
  // since this modal isn't portaled out of the page's own DOM position).
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overlay = overlayRef.current;

    const inertedElements: HTMLElement[] = [];
    if (overlay) {
      let node: Element = overlay;
      while (node !== document.body) {
        const parent = node.parentElement;
        if (!parent) break;
        [...parent.children].forEach((sibling) => {
          if (sibling !== node && sibling instanceof HTMLElement) {
            sibling.inert = true;
            inertedElements.push(sibling);
          }
        });
        node = parent;
      }
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // offsetParent is always null for position:fixed elements (like the
      // close button here), so it can't be used as the visibility check —
      // getClientRects() correctly reflects whether the element actually
      // has a rendered box regardless of its positioning scheme.
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertedElements.forEach((el) => {
        el.inert = false;
      });
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div ref={overlayRef} className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          ref={closeButtonRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          Close ✕
        </button>

        <div className={styles.visual}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 92vw, 640px"
            className={styles.visualImg}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.header}>
            <span className={styles.status}>{project.status}</span>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </div>

          <div className={styles.sections}>
            {project.sections.map((section) => (
              <div key={section.title} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.bulletList}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
