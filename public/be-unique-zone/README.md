# BE UNIQUE ZONE (BUZ) — প্রিমিয়াম জুয়েলারি ক্যাটালগ

এটি একটি সম্পূর্ণ স্ট্যাটিক ওয়েবসাইট। কোনো ব্যাকএন্ড, ডাটাবেস, লগইন বা পেমেন্ট নেই। GitHub Pages-এ বিনামূল্যে চলে। গ্রাহক ছবি দেখে সরাসরি WhatsApp-এ অর্ডার করবেন, মেসেজে সঠিক Product ID আগে থেকেই লেখা থাকবে। ওয়েবসাইটে কোনো দাম দেখানো হয় না।

## ফোল্ডার কাঠামো

```
be-unique-zone/
├── index.html
├── style.css
├── script.js
├── config.js        <- WhatsApp নম্বর ও লেখা এখানে বদলাবেন
├── products.js      <- সব প্রোডাক্টের তালিকা (BUZ-001 ... BUZ-041)
├── manifest.json
├── README.md
├── .nojekyll
└── assets/
    ├── logo.png
    ├── favicon.png
    ├── apple-touch-icon.png
    ├── social-preview.jpg   <- WhatsApp/Facebook শেয়ারের প্রিভিউ ছবি
    └── products/
        ├── product-001.jpg
        ├── ...
        └── product-041.jpg
```

## ১. GitHub রিপোজিটরি তৈরি করা

1. github.com-এ গিয়ে সাইন ইন করুন (অ্যাকাউন্ট না থাকলে Sign up করুন)।
2. উপরের ডানদিকে **+** চাপুন, তারপর **New repository** চাপুন।
3. Repository name দিন: `be-unique-zone`
4. **Public** সিলেক্ট করুন।
5. **Create repository** চাপুন।

## ২. প্রজেক্টের ফাইল আপলোড করা

1. নতুন রিপোজিটরির পাতায় **uploading an existing file** লিংকে চাপুন।
2. এই ফাইলগুলো টেনে এনে ছাড়ুন: `index.html`, `style.css`, `script.js`, `config.js`, `products.js`, `manifest.json`, `README.md`, `.nojekyll`, এবং পুরো `assets` ফোল্ডার।
3. নিচে **Commit changes** চাপুন।

## ৩. ৪১টি আসল প্রোডাক্ট ছবি কোথায় আপলোড করবেন

1. আপনার ছবিগুলোর নাম ঠিক এভাবে দিন: `product-001.jpg`, `product-002.jpg` ... `product-041.jpg` (সবসময় ৩ অঙ্ক, ছোট হাতের অক্ষর)।
2. রিপোজিটরিতে `assets/products/` ফোল্ডারে যান। **Add file > Upload files** চাপুন।
3. ছবিগুলো আপলোড করুন। একসাথে বেশি হলে ২০-৩০টি করে কয়েকবারে আপলোড করুন। প্রতিবার **Commit changes** চাপুন।
4. পরামর্শ: ছবি লম্বার দিকে প্রায় ১২০০ পিক্সেলে ছোট করে নিন (প্রতিটি ৪০০ KB-এর নিচে)। তাহলে মোবাইলে সাইট দ্রুত খুলবে।
5. কোনো ছবি `.png` বা `.webp` হলে `products.js` ফাইলে ওই লাইনের ফাইলের নাম বদলে দিন।

## ৪. WhatsApp নম্বর বদলানো

1. রিপোজিটরিতে `config.js` ফাইলে চাপুন, তারপর পেন্সিল আইকনে চাপুন।
2. এই লাইনটি খুঁজুন: `whatsappNumber: "8801729800061",`
3. দেশের কোড সহ নম্বর লিখুন। `+`, ফাঁকা জায়গা বা ড্যাশ দেবেন না। নম্বরটি আগে থেকেই আপনার নম্বরে সেট করা আছে।
4. **Commit changes** চাপুন। সব বাটন নিজে থেকেই নতুন নম্বর ব্যবহার করবে।

## ৫. GitHub Pages চালু করা

1. রিপোজিটরির **Settings** ট্যাবে যান।
2. বাঁদিকে **Pages** চাপুন।
3. **Build and deployment** এর **Source** এ **Deploy from a branch** সিলেক্ট করুন।
4. **Branch** এ `main` এবং ফোল্ডার `/ (root)` সিলেক্ট করে **Save** চাপুন।

## ৬. পাবলিক ওয়েবসাইট লিংক পাওয়া

1. ১ থেকে ৩ মিনিট অপেক্ষা করুন। Pages পাতায় উপরে আপনার লিংক দেখাবে:
   `https://আপনার-ইউজারনেম.github.io/be-unique-zone/`
2. এই লিংকটিই গ্রাহকদের শেয়ার করুন।
3. **একবারের জরুরি কাজ:** `index.html` ফাইলে `https://YOUR-USERNAME.github.io/be-unique-zone/` লেখাটি খুঁজে (মোট ৪ জায়গায়) আপনার আসল লিংক দিয়ে বদলে দিন। না করলে WhatsApp/Facebook-এ শেয়ারের সময় প্রিভিউ ছবি আসবে না। Facebook-এ পুরোনো প্রিভিউ আটকে থাকলে Facebook Sharing Debugger-এ লিংক দিয়ে রিফ্রেশ করুন।

## ৭. পরে নতুন প্রোডাক্ট যোগ করা

1. নতুন ছবি `product-042.jpg` নামে `assets/products/` ফোল্ডারে আপলোড করুন।
2. `products.js` ফাইল খুলে শেষ লাইনের নিচে এই লাইন যোগ করুন:
   `{ id: "BUZ-042", image: "assets/products/product-042.jpg" },`
3. **Commit changes** চাপুন। নতুন প্রোডাক্ট নিজে থেকেই দেখা যাবে এবং মোট সংখ্যা (EXCLUSIVE DESIGNS) নিজে বদলে যাবে। কোড বদলাতে হবে না।

## New Collection ও Featured Products

কোনো প্রোডাক্ট নিজে থেকে "New" বা "Featured" হয় না। চাইলে `products.js` এ লাইনে `new: true` বা `featured: true` যোগ করুন:

`{ id: "BUZ-005", image: "assets/products/product-005.jpg", featured: true },`

## বিঃদ্রঃ

- `index.html` ডাবল ক্লিক করে খুললেও সাইট চলবে। তবে ছবির জন্য GitHub Pages-এ টেস্ট করা ভালো।
- ছবি যেমন আছে তেমনই দেখানো হয় (ছোট বা বিকৃত করা হয় না)।
- Playfair Display ও Inter ফন্ট Google Fonts থেকে লোড হয়। ইন্টারনেট না থাকলে সাধারণ ফন্টে দেখাবে।
