import React from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';
import { MessageCircle, Compass } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const contactWhatsAppUrl = getWhatsAppLink(SITE_CONFIG.contactMessage);

  return (
    <section id="home" className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center items-center pt-28 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-luxury pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#cfa95f]/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Diamond Emblem */}
        <div className="mb-5 relative" aria-hidden="true">
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#cfa95f]/25 via-[#f4e8cc]/10 to-transparent blur-md" />
            <svg viewBox="0 0 400 380" className="w-full h-full drop-shadow-[0_4px_24px_rgba(207,169,95,0.35)]">
              <defs>
                <linearGradient id="gGemHeroClean" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fbf3e4" />
                  <stop offset="45%" stopColor="#cfa95f" />
                  <stop offset="100%" stopColor="#ead9a8" />
                </linearGradient>
                <clipPath id="gemClipHeroClean">
                  <path d="M110 70h180l80 72-170 200L30 142z" />
                </clipPath>
              </defs>
              <g clipPath="url(#gemClipHeroClean)">
                <path d="M110 70h180l80 72H30z" fill="#d9bc7c" opacity="0.15" />
                <path d="M30 142h340L200 342z" fill="#d9bc7c" opacity="0.08" />
              </g>
              <g fill="none" stroke="url(#gGemHeroClean)" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
                <path d="M110 70h180l80 72-170 200L30 142z" />
                <path d="M30 142h340" />
                <path d="M110 70l40 72 50-72 50 72 40-72" />
                <path d="M150 142l50 200 50-200" />
                <path d="M30 142l170 200M370 142L200 342" />
              </g>
            </svg>
          </div>
        </div>

        {/* Brand Name (Dominant, clean, pristine) */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.18em] uppercase text-white mb-3">
          <span className="text-gradient-gold">{SITE_CONFIG.brandName}</span>
        </h1>

        {/* Tagline Only */}
        <p className="font-luxury italic text-xl sm:text-2xl text-[#ecd7a4] tracking-wider mb-8">
          {SITE_CONFIG.tagline}
        </p>

        {/* Clean Direct Buttons (No text clutter, straight to collection) */}
        <div className="flex flex-row items-center justify-center gap-3.5">
          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-[#0b0a09] font-bold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(207,169,95,0.35)] cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Collection</span>
          </button>

          <a
            href={contactWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#cfa95f]/40 hover:border-[#cfa95f] text-[#f2e6cb] hover:bg-[#cfa95f]/10 text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-[#cfa95f]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
