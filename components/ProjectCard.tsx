import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  href: string;
  image?: string;
};

export function ProjectCard({ title, href, image }: ProjectCardProps) {
  return (
    <Link href={href} className="group flex flex-col gap-2">
      <div className="relative aspect-3/2 overflow-hidden rounded-lg border border-gray-4 bg-gray-3">
        {image !== undefined && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 200px, 50vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <span className="text-sm text-gray-11 transition-colors duration-150 ease-out group-hover:text-gray-12">
        {title}
      </span>
    </Link>
  );
}
