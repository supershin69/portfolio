// src/app/page.tsx
import Image from "next/image";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { skills } from "@/lib/data";
import Showcase from "@/components/Showcase";

export default function Home() {
  
  return (
    <main className="min-h-screen bg-[#111111]">
      <Hero />

      {/* --- About Me --- */}
      <section id="about" className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 border-b-4 border-white inline-block pb-2">About Me</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            I am a Full-Stack Developer and a 4th-year Computer Science student. 
            I love building scalable web applications and exploring new technologies.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-10 text-left">
            <div className="bg-[#1d1d1d] p-6 rounded-lg border-l-4 border-white">
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-gray-400">4th Year CS Student</p>
              <p className="text-gray-500 text-sm">University of Computer Studies</p>
            </div>
            <div className="bg-[#1d1d1d] p-6 rounded-lg border-l-4 border-white">
              <h3 className="text-xl font-bold mb-2">Experience</h3>
              <p className="text-gray-400">1 Year at Streaming Startup</p>
              <p className="text-gray-500 text-sm">Full-Stack Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Skills --- */}
      <section id="skills" className="py-20 bg-[#161616]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
          
          <div className="space-y-12">
            {/* Using Now */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-300 border-l-4 border-white pl-4">Using Now</h3>
              <div className="flex flex-wrap gap-6">
                {skills.usingNow.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#1d1d1d] rounded-full flex items-center justify-center p-4 hover:scale-110 transition-transform">
                      {/* Placeholder for images - ensure images exist in public/skills/ */}
                      <Image src={skill.img} alt={skill.name} width={50} height={50} className="object-contain" />
                    </div>
                    <span className="mt-2 text-sm text-gray-400">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-300 border-l-4 border-white pl-4">Learning</h3>
              <div className="flex flex-wrap gap-6">
                {skills.learning.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#1d1d1d] rounded-full flex items-center justify-center p-4 hover:scale-110 transition-transform">
                      <Image src={skill.img} alt={skill.name} width={50} height={50} className="object-contain" />
                    </div>
                    <span className="mt-2 text-sm text-gray-400">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-300 border-l-4 border-white pl-4">Other Skills</h3>
              <div className="flex flex-wrap gap-6">
                {skills.others.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#1d1d1d] rounded-full flex items-center justify-center p-4 hover:scale-110 transition-transform">
                      <Image src={skill.img} alt={skill.name} width={50} height={50} className="object-contain" />
                    </div>
                    <span className="mt-2 text-sm text-gray-400">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Showcase (Apple Style Slider) --- */}
      <Showcase/>

      <ContactForm />
    </main>
  );
}