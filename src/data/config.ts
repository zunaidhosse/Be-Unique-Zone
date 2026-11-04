/**
 * Be Unique Zone (BUZ) Configuration
 * Official Brand Settings & WhatsApp Integration
 */

export interface SiteConfig {
  brandName: string;
  brandShortName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  showPrices: boolean;
  theme: string;
  contactMessage: string;
  orderMessageTemplate: string;
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  brandName: "BE UNIQUE ZONE",
  brandShortName: "BUZ",
  tagline: "Shine in Your Own Style",

  // Official WhatsApp: country code + number, digits only for API
  whatsappNumber: "8801729800061",
  whatsappDisplay: "+8801729800061",

  // Prices are never displayed on the website. Customers ask directly via WhatsApp.
  showPrices: false,
  theme: "black-white-gold",

  contactMessage: "Hello Be Unique Zone! I would like to know more about your jewelry collection.",

  orderMessageTemplate:
    "Hello Be Unique Zone!\n\n" +
    "I am interested in ordering this jewelry item.\n\n" +
    "Brand: Be Unique Zone (BUZ)\n" +
    "Product ID: {id}\n\n" +
    "Please share the price and more details of this product.\n\n" +
    "Thank you!",

  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  },
};

/**
 * Generates official WhatsApp order URL with encoded message
 */
export function getWhatsAppLink(message: string, customNumber?: string): string {
  const num = (customNumber || SITE_CONFIG.whatsappNumber).replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates product-specific WhatsApp order URL
 */
export function getProductOrderLink(productId: string): string {
  const message = SITE_CONFIG.orderMessageTemplate.replace("{id}", productId);
  return getWhatsAppLink(message);
}

/**
 * Generates multi-item WhatsApp inquiry URL
 */
export function getMultiProductOrderLink(productIds: string[]): string {
  if (productIds.length === 1) {
    return getProductOrderLink(productIds[0]);
  }
  const idList = productIds.join(", ");
  const message =
    `Hello Be Unique Zone!\n\n` +
    `I am interested in ordering these jewelry items from your collection:\n\n` +
    `Brand: Be Unique Zone (BUZ)\n` +
    `Product IDs: ${idList} (${productIds.length} items)\n\n` +
    `Please share the prices, availability, and more details of these pieces.\n\n` +
    `Thank you!`;
  return getWhatsAppLink(message);
}
