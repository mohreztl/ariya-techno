import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "آریا تکنو | Ariya Techno — فروشگاه گجت و لوازم جانبی موبایل",
  description: "خرید تکی و عمده لوازم جانبی موبایل، گجت‌های هوشمند و لوازم جانبی با ارسال سریع از آریا تکنو",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0F17] text-[#F8FAFC] font-[Vazirmatn] antialiased">{children}</body>
    </html>
  );
}
