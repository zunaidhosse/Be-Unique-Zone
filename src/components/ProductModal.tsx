import React, { useState, useEffect, useCallback } from 'react';
import { ProductItem } from '../data/products';
import { getProductOrderLink, SITE_CONFIG } from '../data/config';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MessageCircle,
  Heart,
  Check,
  Share2,
  Copy,
  Sparkles,
} from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  allProducts: ProductItem[];
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
  isInInquiryList: boolean;
  onToggleInquiry: (product: ProductItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  allProducts,
  onClose,
  onSelectProduct,
  isInInquiryList,
  onToggleInquiry,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Reset zoom whenever product changes
  useEffect(() => {
    setZoomLevel(1);
    setCopied(false);
  }, [product?.id]);

  const currentIndex = allProducts.findIndex((p) => p.id === product?.id);

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % allProducts.length;
    onSelectProduct(allProducts[nextIdx]);
  }, [currentIndex, allProducts, onSelectProduct]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + allProducts.length) % allProducts.length;
    onSelectProduct(allProducts[prevIdx]);
  }, [currentIndex, allProducts, onSelectProduct]);

  // Keyboard navigation
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === '+' || e.key === '=') setZoomLevel((z) => Math.min(z + 0.5, 3));
      else if (e.key === '-') setZoomLevel((z) => Math.max(z - 0.5, 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose, handleNext, handlePrev]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const orderUrl = getProductOrderLink(product.id);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(1);

  // Copy link / ID
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Be Unique Zone (BUZ) Jewelry — Product ID: ${product.id}\nWhatsApp Order Link: ${orderUrl}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext(); // swipe left -> next
      else handlePrev(); // swipe right -> prev
    }
    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#000000]/95 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Product viewer for ${product.id}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[96vh] flex flex-col bg-[#11100e] border border-[#cfa95f]/30 rounded-2xl sm:rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ============ MODAL TOP BAR ============ */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0e0d0b]">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
              {product.id}
            </span>
            <span className="text-xs text-[#cfa95f] tracking-widest uppercase font-semibold">
              {SITE_CONFIG.brandShortName}
            </span>
            {product.category && (
              <span className="hidden sm:inline-block text-xs text-[#8a8170] border-l border-white/10 pl-3">
                {product.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1c1a17] rounded-lg p-0.5 border border-white/5 mr-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-1.5 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded cursor-pointer"
                title="Zoom Out (-)"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-[#cfa95f] px-1.5 select-none">
                {zoomLevel}x
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-1.5 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded cursor-pointer"
                title="Zoom In (+)"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 text-[#cfa95f] hover:text-white rounded cursor-pointer"
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Inquiry toggle */}
            <button
              onClick={() => onToggleInquiry(product)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isInInquiryList
                  ? 'bg-[#cfa95f] text-[#0b0a09]'
                  : 'bg-[#1c1a17] text-white/80 hover:text-[#cfa95f] border border-white/5'
              }`}
              title={isInInquiryList ? 'Remove from inquiry tray' : 'Add to inquiry tray'}
            >
              {isInInquiryList ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-[#1c1a17] text-white/80 hover:text-[#cfa95f] border border-white/5 transition-colors cursor-pointer relative"
              title="Copy Product Information"
            >
              {copied ? <Check className="w-4 h-4 text-[#cfa95f]" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1c1a17] text-white/80 hover:text-white hover:bg-white/10 border border-white/5 transition-colors cursor-pointer ml-1"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============ VIEWER STAGE ============ */}
        <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] max-h-[68vh] overflow-hidden bg-[#ffffff] flex items-center justify-center p-4 select-none">
          {/* Main Large Product Photograph */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out cursor-zoom-in"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
            onClick={() => {
              if (zoomLevel === 1) setZoomLevel(1.8);
              else if (zoomLevel === 1.8) setZoomLevel(2.5);
              else setZoomLevel(1);
            }}
          >
            <img
              src={product.image}
              alt={`${product.id} exclusive jewelry piece`}
              className="max-w-full max-h-[64vh] object-contain drop-shadow-xl"
              draggable={false}
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0b0a09]/75 hover:bg-[#0b0a09] text-white/90 hover:text-[#cfa95f] border border-white/10 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0b0a09]/75 hover:bg-[#0b0a09] text-white/90 hover:text-[#cfa95f] border border-white/10 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Zoom hint overlay on mobile */}
          <div className="absolute bottom-3 left-4 text-[10px] text-[#222]/70 bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
            {currentIndex + 1} of {allProducts.length} &middot; Tap image to zoom &middot; Swipe to flip
          </div>
        </div>

        {/* ============ MODAL BOTTOM ACTIONS ============ */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0e0d0b] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-[#a49a88] leading-tight">
              Direct Order &amp; Price Inquiry:
            </span>
            <span className="text-sm font-semibold text-white tracking-wide">
              Official WhatsApp: <strong className="text-[#cfa95f]">{SITE_CONFIG.whatsappDisplay}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-[#0b0a09] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(207,169,95,0.35)]"
            >
              <MessageCircle className="w-4 h-4 fill-[#0b0a09]" />
              <span>Order {product.id} on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
