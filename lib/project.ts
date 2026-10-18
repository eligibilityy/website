import type { Project } from "@/data/projects";

type Status = Project["status"];

export const statusLabel: Record<Status, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};

export const projectStatusDot: Record<Status, string> = {
  live: "bg-green-9",
  "in-progress": "bg-amber-400",
  archived: "bg-gray-8",
};
