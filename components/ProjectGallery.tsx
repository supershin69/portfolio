"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";

type ProjectGalleryProps = {
  images: ProjectImage[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBySlide = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const offset = direction === "next" ? track.clientWidth : -track.clientWidth;
    track.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#1d1d1d] overflow-hidden relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar" ref={trackRef}>
        {images.map((image, index) => {
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
                  alt={`${title} screenshot ${index + 1}`}
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

      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
        <button
          type="button"
          onClick={() => scrollBySlide("prev")}
          className="pointer-events-auto h-10 w-10 rounded-full bg-black/60 border border-gray-700 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollBySlide("next")}
          className="pointer-events-auto h-10 w-10 rounded-full bg-black/60 border border-gray-700 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
