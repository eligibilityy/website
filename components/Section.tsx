import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  count?: string;
  children: ReactNode;
};

export function Section({ title, count, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-baseline gap-2 border-b border-gray-4 pb-3 font-medium text-gray-12">
        {title}
        {/* `!== undefined` instead of `&&`, so a falsy value can't render stray text */}
        {count !== undefined && <span className="text-gray-9">{count}</span>}
      </h2>
      {children}
    </section>
  );
}
