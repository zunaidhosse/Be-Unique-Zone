import React from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const generalWhatsAppUrl = getWhatsAppLink(SITE_CONFIG.contactMessage);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070605] border-t border-[#cfa95f]/15 py-10 text-[#a89f8f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & WhatsApp */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <h3 className="font-display text-base sm:text-lg font-bold tracking-[0.2em] text-white">
              {SITE_CONFIG.brandName}
            </h3>
            <p className="font-luxury italic text-xs text-[#cfa95f]">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-xs text-[#8c8270] mt-1">
              WhatsApp:{' '}
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cfa95f] hover:underline font-semibold"
              >
                {SITE_CONFIG.whatsappDisplay}
              </a>
            </p>
          </div>

          {/* Minimal Customer Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#collection"
              className="px-4 py-2 rounded-xl bg-[#12110f] border border-white/5 hover:border-[#cfa95f]/40 text-xs tracking-wider uppercase text-[#e2dcd2] hover:text-[#cfa95f] transition-colors"
            >
              Collection
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#12110f] border border-white/5 hover:border-white/30 text-xs text-[#c5beb0] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-wider hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="pt-6 mt-6 border-t border-white/5 text-center text-[11px] text-[#6b6355]">
          Copyright &copy; 2026 {SITE_CONFIG.brandName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
