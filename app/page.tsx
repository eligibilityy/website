import { ListItem } from "@/components/ListItem";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { Status } from "@/components/Status";

export default function Home() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium text-gray-12">Elijah Panique</h2>
          <Status label="Currently available for projects" />
        </div>
        <p className="text-gray-11">
          Web designer, Framer expert, and Computer Science student from the
          Philippines.
        </p>
        <p className="text-gray-11">
          I work with small businesses, organizations, startups, and growing
          tech teams who want their presence on the web to actually mean
          something.
        </p>
      </header>

      <Section title="Work" count="3+">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <ProjectCard title="UNT Wingspan" href="#" />
          <ProjectCard title="Project two" href="#" />
          <ProjectCard title="Project three" href="#" />
        </div>
      </Section>

      <Section title="Writing">
        <div className="flex flex-col">
          <ListItem
            title="Post title"
            description="One-line summary"
            meta="Oct 2026"
            href="#"
          />
          <ListItem
            title="Another post"
            description="One-line summary"
            meta="Sep 2026"
            href="#"
          />
        </div>
      </Section>
    </>
  );
}
