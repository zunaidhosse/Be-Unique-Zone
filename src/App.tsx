/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRODUCTS, ProductItem } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { MultiInquiryDrawer } from './components/MultiInquiryDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [inquiryList, setInquiryList] = useState<ProductItem[]>([]);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState(false);

  // Toggle single item into/out of inquiry list
  const handleToggleInquiry = (product: ProductItem) => {
    setInquiryList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveInquiry = (id: string) => {
    setInquiryList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearInquiries = () => {
    setInquiryList([]);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] text-[#e8e4dc] flex flex-col font-sans-body selection:bg-[#cfa95f]/30 selection:text-[#f7edd4]">
      {/* Top Navigation: Clean Brand Name */}
      <Header
        inquiryCount={inquiryList.length}
        onOpenInquiries={() => setIsInquiryDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Minimal Luxury Hero: Brand Name & Direct Action */}
        <Hero onExplore={scrollToCollection} />

        {/* Gallery / Product Catalog */}
        <Collection
          products={PRODUCTS}
          onOpenDetails={(p) => setSelectedProduct(p)}
          inquiryList={inquiryList}
          onToggleInquiry={handleToggleInquiry}
        />
      </main>

      {/* Clean Luxury Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        inquiryCount={inquiryList.length}
        onOpenInquiries={() => setIsInquiryDrawerOpen(true)}
      />

      {/* Fullscreen Product Detail & Zoom Lightbox Modal */}
      <ProductModal
        product={selectedProduct}
        allProducts={PRODUCTS}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        isInInquiryList={selectedProduct ? inquiryList.some((i) => i.id === selectedProduct.id) : false}
        onToggleInquiry={handleToggleInquiry}
      />

      {/* Multi-Piece WhatsApp Inquiry Tray Drawer */}
      <MultiInquiryDrawer
        isOpen={isInquiryDrawerOpen}
        onClose={() => setIsInquiryDrawerOpen(false)}
        inquiryList={inquiryList}
        onRemoveItem={handleRemoveInquiry}
        onClearAll={handleClearInquiries}
        onOpenDetails={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
