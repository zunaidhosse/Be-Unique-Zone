import React, { useState } from 'react';
import { ProductItem } from '../data/products';
import { getProductOrderLink } from '../data/config';
import { MessageCircle, Eye, Heart, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  onOpenDetails: (product: ProductItem) => void;
  isInInquiryList: boolean;
  onToggleInquiry: (product: ProductItem) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  isInInquiryList,
  onToggleInquiry,
  index,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const orderUrl = getProductOrderLink(product.id);

  return (
    <article
      className="group relative flex flex-col bg-[#12110f] rounded-2xl overflow-hidden border border-[#cfa95f]/15 hover:border-[#cfa95f]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_rgba(207,169,95,0.18)] hover:-translate-y-1"
    >
      {/* Visual Canvas: Pure White/Ivory backdrop to make jewelry photo shine */}
      <div className="relative aspect-square w-full bg-[#ffffff] overflow-hidden flex items-center justify-center p-3 sm:p-4">
        {/* Subtle loading shimmer */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-[#f7f5f0] flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-[#cfa95f]/40 animate-spin" />
          </div>
        )}

        {/* Fallback if image fails */}
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-[#f8f6f0]">
            <Sparkles className="w-8 h-8 text-[#cfa95f] mb-2" />
            <span className="font-display text-sm font-semibold text-[#222]">{product.id}</span>
            <span className="text-[11px] text-[#777] mt-1">Image Loading</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={`${product.id} luxury jewelry by Be Unique Zone`}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Badges: New / Featured (Only if explicitly set) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-[#0b0a09]/90 text-[#f5ebd1] border border-[#cfa95f]/40 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.featured && (
            <span className="bg-gold-gradient text-[#0b0a09] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Bookmark / Multi-inquiry toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleInquiry(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer ${
            isInInquiryList
              ? 'bg-[#cfa95f] text-[#0b0a09] shadow-md scale-105'
              : 'bg-[#0b0a09]/70 hover:bg-[#0b0a09] text-white/80 hover:text-[#cfa95f] backdrop-blur-sm'
          }`}
          title={isInInquiryList ? 'Remove from inquiry tray' : 'Add to inquiry tray'}
          aria-label={isInInquiryList ? `Remove ${product.id} from inquiry tray` : `Add ${product.id} to inquiry tray`}
        >
          {isInInquiryList ? <Check className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
        </button>

        {/* Quick View Button overlay on hover */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute inset-x-4 bottom-3 py-2 rounded-lg bg-[#0b0a09]/85 hover:bg-[#0b0a09] text-[#f7edd4] text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm cursor-pointer shadow-md"
        >
          <Eye className="w-3.5 h-3.5 text-[#cfa95f]" />
          <span>View Details</span>
        </button>
      </div>

      {/* Card Content & Meta */}
      <div className="p-3.5 sm:p-4.5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#141310] to-[#0d0c0a]">
        <div>
          {/* Subtle Category Tag */}
          {product.category && (
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a89d8a] font-medium block mb-1">
              {product.category}
            </span>
          )}

          {/* Product ID (No fake name) */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[#cfa95f] transition-colors">
              {product.id}
            </h3>
            <span className="text-[10px] text-[#8e8574] tracking-wider uppercase">
              BUZ
            </span>
          </div>

          <p className="text-[11px] text-[#9a9180] leading-snug mb-3.5 line-clamp-1">
            Exclusive Luxury Piece &middot; Private WhatsApp Pricing
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
          {/* Primary Gold WhatsApp Order Button */}
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0b0a09] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_2px_12px_rgba(207,169,95,0.25)] active:scale-[0.98]"
            title={`Order ${product.id} on WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#0b0a09]" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Mobile Quick View link */}
          <button
            onClick={() => onOpenDetails(product)}
            className="w-full text-center text-[11px] text-[#a99e8c] hover:text-[#cfa95f] py-1 transition-colors cursor-pointer flex items-center justify-center gap-1 sm:hidden"
          >
            <Eye className="w-3 h-3" />
            <span>Full Preview &amp; Zoom</span>
          </button>
        </div>
      </div>
    </article>
  );
};
