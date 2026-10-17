import type { MDXContent } from "mdx/types";
import Crouie from "./crouie.mdx";
import GradeCalc from "./grade-calc.mdx";
import Wingspan from "./wingspan.mdx";

export const projectContent: Record<string, MDXContent | undefined> = {
  wingspan: Wingspan,
  crouie: Crouie,
  "grade-calc": GradeCalc,
};
