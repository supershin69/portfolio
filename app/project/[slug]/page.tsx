// src/app/project/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#111111] pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold">{project.title}</h1>
          <p className="mt-3 text-gray-400">Swipe through the gallery to explore the full project.</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#1d1d1d] overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {project.images.map((image, index) => {
              const isPortrait = image.height > image.width;
              const containerRatio = isPortrait ? "16 / 10" : `${image.width} / ${image.height}`;

              return (
                <div key={image.src} className="min-w-full snap-center px-6 py-8">
                  <div
                    className="relative w-full max-w-[260px] sm:max-w-[480px] lg:max-w-[620px] mx-auto"
                    style={{ aspectRatio: containerRatio }}
                  >
                  <Image
                    src={image.src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-contain max-h-[60vh]"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={index === 0}
                  />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="bg-[#1d1d1d] rounded-2xl border border-gray-800 p-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-400 leading-relaxed">
              This case study highlights the core experience, UI decisions, and technical
              approach behind {project.title}. A full write-up will be added once the final
              assets and notes are ready.
            </p>
          </div>

          <div className="bg-[#1d1d1d] rounded-2xl border border-gray-800 p-8">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Status</span>
                <span>Case study in progress</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Scope</span>
                <span>Design + Development</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Assets</span>
                <span>Gallery provided</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
