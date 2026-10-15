import type { Sender } from "@/data/conversation";
import type { ReactNode } from "react";

type BubbleProps = {
  from: Sender;
  tail: boolean;
  children: ReactNode;
};

export function Bubble({ from, tail, children }: BubbleProps) {
  const base = `relative w-fit max-w-[75%] leading-tight rounded-[18px] px-3 py-[8px] ${from == "elijah" ? "self-start bg-bubble-gray text-gray-12" : "self-end bg-bubble-blue text-white"}`;
  const tailClass = tail
    ? from === "elijah"
      ? "tail-left"
      : "tail-right"
    : "";

  return <div className={`${base} ${tailClass}`}>{children}</div>;
}
