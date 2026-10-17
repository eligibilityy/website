import type { StaticImageData } from "next/image";

import wingspan from "@/public/images/wingspan.jpg";
import crouie from "@/public/images/crouie.jpg";
import gradeCalc from "@/public/images/grade-calc.jpg";

export type NonEmpty<T> = [T, ...T[]];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  team?: string;
  status: "live" | "in-progress" | "archived";
  stack: string[];
  cover: StaticImageData;
  alt: string;
  url?: string;
  repo?: string;
};

export const projects: NonEmpty<Project> = [
  {
    slug: "wingspan",
    title: "UNT Wingspan",
    summary:
      "The website for UNT Wingspan, a student-run undergraduate research journal at the University of North Texas.",
    year: "2025",
    role: "Design and Development",
    status: "archived",
    stack: ["Framer", "Figma", "TypeScript"],
    cover: wingspan,
    alt: "UNT Wingspan Homepage",
    url: "https://yiliya.studio/projects/wingspan",
  },
  {
    slug: "crouie",
    title: "Crouie",
    summary:
      "An offline AI memory aid for people living with dementia, built for the AppBuilders PH Hackathon 2026.",
    year: "2026",
    role: "Web app & UI, integration",
    team: "Team of 4",
    status: "archived",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Ollama",
      "InsightFace",
      "ONNX Runtime",
      "Whisper",
      "Piper TTS",
    ],
    cover: crouie,
    alt: "Crouie branding image",
    repo: "https://github.com/eligibilityy/appbuildersph-hackathon",
  },
  {
    slug: "grade-calc",
    title: "GWA Calculator",
    summary: "A GWA calculator for DLSL computer science students.",
    year: "2026",
    role: "Design and Development",
    status: "in-progress",
    stack: ["Next.js", "React", "TypeScript"],
    cover: gradeCalc,
    alt: "Screenshot of GWA Calculator",
    repo: "https://github.com/eligibilityy/grade-calc/",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
