import type { Message } from "@/data/conversation";

export type Position = "single" | "first" | "middle" | "last";
export function getPosition(messages: Message[], index: number): Position {
  const current = messages[index];
  const sameAsPrev = messages[index - 1]?.from === current.from;
  const sameAsNext = messages[index + 1]?.from === current.from;

  if (!sameAsPrev && !sameAsNext) return "single";
  if (!sameAsPrev) return "first";
  if (!sameAsNext) return "last";
  return "middle";
}
