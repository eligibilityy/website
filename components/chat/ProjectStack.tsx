"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import type { Project } from "@/data/projects";
import { ProjectMenu } from "./ProjectMenu";

import { spring } from "@/lib/motion";

import {
  AnimatePresence,
  MotionConfig,
  useIsPresent,
  motion,
} from "motion/react";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

type ProjectStackProps = {
  projects: [Project, ...Project[]];
};

export function ProjectStack({ projects }: ProjectStackProps) {
  const [first] = projects;
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState(false);

  const closeProject = useCallback(() => {
    setOpenProject(null);
  }, []);

  function handleCardClick(project: Project) {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch && !expanded) {
      setExpanded(true);
      return;
    }
    setOpenProject(project);
  }

  return (
    <MotionConfig reducedMotion="user">
      {projects.length === 1 ? (
        <button
          aria-haspopup="dialog"
          type="button"
          onClick={() => setOpenProject(first)}
          className="aspect-4/3 w-70 cursor-pointer self-start rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-bubble-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {openProject?.slug !== first.slug && (
            <motion.div
              layoutId={`cover-${first.slug}`}
              transition={spring}
              className="relative size-full overflow-hidden shadow-md"
              style={{ borderRadius: 18 }}
            >
              <Image
                src={first.cover}
                alt={first.alt}
                placeholder="blur"
                fill
                sizes="280px"
                className="object-cover"
              />
            </motion.div>
          )}
        </button>
      ) : (
        <div className={`flex flex-col gap-4 py-4 self-stretch`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-9">
              <Squares2X2Icon className="size-4.5" /> {projects.length} projects
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.button
                  type="button"
                  onClick={() => setExpanded(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer text-sm font-medium text-bubble-blue"
                >
                  Collapse
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            layout
            transition={spring}
            className={
              expanded
                ? "grid w-full grid-cols-2 gap-2 sm:grid-cols-3"
                : "group relative aspect-4/3 w-70"
            }
          >
            {projects.map((project, i) => {
              const dir = i % 2 === 1 ? 1 : -1;
              const style = {
                "--rest": `rotate(${i * 4 * dir}deg) translateX(${i * 6 * dir}px)`,
                "--fan": `translateX(${i * 68}%) rotate(${i * 2}deg)`,
              } as CSSProperties;

              return (
                <motion.div
                  key={project.slug}
                  layout
                  transition={spring}
                  style={{ zIndex: projects.length - i }}
                  className={
                    expanded ? "relative aspect-4/3" : "absolute inset-0"
                  }
                >
                  <button
                    aria-haspopup="dialog"
                    type="button"
                    onClick={() => handleCardClick(project)}
                    style={style}
                    className={`size-full cursor-pointer transition-transform duration-500 ease-out motion-reduce:transition-none rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-bubble-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background ${expanded ? "" : "transform-(--rest) group-hover:transform-(--fan) group-has-focus-visible:transform-(--fan)"}`}
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
                          sizes="280px"
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {openProject !== null && (
          <ProjectFocus
            key={openProject.slug}
            project={openProject}
            onClose={closeProject}
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

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPresent) return;

    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    dialogRef.current
      ?.querySelector<HTMLElement>("a[href], button")
      ?.focus({ preventScroll: true });

    function escapeBlur(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", escapeBlur);

    return () => {
      document.removeEventListener("keydown", escapeBlur);
      main?.removeAttribute("inert");
      document.body.style.overflow = "";
      trigger?.focus({ preventScroll: true });
    };
  }, [isPresent, onClose]);

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 z-50 bg-black/25 ${passThrough}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
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
            initial={{ scale: 0.9, y: -8 }}
            animate={{
              scale: 1,
              y: 0,
              transition: { ...spring, delay: 0.08 },
            }}
            exit={{ scale: 0.95, transition: { duration: 0.12 } }}
            style={{ transformOrigin: "top left" }}
          >
            <ProjectMenu project={project} onNavigate={onClose} />
          </motion.div>
        </div>
      </div>
    </>,
    document.body,
  );
}
