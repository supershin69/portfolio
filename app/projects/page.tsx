// src/app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/projects";

const PROJECTS_PER_PAGE = 5;

type ProjectsPageProps = {
  searchParams?: {
    page?: string;
  };
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = await getProjects();
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const requestedPage = Number.parseInt(searchParams?.page ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);

  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const pageProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#111111] pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-gray-400">Browse every project and open the full gallery.</p>
        </div>

        <div className="grid gap-6">
          {pageProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/project/${project.slug}`}
              className="group bg-[#1d1d1d] p-6 rounded-2xl border border-gray-800 hover:border-white/70 transition-colors"
            >
              <div className="rounded-xl bg-[#141414] border border-gray-800 overflow-hidden">
                <Image
                  src={project.mainImage.src}
                  alt={`${project.title} thumbnail`}
                  width={project.mainImage.width}
                  height={project.mainImage.height}
                  className="w-full h-auto max-h-56 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold">{project.title}</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 border border-gray-700 px-2 py-1 rounded-full">
                  Case Study
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-400">View the gallery and project details.</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {currentPage > 1 ? (
            <Link
              href={`/projects?page=${currentPage - 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-300 hover:text-white hover:border-white/70 transition-colors"
            >
              <ArrowLeft size={16} />
              Prev
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-full text-sm text-gray-600">
              <ArrowLeft size={16} />
              Prev
            </span>
          )}

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;
            return (
              <Link
                key={pageNumber}
                href={`/projects?page=${pageNumber}`}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "border border-gray-700 text-gray-300 hover:text-white hover:border-white/70"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </Link>
            );
          })}

          {currentPage < totalPages ? (
            <Link
              href={`/projects?page=${currentPage + 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-300 hover:text-white hover:border-white/70 transition-colors"
            >
              Next
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-full text-sm text-gray-600">
              Next
              <ArrowRight size={16} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
