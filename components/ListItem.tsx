import Link from "next/link";

type ListItemProps = {
  title: string;
  href: string;
  description?: string;
  meta?: string;
};

export function ListItem({ title, href, description, meta }: ListItemProps) {
  return (
    <Link
      href={href}
      className="-mx-3 flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors duration-150 ease-out hover:bg-gray-3"
    >
      <span className="flex flex-col">
        <span className="text-gray-12">{title}</span>
        {description !== undefined && (
          <span className="text-gray-11">{description}</span>
        )}
      </span>
      {meta !== undefined && (
        <span className="shrink-0 text-sm text-gray-9 tabular-nums">
          {meta}
        </span>
      )}
    </Link>
  );
}
