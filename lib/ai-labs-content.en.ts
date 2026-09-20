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
    title: "Building a PM Portfolio With AI",
    subtitle:
      "A web portfolio I built myself, collaborating with AI to repeatedly refine information structure, UI, content, and QA.",
    status: "In Progress",
    coverImage: "/ai-labs/ai-portfolio-cover.png",
    sections: [
      {
        title: "Starting Point",
        bullets: [
          "Started to restructure a varied career and many projects into an actually explorable web portfolio, not a document-style resume.",
          "Needed to repeatedly test how to structure and prioritize a long career's worth of information.",
        ],
      },
      {
        title: "Key Work",
        bullets: [
          "Designed the portfolio's IA",
          "Designed the Home / About / How I Work / Core Projects / AI Labs structure",
          "Designed the card, modal, Section Indicator, and case study structures",
          "Iterated repeatedly with AI on copywriting, UI improvements, QA, and structural changes",
        ],
      },
      {
        title: "Ongoing Refinement",
        bullets: [
          "Unified the content-width system for Hero and every page",
          "Adjusted card and long-form page hierarchy",
          "Continuously improved responsive layout, spacing, and alignment",
          "Reviewed AI's suggestions repeatedly against the actual rendered screen instead of using them as-is",
        ],
      },
      {
        title: "Results & Retrospective",
        bullets: [
          "Turned a document-style career summary into an actually deployable, product-shaped portfolio",
          "Experienced a workflow as a PM collaborating with AI from structure design through implementation, QA, and deployment",
          "Confirmed AI is effective for fast implementation, but final structuring and quality judgment remain a human's role",
        ],
      },
    ],
  },
  {
    slug: "career-translator",
    title: "An AI Career Translator for Job Seekers",
    subtitle:
      "An AI tool that semantically connects JD and resume language, rewriting career sentences to match a target position.",
    status: "Planning / Development Ahead",
    coverImage: "/ai-labs/career-translator-cover.png",
    sections: [
      {
        title: "Starting Point",
        bullets: [
          "Started from the problem that real experience often doesn't land, because a JD and a resume speak different languages.",
          "Aimed to build a tool that translates career content into hiring language while preserving its actual meaning and level, not just copying keywords.",
        ],
      },
      {
        title: "Key Work",
        bullets: [
          "Extracting a JD's core roles, competencies, and keywords",
          "Semantically matching a user's resume experience against JD requirements",
          "Connecting similar-meaning / similar-seniority phrasing",
          "Rewriting career bullets within the bounds of fact",
          "Generating summary sentences per target position",
          "Expected flow: Enter JD → Extract key requirements → Structure resume experience → Match meaning/level → Check gaps → Generate suggested wording → Rewrite resume sentences",
        ],
      },
      {
        title: "Ongoing Refinement",
        bullets: [
          "Moving from simple keyword matching to semantic matching",
          "Reflecting phrasing differences by role, seniority, and domain",
          "Strengthening a verification step so it never invents experience the user didn't actually have",
          "Improving the balance between ATS optimization and natural-sounding sentences",
        ],
      },
      {
        title: "Results & Retrospective",
        bullets: [
          "Currently at the product hypothesis and prototype stage",
          "Will be updated with real screens and usage results once actually built",
          "An experiment in turning a personal job-search problem into an AI product",
        ],
      },
    ],
  },
  {
    slug: "ai-classical-workflow",
    title: "An AI Classical Channel Operations Experiment",
    subtitle:
      "A creative experiment connecting AI tools to plan, produce, edit, and publish classical-music content myself.",
    status: "Operating",
    coverImage: "/ai-labs/ai-classical-workflow-cover.png",
    sections: [
      {
        title: "Starting Point",
        bullets: [
          "Producing music content continuously as one person requires many separate tasks — music, visuals, video, thumbnails, publishing.",
          "Experimented with how far a single person can push a repeatable content pipeline by connecting several AI tools together.",
        ],
      },
      {
        title: "Key Work",
        bullets: [
          "GPT → Content concepts and prompt writing",
          "Suno → Classical-based music production",
          "Midjourney → Visual assets matching each track's mood",
          "CapCut → Video editing",
          "ALLO → Supporting video/motion production",
          "Canva → Thumbnails and publishing assets",
          "YouTube → Actual content publishing and operations",
        ],
      },
      {
        title: "Ongoing Refinement",
        bullets: [
          "Improving consistency between music and visual tone",
          "Iterating on prompt structure",
          "Testing short-form vs. long-form content formats",
          "Optimizing the workflow between production time and quality",
          "Continuously adjusting content format based on actual publishing data",
        ],
      },
      {
        title: "Results & Retrospective",
        bullets: [
          "Connected AI-based music, image, and video tools into one operating workflow",
          "Realized that how the tools connect and how repeatable the process is matters more than any single output",
          "Currently validating real-world viability by carrying an AI creative workflow through to actual commercial publishing",
        ],
      },
    ],
  },
];
