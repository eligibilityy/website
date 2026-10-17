import { notFound } from "next/navigation";
import { projectContent } from "@/content/projects";
import { getProject } from "@/data/projects";

export async function ProjectDetails({
  params,
}: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (project === undefined) notFound();

  const Content = projectContent[slug];
  if (Content === undefined) notFound();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-medium text-gray-12">{project.title}</h1>
        <p className="text-gray-11">{project.summary}</p>
      </header>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
        <dt className="text-gray-9">Role</dt>
        <dd className="text-gray-12">{project.role}</dd>
        <dt className="text-gray-9">Year</dt>
        <dd className="text-gray-12">{project.year}</dd>
        <dt className="text-gray-9">Stack</dt>
        <dd className="text-gray-12">{project.stack.join(", ")}</dd>
      </dl>
      <div className="flex flex-col gap-4">
        <Content />
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <div className="h-6 w-40 animate-pulse rounded-md bg-gray-3 motion-reduce:animate-none" />
      <div className="h-4 w-64 animate-pulse rounded-md bg-gray-3 motion-reduce:animate-none" />
    </div>
  );
}
