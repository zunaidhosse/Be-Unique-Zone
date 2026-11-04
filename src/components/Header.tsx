import React, { useState, useEffect } from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';
import { MessageCircle, Heart } from 'lucide-react';
import { WelcomeAudioPlayer } from './WelcomeAudioPlayer';

interface HeaderProps {
  inquiryCount: number;
  onOpenInquiries: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  inquiryCount,
  onOpenInquiries,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generalWhatsAppUrl = getWhatsAppLink(SITE_CONFIG.contactMessage);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0a09]/95 backdrop-blur-md border-b border-[#cfa95f]/20 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Top Brand Name Only */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-white group whitespace-nowrap"
            aria-label="Be Unique Zone Home"
          >
            <div className="w-8 h-8 rounded-full border border-[#cfa95f]/60 flex items-center justify-center p-1 bg-[#1a1714] group-hover:border-[#cfa95f] transition-colors">
              <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="gMarkHeader" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f7edd4" />
                    <stop offset="50%" stopColor="#cfa95f" />
                    <stop offset="100%" stopColor="#e8d5a3" />
                  </linearGradient>
                </defs>
                <path
                  d="M14 8h20l8 11-18 21L6 19z"
                  fill="none"
                  stroke="url(#gMarkHeader)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 19h36M14 8l5 11 5-11 5 11 5-11M19 19l5 21 5-21"
                  fill="none"
                  stroke="url(#gMarkHeader)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-display tracking-[0.25em] text-base sm:text-lg font-bold text-gradient-gold">
              {SITE_CONFIG.brandName}
            </span>
          </a>

          {/* Clean Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="#collection"
              className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-[#c5beb0] hover:text-[#cfa95f] transition-colors"
            >
              Collection
            </a>

            {inquiryCount > 0 && (
              <button
                onClick={onOpenInquiries}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181613] border border-[#cfa95f]/40 text-xs text-[#cfa95f] hover:text-white transition-colors cursor-pointer"
                title="View saved pieces"
              >
                <Heart className="w-3.5 h-3.5 fill-[#cfa95f]" />
                <span>{inquiryCount}</span>
              </button>
            )}

            <WelcomeAudioPlayer />

            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-[#0b0a09] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_2px_12px_rgba(207,169,95,0.25)]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#0b0a09]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
