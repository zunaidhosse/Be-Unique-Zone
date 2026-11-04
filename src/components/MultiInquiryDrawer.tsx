import React from 'react';
import { ProductItem } from '../data/products';
import { getMultiProductOrderLink, SITE_CONFIG } from '../data/config';
import { X, Trash2, MessageCircle, Heart, Eye } from 'lucide-react';

interface MultiInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryList: ProductItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onOpenDetails: (product: ProductItem) => void;
}

export const MultiInquiryDrawer: React.FC<MultiInquiryDrawerProps> = ({
  isOpen,
  onClose,
  inquiryList,
  onRemoveItem,
  onClearAll,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  const productIds = inquiryList.map((p) => p.id);
  const multiWhatsAppUrl = getMultiProductOrderLink(productIds);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Inquiry Tray"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#11100e] border-l border-[#cfa95f]/30 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0e0d0b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#cfa95f]/20 flex items-center justify-center text-[#cfa95f]">
              <Heart className="w-4 h-4 fill-[#cfa95f]" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Inquiry Tray ({inquiryList.length})
              </h3>
              <p className="text-[11px] text-[#a49a88]">
                Ask for prices of multiple pieces together
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {inquiryList.length > 0 ? (
            inquiryList.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#161412] border border-white/5 hover:border-[#cfa95f]/30 transition-colors"
              >
                <div
                  className="w-16 h-16 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden"
                  onClick={() => {
                    onOpenDetails(product);
                    onClose();
                  }}
                  title="View full preview"
                >
                  <img
                    src={product.image}
                    alt={product.id}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-sm font-bold text-white tracking-wide truncate">
                      {product.id}
                    </h4>
                    <span className="text-[10px] text-[#cfa95f] uppercase tracking-wider font-semibold">
                      BUZ
                    </span>
                  </div>
                  {product.category && (
                    <span className="text-[10px] text-[#8e8574] block truncate">
                      {product.category}
                    </span>
                  )}
                  <span className="text-[10px] text-[#cfa95f]/80 mt-1 block">
                    Price available on WhatsApp
                  </span>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onOpenDetails(product);
                      onClose();
                    }}
                    className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
                    title="View details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-1.5 text-red-400/70 hover:text-red-400 rounded hover:bg-white/5 transition-colors cursor-pointer"
                    title="Remove from tray"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-[#99907f] space-y-3">
              <Heart className="w-10 h-10 text-[#cfa95f]/30 mx-auto stroke-1" />
              <p className="text-sm font-medium text-white">Your inquiry tray is empty</p>
              <p className="text-xs max-w-xs mx-auto leading-relaxed">
                Click the heart icon on any jewelry piece to add it here, then send a combined inquiry to WhatsApp.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {inquiryList.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#0e0d0b] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#9d9382]">
              <span>Selected Pieces: <strong className="text-white">{inquiryList.length}</strong></span>
              <button
                onClick={onClearAll}
                className="text-red-400 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>

            <a
              href={multiWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-[#0b0a09] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-[#0b0a09]" />
              <span>Inquire for {inquiryList.length} Pieces on WhatsApp</span>
            </a>

            <p className="text-[10px] text-center text-[#7e7667]">
              Pre-composed message sent directly to {SITE_CONFIG.whatsappDisplay}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
