"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  BadgePercent,
  BatteryCharging,
  Cable,
  Car,
  Check,
  ChevronLeft,
  Headphones,
  MessageCircle,
  Monitor,
  Package,
  PlugZap,
  Plus,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Timer,
  Truck,
  User,
  Watch,
  X,
  Zap,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ---------------------------------- types --------------------------------- */

type GadgetType =
  | "headphones"
  | "watch"
  | "powerbank"
  | "charger"
  | "cable"
  | "neckband"
  | "car"
  | "plug"
  | "glass"
  | "monitor"
  | "magsafe";

type Product = {
  id: number;
  name: string;
  brand: string;
  kind: GadgetType;
  rating: number;
  reviews: number;
  retail: number;
  wholesale: number;
  wholesaleQty: number;
  badge: string;
  stock: number;
  cat: string;
};

type Category = {
  name: string;
  icon: LucideIcon;
  kind: GadgetType;
  count: string;
  span: string;
  tint: string;
  chips?: string[];
};

type FinderItem = {
  id: number;
  name: string;
  type: string;
  kind: GadgetType;
  retail: number;
  wholesale: number;
  tag: string;
};

/* ---------------------------------- data ---------------------------------- */

const PRODUCTS: Product[] = [
  { id: 1, name: "ساعت هوشمند ULTRA SUR مدل W1", brand: "Ultra Sur", kind: "watch", rating: 4.8, reviews: 214, retail: 1890000, wholesale: 1420000, wholesaleQty: 10, badge: "NEW", stock: 48, cat: "گجت" },
  { id: 2, name: "شارژر ۴۰ تا ۶۰ وات داینامیک پاور آیفون (کارتن ۱۰ عددی)", brand: "Dynamic Power", kind: "charger", rating: 4.9, reviews: 387, retail: 1250000, wholesale: 890000, wholesaleQty: 10, badge: "ویژه همکار", stock: 320, cat: "شارژر" },
  { id: 3, name: "پاوربانک ۳۰۰۰۰ اولتراسور مدل +U-P12 دیجیتال", brand: "Ultra Sur", kind: "powerbank", rating: 4.7, reviews: 502, retail: 2190000, wholesale: 1680000, wholesaleQty: 10, badge: "NEW", stock: 76, cat: "پاور" },
  { id: 4, name: "هندزفری بلوتوث دورگردنی XO مدل BS30", brand: "XO", kind: "neckband", rating: 4.6, reviews: 189, retail: 790000, wholesale: 540000, wholesaleQty: 10, badge: "پرفروش", stock: 210, cat: "صوتی" },
  { id: 5, name: "کابل دو سر تایپ سی کنفی مک‌دودو CA-5640", brand: "Mcdodo", kind: "cable", rating: 4.9, reviews: 431, retail: 420000, wholesale: 285000, wholesaleQty: 10, badge: "NEW", stock: 540, cat: "کابل" },
];

const CATEGORIES: Category[] = [
  { name: "کابل و شارژر (فست شارژ)", icon: Cable, kind: "cable", count: "۱۲۰+ کالا", span: "col-span-2 row-span-2", tint: "from-[#7B2CBF]/25 to-[#00F0FF]/10", chips: ["PD 65W", "QC 3.0", "تایپ‌سی"] },
  { name: "هدفون و ایرپاد", icon: Headphones, kind: "headphones", count: "۸۵+ کالا", span: "", tint: "from-[#00F0FF]/20 to-[#7B2CBF]/10" },
  { name: "پاوربانک ظرفیت بالا", icon: BatteryCharging, kind: "powerbank", count: "۶۴+ کالا", span: "", tint: "from-[#FF2A85]/18 to-[#7B2CBF]/12" },
  { name: "ساعت هوشمند و گجت", icon: Watch, kind: "watch", count: "۵۸+ کالا", span: "", tint: "from-[#00F0FF]/18 to-[#FF2A85]/10" },
  { name: "هولدر و لوازم خودرو", icon: Car, kind: "car", count: "۴۲+ کالا", span: "", tint: "from-[#7B2CBF]/22 to-[#00F0FF]/8" },
  { name: "مبدل و دانگل", icon: PlugZap, kind: "plug", count: "۳۷+ کالا", span: "col-span-2", tint: "from-[#00F0FF]/16 to-[#7B2CBF]/14" },
  { name: "گلس و محافظ", icon: Shield, kind: "glass", count: "۹۶+ کالا", span: "", tint: "from-[#FF2A85]/15 to-[#00F0FF]/10" },
  { name: "تجهیزات کامپیوتری", icon: Monitor, kind: "monitor", count: "۷۰+ کالا", span: "", tint: "from-[#7B2CBF]/18 to-[#FF2A85]/10" },
];

const PHONES = ["iPhone 16 Pro", "Samsung S24 Ultra", "Xiaomi 14", "iPhone 15", "Samsung S23"] as const;
type Phone = (typeof PHONES)[number];

const FINDER: Record<Phone, FinderItem[]> = {
  "iPhone 16 Pro": [
    { id: 11, name: "شارژر MagSafe ۱۵W اپل", type: "شارژر بی‌سیم", kind: "magsafe", retail: 1450000, wholesale: 1050000, tag: "MagSafe" },
    { id: 12, name: "کابل تایپ‌سی کنفی Mcdodo ۶۰W", type: "کابل فست شارژ", kind: "cable", retail: 420000, wholesale: 285000, tag: "60W" },
    { id: 13, name: "شارژر GaN ۶۵W داینامیک پاور", type: "آداپتور فست شارژ", kind: "charger", retail: 1250000, wholesale: 890000, tag: "GaN" },
  ],
  "Samsung S24 Ultra": [
    { id: 21, name: "شارژر ۴۵W سوپرفست سامسونگ", type: "آداپتور فست شارژ", kind: "charger", retail: 980000, wholesale: 690000, tag: "45W" },
    { id: 22, name: "کابل تایپ‌سی ۱۰۰W Mcdodo", type: "کابل فست شارژ", kind: "cable", retail: 460000, wholesale: 310000, tag: "100W" },
    { id: 23, name: "پاوربانک ۲۰۰۰۰ LDNIO", type: "پاوربانک", kind: "powerbank", retail: 1650000, wholesale: 1220000, tag: "20000mAh" },
  ],
  "Xiaomi 14": [
    { id: 31, name: "شارژر توربو ۶۷W شیائومی", type: "آداپتور فست شارژ", kind: "charger", retail: 890000, wholesale: 620000, tag: "67W Turbo" },
    { id: 32, name: "کابل تایپ‌سی کنفی ۶ آمپر", type: "کابل فست شارژ", kind: "cable", retail: 380000, wholesale: 250000, tag: "6A" },
    { id: 33, name: "هندزفری دورگردنی XO BS30", type: "هندزفری بلوتوث", kind: "neckband", retail: 790000, wholesale: 540000, tag: "بلوتوث 5.3" },
  ],
  "iPhone 15": [
    { id: 41, name: "شارژر ۲۰W آیفون تایپ‌سی", type: "آداپتور فست شارژ", kind: "charger", retail: 850000, wholesale: 590000, tag: "20W" },
    { id: 42, name: "هولدر مگنتی MagSafe خودرو", type: "هولدر خودرو", kind: "car", retail: 620000, wholesale: 430000, tag: "MagSafe" },
    { id: 43, name: "کابل لایتنینگ کنفی Mcdodo", type: "کابل", kind: "cable", retail: 390000, wholesale: 260000, tag: "MFi" },
  ],
  "Samsung S23": [
    { id: 51, name: "شارژر ۲۵W سامسونگ", type: "آداپتور", kind: "charger", retail: 720000, wholesale: 490000, tag: "25W" },
    { id: 52, name: "پاوربانک ۱۰۰۰۰ Joyroom", type: "پاوربانک", kind: "powerbank", retail: 1100000, wholesale: 790000, tag: "10000mAh" },
    { id: 53, name: "گلس سرامیکی S23", type: "محافظ صفحه", kind: "glass", retail: 280000, wholesale: 180000, tag: "سرامیکی" },
  ],
};

