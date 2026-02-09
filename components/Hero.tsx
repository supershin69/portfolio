// src/components/Hero.tsx
import Image from "next/image";
import { Github, Linkedin, Send } from "lucide-react"; // Send as Telegram icon substitute or use FontAwesome

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center h-full pt-20">
        
        {/* Text Content */}
        <div className="order-2 md:order-1 flex flex-col justify-center space-y-6 z-10">
          <h2 className="text-xl md:text-2xl font-light text-gray-400">Hello, I am</h2>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Shin Thant <br /> Aung
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium">
            Full-Stack Developer
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-6 pt-4">
            <a href="https://www.linkedin.com/in/shin-thant-aung-18372524a/" target="_blank" className="hover:scale-110 transition-transform"><Linkedin size={30} /></a>
            <a href="https://github.com/supershin69/" target="_blank" className="hover:scale-110 transition-transform"><Github size={30} /></a>
            <a href="https://t.me/shinthant177013" target="_blank" className="hover:scale-110 transition-transform"><Send size={30} /></a>
          </div>
        </div>

        {/* Hero Image - Specifically styled for tall aspect ratio */}
        <div className="order-1 md:order-2 relative w-full h-[50vh] md:h-full flex justify-center md:justify-end items-end">
          {/* Using object-top to ensure head is visible */}
          <div className="relative w-full max-w-md h-full md:h-[90%]">
             {/* Gradient overlay at bottom to blend image into background */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#111111] to-transparent z-10"></div>
            
            <Image 
              src="/stylish_me.jpg" 
              alt="Shin Thant Aung"
              fill
              className="object-cover object-top rounded-b-lg opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}