/* =========================================================
   BE UNIQUE ZONE (BUZ) — SITE SETTINGS
   Change your WhatsApp number and texts here. Nothing else to edit.
   ========================================================= */
const SITE_CONFIG = {
  brandName: "BE UNIQUE ZONE",
  brandShortName: "BUZ",
  tagline: "Shine in Your Own Style",

  /* WhatsApp: country code + number, digits only. No "+", no spaces. */
  whatsappNumber: "8801729800061",

  /* Prices are never shown. Customers ask on WhatsApp. */
  showPrices: false,
  currency: "",
  theme: "black-white-gold",

  /* Text used by the general Contact buttons */
  contactMessage: "Hello Be Unique Zone! I would like to know more about your jewelry collection.",

  /* Text used by each product's order button.  {id} becomes BUZ-001, BUZ-002 ... */
  orderMessage:
    "Hello Be Unique Zone!\n\n" +
    "I am interested in ordering this jewelry item.\n\n" +
    "Brand: Be Unique Zone (BUZ)\n" +
    "Product ID: {id}\n\n" +
    "Please share the price and more details of this product.\n\n" +
    "Thank you!",

  /* Social links. Leave "" to hide. */
  social: { facebook: "", instagram: "", tiktok: "", youtube: "" }
};
