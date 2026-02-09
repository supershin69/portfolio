// src/components/Footer.tsx
"use client";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black py-8 border-t border-gray-900">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Shin Thant Aung. All rights reserved.</p>
        
        <button 
          onClick={scrollToTop} 
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          Back to Top <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}