const BRANDS = ["Apple", "Samsung", "Xiaomi", "LDNIO", "Mcdodo", "Ultra Sur", "Earldom", "XO", "Joyroom", "JBL"];

const TRUST = [
  { icon: Truck, title: "تحویل اکسپرس", desc: "ارسال همان‌روز در تهران و ۲۴ ساعته به شهرستان‌ها" },
  { icon: ShieldCheck, title: "ضمانت اصالت کالا", desc: "همه کالاها با گارانتی معتبر و فاکتور رسمی" },
  { icon: BadgePercent, title: "قیمت رقابتی عمده", desc: "بهترین قیمت کارتن ۱۰ عددی برای همکاران سراسر کشور" },
  { icon: MessageCircle, title: "پشتیبانی آنلاین", desc: "پاسخگویی سریع در واتساپ و تلگرام، ۹ صبح تا ۱۰ شب" },
];

const QUICK_LINKS: { label: string; href: string }[] = [
  { label: "دسته‌بندی‌ها", href: "#categories" },
  { label: "کشف هوشمند جانبی", href: "#finder" },
  { label: "پیشنهادهای شگفت‌انگیز", href: "#products" },
  { label: "پنل همکاری عمده", href: "#products" },
  { label: "درباره آریا تکنو", href: "#contact" },
];

const SERVICE_LINKS: { label: string; href: string }[] = [
  { label: "شرایط بازگشت کالا", href: "#contact" },
  { label: "حریم خصوصی", href: "#contact" },
  { label: "پرسش‌های متداول", href: "#contact" },
  { label: "شرایط همکاری عمده", href: "#contact" },
  { label: "تماس با ما", href: "#contact" },
];

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "دسته‌بندی‌ها", href: "#categories" },
  { label: "کشف هوشمند", href: "#finder" },
  { label: "شگفت‌انگیز", href: "#products" },
  { label: "تماس", href: "#contact" },
];

/* --------------------------------- helpers -------------------------------- */

function formatPrice(n: number): string {
  return n.toLocaleString("fa-IR");
}

/** Accent token set that flips the whole page between B2C (cyan) and B2B (violet). */
function getTheme(isWholesale: boolean) {
  return isWholesale
    ? {
        rgb: "123,44,191",
        text: "text-[#C4B5FD]",
        border: "hover:border-[#7B2CBF]/60",
        shadow: "hover:shadow-[0_0_34px_rgba(123,44,191,0.16)]",
        stageBg: "bg-[radial-gradient(circle_at_50%_38%,rgba(123,44,191,0.10),transparent_70%)]",
        grad: "from-[#7B2CBF] to-[#FF2A85]",
        btn: "bg-gradient-to-l from-[#7B2CBF] to-[#9D4EDD] text-white shadow-[0_0_20px_rgba(123,44,191,0.45)] hover:brightness-110",
        btnGhost:
          "border border-[#7B2CBF]/50 bg-[#7B2CBF]/10 text-[#E9D5FF] hover:bg-[#7B2CBF]/20 hover:shadow-[0_0_22px_rgba(123,44,191,0.35)]",
      }
    : {
        rgb: "0,240,255",
        text: "text-[#00F0FF]",
        border: "hover:border-[#00F0FF]/50",
        shadow: "hover:shadow-[0_0_34px_rgba(0,240,255,0.14)]",
        stageBg: "bg-[radial-gradient(circle_at_50%_38%,rgba(0,240,255,0.07),transparent_70%)]",
        grad: "from-[#00F0FF] to-[#7B2CBF]",
        btn: "bg-gradient-to-l from-[#00F0FF] to-[#22D3EE] text-[#0B0F17] shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110",
        btnGhost:
          "border border-[#00F0FF]/45 bg-[#00F0FF]/10 text-[#67E8F9] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_22px_rgba(0,240,255,0.3)]",
      };
}

/* --------------------------- neon SVG gadget art -------------------------- */

/**
 * Self-contained neon cyber illustrations for every product category.
 * Zero network dependency — always renders, everywhere (including Iran).
 */
