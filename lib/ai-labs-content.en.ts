// English counterpart to lib/ai-labs-content.ts — same structure, same
// facts, translated content.
import type { AiLabProject } from "./ai-labs-content";

export const aiLabsIntroEn = [
  "Personal projects where I used AI hands-on across planning, production, and operations.",
  "More will be added here as each one is completed.",
];

export const aiLabsProjectsEn: AiLabProject[] = [
  {
    slug: "ai-portfolio",
    title: "A PM Portfolio Built With AI",
    subtitle:
      "Used AI to restructure this portfolio's information architecture, then iterated repeatedly on content structure, UI, and copy while building it myself.",
    sections: [
      {
        title: "Starting Point",
        bullets: [
          "Organizing a long career and many projects into one portfolio required quickly experimenting with information structure and priority.",
          "Aimed to build an actually deployable web portfolio, not a static document — one that shows a planner's thinking alongside the output itself.",
        ],
      },
      {
        title: "Key Work",
        bullets: [
          "Restructured the portfolio's IA and page structure",
          "Designed the About / How I Work / Core Projects / AI Labs structure",
          "Designed the cards, modal, indicator, and project detail pages",
          "Iterated repeatedly with AI on copywriting, structure, and QA points",
        ],
      },
      {
        title: "Ongoing Refinement",
        bullets: [
          "Repeatedly adjusted hierarchy, content width, and alignment rules across sections",
          "Established consistent layout rules for project cards, hero, and indicator",
          "Continuously tuned readability and visual density on mobile and desktop",
        ],
      },
      {
        title: "Results & Retrospective",
        bullets: [
          "Turned a document-style resume into an actually explorable portfolio",
          "Experimented with collaborating with AI across the full planning/design/QA process",
          "Confirmed that while AI is strong at fast iteration, final structuring and quality judgment still need a human",
        ],
      },
    ],
  },
  {
    slug: "career-translator",
    title: "An AI Career Translator for Job Seekers",
    subtitle:
      "A concept for an AI tool that closes the gap between job posting language and personal career language, rewriting a resume to match a given JD.",
    sections: [
      {
        title: "Starting Point",
        bullets: [
          "Going through an actual job search, I felt how much the same experience's impact can change depending on how it's worded.",
          "Judged that a tool closing the language gap between a JD and a resume would meaningfully improve application efficiency.",
        ],
      },
      {
        title: "Key Work",
        bullets: [
          "Extracting key keywords from a JD",
          "Semantically matching a user's career sentences against JD requirements",
          "Suggesting similar-level / similar-meaning wording",
          "Auto-rewriting resume bullets, career descriptions, and self-introduction sentences",
          "Proposing phrasing guidance centered on PM / PO / Product Lead roles",
        ],
      },
      {
        title: "Ongoing Refinement",
        bullets: [
          "Moved from simple keyword substitution to context-based phrasing conversion",
          "Differentiated recommended sentence tone by position, seniority, and domain",
          "Refined the logic to rephrase persuasively within the bounds of fact, without exaggerating experience",
        ],
      },
      {
        title: "Results & Retrospective",
        bullets: [
          "Confirmed the potential for this to be one of the most practical AI assistants from a job seeker's perspective",
          "Phrasing can be optimized, but fact-checking and prioritization still need to be user-led",
          "A concept worth developing further into an actual prototype",
        ],
      },
    ],
  },
  {
    slug: "classical-creative-workflow",
    title: "An AI Creative Workflow for a Classical Channel",
    subtitle:
      "A personal experiment in running a creative pipeline for classical-music-based content — using AI to connect planning, image generation, video editing, and publishing.",
    sections: [
      {
        title: "Starting Point",
        bullets: [
          "Producing and running music content alone, I needed a way to lighten the production load from planning through visuals, editing, and publishing.",
          "Experimented with combining AI tools into a small-scale creative pipeline of my own.",
        ],
      },
      {
        title: "Key Work",
        bullets: [
          "GPT-based content planning and prompt writing",
          "Experimented with music production using Suno",
          "Image production using Midjourney",
          "Video editing and packaging using CapCut / ALLO / Canva",
          "Built a production flow connecting one music idea through to thumbnail, video, and upload assets",
        ],
      },
      {
        title: "Ongoing Refinement",
        bullets: [
          "Iterated on prompt structure to improve output consistency",
          "Aligned tone and manner across music, image, and video",
          "Worked out a repeatable operating rhythm within a short production window",
        ],
      },
      {
        title: "Results & Retrospective",
        bullets: [
          "Confirmed that even a solo creator can build a workflow that connects planning through production and publishing using only a combination of AI tools",
          "Realized that how the whole pipeline connects matters more than any single tool's individual quality",
          "Can be extended further into running classical-based video content and automation experiments",
        ],
      },
    ],
  },
];
