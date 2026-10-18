import { notFound } from "next/navigation";
import { projectContent } from "@/content/projects";
import { getProject, getNextProject } from "@/data/projects";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { projectStatusDot, statusLabel } from "@/lib/project";
import type { ReactNode } from "react";

export async function ProjectDetails({
  params,
}: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (project === undefined) notFound();

  const Content = projectContent[slug];
  if (Content === undefined) notFound();

  const next = getNextProject(slug);

  return (
    <div className="flex flex-col gap-7">
      <Image
        src={project.cover}
        alt={project.alt}
        placeholder="blur"
        preload
        sizes="(min-width: 768px) 640px, 100vw"
        className="h-auto w-full rounded-[18px] shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_24px_rgb(0_0_0/0.08)]"
      />

      <header className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.02em] text-gray-12">
            {project.title}
          </h1>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-3 px-2.5 py-0.5 text-xs text-gray-11">
            <span
              className={`size-1.5 rounded-full ${projectStatusDot[project.status]}`}
            />
            {statusLabel[project.status]}
          </span>
        </div>
        <p className="text-gray-11">{project.summary}</p>
      </header>

      {(project.url !== undefined || project.repo !== undefined) && (
        <div className="flex flex-wrap gap-2">
          {project.url !== undefined && (
            <PillLink href={project.url} variant="primary">
              Visit site
            </PillLink>
          )}
          {project.repo !== undefined && (
            <PillLink href={project.repo} variant="secondary">
              View source
            </PillLink>
          )}
        </div>
      )}

      <dl className="grid grid-cols-2 gap-3 border-y border-gray-4 py-3.5 sm:grid-cols-3">
        <Fact label="Role" value={project.role} />
        <Fact label="Year" value={project.year} />
        {project.team !== undefined && (
          <Fact label="Team" value={project.team} />
        )}
      </dl>

      <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((tool) => (
          <li
            key={tool}
            className="rounded-full bg-gray-3 px-2.5 py-0.5 text-xs text-gray-11"
          >
            {tool}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4">
        <Content />
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="mt-4 flex items-center gap-3.5 rounded-[18px] border border-gray-4 bg-gray-2 p-3 transition-colors duration-150 ease-out hover:bg-gray-3"
      >
        <Image
          src={next.cover}
          alt=""
          placeholder="blur"
          sizes="72px"
          className="aspect-4/3 w-18 shrink-0 rounded-[10px] object-cover"
        />
        <span className="flex flex-col">
          <span className="text-xs text-gray-9">Next project</span>
          <span className="font-medium text-gray-12">{next.title}</span>
        </span>
        <ChevronRightIcon className="ml-auto size-4 text-gray-9" />
      </Link>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="flex flex-col gap-7" aria-hidden="true">
      <div className="aspect-4/3 w-full animate-pulse rounded-[18px] bg-gray-3 motion-reduce:animate-none" />
      <div className="h-6 w-40 animate-pulse rounded-md bg-gray-3 motion-reduce:animate-none" />
      <div className="h-4 w-64 animate-pulse rounded-md bg-gray-3 motion-reduce:animate-none" />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs text-gray-9">{label}</dt>
      <dd className="text-sm text-gray-12">{value}</dd>
    </div>
  );
}

function PillLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
}) {
  const color =
    variant === "primary"
      ? "bg-bubble-blue text-white"
      : "bg-bubble-gray text-gray-12";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-opacity duration-150 ease-out hover:opacity-85 ${color}`}
    >
      {children}
      <ArrowUpRightIcon className="size-3.5" />
    </a>
  );
}
