import React, { useState, useMemo } from 'react';
import { ProductItem } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, X, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';

interface CollectionProps {
  products: ProductItem[];
  onOpenDetails: (product: ProductItem) => void;
  inquiryList: ProductItem[];
  onToggleInquiry: (product: ProductItem) => void;
}

type FilterTab = 'all' | 'new' | 'featured';

export const Collection: React.FC<CollectionProps> = ({
  products,
  onOpenDetails,
  inquiryList,
  onToggleInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Available unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      if (activeTab === 'new' && !p.isNew) return false;
      if (activeTab === 'featured' && !p.featured) return false;

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Search query filter (matches ID e.g. "012", "BUZ-012", or category)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const idMatches = p.id.toLowerCase().includes(query);
        const numMatches = p.id.replace(/\D/g, '').includes(query);
        const catMatches = p.category ? p.category.toLowerCase().includes(query) : false;
        return idMatches || numMatches || catMatches;
      }

      return true;
    });
  }, [products, activeTab, selectedCategory, searchQuery]);

  const inquiryIdSet = useMemo(() => new Set(inquiryList.map((p) => p.id)), [inquiryList]);

  const handleResetFilters = () => {
    setActiveTab('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ============ COLLECTION INTRODUCTION ============ */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        {/* Dynamic Total Designs Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161412] border border-[#cfa95f]/30 mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#cfa95f]" />
          <span className="font-display tracking-[0.25em] text-xs font-semibold text-[#f5ebd1] uppercase">
            {products.length} EXCLUSIVE DESIGNS
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#cfa95f]" />
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Discover Your <span className="text-gradient-gold italic font-normal">Signature Style</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base text-[#b0a797] font-light leading-relaxed max-w-xl mx-auto mb-6">
          Explore our exclusive jewelry collection and find the pieces that express your individuality.
        </p>

        {/* Subtle Gold Decorative Divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#cfa95f]/60" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#cfa95f]" fill="currentColor" aria-hidden="true">
            <polygon points="12,2 22,12 12,22 2,12" />
          </svg>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#cfa95f]/60" />
        </div>
      </div>

      {/* ============ TOOLBAR: SEARCH & FILTERS ============ */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 sm:p-3 rounded-2xl bg-[#11100e] border border-[#cfa95f]/20 shadow-lg">
          {/* Filter Tabs (Functional segmented controls) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0b0a09] border border-white/5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-gold-gradient text-[#0b0a09] shadow-md'
                  : 'text-[#a49a88] hover:text-white hover:bg-white/5'
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'new'
                  ? 'bg-gold-gradient text-[#0b0a09] shadow-md'
                  : 'text-[#a49a88] hover:text-white hover:bg-white/5'
              }`}
            >
              New Collection
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'featured'
                  ? 'bg-gold-gradient text-[#0b0a09] shadow-md'
                  : 'text-[#a49a88] hover:text-white hover:bg-white/5'
              }`}
            >
              Featured Products
            </button>
          </div>

          {/* Search Input for Product ID */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#cfa95f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Product ID, e.g. BUZ-012"
              className="w-full bg-[#0b0a09] text-white text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl border border-white/10 focus:border-[#cfa95f] focus:outline-none transition-colors placeholder:text-[#6e675b]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-white p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (Sub-filter) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#8e8573] font-medium uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#cfa95f]" />
            Category:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg border text-xs tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'border-[#cfa95f] bg-[#cfa95f]/15 text-[#f4e7c7] font-semibold'
                : 'border-white/5 bg-[#12110f] text-[#a19785] hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border text-xs tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'border-[#cfa95f] bg-[#cfa95f]/15 text-[#f4e7c7] font-semibold'
                  : 'border-white/5 bg-[#12110f] text-[#a19785] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Filter / Search Results Summary */}
        <div className="flex items-center justify-between text-xs text-[#9d9483] px-1">
          <span>
            Showing <strong className="text-white font-semibold">{filteredProducts.length}</strong> of{' '}
            {products.length} luxury jewelry pieces
            {searchQuery && (
              <span> matching &ldquo;<span className="text-[#cfa95f]">{searchQuery}</span>&rdquo;</span>
            )}
          </span>
          {(searchQuery || activeTab !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-[#cfa95f] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ============ RESPONSIVE PRODUCT GALLERY ============ */}
      {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 4 columns */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onOpenDetails={onOpenDetails}
              isInInquiryList={inquiryIdSet.has(product.id)}
              onToggleInquiry={onToggleInquiry}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 px-6 text-center rounded-3xl bg-[#12110f] border border-[#cfa95f]/20 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#1c1a17] border border-[#cfa95f]/30 flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-[#cfa95f]" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">
            No pieces match your search
          </h3>
          <p className="text-sm text-[#9b9281] mb-6">
            Please check the product ID (e.g. &ldquo;BUZ-001&rdquo;) or try resetting your filter settings.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-[#0b0a09] font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Show All Products</span>
          </button>
        </div>
      )}
    </section>
  );
};
