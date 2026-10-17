"use client";

import { LayoutGroup, MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";
import { spring } from "@/lib/motion";

export function ChatList({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <ol aria-label="Conversation" className="flex flex-col">
          {children}
        </ol>
      </LayoutGroup>
    </MotionConfig>
  );
}

export function ChatItem({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <motion.li layout="position" transition={spring} className={className}>
      {children}
    </motion.li>
  );
}
