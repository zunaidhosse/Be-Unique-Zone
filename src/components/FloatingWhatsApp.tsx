import React from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';
import { MessageCircle, Heart } from 'lucide-react';

interface FloatingWhatsAppProps {
  inquiryCount: number;
  onOpenInquiries: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  inquiryCount,
  onOpenInquiries,
}) => {
  const generalWhatsAppUrl = getWhatsAppLink(SITE_CONFIG.contactMessage);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Inquiry Tray trigger if items selected */}
      {inquiryCount > 0 && (
        <button
          onClick={onOpenInquiries}
          className="group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-[#161412]/95 hover:bg-[#201d19] border border-[#cfa95f]/60 text-white shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
          aria-label={`View ${inquiryCount} saved inquiry pieces`}
        >
          <span className="relative flex items-center justify-center">
            <Heart className="w-4 h-4 text-[#cfa95f] fill-[#cfa95f]" />
            <span className="absolute -top-2 -right-2.5 bg-[#cfa95f] text-[#0b0a09] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
              {inquiryCount}
            </span>
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#f7edd4] hidden sm:inline">
            Inquiry Tray ({inquiryCount})
          </span>
        </button>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={generalWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_6px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_35px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat with Be Unique Zone on WhatsApp (+8801729800061)"
        title="Chat on WhatsApp (+8801729800061)"
      >
        {/* Pulsing ring aura */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-white stroke-[1.5]" />

        {/* Hover Tooltip on desktop */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#0b0a09]/95 text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-[#cfa95f]/30 shadow-lg">
          Message on WhatsApp &middot; {SITE_CONFIG.whatsappDisplay}
        </span>
      </a>
    </div>
  );
};
