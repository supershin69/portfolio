"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const images = [
  "/showcase/login.png",
  "/showcase/fruitable.jpg",
  "/showcase/dashboard_1.png",
  "/showcase/dashboard_2.png",
];

export default function Showcase() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId: number;
    const speed = 0.25; // adjust speed at will nigga

    const loop = () => {
      offsetRef.current += speed;
      el.scrollLeft = offsetRef.current;

      // seamless infinite loop
      if (offsetRef.current >= el.scrollWidth / 2) {
        offsetRef.current = 0;
        el.scrollLeft = 0;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="showcase" className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <h2 className="text-4xl font-bold">Showcase</h2>
        <p className="text-gray-400">My recent works</p>
      </div>

      {/* VIEWPORT */}
      <div className="overflow-hidden">
        {/* TRACK */}
        <div
          ref={trackRef}
          className="flex gap-8 px-6 overflow-x-auto no-scrollbar"
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="shrink-0 w-[80vw] md:w-[600px] h-[350px] md:h-[400px] bg-[#1d1d1d] rounded-2xl relative overflow-hidden border border-gray-800"
            >
              <Image
                src={src}
                alt={`Project Showcase ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 600px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