function GadgetArt({ kind, className }: { kind: GadgetType; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const a = `url(#${uid}a)`;
  const b = `url(#${uid}b)`;
  const glow = `url(#${uid}f)`;

  const defs = (
    <defs>
      <linearGradient id={`${uid}a`} x1="30" y1="30" x2="170" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00F0FF" />
        <stop offset="1" stopColor="#7B2CBF" />
      </linearGradient>
      <linearGradient id={`${uid}b`} x1="170" y1="30" x2="30" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7B2CBF" />
        <stop offset="1" stopColor="#FF2A85" />
      </linearGradient>
      <filter id={`${uid}f`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  const frame = (
    <>
      <circle cx="100" cy="100" r="82" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="64" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="2 7" />
    </>
  );

  const body = (() => {
    switch (kind) {
      case "headphones":
        return (
          <>
            <path d="M48 112v-10a52 52 0 0 1 104 0v10" stroke={a} strokeWidth="11" strokeLinecap="round" filter={glow} />
            <path d="M60 100a40 40 0 0 1 80 0" stroke="rgba(255,255,255,0.14)" strokeWidth="3" strokeLinecap="round" />
            <rect x="32" y="104" width="30" height="50" rx="14" fill="#0E1626" stroke={a} strokeWidth="3" />
            <rect x="138" y="104" width="30" height="50" rx="14" fill="#0E1626" stroke={a} strokeWidth="3" />
            <rect x="40" y="113" width="14" height="32" rx="7" fill="rgba(0,240,255,0.16)" />
            <rect x="146" y="113" width="14" height="32" rx="7" fill="rgba(123,44,191,0.2)" />
          </>
        );
      case "watch":
        return (
          <>
            <rect x="86" y="14" width="28" height="52" rx="10" fill="#131C2E" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <rect x="86" y="134" width="28" height="52" rx="10" fill="#131C2E" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <rect x="61" y="50" width="78" height="100" rx="26" fill="#0E1626" stroke={a} strokeWidth="3" filter={glow} />
            <rect x="70" y="59" width="60" height="82" rx="19" fill="#071018" />
            <text x="100" y="94" textAnchor="middle" fontSize="19" fontWeight="800" fill="#00F0FF" fontFamily="inherit">12:45</text>
            <path d="M76 106h9l4-8 6 15 4-7h25" stroke="#FF2A85" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="139" y="84" width="7" height="17" rx="3.5" fill="#334155" />
            <rect x="139" y="110" width="6" height="13" rx="3" fill="#334155" />
            <circle cx="100" cy="129" r="3" fill="rgba(0,240,255,0.6)" />
          </>
        );
      case "powerbank":
        return (
          <>
            <rect x="28" y="58" width="144" height="88" rx="20" fill="#0E1626" stroke={a} strokeWidth="3" filter={glow} />
            <rect x="44" y="74" width="86" height="36" rx="9" fill="#071018" stroke="rgba(0,240,255,0.3)" strokeWidth="1.5" />
            <text x="87" y="98" textAnchor="middle" fontSize="16" fontWeight="800" fill="#00F0FF" fontFamily="inherit">30000</text>
            <path d="M146 82l-9 16h8l-7 15 16-19h-9l8-12z" fill="#FF2A85" filter={glow} />
            <rect x="44" y="122" width="24" height="9" rx="4.5" fill="#1E293B" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
            <rect x="76" y="122" width="24" height="9" rx="4.5" fill="#1E293B" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={132 + i * 9} cy={126.5} r="3" fill={i < 3 ? "rgba(0,240,255,0.75)" : "rgba(255,255,255,0.12)"} />
            ))}
          </>
        );
      case "charger":
        return (
          <>
            <rect x="82" y="26" width="9" height="26" rx="4" fill="#94A3B8" />
            <rect x="109" y="26" width="9" height="26" rx="4" fill="#94A3B8" />
            <rect x="56" y="50" width="88" height="100" rx="22" fill="#0E1626" stroke={b} strokeWidth="3" filter={glow} />
            <text x="100" y="92" textAnchor="middle" fontSize="17" fontWeight="800" fill="#C4B5FD" fontFamily="inherit">GaN</text>
            <text x="100" y="112" textAnchor="middle" fontSize="14" fontWeight="800" fill="#94A3B8" fontFamily="inherit">60W</text>
            <rect x="84" y="126" width="32" height="10" rx="5" fill="#071018" stroke="rgba(0,240,255,0.5)" strokeWidth="1.5" />
            <path d="M100 56l-5 9h5l-4 9 9-11h-6l4-7z" fill="#00F0FF" filter={glow} />
          </>
        );
      case "cable":
        return (
          <>
            <path d="M64 100C84 62 116 62 136 100" stroke={a} strokeWidth="7" strokeLinecap="round" filter={glow} />
            <path d="M64 100C84 70 116 70 136 100" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="28" y="88" width="36" height="24" rx="9" fill="#0E1626" stroke="#00F0FF" strokeOpacity="0.55" strokeWidth="2.5" />
            <rect x="34" y="96" width="24" height="8" rx="4" fill="rgba(0,240,255,0.2)" />
            <rect x="136" y="88" width="36" height="24" rx="9" fill="#0E1626" stroke="#FF2A85" strokeOpacity="0.55" strokeWidth="2.5" />
            <rect x="142" y="96" width="24" height="8" rx="4" fill="rgba(255,42,133,0.2)" />
            <path d="M97 76l-4 7h4l-3 8 8-10h-5l3-5z" fill="#FF2A85" opacity="0.9" />
            <path d="M103 128l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#00F0FF" opacity="0.7" />
          </>
        );
      case "neckband":
        return (
          <>
            <path d="M54 92C54 44 146 44 146 92" stroke={b} strokeWidth="10" strokeLinecap="round" filter={glow} />
            <path d="M66 88C66 58 134 58 134 88" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="54" cy="96" r="14" fill="#0E1626" stroke={b} strokeWidth="2.5" />
            <circle cx="146" cy="96" r="14" fill="#0E1626" stroke={b} strokeWidth="2.5" />
            <path d="M54 112q-3 16-16 22" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <path d="M146 112q3 16 16 22" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <circle cx="38" cy="136" r="6" fill="#FF2A85" filter={glow} />
            <circle cx="162" cy="136" r="6" fill="#FF2A85" filter={glow} />
            <circle cx="54" cy="96" r="4.5" fill="rgba(255,42,133,0.5)" />
            <circle cx="146" cy="96" r="4.5" fill="rgba(255,42,133,0.5)" />
          </>
        );
      case "car":
        return (
          <>
            <rect x="42" y="30" width="116" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
            <rect x="42" y="46" width="116" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
            <rect x="42" y="62" width="116" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
            <rect x="64" y="74" width="72" height="106" rx="16" fill="#0E1626" stroke={a} strokeWidth="3" filter={glow} />
            <rect x="71" y="82" width="58" height="90" rx="11" fill="#071018" />
            <path d="M76 112l14-14 9 9 12-16 13 21" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="100" cy="98" r="9" stroke="rgba(0,240,255,0.45)" strokeWidth="2" strokeDasharray="2.5 3" />
            <path d="M58 100q-14 8-9 26" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <path d="M142 100q14 8 9 26" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          </>
        );
      case "plug":
        return (
          <>
            <rect x="44" y="72" width="112" height="58" rx="14" fill="#0E1626" stroke={a} strokeWidth="3" filter={glow} />
            <rect x="56" y="82" width="22" height="9" rx="4.5" fill="#071018" stroke="rgba(0,240,255,0.5)" strokeWidth="1.5" />
            <rect x="89" y="82" width="22" height="9" rx="4.5" fill="#071018" stroke="rgba(0,240,255,0.5)" strokeWidth="1.5" />
            <rect x="122" y="82" width="22" height="9" rx="4.5" fill="#071018" stroke="rgba(0,240,255,0.5)" strokeWidth="1.5" />
            <circle cx="60" cy="112" r="3.5" fill="#7B2CBF" />
            <path d="M100 130c0 16-24 14-28 32" stroke={b} strokeWidth="6" strokeLinecap="round" />
            <rect x="60" y="158" width="24" height="15" rx="6" fill="#0E1626" stroke="rgba(255,42,133,0.55)" strokeWidth="2" />
          </>
        );
      case "glass":
        return (
          <>
            <rect x="62" y="28" width="62" height="128" rx="15" fill="#0E1626" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
            <rect x="70" y="38" width="46" height="108" rx="10" fill="#071018" />
            <path d="M80 48l-9 22" stroke="rgba(255,255,255,0.3)" strokeWidth="5" strokeLinecap="round" />
            <g transform="rotate(9 118 108)">
              <rect x="88" y="48" width="64" height="122" rx="15" fill="rgba(0,240,255,0.06)" stroke={a} strokeWidth="3" filter={glow} />
              <circle cx="120" cy="56" r="6.5" stroke="#FF2A85" strokeWidth="2.5" />
            </g>
            <path d="M52 44l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#00F0FF" opacity="0.85" />
            <path d="M158 150l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z" fill="#FF2A85" opacity="0.7" />
          </>
        );
      case "monitor":
        return (
          <>
            <rect x="28" y="70" width="144" height="66" rx="13" fill="#0E1626" stroke={a} strokeWidth="3" filter={glow} />
            {[0, 1, 2].map((r) => (
              <g key={r}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
                  <rect
                    key={k}
                    x={36 + k * 17}
                    y={78 + r * 15}
                    width="13"
                    height="11"
                    rx="3"
                    fill={k === 2 && r === 0 ? "rgba(0,240,255,0.3)" : k === 5 && r === 1 ? "rgba(123,44,191,0.35)" : k === 1 && r === 2 ? "rgba(255,42,133,0.3)" : "#1E293B"}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                ))}
              </g>
            ))}
            <rect x="64" y="123" width="72" height="9" rx="4.5" fill="#1E293B" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="34" y="140" width="132" height="3.5" rx="1.75" fill={a} opacity="0.7" />
          </>
        );
      case "magsafe":
        return (
          <>
            <rect x="62" y="30" width="76" height="140" rx="19" fill="#0E1626" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" />
            <rect x="72" y="38" width="26" height="26" rx="8" fill="#131C2E" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <circle cx="79" cy="45" r="4.5" fill="#071018" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <circle cx="91" cy="57" r="4.5" fill="#071018" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <circle cx="100" cy="106" r="27" stroke={a} strokeWidth="3" strokeDasharray="4 5" filter={glow} />
            <circle cx="100" cy="106" r="16.5" fill="#071018" stroke="rgba(0,240,255,0.6)" strokeWidth="2.5" />
            <path d="M103 96l-8 12h6l-4 10 12-14h-7l5-8z" fill="#00F0FF" filter={glow} />
            <path d="M74 70a30 30 0 0 1 52 0" stroke="rgba(0,240,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M82 76a20 20 0 0 1 36 0" stroke="rgba(0,240,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
    }
  })();

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      {defs}
      {frame}
      {body}
    </svg>
  );
}

