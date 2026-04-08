'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/** --- ICONS --- */
const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

/** --- HELPER: Title Formatter --- */
const formatTitle = (slug: string) => {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/%26/g, '&')
    .replace(/&/g, 'and');
};

/** --- HEADER COMPONENTS --- */
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <p className="text-blue-100/70 text-[12px] font-black uppercase tracking-[0.3em] leading-relaxed max-w-xl">
      {displayedText}<span className="inline-block w-1.5 h-4 bg-orange-500 ml-1 animate-pulse" />
    </p>
  );
};

const HeaderCarousel = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "https://i.pinimg.com/1200x/30/5d/17/305d176f7866474f0f07c592ea168656.jpg",
    "https://i.pinimg.com/1200x/94/96/a5/9496a536a4dd42d2c964126cea010b06.jpg",
    "https://i.pinimg.com/1200x/1c/d6/d5/1cd6d5b62b885ab373e2c2f6420907ce.jpg"
  ];
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative w-full h-72 md:w-96 md:h-96 rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-8 border-white/5">
      <AnimatePresence mode="wait">
        <motion.img key={index} src={images[index]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0 w-full h-full object-cover" />
      </AnimatePresence>
    </div>
  );
};

const navCategories = [
  { name: "Cooking", subs: ["Bakery Appliances", "Burners/Jikos/Stoves", "Cooking Appliances", "Small Appliances"] },
  { name: "Refrigeration", subs: ["Large Appliances", "Hotel Appliances", "Office Kitchen"] },
  { name: "Food Prep", subs: ["Butchery Equipment", "Food Processors", "Measuring Tools/Scales", "Home Kitchen"] },
  { name: "Stainless Steel", subs: ["Juakali Fabrications", "Hotel Appliances"] },
  { name: "Medical & Institutional", subs: ["Mortuary Equipment", "Hospital Utility", "Cleaning Sanitation"] }
];

const createSlug = (n: string) => n.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');

