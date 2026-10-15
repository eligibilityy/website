import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
};

const styles =
  "text-gray-12 underline decoration-gray-6 underline-offset-[3px] transition-colors duration-150 ease-out hover:decoration-gray-12";

export function TextLink({ href, children }: TextLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
      {children}
    </a>
  );
}