/* --------------------------------- widgets -------------------------------- */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-600"}`} />
      ))}
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#7B2CBF] p-[1.5px] shadow-[0_0_18px_rgba(0,240,255,0.35)]">
        <div className="w-full h-full rounded-[10px] bg-[#0B0F17] flex items-center justify-center">
          {/* Geometric "A" with a power/circuit node */}
          <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
            <path d="M16 4 L26 26 H21.5 L16 13 L10.5 26 H6 Z" fill="url(#logoGrad)" />
            <circle cx="16" cy="23" r="2" fill="#00F0FF" />
            <defs>
              <linearGradient id="logoGrad" x1="6" y1="4" x2="26" y2="26">
                <stop stopColor="#00F0FF" />
                <stop offset="1" stopColor="#7B2CBF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="leading-none">
        <p className="font-black text-[17px] tracking-tight">
          آریا <span className="text-[#00F0FF]">تکنو</span>
        </p>
        <p className="text-[10px] text-[#94A3B8] tracking-[0.18em] mt-1">ARIYA TECHNO</p>
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt wrapper with a cursor-following neon spotlight. */
function TiltCard({ children, className, rgb }: { children: ReactNode; className?: string; rgb: string }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 7);
    rx.set((0.5 - py) * 7);
    setSpot({ x: px * 100, y: py * 100, on: true });
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
    setSpot((s) => ({ ...s, on: false }));
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`relative ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] rounded-[25px] transition-opacity duration-500"
        style={{
          opacity: spot.on ? 1 : 0,
          background: `radial-gradient(300px circle at ${spot.x}% ${spot.y}%, rgba(${rgb},0.10), transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ------------------------------ card widgets ------------------------------ */

function ProductCard({
  p,
  isWholesale,
  inCart,
  onAdd,
}: {
  p: Product;
  isWholesale: boolean;
  inCart: number;
  onAdd: (p: Product) => void;
}) {
  const t = getTheme(isWholesale);
  const price = isWholesale ? p.wholesale : p.retail;
  const hot = p.badge === "ویژه همکار" || isWholesale;

  return (
    <TiltCard rgb={t.rgb} className="group shrink-0 snap-start w-[86%] sm:w-[47%] md:w-[calc(33.333%-11px)]">
      <article
        className={`relative overflow-hidden rounded-[26px] bg-[#161F30]/60 backdrop-blur-xl border border-white/10 ${t.border} ${t.shadow} transition-[border-color,box-shadow] duration-300`}
      >
        {/* art stage */}
        <div className={`relative h-[190px] sm:h-[205px] overflow-hidden ${t.stageBg}`}>
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <GadgetArt kind={p.kind} className="absolute inset-[8%] transition-transform duration-500 group-hover:scale-[1.07]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161F30] via-transparent to-transparent" />
          <span
            className={`absolute top-3 right-3 rounded-full text-[11px] font-black px-2.5 py-1 text-white ${
              hot
                ? "bg-[#7B2CBF] shadow-[0_0_14px_rgba(123,44,191,0.6)]"
                : "bg-gradient-to-l from-[#7B2CBF] to-[#FF2A85] shadow-[0_0_14px_rgba(255,42,133,0.45)]"
            }`}
          >
            {isWholesale ? "ویژه همکار" : p.badge}
          </span>
          <span className="absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur border border-white/10 text-[11px] font-bold px-2 py-1 text-[#94A3B8]">
            {p.brand}
          </span>
          <AnimatePresence>
            {isWholesale && (
              <motion.span
                key="moq"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-3 right-3 rounded-full bg-[#7B2CBF] text-white text-[11px] font-bold px-2.5 py-1 flex items-center gap-1"
              >
                <Package className="w-3.5 h-3.5" />
                حداقل سفارش: کارتن {formatPrice(p.wholesaleQty)} عددی
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* body */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <Stars rating={p.rating} />
            <span className="text-[11px] text-[#94A3B8]">
              {formatPrice(p.rating)} ({formatPrice(p.reviews)} دیدگاه)
            </span>
          </div>
          <h3 className="font-bold text-[15px] leading-7 mt-2 min-h-[56px]">{p.name}</h3>
          <p className="text-[12px] text-[#94A3B8] mt-1 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${p.stock > 20 ? "bg-emerald-400" : "bg-amber-400"}`} />
            {p.stock > 20 ? `موجود در انبار (${formatPrice(p.stock)})` : `تنها ${formatPrice(p.stock)} عدد باقی مانده`}
          </p>

          <div className="mt-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {isWholesale ? (
                <motion.div
                  key="b2b"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-[11px] text-[#C4B5FD] font-bold">قیمت عمده کارتن ({formatPrice(p.wholesaleQty)} عددی)</p>
                  <p className="mt-1">
                    <span className="font-black text-[19px] text-[#D8B4FE]">{formatPrice(price * p.wholesaleQty)}</span>{" "}
                    <span className="text-[12px] text-[#94A3B8]">تومان</span>
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    هر عدد {formatPrice(price)} تومان • تکی {formatPrice(p.retail)} تومان
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="b2c"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-[11px] text-[#94A3B8] font-bold">قیمت تکی</p>
                  <p className="mt-1">
                    <span className="font-black text-[19px]">{formatPrice(price)}</span>{" "}
                    <span className="text-[12px] text-[#94A3B8]">تومان</span>
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">با خرید عمده همکار هر عدد {formatPrice(p.wholesale)} تومان</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => onAdd(p)}
            className={`mt-3 w-full h-11 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition active:scale-[0.98] ${
              isWholesale
                ? t.btn
                : "border border-[#00F0FF]/40 bg-gradient-to-l from-[#00F0FF]/10 to-[#7B2CBF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_18px_rgba(0,240,255,0.25)]"
            }`}
          >
            {inCart > 0 ? (
              <>
                <Check className="w-4 h-4" /> {formatPrice(inCart)} عدد در {isWholesale ? "فاکتور" : "سبد"} — افزودن بیشتر
              </>
            ) : isWholesale ? (
              <>افزودن عمده به فاکتور</>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> افزودن به سبد خرید
              </>
            )}
          </button>
        </div>
      </article>
    </TiltCard>
  );
}

function BentoCard({ c, i, isWholesale }: { c: Category; i: number; isWholesale: boolean }) {
  const t = getTheme(isWholesale);
  const Icon = c.icon;
  const big = i === 0;
  return (
    <motion.a
      href="#products"
      aria-label={c.name}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (i % 4) * 0.06, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -4, rotateX: 2.5 }}
      whileTap={{ scale: 0.98 }}
      style={{ transformPerspective: 800 }}
      className={`group relative block rounded-3xl p-[1.5px] overflow-hidden bg-white/[0.08] transition-shadow duration-500 ${
        isWholesale ? "hover:shadow-[0_0_36px_rgba(123,44,191,0.2)]" : "hover:shadow-[0_0_36px_rgba(0,240,255,0.15)]"
      } ${c.span}`}
    >
      {/* glowing gradient border (cyan -> violet / violet -> pink in B2B) */}
      <span aria-hidden className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${t.grad}`} />
      <span aria-hidden className="absolute inset-0 bg-white/[0.08]" />

      <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#161F30]/70 backdrop-blur-xl">
        {/* neon gadget art backdrop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GadgetArt
            kind={c.kind}
            className={`${big ? "w-[80%] h-[80%]" : "w-[74%] h-[74%]"} transition-transform duration-500 group-hover:scale-110`}
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${c.tint} opacity-50 mix-blend-screen`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/45 to-transparent" />

        <div className="relative h-full flex flex-col justify-end p-4">
          <span
            className={`${big ? "w-12 h-12" : "w-10 h-10"} rounded-xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center mb-auto`}
          >
            <Icon className="w-5 h-5 text-white" />
          </span>
          {big && c.chips && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {c.chips.map((ch) => (
                <span key={ch} className="rounded-full bg-black/45 backdrop-blur border border-white/10 text-[10.5px] font-bold text-[#67E8F9] px-2 py-0.5">
                  {ch}
                </span>
              ))}
            </div>
          )}
          <span className="flex items-end justify-between gap-2">
            <span>
              <span className={`block font-black ${big ? "text-[17px]" : "text-[14.5px] sm:text-[15.5px]"} leading-snug`}>{c.name}</span>
              <span className="block text-[12px] text-[#94A3B8] mt-1">{c.count}</span>
            </span>
            <span
              className={`w-9 h-9 shrink-0 rounded-full border bg-black/40 backdrop-blur flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1 ${
                isWholesale
                  ? "border-white/15 group-hover:border-[#7B2CBF]/60 group-hover:bg-[#7B2CBF]/20"
                  : "border-white/15 group-hover:border-[#00F0FF]/50 group-hover:bg-[#00F0FF]/10"
              }`}
            >
              <ChevronLeft className={`w-4 h-4 text-[#94A3B8] transition-colors duration-300 ${isWholesale ? "group-hover:text-[#C4B5FD]" : "group-hover:text-[#00F0FF]"}`} />
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* ----------------------------------- page --------------------------------- */

export default function Home() {
  const [isWholesale, setIsWholesale] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState<Phone>("iPhone 16 Pro");
  const [toast, setToast] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 42 * 60 + 18);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const t = getTheme(isWholesale);
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const visibleProducts = useMemo(() => {
    const q = search.trim();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) => p.name.includes(q) || p.brand.toLowerCase().includes(q.toLowerCase()) || p.cat.includes(q)
    );
  }, [search]);

  /* flash-deal countdown loop */
  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 5 * 3600 + 42 * 60 + 18)), 1000);
    return () => clearInterval(id);
  }, []);

  /* auto-dismiss toast */
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  /* navbar glass intensifies after scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* horizontal carousel progress (RTL-safe) */
  const onTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.abs(el.scrollLeft) / max) : 0);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(onTrackScroll);
    window.addEventListener("resize", onTrackScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onTrackScroll);
    };
  }, [onTrackScroll, visibleProducts.length]);

  function scrollPage(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  }

  function addToCart(p: Product) {
    const qty = isWholesale ? p.wholesaleQty : 1;
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + qty }));
    setToast(
      isWholesale
        ? `${p.name} — ${formatPrice(qty)} عدد به فاکتور عمده اضافه شد`
        : `${p.name} به سبد خرید اضافه شد`
    );
  }

  function addFinderItem(f: FinderItem) {
    const qty = isWholesale ? 10 : 1;
    setCart((c) => ({ ...c, [f.id]: (c[f.id] ?? 0) + qty }));
    setToast(`${f.name} به ${isWholesale ? "فاکتور عمده" : "سبد خرید"} اضافه شد`);
  }

  function goWholesale() {
    setIsWholesale(true);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  /* hero mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16 });
  const sy = useSpring(my, { stiffness: 55, damping: 16 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const rotX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const hx1 = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const hy1 = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const hx2 = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const hy2 = useTransform(sy, [-0.5, 0.5], [-9, 9]);
  const hx3 = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const hy3 = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const hx4 = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const hy4 = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  function onHeroMove(e: ReactMouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  /* countdown readouts */
  const hh = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const batteryPct = Math.round((secondsLeft / (6 * 3600)) * 100);
  const low = batteryPct <= 20;
  const filled = Math.max(1, Math.ceil(batteryPct / 20));

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] overflow-x-hidden">
      {/* ambient radial glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#00F0FF]/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[560px] h-[560px] rounded-full bg-[#7B2CBF]/[0.1] blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-[#FF2A85]/[0.05] blur-[120px]" />
      </div>

      {/* ------------------------------- Navbar ------------------------------- */}
      <header className="sticky top-3 z-50 px-3 sm:px-6">
        <nav
          className={`max-w-7xl mx-auto flex items-center gap-3 sm:gap-4 rounded-2xl border px-3 sm:px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "bg-[#0D1420]/90 border-white/15 shadow-[0_10px_44px_rgba(0,0,0,0.6)]"
              : "bg-[#161F30]/70 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          }`}
        >
          <Logo />

          <div className="hidden lg:flex items-center gap-5 text-[13.5px] font-bold text-[#94A3B8]">
            {NAV_LINKS.map((l) => (
              <a key={l.href + l.label} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* live search with glowing focus ring */}
          <div className="hidden md:flex flex-1 max-w-md mx-auto relative">
            <Search className="w-[18px] h-[18px] absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی کالا، برند یا دسته‌بندی…"
              aria-label="جستجو"
              className="w-full h-11 rounded-full bg-white/[0.04] border border-white/10 pr-10 pl-4 text-sm placeholder:text-[#94A3B8] focus:border-[#00F0FF]/60 focus:ring-2 focus:ring-[#00F0FF]/20 focus:bg-white/[0.06] focus:shadow-[0_0_22px_rgba(0,240,255,0.15)] transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="پاک کردن جستجو"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ms-auto md:ms-0">
            {/* B2C / B2B switcher with sliding thumb */}
            <div className="relative flex items-center rounded-full bg-white/[0.04] border border-white/10 p-1" role="tablist" aria-label="حالت خرید">
              {([false, true] as const).map((w) => (
                <button
                  key={String(w)}
                  role="tab"
                  aria-selected={isWholesale === w}
                  onClick={() => setIsWholesale(w)}
                  className="relative z-10 h-9 px-3 sm:px-4 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors"
                >
                  {isWholesale === w && (
                    <motion.span
                      layoutId="modeThumb"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className={`absolute inset-0 rounded-full ${
                        w
                          ? "bg-gradient-to-l from-[#7B2CBF] to-[#9D4EDD] shadow-[0_0_18px_rgba(123,44,191,0.55)]"
                          : "bg-gradient-to-l from-[#00F0FF] to-[#22D3EE] shadow-[0_0_18px_rgba(0,240,255,0.4)]"
                      }`}
                    />
                  )}
                  <span className={`relative ${isWholesale === w ? (w ? "text-white" : "text-[#0B0F17]") : "text-[#94A3B8] hover:text-white"}`}>
                    {w ? (
                      <>
                        عمده<span className="hidden sm:inline"> همکار</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">خرید </span>تکی
                      </>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* cart with animated badge */}
            <button
              aria-label="سبد خرید"
              className="relative w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-[#00F0FF]/50 hover:bg-white/[0.07] transition shrink-0"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className={`absolute -top-1 -left-1 min-w-[20px] h-5 px-1 rounded-full text-[11px] font-black flex items-center justify-center text-white ${
                      isWholesale ? "bg-[#7B2CBF] shadow-[0_0_12px_rgba(123,44,191,0.6)]" : "bg-[#FF2A85] shadow-[0_0_12px_rgba(255,42,133,0.55)]"
                    }`}
                  >
                    {formatPrice(cartCount)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              aria-label="حساب کاربری"
              className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 hidden sm:flex items-center justify-center hover:border-[#00F0FF]/50 hover:bg-white/[0.07] transition shrink-0"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* mobile search */}
        <div className="md:hidden max-w-7xl mx-auto mt-2 relative">
          <Search className="w-[18px] h-[18px] absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی کالا…"
            aria-label="جستجو"
            className="w-full h-11 rounded-full bg-[#161F30]/70 backdrop-blur-xl border border-white/10 pr-10 pl-4 text-sm placeholder:text-[#94A3B8] focus:border-[#00F0FF]/60 transition"
          />
        </div>

        {/* B2B active strip */}
        <AnimatePresence>
          {isWholesale && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-7xl mx-auto mt-2 text-center text-[12px] font-bold text-[#D8B4FE] bg-[#7B2CBF]/15 border border-[#7B2CBF]/30 rounded-full py-1.5 px-4 w-fit"
            >
              حالت همکار فعال است — قیمت‌ها عمده (کارتن ۱۰ عددی) نمایش داده می‌شود
            </motion.p>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        {/* -------------------------------- Hero -------------------------------- */}
        <section onMouseMove={onHeroMove} className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-10 grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
          {/* content (right side in RTL) */}
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.06] text-[#00F0FF] text-[12px] font-bold px-3.5 py-1.5">
              <Sparkles className="w-3.5 h-3.5" /> نسل جدید گجت و جانبی
            </span>
            <h1 className="mt-5 text-[38px] leading-[1.15] sm:text-[54px] sm:leading-[1.12] font-black">
              تکنولوژی خودت رو
              <span className="block mt-1 bg-gradient-to-l from-[#00F0FF] via-[#00F0FF] to-[#7B2CBF] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,240,255,0.25)]">
                ارتقا بده
              </span>
            </h1>
            <p className="mt-4 text-[#94A3B8] text-[15px] sm:text-base leading-8 max-w-lg">
              جدیدترین لوازم جانبی موبایل و گجت‌های هوشمند را با ضمانت اصالت بخر. برای همکاران، قیمت عمده کارتن ۱۰ عددی و ارسال
              اکسپرس از انبار جنت‌آباد.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="h-12 px-6 rounded-full font-bold text-[15px] flex items-center gap-2 text-[#0B0F17] bg-gradient-to-l from-[#00F0FF] to-[#22D3EE] shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:shadow-[0_0_36px_rgba(0,240,255,0.5)] hover:brightness-110 active:scale-[0.98] transition"
              >
                کاوش محصولات <ArrowLeft className="w-4 h-4" />
              </a>
              <button
                onClick={goWholesale}
                className={`h-12 px-6 rounded-full font-bold text-[15px] flex items-center gap-2 active:scale-[0.98] transition ${t.btnGhost}`}
              >
                پنل همکاری عمده <BadgePercent className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["۵۰۰+ کالای اورجینال", "۱۲۰۰+ همکار عمده", "۴.۹ از ۵ رضایت مشتری"].map((s) => (
                <span key={s} className="rounded-full bg-white/[0.03] border border-white/10 text-[12px] font-bold text-[#94A3B8] px-3 py-1.5">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#00F0FF]" /> تحویل اکسپرس تهران
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00F0FF]" /> ضمانت اصالت کالا
              </span>
              <span className="flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4 text-[#00F0FF]" /> قیمت رقابتی عمده
              </span>
            </div>
          </motion.div>

          {/* 3D floating gadget showcase (left side in RTL) */}
          <div className="relative h-[420px] sm:h-[480px] lg:h-[520px]" style={{ perspective: 1100 }} aria-hidden="true">
            {/* stage backdrop */}
            <div className="absolute inset-0 rounded-[36px] bg-[#161F30]/40 border border-white/[0.06] overflow-hidden">
              <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-[#00F0FF]/[0.12] blur-[80px]" />
              <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#7B2CBF]/[0.18] blur-[90px]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F17] to-transparent" />
            </div>

            {/* orbit rings */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] sm:w-[390px] sm:h-[390px] rounded-full border border-dashed border-[#00F0FF]/15 animate-spin-slow" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border border-[#7B2CBF]/20 animate-spin-slower" />

            {/* 3D stage */}
            <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="absolute inset-0">
              {/* headphones — hero piece */}
              <motion.div style={{ x: hx1, y: hy1 }} className="absolute top-[9%] right-[15%] w-[52%]">
                <motion.div
                  animate={reduce ? undefined : { y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative rounded-[28px] bg-[#0E1626]/85 backdrop-blur border border-[#00F0FF]/25 p-5 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                >
                  <GadgetArt kind="headphones" className="w-full" />
                  <span className="absolute top-3 left-3 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#67E8F9] text-[10.5px] font-bold px-2 py-0.5">
                    ANC حذف نویز
                  </span>
                </motion.div>
                <span className="absolute -bottom-2 right-6 rounded-full bg-[#00F0FF] text-[#0B0F17] text-[11px] font-black px-2.5 py-1 shadow-[0_0_16px_rgba(0,240,255,0.5)]">
                  Hi-Res
                </span>
              </motion.div>

              {/* smartwatch — top left */}
              <motion.div style={{ x: hx2, y: hy2 }} className="absolute top-[3%] left-[2%] w-[30%]">
                <motion.div
                  animate={reduce ? undefined : { y: [0, 10, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="rounded-3xl bg-[#0E1626]/85 backdrop-blur border border-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <GadgetArt kind="watch" className="w-full" />
                </motion.div>
                <span className="absolute -top-2 -left-1 rounded-full bg-[#7B2CBF] text-white text-[10.5px] font-bold px-2 py-0.5 shadow-[0_0_14px_rgba(123,44,191,0.5)]">
                  AMOLED
                </span>
              </motion.div>

              {/* powerbank — bottom right */}
              <motion.div style={{ x: hx3, y: hy3 }} className="absolute bottom-[4%] right-[3%] w-[38%]">
                <motion.div
                  animate={reduce ? undefined : { y: [0, -9, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                  className="rounded-3xl bg-[#0E1626]/85 backdrop-blur border border-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <GadgetArt kind="powerbank" className="w-full" />
                </motion.div>
                <span className="absolute top-2 -left-2 rounded-full bg-[#FF2A85] text-white text-[11px] font-black px-2.5 py-1 shadow-[0_0_16px_rgba(255,42,133,0.55)]">
                  30000mAh
                </span>
              </motion.div>

              {/* GaN charger live card — bottom left */}
              <motion.div style={{ x: hx4, y: hy4 }} className="absolute bottom-[9%] left-[3%] w-[38%]">
                <motion.div
                  animate={reduce ? undefined : { y: [0, 8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="rounded-3xl bg-[#0B0F17]/85 backdrop-blur border border-[#7B2CBF]/30 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/25 flex items-center justify-center shrink-0">
                      <Zap className="w-[18px] h-[18px] text-[#00F0FF]" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[12.5px] font-black">شارژر GaN ‏۶۰W</span>
                      <span className="block text-[10.5px] text-[#94A3B8] mt-0.5">دو دستگاه هم‌زمان</span>
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-l from-[#00F0FF] to-[#7B2CBF]"
                      animate={reduce ? { width: "70%" } : { width: ["25%", "95%", "25%"] }}
                      transition={reduce ? undefined : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ------------------------------ Bento Grid ------------------------------ */}
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 scroll-mt-28">
          <Reveal className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-black">
                دسته‌بندی‌های <span className={t.text}>پیشنهادی</span>
              </h2>
              <p className="text-[#94A3B8] text-[13px] mt-1">۸ دسته اصلی فروشگاه — روی هر دسته برو تا جزئیات رو ببینی</p>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-[12px] font-bold text-[#94A3B8]">
              <BatteryCharging className="w-4 h-4 text-[#00F0FF]" /> شارژ کامل تجربه خرید
            </span>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[168px] gap-3 sm:gap-4">
            {CATEGORIES.map((c, i) => (
              <BentoCard key={c.name} c={c} i={i} isWholesale={isWholesale} />
            ))}
          </div>
        </section>

        {/* ---------------------------- Gadget Finder ---------------------------- */}
        <section id="finder" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 scroll-mt-28">
          <Reveal>
            <div className="rounded-[28px] bg-[#161F30]/60 backdrop-blur-xl border border-white/10 p-5 sm:p-7 relative overflow-hidden">
              <div className="absolute -top-20 left-0 w-72 h-72 rounded-full bg-[#7B2CBF]/15 blur-[80px] pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 rounded-full px-3 py-1">
                    <Smartphone className="w-3.5 h-3.5" /> کشف هوشمند جانبی
                  </span>
                  <h2 className="text-[22px] sm:text-[26px] font-black mt-3">برای گوشی تو، دقیقاً چی لازمه؟</h2>
                  <p className="text-[#94A3B8] text-[13px] mt-1">مدل گوشی رو انتخاب کن؛ شارژر، کابل و لوازم سازگار رو فوراً ببین.</p>
                </div>
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="انتخاب مدل گوشی">
                  {PHONES.map((p) => (
                    <button
                      key={p}
                      role="tab"
                      aria-selected={phone === p}
                      onClick={() => setPhone(p)}
                      className={`h-10 px-4 rounded-full text-[13px] font-bold border transition active:scale-[0.97] ${
                        phone === p
                          ? isWholesale
                            ? "bg-gradient-to-l from-[#7B2CBF] to-[#9D4EDD] text-white border-transparent shadow-[0_0_16px_rgba(123,44,191,0.4)]"
                            : "bg-gradient-to-l from-[#00F0FF] to-[#22D3EE] text-[#0B0F17] border-transparent shadow-[0_0_16px_rgba(0,240,255,0.35)]"
                          : "bg-white/[0.04] border-white/10 text-[#94A3B8] hover:text-white hover:border-white/25"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={phone}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative mt-6 grid sm:grid-cols-3 gap-3"
                >
                  {FINDER[phone].map((f, idx) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + idx * 0.07, duration: 0.35 }}
                      className={`group rounded-2xl bg-[#0B0F17]/60 border border-white/10 ${t.border} ${t.shadow} p-3.5 flex gap-3 items-center transition-[border-color,box-shadow,background-color] hover:bg-[#0B0F17]/85`}
                    >
                      <span className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-white/10 ${t.stageBg}`}>
                        <GadgetArt kind={f.kind} className="absolute inset-[6%]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[11px] font-bold ${t.text}`}>
                          {f.tag} • {f.type}
                        </p>
                        <p className="font-bold text-[13.5px] truncate mt-0.5">{f.name}</p>
                        {isWholesale ? (
                          <p className="mt-1 flex flex-wrap items-baseline gap-1.5">
                            <span className="font-black text-[#D8B4FE]">{formatPrice(f.wholesale)}</span>
                            <span className="text-[12px] text-[#94A3B8]">تومان / عمده کارتن ۱۰ عددی</span>
                          </p>
                        ) : (
                          <p className="mt-1 flex flex-wrap items-baseline gap-1.5">
                            <span className="font-black">{formatPrice(f.retail)}</span>
                            <span className="text-[12px] text-[#94A3B8]">تومان</span>
                            <span className="text-[11px] text-[#94A3B8]">• عمده: {formatPrice(f.wholesale)}</span>
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => addFinderItem(f)}
                        aria-label={`افزودن ${f.name}`}
                        className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition active:scale-95 ${
                          isWholesale ? "bg-[#7B2CBF] text-white hover:bg-[#8B3BD6]" : "bg-[#00F0FF] text-[#0B0F17] hover:brightness-110"
                        }`}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <p className="relative mt-4 text-[12px] text-[#94A3B8] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> سازگاری تأییدشده برای {phone} — همه اقلام دارای ضمانت اصالت آریا تکنو
                هستند.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ------------------------- Products / Flash Deals ------------------------- */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 scroll-mt-28">
          <Reveal className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] sm:text-[26px] font-black">
                  پیشنهادهای <span className="text-[#FF2A85]">شگفت‌انگیز</span>
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#FF2A85]/15 border border-[#FF2A85]/30 text-[#FF7EB6] text-[11px] font-bold px-2.5 py-1">
                  <Timer className="w-3.5 h-3.5" /> Flash Deal
                </span>
              </div>
              <p className="text-[#94A3B8] text-[13px] mt-1">
                {search
                  ? `نتایج جستجو برای «${search}» — ${formatPrice(visibleProducts.length)} کالا`
                  : isWholesale
                    ? "قیمت عمده کارتن ۱۰ عددی برای همکاران"
                    : "منتخب امروز آریا تکنو با بهترین قیمت تکی"}
              </p>
              {search && (
                <button onClick={() => setSearch("")} className="mt-2 text-[12px] font-bold text-[#00F0FF] hover:underline">
                  پاک کردن جستجو
                </button>
              )}
            </div>

            {/* neon battery countdown */}
            <div className="flex items-center gap-3">
              <div dir="ltr" className="text-left">
                <p className="text-[10px] text-[#94A3B8] font-bold tracking-[0.18em]">زمان باقی‌مانده</p>
                <p className={`font-black text-[17px] tabular-nums leading-none mt-1 ${low ? "text-[#FF2A85]" : ""}`} dir="ltr">
                  {hh}:{mm}:{ss}
                </p>
              </div>
              <div className="w-[128px]">
                <div className="flex items-center gap-1" dir="ltr">
                  <div className={`flex-1 h-[17px] rounded-[5px] border p-[3px] flex gap-[3px] bg-white/[0.04] ${low ? "border-[#FF2A85]/50" : "border-[#00F0FF]/40"}`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-[2px] ${
                          i < filled
                            ? low
                              ? "bg-[#FF2A85] shadow-[0_0_8px_rgba(255,42,133,0.55)]"
                              : "bg-gradient-to-r from-[#00F0FF] to-[#00E5A0] shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`w-1.5 h-2.5 rounded-r-sm ${low ? "bg-[#FF2A85]/60" : "bg-[#00F0FF]/50"}`} />
                </div>
                <p className="text-[10.5px] text-[#94A3B8] mt-1.5 text-center">{formatPrice(batteryPct)}٪ شارژ زمان باقی مانده</p>
              </div>
              <div className="hidden md:block w-28 h-1 rounded-full bg-white/10 overflow-hidden" dir="ltr">
                <div
                  className={`h-full rounded-full transition-[width] duration-200 bg-gradient-to-r ${low ? "from-[#FF2A85] to-[#FF7EB6]" : "from-[#7B2CBF] to-[#00F0FF]"}`}
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <div className="hidden sm:flex gap-1.5">
                <button
                  onClick={() => scrollPage(1)}
                  disabled={progress < 0.02}
                  aria-label="قبلی"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center disabled:opacity-30 hover:border-[#00F0FF]/50 transition"
                >
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() => scrollPage(-1)}
                  disabled={progress > 0.98}
                  aria-label="بعدی"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center disabled:opacity-30 hover:border-[#00F0FF]/50 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Reveal>

          {visibleProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] py-14 text-center">
              <p className="font-bold">کالایی پیدا نشد</p>
              <p className="text-[#94A3B8] text-sm mt-1">عبارت دیگری جستجو کن یا جستجو را پاک کن.</p>
              <button onClick={() => setSearch("")} className="mt-4 h-10 px-5 rounded-full bg-[#00F0FF] text-[#0B0F17] font-bold text-sm">
                نمایش همه کالاها
              </button>
            </div>
          ) : (
            <div ref={trackRef} onScroll={onTrackScroll} className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-2 -mx-1 px-1">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} p={p} isWholesale={isWholesale} inCart={cart[p.id] ?? 0} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        {/* ------------------------------ Brand Marquee ------------------------------ */}
        <section aria-label="برندهای همکار" dir="ltr" className="marquee py-7 border-y border-white/[0.06] bg-white/[0.015] overflow-hidden">
          <div className="flex w-max animate-marquee">
            {BRANDS.map((b) => (
              <span
                key={b}
                className="shrink-0 mx-2 rounded-full border border-white/10 bg-[#161F30]/60 backdrop-blur px-6 py-2.5 font-black text-[15px] tracking-wide text-[#94A3B8] hover:text-white hover:border-[#00F0FF]/40 transition-colors cursor-default flex items-center gap-3"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#7B2CBF]" />
                {b}
              </span>
            ))}
            {BRANDS.map((b) => (
              <span
                key={`${b}-dup`}
                aria-hidden="true"
                className="shrink-0 mx-2 rounded-full border border-white/10 bg-[#161F30]/60 backdrop-blur px-6 py-2.5 font-black text-[15px] tracking-wide text-[#94A3B8] flex items-center gap-3"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#7B2CBF]" />
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* -------------------------------- Footer -------------------------------- */}
        <footer id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 scroll-mt-28">
          {/* trust badges */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {TRUST.map((f) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} className="h-full">
                  <div className="rounded-3xl bg-[#161F30]/60 backdrop-blur-xl border border-white/10 p-5 flex gap-3.5 h-full hover:border-[#00F0FF]/30 transition-colors">
                    <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#00F0FF]" />
                    </span>
                    <span>
                      <span className="block font-black text-[15px]">{f.title}</span>
                      <span className="block text-[13px] text-[#94A3B8] leading-6 mt-1">{f.desc}</span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-8 pb-8 border-b border-white/[0.06]">
            <div>
              <Logo />
              <p className="text-[#94A3B8] text-[13px] leading-7 mt-4 max-w-xs">
                مرجع خرید تکی و عمده لوازم جانبی موبایل و گجت‌های هوشمند در ایران. بیش از ۵۰۰ قلم کالای اورجینال با ارسال سریع.
              </p>
              <p className="text-[13px] text-[#94A3B8] mt-3">نشانی انبار و فروشگاه: تهران، جنت‌آباد جنوبی</p>
            </div>
            <nav aria-label="دسترسی سریع">
              <p className="font-black mb-3">دسترسی سریع</p>
              <ul className="space-y-2.5 text-[13px] text-[#94A3B8]">
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-[#00F0FF] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="خدمات مشتریان">
              <p className="font-black mb-3">خدمات مشتریان</p>
              <ul className="space-y-2.5 text-[13px] text-[#94A3B8]">
                {SERVICE_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-[#00F0FF] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-black mb-3">از تخفیف‌ها جا نمون</p>
              <p className="text-[13px] text-[#94A3B8] leading-6">ایمیلت رو ثبت کن تا پیشنهادهای عمده و جشنواره‌ها رو زودتر از بقیه ببینی.</p>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setToast("عضویت شما در خبرنامه آریا تکنو ثبت شد");
                }}
              >
                <input
                  required
                  type="email"
                  placeholder="ایمیل شما"
                  aria-label="ایمیل خبرنامه"
                  className="flex-1 min-w-0 h-11 rounded-full bg-white/[0.04] border border-white/10 px-4 text-sm placeholder:text-[#94A3B8] focus:border-[#00F0FF]/50 transition"
                />
                <button className="h-11 px-5 rounded-full bg-gradient-to-l from-[#00F0FF] to-[#22D3EE] text-[#0B0F17] font-bold text-sm shrink-0 hover:brightness-110 active:scale-[0.98] transition flex items-center gap-1.5">
                  <Send className="w-4 h-4" /> عضویت
                </button>
              </form>
              <div className="flex gap-2 mt-4">
                <a
                  href="#"
                  aria-label="واتساپ پشتیبانی"
                  className="h-10 px-4 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-[13px] font-bold flex items-center gap-1.5 hover:bg-emerald-500/20 transition"
                >
                  <MessageCircle className="w-4 h-4" /> واتساپ
                </a>
                <a
                  href="#"
                  aria-label="تلگرام پشتیبانی"
                  className="h-10 px-4 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-[13px] font-bold flex items-center gap-1.5 hover:bg-sky-500/20 transition"
                >
                  <Send className="w-4 h-4" /> تلگرام
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#94A3B8]">
            <p>© ۱۴۰۵ آریا تکنو — تمامی حقوق محفوظ است.</p>
            <p>خرید تکی و عمده • ارسال به سراسر کشور • پشتیبانی: جنت‌آباد جنوبی، تهران</p>
          </div>
        </footer>
      </main>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className={`fixed bottom-5 inset-x-0 mx-auto w-fit max-w-[92vw] z-[80] rounded-full bg-[#161F30]/90 backdrop-blur-xl border shadow-[0_0_28px_rgba(0,0,0,0.4)] px-5 py-3 flex items-center gap-2.5 ${
              isWholesale ? "border-[#7B2CBF]/40" : "border-[#00F0FF]/30"
            }`}
          >
            <span className="w-7 h-7 rounded-full bg-emerald-400/15 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-emerald-400" />
            </span>
            <p className="text-[13px] font-bold truncate">{toast}</p>
            <span className={`text-[12px] font-black shrink-0 ${t.text}`}>سبد: {formatPrice(cartCount)}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
