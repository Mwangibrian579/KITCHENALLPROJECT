'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Swiper for the Professional Hero
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/** --- CUSTOM ICON COMPONENTS --- */
const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);
const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);
const PhoneIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);
const EmailIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

/** --- DATA & TYPES --- */
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  category: string;
  image: string;
  image_url?: string;
  description: string;
  isNew?: boolean;
}

const navCategories = [
  {
    name: "Cooking",
    image: "https://i.pinimg.com/1200x/11/0b/a7/110ba7b68db31ac7a3e63f590f2aa913.jpg",
    subcategories: ["Bakery Appliances", "Burners/Jikos/Stoves", "Cooking Appliances", "Small Appliances"],
    // Keywords to match against product categories
    keywords: ["cooking", "cook", "oven", "stove", "burner", "bakery", "jiko"]
  },
  {
    name: "Refrigeration",
    image: "https://i.pinimg.com/736x/56/33/df/5633df68778b34c7b5fe078512e6753d.jpg",
    subcategories: ["Large Appliances", "Hotel Appliances", "Office Kitchen"],
    keywords: ["refrigeration", "fridge", "freezer", "cooler", "chiller", "cold"]
  },
  {
    name: "Food Prep",
    image: "https://i.pinimg.com/1200x/b9/83/5f/b9835f67efc8ecedea802e69e7d07626.jpg",
    subcategories: ["Butchery Equipment", "Food Processors", "Measuring Tools/Scales", "Home Kitchen"],
    keywords: ["food prep", "processor", "mixer", "butchery", "scale", "measuring", "blender"]
  },
  {
    name: "Stainless Steel",
    image: "https://i.pinimg.com/736x/fd/2f/84/fd2f84c85fbb01d8c01f46badefc8080.jpg",
    subcategories: ["Juakali Fabrications", "Hotel Appliances"],
    keywords: ["stainless", "steel", "fabrication", "sink", "table", "counter"]
  },
  {
    name: "Medical & Institutional",
    image: "https://i.pinimg.com/736x/48/22/33/48223336e24e08a40df942d3a7e08395.jpg",
    subcategories: ["Mortuary Equipment", "Hospital Utility", "Cleaning  Sanitation"],
    keywords: ["medical", "hospital", "mortuary", "institutional", "sanitation", "cleaning"]
  }
];

const slides = [
  {
    img: 'https://i.pinimg.com/1200x/60/26/b5/6026b50c80339b17527da76ab185b6d8.jpg',
    title: 'Equip Your Dream Commercial Kitchen',
    subtitle: 'PROFESSIONAL GRADE',
    description: 'Heavy-duty industrial appliances with 1-year warranty and local technical support in Kenya.'
  },
  {
    img: 'https://i.pinimg.com/1200x/6d/3d/83/6d3d83560c8f70e14dfcc51571f309db.jpg',
    title: 'Premium Refrigeration Solutions',
    subtitle: 'ENERGY EFFICIENT',
    description: 'Energy-efficient chillers and freezers designed for busy Kenyan hotels and restaurants.'
  },
  {
    img: 'https://i.pinimg.com/736x/db/cb/fc/dbcbfc1516a15032c214698c850594ee.jpg',
    title: 'Custom Stainless Steel Fabrication',
    subtitle: 'TAILOR MADE',
    description: 'Bain-maries, worktables, and counters built to your exact kitchen specifications.'
  }
];

