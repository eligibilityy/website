"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

// The Navigation API isn't in TypeScript's DOM types yet.
declare global {
  interface Window {
    navigation?: { canGoBack: boolean };
  }
}

export function BackLink() {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (window.navigation?.canGoBack) {
      event.preventDefault();
      router.back();
    }
  }

  return (
    <Link href="/" onClick={handleClick} className="text-sm text-bubble-blue">
      ‹ Back
    </Link>
  );
}
