import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import {
  Check,
  CodeXml,
  Eye,
  Globe,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/data/conversation";

type MenuItem =
  | {
      kind: "link";
      label: string;
      icon: LucideIcon;
      href: string;
      external: boolean;
    }
  | { kind: "action"; label: string; icon: LucideIcon; onSelect: () => void };

type ProjectMenuProps = {
  project: Project;
};

export function ProjectMenu({ project }: ProjectMenuProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = new URL(
      `/work/${project.slug}`,
      window.location.origin,
    ).toString();
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const items: MenuItem[] = [
    {
      kind: "link",
      label: "View project",
      icon: Eye,
      href: `/work/${project.slug}`,
      external: false,
    },
  ];
  if (project.url !== undefined) {
    items.push({
      kind: "link",
      label: "Visit site",
      icon: Globe,
      href: project.url,
      external: true,
    });
  }
  if (project.repo !== undefined) {
    items.push({
      kind: "link",
      label: "View source",
      icon: CodeXml,
      href: project.repo,
      external: true,
    });
  }
  items.push({
    kind: "action",
    label: copied ? "Copied!" : "Copy link",
    icon: copied ? Check : LinkIcon,
    onSelect: copyLink,
  });

  const row =
    "flex w-full cursor-pointer items-center gap-3 rounded-[20px] px-3.5 py-1.5 text-left text-gray-12 outline-none transition-colors duration-150 ease-out hover:bg-black/5 focus-visible:bg-white/40";

  return (
    <ul className="glass w-60 rounded-[26px] p-1.5">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <div className="flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-foreground" />
            <span className="leading-6">{item.label}</span>
          </div>
        );

        return (
          <Fragment key={item.label}>
            {item.kind === "action" && (
              <li role="separator" className="mx-2 my-1 h-px bg-black/10" />
            )}
            <li>
              {item.kind === "action" ? (
                <button type="button" onClick={item.onSelect} className={row}>
                  {content}
                </button>
              ) : item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={row}
                >
                  {content}
                </a>
              ) : (
                <Link href={item.href} className={row}>
                  {content}
                </Link>
              )}
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
