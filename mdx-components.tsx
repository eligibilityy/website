import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { TextLink } from "@/components/TextLink";

const components: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="mt-6 text-[17px] font-semibold tracking-[-0.01em] text-gray-12"
    />
  ),
  h3: (props) => <h3 {...props} className="mt-4 font-medium text-gray-12" />,
  p: (props) => <p {...props} className="text-gray-11" />,
  ul: (props) => (
    <ul {...props} className="list-disc space-y-1 pl-5 text-gray-11" />
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal space-y-1 pl-5 text-gray-11" />
  ),
  a: ({ href = "", children }) => <TextLink href={href}>{children}</TextLink>,
  Image,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
