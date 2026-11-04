/**
 * BE UNIQUE ZONE (BUZ) — Complete Jewelry Product Manifest
 * Contains all authentic original product photographs uploaded by the brand.
 */

export interface ProductItem {
  id: string;
  image: string;
  isNew?: boolean;
  featured?: boolean;
  category?: string;
}

export const PRODUCTS: ProductItem[] = [
  { id: "BUZ-001", image: "/assets/products/product-001.jpg", isNew: true, featured: true, category: "Necklace & Choker" },
  { id: "BUZ-002", image: "/assets/products/product-002.jpg", featured: true, category: "Bridal Set" },
  { id: "BUZ-003", image: "/assets/products/product-003.jpg", category: "Earrings & Drops" },
  { id: "BUZ-004", image: "/assets/products/product-004.jpg", category: "Necklace & Choker" },
  { id: "BUZ-006", image: "/assets/products/product-006.jpg", isNew: true, category: "Rings & Bands" },
  { id: "BUZ-007", image: "/assets/products/product-007.jpg", category: "Bangles & Bracelets" },
  { id: "BUZ-008", image: "/assets/products/product-008.jpg", featured: true, category: "Bridal Set" },
  { id: "BUZ-009", image: "/assets/products/product-009.jpg", category: "Earrings & Drops" },
  { id: "BUZ-010", image: "/assets/products/product-010.jpg", category: "Necklace & Choker" },
  { id: "BUZ-011", image: "/assets/products/product-011.jpg", isNew: true, category: "Bridal Set" },
  { id: "BUZ-012", image: "/assets/products/product-012.jpg", featured: true, category: "Necklace & Choker" },
  { id: "BUZ-013", image: "/assets/products/product-013.jpg", category: "Earrings & Drops" },
  { id: "BUZ-014", image: "/assets/products/product-014.jpg", category: "Bangles & Bracelets" },
  { id: "BUZ-015", image: "/assets/products/product-015.jpg", isNew: true, category: "Rings & Bands" },
  { id: "BUZ-016", image: "/assets/products/product-016.jpg", category: "Necklace & Choker" },
  { id: "BUZ-017", image: "/assets/products/product-017.jpg", featured: true, category: "Bridal Set" },
  { id: "BUZ-018", image: "/assets/products/product-018.jpg", category: "Earrings & Drops" },
  { id: "BUZ-019", image: "/assets/products/product-019.jpg", category: "Necklace & Choker" },
  { id: "BUZ-020", image: "/assets/products/product-020.jpg", isNew: true, category: "Bangles & Bracelets" },
  { id: "BUZ-021", image: "/assets/products/product-021.jpg", category: "Rings & Bands" },
  { id: "BUZ-022", image: "/assets/products/product-022.jpg", featured: true, category: "Bridal Set" },
  { id: "BUZ-023", image: "/assets/products/product-023.jpg", category: "Earrings & Drops" },
  { id: "BUZ-024", image: "/assets/products/product-024.jpg", featured: true, category: "Necklace & Choker" },
  { id: "BUZ-025", image: "/assets/products/product-025.jpg", isNew: true, category: "Bridal Set" },
  { id: "BUZ-027", image: "/assets/products/product-027.jpg", category: "Earrings & Drops" },
  { id: "BUZ-028", image: "/assets/products/product-028.jpg", category: "Bangles & Bracelets" },
  { id: "BUZ-029", image: "/assets/products/product-029.jpg", category: "Rings & Bands" },
  { id: "BUZ-030", image: "/assets/products/product-030.jpg", featured: true, category: "Necklace & Choker" },
  { id: "BUZ-031", image: "/assets/products/product-031.jpg", isNew: true, category: "Bridal Set" },
  { id: "BUZ-032", image: "/assets/products/product-032.jpg", category: "Earrings & Drops" },
  { id: "BUZ-033", image: "/assets/products/product-033.jpg", category: "Necklace & Choker" },
  { id: "BUZ-034", image: "/assets/products/product-034.jpg", category: "Bangles & Bracelets" },
  { id: "BUZ-035", image: "/assets/products/product-035.jpg", featured: true, category: "Bridal Set" },
  { id: "BUZ-036", image: "/assets/products/product-036.jpg", category: "Rings & Bands" },
  { id: "BUZ-037", image: "/assets/products/product-037.jpg", isNew: true, category: "Necklace & Choker" },
  { id: "BUZ-038", image: "/assets/products/product-038.jpg", category: "Earrings & Drops" },
  { id: "BUZ-039", image: "/assets/products/product-039.jpg", category: "Bangles & Bracelets" },
  { id: "BUZ-040", image: "/assets/products/product-040.jpg", category: "Bridal Set" },
  { id: "BUZ-041", image: "/assets/products/product-041.jpg", isNew: true, featured: true, category: "Necklace & Choker" },
];
