import { discordID } from "@/util/constants";

import type { Types } from "@prequist/lanyard";

export type Sender = "elijah" | "visitor";

export type Inline = string | { label: string; href: string };

import { projects, type NonEmpty, type Project } from "./projects";

export type CardItem = {
  title: string;
  detail?: string;
  date?: string;
};

export type Message =
  | { kind: "text"; from: Sender; text: string | Inline[] }
  | { kind: "projects"; from: "elijah"; projects: NonEmpty<Project> }
  | { kind: "card"; from: "elijah"; title: string; items: CardItem[] }
  | { kind: "presence"; from: "elijah"; discordID: Types.Snowflake };

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
    projects,
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
        date: "2026 – Present",
      },
      // bettergov repo is gone:(
      // {
      //   title: "Contributor",
      //   detail: "Bettergov.ph",
      //   date: "2025",
      // },
      {
        title: "Web Development Head",
        detail: "Association of Computer Enthusiasts - SHS Chapter",
        date: "2024 – 2025",
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
    discordID: discordID,
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
      { label: "twitter (inactive)", href: "https://twitter.com/yiliya_iya" },
    ],
  },
];
