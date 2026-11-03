# آریا تکنو — Ariya Techno

صفحه اصلی فروشگاه گجت و لوازم جانبی موبایل (خرید تکی B2C + خرید عمده همکار B2B) — RTL فارسی، تم سایبری تیره.

## اجرا (Next.js)

```bash
cd ariya-techno
npm install
npm run dev
```

سپس باز کن: http://localhost:3000

فایل اصلی تک‌فایلی: `app/page.tsx` (شامل Navbar، Hero سه‌بعدی، Bento Grid، کشف هوشمند، محصولات و پیشنهاد شگفت‌انگیز، Marquee برندها و Footer).

## انتشار (GitHub Pages)

سایت زنده: https://mohreztl.github.io/ariya-techno/

با هر push به شاخه `main`، ورک‌فلوی `.github/workflows/deploy-pages.yml` بیلد استاتیک (`next build` با `output: "export"`) را می‌سازد و روی GitHub Pages مستقر می‌کند. چون سایت زیر مسیر `/<repo-name>/` سرو می‌شود، در حالت production مقدار `basePath` برابر `/ariya-techno` تنظیم می‌شود.

## پیش‌نمایش بدون نصب

فایل `index.html` را مستقیم در مرورگر باز کن — همان رابط و تعامل‌ها (سوئیچ عمده/تکی، جستجو، کشف هوشمند، سبد خرید، شمارش معکوس) بدون نیاز به نصب اجرا می‌شود.

## امکانات

- سوئیچ سراسری «خرید تکی / خرید عمده همکار»: قیمت‌ها، بج‌ها و CTAها در کل صفحه عوض می‌شود (عمده = کارتن ۱۰ عددی، اکسنت بنفش نئونی).
- جستجوی زنده، کشف هوشمند بر اساس مدل گوشی (iPhone 16 Pro / S24 Ultra / Xiaomi 14 و…)، کاروسل محصولات با شمارش معکوس باتری‌استایل.
- فونت Vazirmatn، راست‌چین کامل، انیمیشن Framer Motion و آیکون Lucide.
