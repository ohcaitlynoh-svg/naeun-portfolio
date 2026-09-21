import type { CSSProperties } from "react";
import type { ToolLogo } from "@/lib/tool-logos";
import styles from "./ToolBar.module.css";

export default function ToolBar({ tools, label = "TOOL :" }: { tools: ToolLogo[]; label?: string }) {
  return (
    <div className={styles.toolBar}>
      <span className={styles.toolBarLabel}>{label}</span>
      <div className={styles.toolLogos}>
        {tools.map((tool) => (
          <span
            key={tool.name}
            className={styles.toolLogoImage}
            style={{ "--tool-logo-url": `url(${tool.logo})` } as CSSProperties}
            role="img"
            aria-label={tool.alt}
            title={tool.alt}
          />
        ))}
      </div>
    </div>
  );
}
