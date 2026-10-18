import type { Metadata } from "next";
import { BackLink } from "@/components/project/BackLink";
import { getProject, projects } from "@/data/projects";
import { Suspense } from "react";
import {
  ProjectDetails,
  ProjectSkeleton,
} from "@/components/project/ProjectDetails";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <article className="flex flex-col gap-8">
      <BackLink />
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectDetails params={params} />
      </Suspense>
    </article>
  );
}
