// Shared tool-logo registry for the TOOL bar on both /how-i-work
// (Execution Toolkit cards) and /ai-labs (project cards) — one definition
// per brand so both pages reference the same file/alt text instead of
// each maintaining its own copy. Name/logo/alt are proper nouns, so this
// single list serves both ko and en content files unchanged.
export type ToolLogo = { name: string; logo: string; alt: string };

const tool = (name: string, file: string): ToolLogo => ({
  name,
  logo: `/tool-logos/${file}`,
  alt: name,
});

export const TOOL_LOGOS = {
  figma: tool("Figma", "figma.svg"),
  claude: tool("Claude", "claude.svg"),
  claudeCode: tool("Claude Code", "claude-code.svg"),
  codex: tool("Codex", "codex.svg"),
  chatgpt: tool("ChatGPT", "chatgpt.svg"),
  clickup: tool("ClickUp", "clickup.svg"),
  notion: tool("Notion", "notion.svg"),
  jira: tool("Jira", "jira.svg"),
  confluence: tool("Confluence", "confluence.svg"),
  vercel: tool("Vercel", "vercel.svg"),
  suno: tool("Suno", "suno.svg"),
  midjourney: tool("Midjourney", "midjourney.svg"),
  capcut: tool("CapCut", "capcut.svg"),
  allo: tool("ALLO", "allo.svg"),
  canva: tool("Canva", "canva.svg"),
  youtube: tool("YouTube", "youtube.svg"),
} as const;
