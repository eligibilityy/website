import type { Sender } from "@/data/conversation";
import type { ReactNode } from "react";

type BubbleProps = {
  from: Sender;
  tail: boolean;
  variant?: "text" | "card" | "media";
  children: ReactNode;
};

export function Bubble({
  from,
  tail,
  variant = "text",
  children,
}: BubbleProps) {
  const shape =
    variant === "text"
      ? "w-fit max-w-[75%] px-4 py-[8px] leading-tight"
      : variant === "card"
        ? "w-full max-w-[340px]"
        : "w-full max-w-[280px]";
  const color =
    from === "elijah"
      ? "self-start bg-bubble-gray text-gray-12"
      : "self-end bg-bubble-blue text-white";
  const tailClass = tail
    ? from === "elijah"
      ? "tail-left"
      : "tail-right"
    : "";

  return (
    <div
      className={`relative rounded-[18px] text-base ${shape} ${color} ${tailClass}`}
    >
      {children}
    </div>
  );
}
