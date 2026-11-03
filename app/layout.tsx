import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "آریا تکنو | Ariya Techno — فروشگاه گجت و لوازم جانبی موبایل",
  description: "خرید تکی و عمده لوازم جانبی موبایل، گجت‌های هوشمند و لوازم جانبی با ارسال سریع از آریا تکنو",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F17",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* Official Vazirmatn CDN (jsdelivr) — reliable inside Iran */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        />
      </head>
      <body className="bg-[#0B0F17] text-[#F8FAFC] antialiased">{children}</body>
    </html>
  );
}
