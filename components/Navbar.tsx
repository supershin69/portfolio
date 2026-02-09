// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change color after scrolling past hero (approx 80vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Me", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-black text-white py-4 shadow-lg" : "bg-black/10 backdrop-blur-sm text-white py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo / Name */}
        <Link href="/" className="text-xl font-bold tracking-widest uppercase">
          Shin Thant Aung
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gray-300 transition-colors font-medium">
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className={clsx(
              "px-5 py-2 rounded-full font-bold transition-all",
              isScrolled ? "bg-white text-black hover:bg-gray-200" : "bg-white text-black hover:bg-gray-200"
            )}
          >
            Contact Me
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center py-6 space-y-6 md:hidden shadow-xl border-t border-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="text-lg font-medium hover:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Me
          </Link>
        </div>
      )}
    </nav>
  );
}