export default function SubCategoryPage({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = use(params);
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem('user_name'));
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Sync cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    fetch(`http://127.0.0.1:8000/api/products`)
      .then(res => res.json())
      .then(data => {
        // IMPROVED FILTERING: Match by subcategory_slug OR category_slug OR main category
        const filtered = data.filter((p: any) => {
          // Check if product's subcategory slug matches
          const productSubSlug = p.subcategory_slug 
            ? p.subcategory_slug.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') 
            : "";
          
          // Check if product's category slug matches
          const productCatSlug = p.category_slug 
            ? p.category_slug.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')
            : p.category?.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') || "";
          
          // Check if product's main category name matches the decoded subcategory
          const decodedSub = decodeURIComponent(subcategory).toLowerCase();
          const productCategory = (p.category || "").toLowerCase();
          
          return productSubSlug === subcategory || 
                 productCatSlug === subcategory ||
                 productCategory === decodedSub ||
                 productCategory.includes(decodedSub);
        });
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem('cart');
      if (updatedCart) setCart(JSON.parse(updatedCart));
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [subcategory]);

  const handleAddToCart = (product: any) => {
    if (!userName) {
      router.push('/login');
      return;
    }
    const existing = JSON.parse(localStorage.getItem('cart') || '[]');
    const updated = [...existing, product];
    localStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
    setIsCartOpen(true);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const cartTotal = cart.reduce((acc, curr) => acc + Number(curr.price), 0);
  const displayTitle = formatTitle(subcategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* WHATSAPP FAB */}
      <div className="fixed bottom-8 right-8 z-[300] flex flex-col items-end group">
        <div className="bg-white text-slate-900 px-4 py-2 rounded-xl shadow-2xl mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-slate-100 pointer-events-none">
          <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Chat with us
          </p>
        </div>
        <a href="https://wa.me/254741045143" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-green-500 text-white rounded-full shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)] flex items-center justify-center hover:scale-110 hover:bg-green-600 transition-all duration-300 active:scale-95">
          <WhatsAppIcon size={32} />
        </a>
      </div>

      {/* 1. UTILITY BAR */}
      <div className="bg-slate-950 text-white py-3 border-b border-white/5 relative z-[200]">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-black tracking-[0.2em] uppercase">
          <div className="flex gap-6 items-center">
            <span>TEL: 0741 045 143</span>
            <span className="hidden md:block w-[1px] h-3 bg-white/20" />
            <span>KITCHENALL.CO.KE</span>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex gap-4 items-center border-r border-white/10 pr-6">
              <a href="https://facebook.com/Kitchenandall" target="_blank" rel="noopener noreferrer"><FacebookIcon size={12} /></a>
              <a href="https://instagram.com/Kitch_enandall" target="_blank" rel="noopener noreferrer"><InstagramIcon size={12} /></a>
            </div>
            {userName ? (
              <span className="bg-orange-600 px-3 py-1 rounded-md text-white ml-2 uppercase tracking-tighter">PORTAL: {userName}</span>
            ) : (
              <Link href="/login" className="hover:text-orange-500 transition-colors pl-6">LOGIN</Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className={`sticky top-0 z-[150] h-24 flex items-center transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl' : 'bg-white border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between gap-6">
          
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className="w-16 h-16 relative shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="KitchenAll Logo" 
                className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" 
              />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              KITCHEN <span className="text-orange-600">ALL</span>
            </h1>
          </Link>

          <div className="hidden xl:flex items-center justify-center flex-1 gap-2">
            <Link href="/" className="px-4 py-2 font-black text-[11px] text-slate-400 hover:text-orange-600 uppercase tracking-widest">HOME</Link>
            {navCategories.map(cat => (
              <div key={cat.name} className="group relative px-4 py-2 cursor-pointer">
                <span className="text-[11px] font-black text-slate-500 hover:text-orange-600 uppercase tracking-widest text-center block leading-tight">
                   {cat.name}
                </span>
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {cat.subs.map(sub => (
                    <Link key={sub} href={`/category/${createSlug(sub)}`} className="block py-2 text-[11px] text-slate-400 hover:text-orange-600 font-black uppercase tracking-tight transition-colors">{sub}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-slate-900 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-lg active:scale-95 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <motion.span key={cart.length} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-orange-600 text-[10px] w-6 h-6 flex items-center justify-center rounded-full border-2 border-white font-black">{cart.length}</motion.span>
          </button>
        </div>
      </nav>

      {/* 3. HEADER SECTION */}
      <section className="bg-[#0f172a] py-32 relative overflow-hidden flex items-center min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
          <div className="flex-1 text-left">
            <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12">
              {displayTitle}
            </motion.h1>
            <TypewriterText text={`Premium commercial equipment for ${displayTitle}. Built for high-volume performance.`} />
          </div>
          <HeaderCarousel />
        </div>
      </section>

      {/* 4. PRODUCT GRID - MINIMAL DESIGN WITH HOVER EFFECTS (Same as Featured Products) */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (<div key={n} className="h-[450px] bg-slate-200 animate-pulse rounded-[3rem]" />))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
            <p className="text-slate-300 font-black uppercase text-2xl tracking-tighter mb-8 italic">No equipment found in this category...</p>
            <Link href="/" className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:shadow-2xl transition-all inline-block">Browse All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((p) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-orange-200/50 flex flex-col cursor-pointer"
                onClick={() => router.push(`/product/${p.id}`)}
              >
                {/* Product Image with Hover Zoom */}
                <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  <img 
                    src={p.image_url || p.image || 'https://placehold.co/400x400?text=No+Image'} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Product+Image'; }}
                  />
                  {p.isNew && (
                    <div className="absolute top-4 right-4 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/20 z-10">
                      NEW
                    </div>
                  )}
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-all duration-500 flex items-center justify-center gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }} 
                      className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-white text-slate-900 font-black uppercase text-[10px] tracking-wider px-5 py-3 rounded-xl shadow-lg hover:bg-orange-600 hover:text-white hover:shadow-orange-200"
                    >
                      Add to Quote
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); router.push(`/product/${p.id}`); }} 
                      className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-slate-900 text-white font-black uppercase text-[10px] tracking-wider px-5 py-3 rounded-xl shadow-lg hover:bg-orange-600"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                {/* Product Details - Clean design with all fields preserved */}
                <div className="p-6 flex flex-col gap-3">
                  {/* Brand & Category Row */}
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 text-[10px] font-black uppercase tracking-wider">{p.category || 'Equipment'}</span>
                    <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">{p.brand || 'Industrial'}</span>
                  </div>
                  
                  {/* Product Name */}
                  <h4 className="text-xl font-black text-slate-900 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                    {p.name}
                  </h4>
                  
                  {/* Pricing Section */}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">
                      KES {Number(p.price).toLocaleString()}
                    </span>
                    {p.original_price && Number(p.original_price) > 0 && Number(p.original_price) !== Number(p.price) && (
                      <span className="text-sm text-slate-400 line-through decoration-orange-500/70 decoration-2">
                        KES {Number(p.original_price).toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {/* Subtle indicator for hover action */}
                  <div className="mt-2">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest group-hover:text-orange-500 transition-colors">
                      Click for details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 5. FOOTER */}
      <footer className="bg-[#0f172a] text-white pt-24">
        <div className="max-w-7xl mx-auto px-4 pb-20 border-b border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div>
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-6">Direct Contact</span>
              <p className="text-3xl md:text-4xl font-black tracking-tight">+254 741 045 143</p>
            </div>
            <div className="md:text-right">
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-6">Email Inquiry</span>
              <p className="text-3xl md:text-4xl font-black tracking-tight uppercase">kitchenall.co.KE</p>
            </div>
          </div>
        </div>
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-900 font-black">
            <h3 className="text-2xl uppercase tracking-tighter">KITCHEN <span className="text-orange-600">ALL</span></h3>
            <p className="text-[11px] text-slate-400 uppercase tracking-[0.5em]">© 2026 KitchenAll Pro Ltd. Nairobi, Kenya</p>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[210] shadow-2xl flex flex-col">
              <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-black uppercase tracking-tighter">Your Quote Request</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-orange-600 font-bold text-xs uppercase tracking-widest">CLOSE</button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Your list is empty</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 p-2">
                        <img src={item.image_url || item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">{item.brand || 'Product'}</p>
                        <h4 className="font-bold text-sm uppercase leading-tight">{item.name}</h4>
                        <p className="text-orange-600 font-black text-xs mt-1">KES {Number(item.price).toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-slate-300 hover:text-red-500 text-[10px] font-black uppercase tracking-tighter">Remove</button>
                    </div>
                  ))
                )}
              </div>
              <div className="p-8 border-t bg-white">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Estimated Total</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">KES {cartTotal.toLocaleString()}</span>
                </div>
                <button className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl">Submit Quote Request</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}