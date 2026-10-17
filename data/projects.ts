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
    summary: "TODO: one sentence about what it is",
    year: "TODO",
    role: "TODO",
    status: "live",
    stack: ["TODO"],
    cover: wingspan,
    alt: "UNT Wingspan Homepage",
    url: "https://yiliya.studio/projects/wingspan",
  },
  {
    slug: "crouie",
    title: "Crouie",
    summary: "TODO: one sentence about what it is",
    year: "TODO",
    role: "TODO",
    status: "archived",
    stack: ["TODO"],
    cover: crouie,
    alt: "Crouie branding image",
    repo: "https://github.com/eligibilityy/appbuildersph-hackathon",
  },
  {
    slug: "grade-calc",
    title: "GWA Calculator",
    summary: "TODO: one sentence about what it is",
    year: "TODO",
    role: "TODO",
    status: "in-progress",
    stack: ["TODO"],
    cover: gradeCalc,
    alt: "Screenshot of GWA Calculator",
    repo: "https://github.com/eligibilityy/grade-calc/",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