const createSlug = (name: string) => 
  name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);
  // For debugging - shows available categories from backend
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const mainContentRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    if (savedName) setUserName(savedName);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        const data = await response.json();
        setProducts(data);
        
        // Debug: Extract unique categories from products
        const uniqueCategories = [...new Set(data.map((p: Product) => p.category))];
        setAvailableCategories(uniqueCategories);
        console.log('📦 Available categories from backend:', uniqueCategories);
        console.log('📦 Total products loaded:', data.length);
        
      } catch (err) {
        console.error("Backend Connection Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const syncCart = (event?: any) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (event?.detail?.openDrawer) {
        setIsCartOpen(true);
      }
    };

    syncCart();
    window.addEventListener('storage', syncCart);
    window.addEventListener('cartUpdated', syncCart as EventListener);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const popupTimer = setTimeout(() => setShowPopup(true), 45000);
    const refreshTimer = setInterval(() => {
      setRandomSeed(prev => prev + 1);
    }, 300000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', syncCart);
      window.removeEventListener('cartUpdated', syncCart as EventListener);
      clearTimeout(popupTimer);
      clearInterval(refreshTimer);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    window.location.reload();
  };

  const addToCart = (product: Product) => {
    if (!userName) {
      window.location.href = '/login';
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

  /** --- IMPROVED CATEGORY FILTERING --- */
  // Function to check if a product belongs to a category
  const productMatchesCategory = (product: Product, categoryName: string): boolean => {
    const productCategory = (product.category || '').toLowerCase();
    const targetCategory = categoryName.toLowerCase();
    
    // Find the category object to get keywords
    const categoryObj = navCategories.find(c => c.name === categoryName);
    const keywords = categoryObj?.keywords || [];
    
    // Check 1: Exact match on category field
    if (productCategory === targetCategory) {
      return true;
    }
    
    // Check 2: Product category includes the target category name
    if (productCategory.includes(targetCategory) || targetCategory.includes(productCategory)) {
      return true;
    }
    
    // Check 3: Match against keywords (e.g., "oven" should show in "Cooking")
    for (const keyword of keywords) {
      if (productCategory.includes(keyword) || product.name.toLowerCase().includes(keyword)) {
        return true;
      }
    }
    
    return false;
  };

  const displayProducts = useMemo(() => {
    // 1. If searching, show all matching results
    if (searchQuery) {
      return products.filter((p) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. If a Category Card was clicked, show ALL products that match that category
    if (selectedCategory) {
      const filtered = products.filter((p) => productMatchesCategory(p, selectedCategory));
      console.log(`🔍 Filtering for category "${selectedCategory}": found ${filtered.length} products`);
      return filtered;
    }

    // 3. Default State: Show 4 random products across all categories
    if (products.length > 0) {
      return [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    }

    return [];
  }, [products, searchQuery, selectedCategory, randomSeed]);

  const cartTotal = cart.reduce((acc, curr) => acc + Number(curr.price), 0);

  const handleCategoryClick = (categoryName: string) => {
    console.log(`🖱️ Clicked category: ${categoryName}`);
    setSelectedCategory(categoryName);
    setSearchQuery('');
    scrollToProducts();
  };

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

      {/* 1. CART DRAWER */}
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
                        <img src={item.image || item.image_url} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">{item.brand}</p>
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

      {/* 2. MARKETING POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3rem] p-12 max-w-xl w-full relative border-b-[12px] border-orange-600 shadow-2xl">
              <button onClick={() => setShowPopup(false)} className="absolute top-8 right-8 text-slate-300 hover:text-orange-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="text-center">
                <span className="bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em]">Kenya Exclusive</span>
                <h2 className="text-5xl font-black text-slate-900 mt-8 mb-6 leading-[0.9] tracking-tighter uppercase">Level Up <br/><span className="text-orange-600">Your Business</span></h2>
                <p className="text-slate-500 text-lg mb-12 font-medium">Get a free kitchen layout consultation when you order any custom stainless steel fabrication today.</p>
                <a href="https://wa.me/254741045143?text=I'm%20interested%20in%20the%20free%20kitchen%20layout%20consultation" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl text-lg">Claim Offer Now</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 3. UTILITY & NAVIGATION */}
      <div className="bg-slate-950 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2"><PhoneIcon size={12} className="text-orange-500" /> 0741 045 143</div>
            <div className="flex items-center gap-2"><EmailIcon size={12} className="text-orange-500" /> KITCHENALL.CO.ke</div>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-4 items-center border-r border-white/10 pr-8">
              <a href="https://wa.me/254741045143" target="_blank" className="hover:text-orange-500 transition-colors"><WhatsAppIcon size={14} /></a>
              <a href="https://facebook.com/Kitchenandall" target="_blank" className="hover:text-orange-500 transition-colors"><FacebookIcon size={14} /></a>
              <a href="https://instagram.com/Kitch_enandall" target="_blank" className="hover:text-orange-500 transition-colors"><InstagramIcon size={14} /></a>
            </div>
            {userName ? (
              <div className="flex items-center gap-4">
                <span className="bg-white/10 px-4 py-1.5 rounded-lg border border-white/10 uppercase tracking-tighter">PORTAL: {userName}</span>
                <button onClick={handleLogout} className="text-slate-500 hover:text-white transition-colors">LOGOUT</button>
              </div>
            ) : (
              <Link href="/login" className="hover:text-orange-500 transition-colors">LOGIN</Link>
            )}
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-[150] h-24 flex items-center transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between gap-10">
          
          <Link href="/" onClick={() => { setSelectedCategory(null); setSearchQuery(''); }} className="flex items-center gap-4 group shrink-0">
            <div className="w-16 h-16 relative shrink-0 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="KitchenAll Logo" className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              KITCHEN <span className="text-orange-600">ALL</span>
            </h1>
          </Link>

          <div className="hidden xl:flex items-center justify-center flex-1 gap-2">
            <button onClick={() => { setSelectedCategory(null); setSearchQuery(''); scrollToProducts(); }} className={`px-5 py-2 font-black text-[11px] uppercase tracking-widest border-b-2 transition-all ${!selectedCategory ? 'text-slate-900 border-orange-600' : 'text-slate-400 border-transparent hover:text-orange-600'}`}>HOME</button>
            {navCategories.map(cat => (
              <div key={cat.name} className="group relative px-5 py-2 cursor-pointer">
                <span onClick={() => handleCategoryClick(cat.name)} className={`text-[11px] font-black uppercase tracking-widest transition-colors ${selectedCategory === cat.name ? 'text-orange-600' : 'text-slate-500 hover:text-orange-600'}`}>{cat.name}</span>
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {cat.subcategories.map(sub => (
                    <Link key={sub} href={`/category/${createSlug(sub)}`} className="block w-full text-left py-2 text-[11px] text-slate-400 hover:text-orange-600 font-black uppercase tracking-tight transition-colors">{sub}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-6 text-xs text-slate-900 focus:ring-2 focus:ring-orange-600 outline-none w-64 font-bold placeholder:text-slate-400" />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-slate-900 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <motion.span key={cart.length} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-orange-600 text-[10px] w-6 h-6 flex items-center justify-center rounded-full border-2 border-white font-black">{cart.length}</motion.span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. HERO SLIDER */}
      <section className="h-[700px] w-full bg-slate-900">
        <Swiper modules={[Autoplay, EffectFade, Pagination, Navigation]} effect={'fade'} pagination={{ clickable: true }} navigation={true} autoplay={{ delay: 7000 }} className="h-full w-full">
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="absolute inset-0 bg-no-repeat bg-center" style={{ backgroundImage: `url('${slide.img}')`, backgroundSize: '100% 100%', imageRendering: 'crisp-edges' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
              </div>
              <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start text-white">
                <motion.span initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-orange-500 font-black text-sm uppercase tracking-[0.5em] mb-6">{slide.subtitle}</motion.span>
                <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-7xl font-black max-w-4xl leading-[0.95] mb-8 uppercase tracking-tighter">{slide.title}</motion.h2>
                <motion.p initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-slate-300 max-w-2xl mb-12 font-medium leading-relaxed">{slide.description}</motion.p>
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-6">
                  <button onClick={() => { setSelectedCategory(null); setSearchQuery(''); scrollToProducts(); }} className="bg-orange-600 px-12 py-6 rounded-2xl font-black text-lg hover:bg-white hover:text-orange-600 transition-all shadow-2xl flex items-center gap-4">EXPLORE CATALOG <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
                  <a href="https://wa.me/254741045143?text=I%20would%20like%20to%20get%20a%20quote%20for%20kitchen%20equipment." target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-6 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">BUY NOW</a>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 5. CATEGORY GRID - Improved filtering with flexible matching */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-orange-600 font-black text-xs uppercase tracking-[0.5em] mb-4">Quality Departments</span>
          <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Browse <span className="text-orange-600">by category</span></h3>
          <div className="h-2 w-20 bg-slate-900 mt-6 rounded-full" />
        </div>
        
        {/* Debug info - shows available categories from backend (remove in production) */}
        {availableCategories.length > 0 && process.env.NODE_ENV !== 'production' && (
          <div className="mb-8 p-4 bg-yellow-50 rounded-xl text-xs font-mono text-center border border-yellow-200">
            <p className="font-bold mb-2">🔍 Debug: Available categories from your backend:</p>
            <p>{availableCategories.join(', ') || 'No categories found'}</p>
            <p className="mt-2 text-gray-500">Products total: {products.length}</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {navCategories.map((cat, idx) => (
            <motion.div 
              key={cat.name} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1 }} 
              className="cursor-pointer" 
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-2xl block bg-slate-900">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125 opacity-70" style={{ backgroundImage: `url('${cat.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h4 className="text-white font-black text-xl uppercase tracking-tighter leading-none mb-3 drop-shadow-2xl">{cat.name}</h4>
                  <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">View All {cat.name}</span>
                </div>
                <div className="absolute inset-6 border border-white/10 rounded-[2rem] pointer-events-none group-hover:border-orange-500/50 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* 6. VALUE PROPOSITION */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 duration-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Genuine Warranty</h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">Every industrial appliance comes with a 1-year manufacturer warranty and dedicated support.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 duration-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Fast Installation</h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">Professional setup by certified technicians within 48 hours across the East African region.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 duration-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">Flexible Financing</h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">Equip your business now with lipa-pole-pole options and competitive leasing rates.</p>
          </div>
        </div>
      </section>

      {/* 7. MAIN PRODUCT FEED */}
      <main className="max-w-7xl mx-auto px-4 py-32" ref={mainContentRef}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="text-left">
            <h3 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
              {searchQuery ? `Search: ${searchQuery}` : selectedCategory ? <><span className="text-orange-600">{selectedCategory}</span></> : <><span className="text-orange-600 uppercase">Featured</span> Products</>}
            </h3>
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.4em]">Current Live Stock in Nairobi</p>
          </div>
          <div className="bg-white p-3 rounded-[2rem] border shadow-sm flex gap-3">
            <button onClick={() => {setSelectedCategory(null); setSearchQuery('');}} className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${!selectedCategory && !searchQuery ? 'bg-slate-950 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>Show All</button>
            <button className="text-slate-400 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Most Popular</button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1,2,3,4,5,6,7,8].map(n => (<div key={n} className="h-[450px] bg-slate-200 animate-pulse rounded-[3rem]" />))}
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
             <p className="text-slate-300 font-black uppercase text-2xl tracking-tighter mb-8 italic">No machinery matches your selection...</p>
             <button onClick={() => {setSearchQuery(''); setSelectedCategory(null);}} className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:shadow-2xl transition-all">Show All Items</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {displayProducts.map((p) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-orange-200/50 flex flex-col cursor-pointer"
                onClick={() => window.location.href = `/product/${p.id}`}
              >
                <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  <img 
                    src={p.image || p.image_url || 'https://placehold.co/400x400?text=No+Image'} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Product+Image'; }}
                  />
                  {p.isNew && (
                    <div className="absolute top-4 right-4 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/20 z-10">
                      NEW
                    </div>
                  )}
                  <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-all duration-500 flex items-center justify-center gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }} 
                      className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-white text-slate-900 font-black uppercase text-[10px] tracking-wider px-5 py-3 rounded-xl shadow-lg hover:bg-orange-600 hover:text-white hover:shadow-orange-200"
                    >
                      Add to Quote
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); window.location.href = `/product/${p.id}`; }} 
                      className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-slate-900 text-white font-black uppercase text-[10px] tracking-wider px-5 py-3 rounded-xl shadow-lg hover:bg-orange-600"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col gap-3">
                  <h4 className="text-xl font-black text-slate-900 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                    {p.name}
                  </h4>
                  
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
      </main>

      {/* 8. PREMIUM FOOTER */}
      <footer className="relative overflow-hidden">
        <div className="bg-slate-900 pt-20 pb-16 text-white relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-600/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 text-left">
              <div className="max-w-md">
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">Ready to <span className="text-orange-600">Equip</span> <br/>Your Kitchen?</h2>
                <p className="text-slate-400 font-medium text-lg mb-8">The premier industrial equipment supplier for the hospitality sector in East Africa. Quality you can trust.</p>
                <div className="flex gap-3">
                  {[
                    { icon: <FacebookIcon />, label: 'Facebook', href: 'https://facebook.com/kitchenandall' }, 
                    { icon: <TikTokIcon />, label: 'TikTok', href: 'https://www.tiktok.com/@kitchenandal' }, 
                    { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com/Kitch_enandall' }
                  ].map((social, idx) => (
                    <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="bg-white/5 hover:bg-orange-600 p-3.5 rounded-xl transition-all border border-white/10 group">
                      <div className="text-orange-600 group-hover:text-white transition-colors duration-300">{social.icon}</div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] block">Navigation</span>
                <nav className="flex flex-col gap-4">
                  <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-orange-600 transition-colors">Blog</Link>
                  <Link href="/faq" className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-orange-600 transition-colors">FAQ</Link>
                  <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-orange-600 transition-colors">Contact Us</Link>
                </nav>
              </div>
              
              <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-600/30 transition-colors flex items-center gap-5 shadow-inner">
                  <div className="bg-orange-600/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest block mb-0.5">Physical Showroom</span>
                    <p className="text-sm font-black tracking-tight uppercase leading-tight">Located Along Ladhies Road,<br/>Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-600/30 transition-colors flex items-center gap-5 shadow-inner">
                  <div className="bg-orange-600/10 p-3 rounded-lg"><PhoneIcon className="w-5 h-5 text-orange-600" /></div>
                  <div>
                    <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest block mb-0.5">Call / WhatsApp</span>
                    <p className="text-xl font-black tracking-tight">0741 045 143</p>
                  </div>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-600/30 transition-colors flex items-center gap-5 shadow-inner">
                  <div className="bg-orange-600/10 p-3 rounded-lg"><EmailIcon className="w-5 h-5 text-orange-600" /></div>
                  <div>
                    <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest block mb-0.5">Email Inquiry</span>
                    <p className="text-base font-black tracking-tight uppercase">KITCHENALL.CO.ke</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-10 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">KITCHENALL <span className="text-orange-600">ALL</span></h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2026 KitchenAll Pro Ltd. • All Rights Reserved</p>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Ladhies Road, Nairobi</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}