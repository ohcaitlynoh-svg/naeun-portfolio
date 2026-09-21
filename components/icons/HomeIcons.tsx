// Small outline icons matching the site's existing hand-drawn SVG style
// (Navigation's theme toggle, Home's scroll indicator): stroke="currentColor",
// fill="none", strokeWidth ~1.6, strokeLinecap/Linejoin "round", ~16px box.
// Used only on Home's summary-card headings and the Home section rail —
// not added to the global nav or any long-form page.
import type { SVGProps } from "react";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9h13v-9" />
      <path d="M10 19v-6h4v6" />
    </IconBase>
  );
}

export function AboutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function HowIWorkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 4.5 20 18H4Z" />
      <circle cx="12" cy="14" r="1.6" />
    </IconBase>
  );
}

export function ProjectIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="4" y="5.5" width="16" height="13" rx="1.5" />
      <path d="M4 9.5h16" />
    </IconBase>
  );
}

export function CareerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 17.5 9.5 12 14 15.5 20 8" />
      <circle cx="9.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="14" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="20" cy="8" r="1.3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function AiLabsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 4v3.2" />
      <path d="M9 8.5h6l1.6 8a2 2 0 0 1-2 2.4H9.4a2 2 0 0 1-2-2.4Z" />
      <path d="M9.8 14h4.4" />
    </IconBase>
  );
}

export function ContactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </IconBase>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5v6" />
      <circle cx="8" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
      <path d="M12 16.5v-3.7a2.3 2.3 0 0 1 4.5 0v3.7" />
      <path d="M12 10.5v1.5" />
    </IconBase>
  );
}
