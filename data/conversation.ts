import { discordID } from "@/util/constants";

import wingspan from "@/public/images/wingspan.jpg";
import crouie from "@/public/images/crouie.jpg";
import gradeCalc from "@/public/images/grade-calc.jpg";

import { StaticImageData } from "next/image";

export type Sender = "elijah" | "visitor";

export type Inline = string | { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  cover: StaticImageData;
  alt: string;
  url?: string;
  repo?: string;
};

export type CardItem = {
  title: string;
  detail?: string;
  date?: string;
};

export type Message =
  | { kind: "text"; from: Sender; text: string | Inline[] }
  | { kind: "projects"; from: "elijah"; projects: [Project, ...Project[]] }
  | { kind: "card"; from: "elijah"; title: string; items: CardItem[] }
  | { kind: "presence"; from: "elijah"; discordId: string };

export const conversation: Message[] = [
  { kind: "text", from: "elijah", text: "Hi! I'm Elijah :)" },
  {
    kind: "text",
    from: "elijah",
    text: [
      "Currently a first year CS student in ",
      { label: "De La Salle Lipa", href: "https://www.dlsl.edu.ph/" },
    ],
  },
  {
    kind: "text",
    from: "elijah",
    text: "I'm exploring and building things I think other people would enjoy as much as I do",
  },
  {
    kind: "text",
    from: "visitor",
    text: "What have you made so far?",
  },
  {
    kind: "projects",
    from: "elijah",
    projects: [
      {
        slug: "wingspan",
        title: "UNT Wingspan",
        cover: wingspan,
        alt: "UNT Wingspan Homepage",
        url: "https://yiliya.studio/projects/wingspan",
      },
      {
        slug: "crouie",
        title: "Crouie",
        cover: crouie,
        alt: "Crouie branding image",
        repo: "https://github.com/eligibilityy/appbuildersph-hackathon",
      },
      {
        slug: "grade-calc",
        title: "GWA Calculator",
        cover: gradeCalc,
        alt: "Screenshot of GWA Calculator",
        repo: "https://github.com/eligibilityy/grade-calc/",
      },
    ],
  },
  {
    kind: "text",
    from: "visitor",
    text: "Have you participated in anything?",
  },
  {
    kind: "card",
    from: "elijah",
    title: "my experience",
    items: [
      {
        title: "1st Year CS Representative",
        detail: "Junior Philippine Computer Society - DLSL Chapter",
        date: "August 2026 - Present",
      },
      {
        title: "Web Development Head",
        detail: "Association of Computer Enthusiasts - SHS Chapter",
        date: "2024 - 2025",
      },
      {
        title: "Contributor",
        detail: "Bettergov.ph",
        date: "2025",
      },
    ],
  },
  {
    kind: "text",
    from: "visitor",
    text: "What are you up to?",
  },
  {
    kind: "presence",
    from: "elijah",
    discordId: discordID,
  },
  {
    kind: "text",
    from: "visitor",
    text: "How do I reach you?",
  },
  {
    kind: "text",
    from: "elijah",
    text: [
      "You can reach me on ",
      { label: "github", href: "https://github.com/eligibilityy" },
      ", ",
      { label: "linkedin", href: "https://www.linkedin.com/in/yiliya" },
      " or ",
      { label: "twitter (inactive)", href: "https://twitter.com/liya_iya" },
    ],
  },
];
