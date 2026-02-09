// src/app/pricing/page.tsx
import { pricingCards } from "@/lib/data";
import Link from "next/link";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#111111] pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Pricing</h1>
          <p className="text-xl text-gray-400">Choose the service that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingCards.map((card) => (
            <div key={card.title} className="bg-[#1d1d1d] p-8 rounded-2xl border border-gray-800 hover:border-white transition-all flex flex-col">
              <h3 className="text-xl font-bold text-gray-300 mb-2">{card.title}</h3>
              <div className="text-4xl font-bold mb-6">{card.price}<span className="text-lg font-normal text-gray-500">/start</span></div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-400">
                  <Check size={18} className="text-white" /> Responsive Design
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Check size={18} className="text-white" /> Source Code
                </li>
              </ul>

              <Link 
                href="/#contact" 
                className="block text-center w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}