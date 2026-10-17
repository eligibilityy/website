"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

import type { Project } from "@/data/conversation";
import { ProjectMenu } from "./ProjectMenu";

import {
  AnimatePresence,
  MotionConfig,
  useIsPresent,
  motion,
} from "motion/react";
import { Grid2X2Icon, GridIcon } from "lucide-react";

const spring = { type: "spring", bounce: 0.18, visualDuration: 0.3 } as const;

type ProjectStackProps = {
  projects: [Project, ...Project[]];
};

export function ProjectStack({ projects }: ProjectStackProps) {
  const [first] = projects;
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      {projects.length === 1 ? (
        <button type="button" onClick={() => setOpenProject(first)}>
          <Image
            src={first.cover}
            alt={first.alt}
            placeholder="blur"
            sizes="240px"
            className="h-auto w-60 rounded-[18px]"
          />
        </button>
      ) : (
        <div className="flex flex-col gap-4 self-start py-4">
          <div className="flex items-center gap-1 text-sm font-medium text-gray-9">
            <Grid2X2Icon className="size-4.5" /> {projects.length} projects
          </div>
          <div className="group relative aspect-4/3 w-60 self-start">
            {projects.map((project, i) => {
              const dir = i % 2 === 1 ? 1 : -1;
              const style = {
                "--rest": `rotate(${i * 4 * dir}deg) translateX(${i * 6 * dir}px)`,
                "--fan": `translateX(${i * 68}%) rotate(${i * 2}deg)`,
                zIndex: projects.length - i,
              } as CSSProperties;

              return (
                <button
                  type="button"
                  key={project.slug}
                  onClick={() => setOpenProject(project)}
                  style={style}
                  className="absolute inset-0 cursor-pointer [transform:var(--rest)] group-hover:[transform:var(--fan)] transition-transform duration-500 ease-out motion-reduce:transition-none"
                >
                  {openProject?.slug !== project.slug && (
                    <motion.div
                      layoutId={`cover-${project.slug}`}
                      transition={spring}
                      className="relative size-full overflow-hidden shadow-md"
                      style={{ borderRadius: 18 }}
                    >
                      <Image
                        src={project.cover}
                        alt={project.alt}
                        placeholder="blur"
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <AnimatePresence>
        {" "}
        {openProject !== null && (
          <ProjectFocus
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

function ProjectFocus({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const isPresent = useIsPresent();

  const passThrough = isPresent ? "" : "pointer-events-none";

  useEffect(() => {
    if (!isPresent) return;

    function escapeBlur(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", escapeBlur);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", escapeBlur);
      document.body.style.overflow = "";
    };
  }, [isPresent, onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 z-50 bg-white/35 backdrop-blur-2xl backdrop-saturate-150 ${passThrough}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={onClose}
        className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${passThrough}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-full max-w-100 flex-col gap-3"
        >
          <motion.div
            layoutId={`cover-${project.slug}`}
            transition={spring}
            className="overflow-hidden shadow-xl"
            style={{ borderRadius: 18 }}
          >
            <Image
              src={project.cover}
              alt={project.alt}
              placeholder="blur"
              sizes="400px"
              className="h-auto w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { ...spring, delay: 0.08 },
            }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
            style={{ transformOrigin: "top left" }}
          >
            <ProjectMenu project={project} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
