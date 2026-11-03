"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Search, ShoppingCart, User, Zap, Headphones, BatteryCharging, Watch, Car,
  Cable, Shield, Monitor, ChevronLeft, Star, Plus, Minus, X, Timer,
  Truck, ShieldCheck, BadgePercent, MessageCircle, Send, Sparkles, ArrowLeft,
  Check, PlugZap, Usb, Smartphone, ChevronDown,
} from "lucide-react";

/* ---------------------------------- types --------------------------------- */
type Product = {
  id: number; name: string; brand: string; img: string; rating: number; reviews: number;
  retail: number; wholesale: number; wholesaleQty: number; badge: string; stock: number; cat: string;
};
type FinderItem = { id: number; name: string; type: string; img: string; retail: number; wholesale: number; tag: string };

/* ---------------------------------- data ---------------------------------- */
const PRODUCTS: Product[] = [
  { id: 1, name: "ساعت هوشمند ULTRA SUR مدل W1", brand: "Ultra Sur", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&auto=format&fit=crop", rating: 4.8, reviews: 214, retail: 1890000, wholesale: 1420000, wholesaleQty: 10, badge: "NEW", stock: 48, cat: "گجت" },
  { id: 2, name: "شارژر ۴۰ تا ۶۰ وات داینامیک پاور آیفون (کارتن ۱۰ عددی)", brand: "Dynamic Power", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop", rating: 4.9, reviews: 387, retail: 1250000, wholesale: 890000, wholesaleQty: 10, badge: "ویژه همکار", stock: 320, cat: "شارژر" },
  { id: 3, name: "پاوربانک ۳۰۰۰۰ اولتراسور مدل +U-P12 دیجیتال", brand: "Ultra Sur", img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80&auto=format&fit=crop", rating: 4.7, reviews: 502, retail: 2190000, wholesale: 1680000, wholesaleQty: 10, badge: "NEW", stock: 76, cat: "پاور" },
  { id: 4, name: "هندزفری بلوتوث دورگردنی XO مدل BS30", brand: "XO", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80&auto=format&fit=crop", rating: 4.6, reviews: 189, retail: 790000, wholesale: 540000, wholesaleQty: 10, badge: "پرفروش", stock: 210, cat: "صوتی" },
  { id: 5, name: "کابل دو سر تایپ سی کنفی مک‌دودو CA-5640", brand: "Mcdodo", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop", rating: 4.9, reviews: 431, retail: 420000, wholesale: 285000, wholesaleQty: 10, badge: "NEW", stock: 540, cat: "کابل" },
];

const CATEGORIES = [
  { name: "کابل و شارژر (فست شارژ)", icon: Cable, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop", count: "۱۲۰+ کالا", span: "md:col-span-1 md:row-span-2", grad: "from-[#7B2CBF]/50 to-[#00F0FF]/20" },
  { name: "هدفون و ایرپاد", icon: Headphones, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop", count: "۸۵+ کالا", span: "md:col-span-1", grad: "from-[#00F0FF]/40 to-[#7B2CBF]/30" },
  { name: "پاوربانک ظرفیت بالا", icon: BatteryCharging, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80&auto=format&fit=crop", count: "۶۴+ کالا", span: "md:col-span-1", grad: "from-[#FF2A85]/30 to-[#7B2CBF]/25" },
  { name: "ساعت هوشمند و گجت", icon: Watch, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&auto=format&fit=crop", count: "۵۸+ کالا", span: "md:col-span-1", grad: "from-[#00F0FF]/35 to-[#FF2A85]/20" },
  { name: "هولدر و لوازم خودرو", icon: Car, img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop", count: "۴۲+ کالا", span: "md:col-span-1", grad: "from-[#7B2CBF]/45 to-[#00F0FF]/15" },
  { name: "مبدل و دانگل", icon: PlugZap, img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80&auto=format&fit=crop", count: "۳۷+ کالا", span: "md:col-span-1", grad: "from-[#00F0FF]/30 to-[#7B2CBF]/20" },
  { name: "گلس و محافظ", icon: Shield, img: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&q=80&auto=format&fit=crop", count: "۹۶+ کالا", span: "md:col-span-1", grad: "from-[#FF2A85]/25 to-[#00F0FF]/20" },
  { name: "تجهیزات کامپیوتری", icon: Monitor, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80&auto=format&fit=crop", count: "۷۰+ کالا", span: "md:col-span-1", grad: "from-[#7B2CBF]/35 to-[#FF2A85]/20" },
];

const PHONES = ["iPhone 16 Pro", "Samsung S24 Ultra", "Xiaomi 14", "iPhone 15", "Samsung S23"] as const;
type Phone = (typeof PHONES)[number];
const FINDER: Record<Phone, FinderItem[]> = {
  "iPhone 16 Pro": [
    { id: 11, name: "شارژر MagSafe ۱۵W اپل", type: "شارژر بی‌سیم", img: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=800&q=80&auto=format&fit=crop", retail: 1450000, wholesale: 1050000, tag: "MagSafe" },
    { id: 12, name: "کابل تایپ‌سی کنفی Mcdodo ۶۰W", type: "کابل فست شارژ", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop", retail: 420000, wholesale: 285000, tag: "60W" },
    { id: 13, name: "شارژر GaN ۶۵W داینامیک پاور", type: "آداپتور فست شارژ", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop", retail: 1250000, wholesale: 890000, tag: "GaN" },
  ],
  "Samsung S24 Ultra": [
    { id: 21, name: "شارژر ۴۵W سوپرفست سامسونگ", type: "آداپتور فست شارژ", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop", retail: 980000, wholesale: 690000, tag: "45W" },
    { id: 22, name: "کابل تایپ‌سی ۱۰۰W Mcdodo", type: "کابل فست شارژ", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop", retail: 460000, wholesale: 310000, tag: "100W" },
    { id: 23, name: "پاوربانک ۲۰۰۰۰ LDNIO", type: "پاوربانک", img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80&auto=format&fit=crop", retail: 1650000, wholesale: 1220000, tag: "20000mAh" },
  ],
  "Xiaomi 14": [
    { id: 31, name: "شارژر توربو ۶۷W شیائومی", type: "آداپتور فست شارژ", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop", retail: 890000, wholesale: 620000, tag: "67W Turbo" },
    { id: 32, name: "کابل تایپ‌سی کنفی ۶ آمپر", type: "کابل فست شارژ", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop", retail: 380000, wholesale: 250000, tag: "6A" },
    { id: 33, name: "ایرپاد XO BS30", type: "هندزفری بلوتوث", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80&auto=format&fit=crop", retail: 790000, wholesale: 540000, tag: "بلوتوث 5.3" },
  ],
  "iPhone 15": [
    { id: 41, name: "شارژر ۲۰W آیفون تایپ‌سی", type: "آداپتور فست شارژ", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop", retail: 850000, wholesale: 590000, tag: "20W" },
    { id: 42, name: "هولدر مگنتی MagSafe خودرو", type: "هولدر خودرو", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop", retail: 620000, wholesale: 430000, tag: "MagSafe" },
    { id: 43, name: "کابل لایتنینگ کنفی Mcdodo", type: "کابل", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop", retail: 390000, wholesale: 260000, tag: "MFi" },
  ],
  "Samsung S23": [
    { id: 51, name: "شارژر ۲۵W سامسونگ", type: "آداپتور", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop", retail: 720000, wholesale: 490000, tag: "25W" },
    { id: 52, name: "پاوربانک ۱۰۰۰۰ Joyroom", type: "پاوربانک", img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80&auto=format&fit=crop", retail: 1100000, wholesale: 790000, tag: "10000mAh" },
    { id: 53, name: "گلس سرامیکی S23", type: "محافظ صفحه", img: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&q=80&auto=format&fit=crop", retail: 280000, wholesale: 180000, tag: "سرامیکی" },
  ],
};

const BRANDS = ["Apple", "Samsung", "Xiaomi", "LDNIO", "Mcdodo", "Ultra Sur", "Earldom", "XO", "Joyroom", "JBL"];

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}
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
          <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
            <path d="M16 4 L26 26 H21.5 L16 13 L10.5 26 H6 Z" fill="url(#lg)" />
            <circle cx="16" cy="23" r="2" fill="#00F0FF" />
            <defs><linearGradient id="lg" x1="6" y1="4" x2="26" y2="26"><stop stopColor="#00F0FF" /><stop offset="1" stopColor="#7B2CBF" /></linearGradient></defs>
          </svg>
        </div>
      </div>
      <div className="leading-none">
        <p className="font-black text-[17px] tracking-tight text-[#F8FAFC]">آریا <span className="text-[#00F0FF]">تکنو</span></p>
        <p className="text-[10px] text-[#94A3B8] tracking-[0.18em] mt-1">ARIYA TECHNO</p>
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */
export default function Home() {
  const [isWholesale, setIsWholesale] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState<Phone>("iPhone 16 Pro");
  const [carousel, setCarousel] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 42 * 60 + 18);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const accent = isWholesale ? "#7B2CBF" : "#00F0FF";
  const accentText = isWholesale ? "text-[#B47CFF]" : "text-[#00F0FF]";
  const accentBg = isWholesale ? "bg-[#7B2CBF]" : "bg-[#00F0FF]";
  const accentBorder = isWholesale ? "hover:border-[#7B2CBF]/60" : "hover:border-[#00F0FF]/50";
  const accentShadow = isWholesale ? "shadow-[0_0_24px_rgba(123,44,191,0.45)]" : "shadow-[0_0_24px_rgba(0,240,255,0.35)]";

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 5 * 3600 + 42 * 60 + 18)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const hh = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const batteryPct = Math.round((secondsLeft / (6 * 3600)) * 100);

  const filtered = useMemo(() => {
    if (!search.trim()) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.includes(search.trim()) || p.brand.toLowerCase().includes(search.trim().toLowerCase()));
  }, [search]);

  function addToCart(id: number, name: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + (isWholesale ? 10 : 1) }));
    setToast(isWholesale ? `${name} — ۱۰ عدد به فاکتور عمده اضافه شد` : `${name} به سبد خرید اضافه شد`);
  }
  function addFinder(item: FinderItem) {
    setCart((c) => ({ ...c, [item.id]: (c[item.id] ?? 0) + (isWholesale ? 10 : 1) }));
    setToast(`${item.name} به ${isWholesale ? "فاکتور عمده" : "سبد خرید"} اضافه شد`);
  }

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const heroX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const heroY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const heroX2 = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const heroRef = useRef<HTMLDivElement>(null);
  function onHeroMove(e: React.MouseEvent) {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const visibleProducts = filtered.length ? filtered : PRODUCTS;
  const carouselMax = Math.max(0, visibleProducts.length - 3);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] overflow-x-hidden" style={{ fontFamily: "Vazirmatn, IRANSans, Tahoma, sans-serif" }}>
      {/* ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#00F0FF]/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[560px] h-[560px] rounded-full bg-[#7B2CBF]/[0.10] blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-[#FF2A85]/[0.05] blur-[120px]" />
      </div>

      {/* ------------------------------- Navbar ------------------------------- */}
      <header className="sticky top-3 z-50 px-3 sm:px-6">
        <nav className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4 rounded-2xl bg-[#161F30]/70 backdrop-blur-xl border border-white/10 px-3 sm:px-4 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
          <Logo />
          <div className="hidden md:flex flex-1 max-w-xl mx-auto relative">
            <Search className="w-4.5 h-4.5 w-[18px] h-[18px] absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی کالا، برند یا دسته‌بندی…"
              aria-label="جستجو"
              className="w-full h-11 rounded-full bg-white/[0.04] border border-white/10 pr-10 pl-4 text-sm placeholder:text-[#94A3B8] focus:border-[#00F0FF]/60 focus:ring-2 focus:ring-[#00F0FF]/20 focus:bg-white/[0.06] transition"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="پاک کردن جستجو" className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"><X className="w-3.5 h-3.5" /></button>
            )}
          </div>
          <div className="flex items-center gap-2 mr-auto md:mr-0">
            {/* B2C / B2B switcher */}
            <div className="relative flex items-center rounded-full bg-white/[0.04] border border-white/10 p-1" role="tablist" aria-label="حالت خرید">
              <motion.div layout transition={{ type: "spring", stiffness: 400, damping: 32 }} className={`absolute top-1 bottom-1 rounded-full ${isWholesale ? "bg-gradient-to-l from-[#7B2CBF] to-[#9D4EDD] shadow-[0_0_16px_rgba(123,44,191,0.55)]" : "bg-gradient-to-l from-[#00F0FF] to-[#00B8D4] shadow-[0_0_16px_rgba(0,240,255,0.4)]"}`} style={{ width: "calc(50% - 4px)", insetInlineStart: isWholesale ? "calc(50%)" : "4px" }} />
              <button onClick={() => setIsWholesale(false)} className={`relative z-10 h-9 px-3 sm:px-4 rounded-full text-[13px] font-bold whitespace-nowrap transition ${!isWholesale ? "text-[#0B0F17]" : "text-[#94A3B8] hover:text-white"}`}>خرید تکی</button>
              <button onClick={() => setIsWholesale(true)} className={`relative z-10 h-9 px-3 sm:px-4 rounded-full text-[13px] font-bold whitespace-nowrap transition ${isWholesale ? "text-white" : "text-[#94A3B8] hover:text-white"}`}>خرید عمده همکار</button>
            </div>
            <button aria-label="سبد خرید" className="relative w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-[#00F0FF]/50 hover:bg-white/[0.07] transition shrink-0">
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span key={cartCount} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={`absolute -top-1 -left-1 min-w-[20px] h-5 px-1 rounded-full text-[11px] font-black flex items-center justify-center text-white ${isWholesale ? "bg-[#7B2CBF]" : "bg-[#FF2A85]"}`}>{cartCount.toLocaleString("fa-IR")}</motion.span>
                )}
              </AnimatePresence>
            </button>
            <button aria-label="حساب کاربری" className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 hidden sm:flex items-center justify-center hover:border-[#00F0FF]/50 hover:bg-white/[0.07] transition shrink-0"><User className="w-5 h-5" /></button>
          </div>
        </nav>
        <div className="md:hidden max-w-7xl mx-auto mt-2 relative">
          <Search className="w-[18px] h-[18px] absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجوی کالا…" aria-label="جستجو" className="w-full h-11 rounded-full bg-[#161F30]/70 backdrop-blur-xl border border-white/10 pr-10 pl-4 text-sm" />
        </div>
        <AnimatePresence>
          {isWholesale && (
            <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="max-w-7xl mx-auto mt-2 text-center text-[12px] font-bold text-[#D8B4FE] bg-[#7B2CBF]/15 border border-[#7B2CBF]/30 rounded-full py-1.5 px-4 w-fit">حالت همکار فعال است — قیمت‌ها عمده (کارتن ۱۰ عددی) نمایش داده می‌شود</motion.p>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        {/* -------------------------------- Hero -------------------------------- */}
        <section ref={heroRef} onMouseMove={onHeroMove} className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-10 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.06] text-[#00F0FF] text-[12px] font-bold px-3 py-1.5"><Sparkles className="w-3.5 h-3.5" /> نسل جدید گجت و جانبی</span>
            <h1 className="mt-5 text-[38px] leading-[1.15] sm:text-[54px] sm:leading-[1.12] font-black">
              تکنولوژی خودت رو
              <span className="block mt-1 bg-gradient-to-l from-[#00F0FF] via-[#00F0FF] to-[#7B2CBF] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,240,255,0.25)]">ارتقا بده</span>
            </h1>
            <p className="mt-4 text-[#94A3B8] text-[15px] sm:text-base leading-8 max-w-lg">جدیدترین لوازم جانبی موبایل و گجت‌های هوشمند را با ضمانت اصالت بخر. برای همکاران، قیمت عمده کارتن ۱۰ عددی و ارسال اکسپرس از انبار جنت‌آباد.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#products" className={`h-12 px-6 rounded-full font-bold text-[15px] flex items-center gap-2 text-[#0B0F17] bg-gradient-to-l from-[#00F0FF] to-[#4DD0E1] ${accentShadow} hover:brightness-110 active:scale-[0.98] transition`}>کاوش محصولات <ArrowLeft className="w-4 h-4" /></a>
              <button onClick={() => setIsWholesale(true)} className="h-12 px-6 rounded-full font-bold text-[15px] border border-[#7B2CBF]/50 bg-[#7B2CBF]/10 text-[#E9D5FF] hover:bg-[#7B2CBF]/20 hover:shadow-[0_0_20px_rgba(123,44,191,0.35)] active:scale-[0.98] transition">پنل همکاری عمده</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#94A3B8]">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#00F0FF]" /> تحویل اکسپرس تهران</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#00F0FF]" /> ضمانت اصالت کالا</span>
              <span className="flex items-center gap-1.5"><BadgePercent className="w-4 h-4 text-[#00F0FF]" /> قیمت رقابتی عمده</span>
            </div>
          </motion.div>

          {/* floating showcase */}
          <div className="relative h-[380px] sm:h-[440px]" aria-hidden="true">
            <div className="absolute inset-0 rounded-[32px] bg-[#161F30]/40 border border-white/[0.06] overflow-hidden">
              <div className="absolute -top-16 left-1/3 w-64 h-64 rounded-full bg-[#00F0FF]/15 blur-[70px]" />
              <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#7B2CBF]/20 blur-[80px]" />
              <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
            </div>
            <motion.img style={{ x: heroX, y: heroY }} animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80&auto=format&fit=crop" alt="" className="absolute top-4 right-4 w-[46%] h-[52%] object-cover rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
            <motion.img style={{ x: heroX2 }} animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700&q=80&auto=format&fit=crop" alt="" className="absolute top-10 left-4 w-[38%] h-[46%] object-cover rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
            <motion.img style={{ x: heroX }} animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} src="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700&q=80&auto=format&fit=crop" alt="" className="absolute bottom-4 right-8 w-[42%] h-[38%] object-cover rounded-3xl border border-[#00F0FF]/25 shadow-[0_0_28px_rgba(0,240,255,0.18)]" />
            <motion.div style={{ x: heroX2 }} className="absolute bottom-6 left-5 rounded-2xl bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 px-3.5 py-2.5 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#00F0FF]/15 flex items-center justify-center"><Zap className="w-5 h-5 text-[#00F0FF]" /></span>
              <span className="leading-tight"><span className="block text-[13px] font-black">شارژر GaN ‏۶۰W</span><span className="block text-[11px] text-[#94A3B8] mt-0.5">فست شارژ هم‌زمان دو دستگاه</span></span>
            </motion.div>
            <span className="absolute top-[58%] right-[44%] rounded-full bg-[#FF2A85] text-white text-[11px] font-black px-2.5 py-1 shadow-[0_0_16px_rgba(255,42,133,0.6)]">30000mAh</span>
          </div>
        </section>

        {/* ------------------------------ Bento Grid ------------------------------ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-black">دسته‌بندی‌های <span className={accentText}>پیشنهادی</span></h2>
              <p className="text-[#94A3B8] text-[13px] mt-1">۸ دسته اصلی فروشگاه — روی هر دسته برو تا جزئیات رو ببینی</p>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-[12px] font-bold text-[#94A3B8]"><BatteryCharging className="w-4 h-4 text-[#00F0FF]" /> شارژ کامل تجربه خرید</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[168px] gap-3 sm:gap-4">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              const tall = i === 0;
              return (
                <motion.button
                  key={c.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden rounded-3xl bg-[#161F30]/60 backdrop-blur-xl border border-white/10 ${accentBorder} text-right transition-shadow hover:shadow-[0_0_28px_rgba(0,240,255,0.12)] ${tall ? "row-span-2" : ""} ${c.span}`}
                >
                  <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition duration-500" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/55 to-transparent`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.grad} opacity-60 mix-blend-screen`} />
                  <div className="relative h-full flex flex-col justify-end p-4">
                    <span className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center mb-auto"><Icon className="w-5 h-5 text-white" /></span>
                    <span className="mt-3 flex items-center justify-between gap-2">
                      <span><span className="block font-black text-[15px] sm:text-base leading-snug">{c.name}</span><span className="block text-[12px] text-[#94A3B8] mt-1">{c.count}</span></span>
                      <span className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition group-hover:translate-x-[-2px] ${isWholesale ? "border-[#7B2CBF]/60 bg-[#7B2CBF]/20" : "border-[#00F0FF]/40 bg-[#00F0FF]/10"}`}><ChevronLeft className="w-4 h-4" /></span>
                    </span>
                  </div>
                  <span className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 pointer-events-none" />
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ---------------------------- Gadget Finder ---------------------------- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="rounded-[28px] bg-[#161F30]/60 backdrop-blur-xl border border-white/10 p-5 sm:p-7 relative overflow-hidden">
            <div className="absolute -top-20 left-0 w-72 h-72 rounded-full bg-[#7B2CBF]/15 blur-[80px] pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 rounded-full px-3 py-1"><Smartphone className="w-3.5 h-3.5" /> کشف هوشمند جانبی</span>
                <h2 className="text-[22px] sm:text-[26px] font-black mt-3">برای گوشی تو، دقیقاً چی لازمه؟</h2>
                <p className="text-[#94A3B8] text-[13px] mt-1">مدل گوشی رو انتخاب کن؛ شارژر، کابل و لوازم سازگار رو فوراً ببین.</p>
              </div>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="انتخاب مدل گوشی">
                {PHONES.map((p) => (
                  <button key={p} onClick={() => setPhone(p)} className={`h-10 px-4 rounded-full text-[13px] font-bold border transition active:scale-[0.97] ${phone === p ? "bg-gradient-to-l from-[#00F0FF] to-[#00B8D4] text-[#0B0F17] border-transparent shadow-[0_0_16px_rgba(0,240,255,0.35)]" : "bg-white/[0.04] border-white/10 text-[#94A3B8] hover:text-white hover:border-white/25"}`}>{p}</button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={phone} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="relative mt-6 grid sm:grid-cols-3 gap-3">
                {FINDER[phone].map((f) => (
                  <div key={f.id} className={`rounded-2xl bg-[#0B0F17]/60 border border-white/10 ${accentBorder} p-3 flex gap-3 items-center transition hover:bg-[#0B0F17]/80`}>
                    <img src={f.img} alt={f.name} className="w-16 h-16 rounded-xl object-cover shrink-0" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-[#00F0FF]">{f.tag} • {f.type}</p>
                      <p className="font-bold text-[14px] truncate mt-0.5">{f.name}</p>
                      <p className="text-[13px] mt-1"><span className="text-[#94A3B8]">{isWholesale ? "عمده: " : ""}</span><span className={`font-black ${accentText}`}>{formatPrice(isWholesale ? f.wholesale : f.retail)} تومان</span>{isWholesale && <span className="text-[11px] text-[#94A3B8]"> / کارتن ۱۰ عددی</span>}</p>
                    </div>
                    <button onClick={() => addFinder(f)} aria-label={`افزودن ${f.name}`} className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white transition active:scale-95 ${isWholesale ? "bg-[#7B2CBF] hover:bg-[#8B3BD6]" : "bg-[#00F0FF] text-[#0B0F17] hover:brightness-110"}`}><Plus className="w-5 h-5" /></button>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            <p className="relative mt-4 text-[12px] text-[#94A3B8] flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> سازگاری تأییدشده برای {phone} — همه اقلام دارای ضمانت اصالت آریا تکنو هستند.</p>
          </div>
        </section>

        {/* ------------------------- Products / Flash Deals ------------------------- */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] sm:text-[26px] font-black">پیشنهادهای <span className="text-[#FF2A85]">شگفت‌انگیز</span></h2>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#FF2A85]/15 border border-[#FF2A85]/30 text-[#FF7EB6] text-[11px] font-bold px-2.5 py-1"><Timer className="w-3.5 h-3.5" /> Flash Deal</span>
              </div>
              <p className="text-[#94A3B8] text-[13px] mt-1">{search ? `نتایج جستجو برای «${search}» — ${visibleProducts.length.toLocaleString("fa-IR")} کالا` : isWholesale ? "قیمت عمده کارتن ۱۰ عددی برای همکاران" : "منتخب امروز آریا تکنو با بهترین قیمت تکی"}</p>
            </div>
            {/* battery countdown */}
            <div className="flex items-center gap-3">
              <div className="text-left" dir="ltr">
                <p className="text-[11px] text-[#94A3B8] font-bold tracking-wide">ENDS IN</p>
                <p className="font-black text-lg tabular-nums leading-none mt-1">{hh}:{mm}:{ss}</p>
              </div>
              <div className="w-[132px]">
                <div className="flex items-center gap-1" dir="ltr">
                  <div className="flex-1 h-4 rounded-full border border-[#00F0FF]/40 bg-white/[0.04] p-[3px] flex gap-[3px]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className={`flex-1 rounded-full ${i < Math.ceil(batteryPct / 20) ? "bg-gradient-to-r from-[#00F0FF] to-[#00E5A0] shadow-[0_0_8px_rgba(0,240,255,0.5)]" : "bg-white/10"}`} />
                    ))}
                  </div>
                  <span className="w-1.5 h-2.5 rounded-r bg-[#00F0FF]/50" />
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-1.5 text-center">{batteryPct.toLocaleString("fa-IR")}٪ از زمان پیشنهاد باقی مانده</p>
              </div>
              <div className="hidden sm:flex gap-1.5">
                <button onClick={() => setCarousel((c) => Math.max(0, c - 1))} disabled={carousel === 0} aria-label="قبلی" className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center disabled:opacity-30 hover:border-[#00F0FF]/50 transition"><ChevronLeft className="w-5 h-5 rotate-180" /></button>
                <button onClick={() => setCarousel((c) => Math.min(carouselMax, c + 1))} disabled={carousel >= carouselMax} aria-label="بعدی" className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center disabled:opacity-30 hover:border-[#00F0FF]/50 transition"><ChevronLeft className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] py-14 text-center">
              <p className="font-bold">کالایی پیدا نشد</p>
              <p className="text-[#94A3B8] text-sm mt-1">عبارت دیگری جستجو کن یا جستجو را پاک کن.</p>
              <button onClick={() => setSearch("")} className="mt-4 h-10 px-5 rounded-full bg-[#00F0FF] text-[#0B0F17] font-bold text-sm">نمایش همه کالاها</button>
            </div>
          ) : (
            <div className="overflow-hidden">
              <motion.div animate={{ x: `${carousel * 33.333}%` }} transition={{ type: "spring", stiffness: 120, damping: 24 }} className="flex gap-4" style={{ width: `${Math.max(100, visibleProducts.length * 33.333)}%` }}>
                {visibleProducts.map((p, idx) => {
                  const price = isWholesale ? p.wholesale : p.retail;
                  const inCart = cart[p.id] ?? 0;
                  return (
                    <motion.article key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className={`group relative shrink-0 w-[calc(33.333%-11px)] min-w-[268px] sm:min-w-0 rounded-[26px] bg-[#161F30]/60 backdrop-blur-xl border border-white/10 ${accentBorder} overflow-hidden transition hover:shadow-[0_0_32px_rgba(0,240,255,0.12)]`}>
                      <div className="relative h-[190px] sm:h-[210px] overflow-hidden">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161F30] via-transparent to-transparent" />
                        <span className={`absolute top-3 right-3 rounded-full text-[11px] font-black px-2.5 py-1 text-white ${p.badge === "ویژه همکار" || isWholesale ? "bg-[#7B2CBF] shadow-[0_0_14px_rgba(123,44,191,0.6)]" : "bg-gradient-to-l from-[#7B2CBF] to-[#FF2A85] shadow-[0_0_14px_rgba(255,42,133,0.45)]"}`}>{isWholesale ? "ویژه همکار" : p.badge}</span>
                        <span className="absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur border border-white/10 text-[11px] font-bold px-2 py-1">{p.brand}</span>
                        {isWholesale && <span className="absolute bottom-3 right-3 rounded-full bg-[#7B2CBF] text-white text-[11px] font-bold px-2.5 py-1">حداقل سفارش: کارتن {p.wholesaleQty.toLocaleString("fa-IR")} عددی</span>}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2">
                          <Stars rating={p.rating} />
                          <span className="text-[11px] text-[#94A3B8]">{p.rating.toLocaleString("fa-IR")} ({p.reviews.toLocaleString("fa-IR")} دیدگاه)</span>
                        </div>
                        <h3 className="font-bold text-[15px] leading-7 mt-2 min-h-[56px]">{p.name}</h3>
                        <p className="text-[12px] text-[#94A3B8] mt-1 flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${p.stock > 20 ? "bg-emerald-400" : "bg-amber-400"}`} /> {p.stock > 20 ? `موجود در انبار (${p.stock.toLocaleString("fa-IR")})` : `تنها ${p.stock.toLocaleString("fa-IR")} عدد باقی مانده`}</p>
                        <div className="mt-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
                          {isWholesale ? (
                            <>
                              <p className="text-[11px] text-[#C4B5FD] font-bold">قیمت عمده کارتن ({p.wholesaleQty.toLocaleString("fa-IR")} عددی)</p>
                              <p className="mt-1"><span className="font-black text-[19px] text-[#D8B4FE]">{formatPrice(price * p.wholesaleQty)}</span> <span className="text-[12px] text-[#94A3B8]">تومان</span></p>
                              <p className="text-[11px] text-[#94A3B8] mt-0.5">هر عدد {formatPrice(price)} تومان • تکی {formatPrice(p.retail)} تومان</p>
                            </>
                          ) : (
                            <>
                              <p className="text-[11px] text-[#94A3B8] font-bold">قیمت تکی</p>
                              <p className="mt-1"><span className="font-black text-[19px]">{formatPrice(price)}</span> <span className="text-[12px] text-[#94A3B8]">تومان</span></p>
                              <p className="text-[11px] text-[#94A3B8] mt-0.5">با خرید عمده همکار هر عدد {formatPrice(p.wholesale)} تومان</p>
                            </>
                          )}
                        </div>
                        <button onClick={() => addToCart(p.id, p.name)} className={`mt-3 w-full h-11 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition active:scale-[0.98] ${isWholesale ? "bg-gradient-to-l from-[#7B2CBF] to-[#9D4EDD] text-white shadow-[0_0_18px_rgba(123,44,191,0.4)] hover:brightness-110" : "bg-gradient-to-l from-[#00F0FF]/15 to-[#7B2CBF]/15 border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_16px_rgba(0,240,255,0.25)]"}`}>
                          {inCart > 0 ? <><Check className="w-4 h-4" /> {inCart.toLocaleString("fa-IR")} عدد در {isWholesale ? "فاکتور" : "سبد"} — افزودن بیشتر</> : isWholesale ? <>افزودن عمده به فاکتور</> : <><ShoppingCart className="w-4 h-4" /> افزودن به سبد خرید</>}
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
              <div className="flex justify-center gap-1.5 mt-5" dir="ltr">
                {Array.from({ length: carouselMax + 1 }).map((_, i) => (
                  <button key={i} aria-label={`اسلاید ${i + 1}`} onClick={() => setCarousel(i)} className={`h-1.5 rounded-full transition-all ${i === carousel ? "w-8 bg-[#00F0FF]" : "w-3 bg-white/20 hover:bg-white/40"}`} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ------------------------------ Brand Marquee ------------------------------ */}
        <section className="py-8 border-y border-white/[0.06] bg-white/[0.015] overflow-hidden" aria-label="برندها">
          <div className="flex animate-marquee gap-4 w-max" dir="ltr">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={`${b}-${i}`} className="shrink-0 rounded-full border border-white/10 bg-[#161F30]/60 backdrop-blur px-6 py-2.5 font-black text-[15px] tracking-wide text-[#94A3B8] hover:text-white hover:border-[#00F0FF]/40 transition cursor-default">{b}</span>
            ))}
          </div>
        </section>

        {/* -------------------------------- Footer -------------------------------- */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Truck, title: "تحویل اکسپرس", desc: "ارسال همان‌روز در تهران و ۲۴ ساعته به شهرستان‌ها" },
              { icon: ShieldCheck, title: "ضمانت اصالت کالا", desc: "همه کالاها با گارانتی معتبر و فاکتور رسمی" },
              { icon: BadgePercent, title: "قیمت رقابتی عمده", desc: "بهترین قیمت کارتن ۱۰ عددی برای همکاران سراسر کشور" },
              { icon: MessageCircle, title: "پشتیبانی آنلاین", desc: "پاسخگویی سریع در واتساپ و تلگرام، ۹ صبح تا ۱۰ شب" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-3xl bg-[#161F30]/60 backdrop-blur-xl border border-white/10 p-5 flex gap-3.5">
                  <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center"><Icon className="w-5 h-5 text-[#00F0FF]" /></span>
                  <span><span className="block font-black text-[15px]">{f.title}</span><span className="block text-[13px] text-[#94A3B8] leading-6 mt-1">{f.desc}</span></span>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-8 pb-8 border-b border-white/[0.06]">
            <div>
              <Logo />
              <p className="text-[#94A3B8] text-[13px] leading-7 mt-4 max-w-xs">مرجع خرید تکی و عمده لوازم جانبی موبایل و گجت‌های هوشمند در ایران. بیش از ۵۰۰ قلم کالای اورجینال با ارسال سریع.</p>
              <p className="text-[13px] text-[#94A3B8] mt-3">نشانی انبار و فروشگاه: تهران، جنت‌آباد جنوبی</p>
            </div>
            <nav aria-label="دسترسی سریع">
              <p className="font-black mb-3">دسترسی سریع</p>
              <ul className="space-y-2.5 text-[13px] text-[#94A3B8]">
                {["فروشگاه", "پیشنهادهای شگفت‌انگیز", "پنل همکاری عمده", "پیگیری سفارش", "درباره آریا تکنو"].map((l) => (<li key={l}><a href="#products" className="hover:text-[#00F0FF] transition">{l}</a></li>))}
              </ul>
            </nav>
            <nav aria-label="خدمات مشتریان">
              <p className="font-black mb-3">خدمات مشتریان</p>
              <ul className="space-y-2.5 text-[13px] text-[#94A3B8]">
                {["شرایط بازگشت کالا", "حریم خصوصی", "پرسش‌های متداول", "شرایط همکاری عمده", "تماس با ما"].map((l) => (<li key={l}><a href="#products" className="hover:text-[#00F0FF] transition">{l}</a></li>))}
              </ul>
            </nav>
            <div>
              <p className="font-black mb-3">از تخفیف‌ها جا نمون</p>
              <p className="text-[13px] text-[#94A3B8] leading-6">ایمیلت رو ثبت کن تا پیشنهادهای عمده و جشنواره‌ها رو زودتر از بقیه ببینی.</p>
              <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); setToast("عضویت شما در خبرنامه ثبت شد"); }}>
                <input required type="email" placeholder="ایمیل شما" aria-label="ایمیل خبرنامه" className="flex-1 min-w-0 h-11 rounded-full bg-white/[0.04] border border-white/10 px-4 text-sm placeholder:text-[#94A3B8] focus:border-[#00F0FF]/50" />
                <button className="h-11 px-5 rounded-full bg-gradient-to-l from-[#00F0FF] to-[#00B8D4] text-[#0B0F17] font-bold text-sm shrink-0 hover:brightness-110 active:scale-[0.98] transition flex items-center gap-1.5"><Send className="w-4 h-4" /> عضویت</button>
              </form>
              <div className="flex gap-2 mt-4">
                <a href="#" aria-label="واتساپ پشتیبانی" className="h-10 px-4 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-[13px] font-bold flex items-center gap-1.5 hover:bg-emerald-500/20 transition"><MessageCircle className="w-4 h-4" /> واتساپ</a>
                <a href="#" aria-label="تلگرام پشتیبانی" className="h-10 px-4 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-[13px] font-bold flex items-center gap-1.5 hover:bg-sky-500/20 transition"><Send className="w-4 h-4" /> تلگرام</a>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#94A3B8]">
            <p>© ۱۴۰۳ آریا تکنو — تمامی حقوق محفوظ است.</p>
            <p>خرید تکی و عمده • ارسال به سراسر کشور • پشتیبانی: جنت‌آباد جنوبی، تهران</p>
          </div>
        </footer>
      </main>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] max-w-[92vw] rounded-full bg-[#161F30]/90 backdrop-blur-xl border border-[#00F0FF]/30 shadow-[0_0_28px_rgba(0,240,255,0.2)] px-5 py-3 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-emerald-400/15 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-emerald-400" /></span>
            <p className="text-[13px] font-bold truncate">{toast}</p>
            <span className="text-[12px] font-black text-[#00F0FF] shrink-0">سبد: {cartCount.toLocaleString("fa-IR")}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


