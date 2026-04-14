import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/projects";

export default async function Showcase() {
  const projects = await getProjects();
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="showcase" className="py-20">
      <div className="container mx-auto px-6 mb-10">
        <h2 className="text-4xl font-bold">Showcase</h2>
        <p className="text-gray-400">My recent works</p>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/project/${project.slug}`}
              className="group bg-[#1d1d1d] rounded-2xl border border-gray-800 p-4 hover:border-white/70 transition-colors"
            >
              <div className="rounded-xl bg-[#141414] border border-gray-800 overflow-hidden">
                <Image
                  src={project.mainImage.src}
                  alt={`${project.title} thumbnail`}
                  width={project.mainImage.width}
                  height={project.mainImage.height}
                  className="w-full h-auto max-h-44 md:max-h-48 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 border border-gray-700 px-2 py-1 rounded-full">
                  Case Study
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-400">Tap to view the gallery.</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:justify-end">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-gray-300 hover:text-white transition-colors"
          >
            See More Projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
