'use client';

import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';

// Swiper Imports for the Slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Navigation Data Mapping
const navCategories = [
  {
    name: "Cooking",
    subcategories: ["Bakery Appliances", "Burners/Jikos/Stoves", "Cooking Appliances", "Small Appliances"]
  },
  {
    name: "Refrigeration",
    subcategories: ["Large Appliances", "Hotel Appliances", "Office Kitchen"]
  },
  {
    name: "Food Prep",
    subcategories: ["Butchery Equipment", "Food Processors", "Measuring Tools/Scales", "Home Kitchen"]
  },
  {
    name: "Stainless Steel",
    subcategories: ["Juakali Fabrications", "Hotel Appliances"]
  }
];

// Slider Content
const slides = [
  {
    img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070',
    title: 'Equip Your Dream Commercial Kitchen',
    description: 'Heavy-duty industrial appliances with 1-year warranty and local technical support.'
  },
  {
    img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070',
    title: 'Premium Refrigeration Solutions',
    description: 'Energy-efficient chillers and freezers designed for busy Kenyan hotels and restaurants.'
  },
  {
    img: 'https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?q=80&w=2070',
    title: 'Custom Stainless Steel Fabrication',
    description: 'Bain-maries, worktables, and counters built to your exact kitchen specifications.'
  }
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search State
  const [cartCount, setCartCount] = useState(0); // Cart Badge State

  // Fetch data from Laravel API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products', { cache: 'no-store' });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Backend Connection Error:", err);
      }
    };
    getProducts();
  }, []);

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* --- UTILITY BAR --- */}
      <div className="bg-slate-900 text-white py-2.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <span className="text-orange-500">CALL US:</span>
            <span>+254 700 000 000</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-[10px] font-bold border-r border-slate-700 pr-6 uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-orange-500 transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Facebook</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Instagram</a>
            </div>
            <button 
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-xs font-black uppercase tracking-tighter text-orange-500 hover:text-white transition-all"
            >
              {isNewUser ? "Create Account" : "Sign In"}
            </button>
          </div>
        </div>
      </div>

      {/* --- REFACTORED MAIN NAVBAR --- */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between gap-8">
          
          {/* Logo (Left) */}
          <div className="shrink-0">
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">
              KITCHENALL <span className="text-orange-600">PRO</span>
            </h1>
          </div>

          {/* Main Categories (Centered) */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-1">
            {navCategories.map((cat) => (
              <div key={cat.name} className="group relative h-24 flex items-center">
                <button className="flex items-center gap-1 px-4 py-2 font-bold text-[12px] text-slate-600 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                  {cat.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-24 left-0 w-60 bg-white border border-slate-100 shadow-2xl rounded-b-xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
                  {cat.subcategories.map((sub) => (
                    <a key={sub} href="#" className="block px-6 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600 font-medium border-l-4 border-transparent hover:border-orange-600">
                      {sub}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* --- SEARCH & CART (Right) --- */}
          <div className="flex items-center gap-4 flex-1 max-w-md justify-end">
            {/* Search Input Area */}
            <div className="relative w-full hidden sm:block">
              <input 
                type="text" 
                placeholder="Search equipment..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-orange-600 transition-all outline-none text-slate-700 font-medium"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Cart Icon */}
            <button className="relative p-2 text-slate-700 hover:text-orange-600 transition-colors shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Slider Section */}
      <section className="h-[550px] w-full bg-slate-900">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect={'fade'}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.img}')` }}>
                <div className="absolute inset-0 bg-slate-900/60"></div> 
              </div>
              <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start text-white">
                <h2 className="text-6xl font-extrabold max-w-3xl leading-[1.1] mb-6">{slide.title}</h2>
                <p className="text-xl text-slate-200 max-w-xl mb-10 leading-relaxed">{slide.description}</p>
                <button className="bg-orange-600 px-10 py-4 rounded font-bold text-lg hover:bg-orange-700 transition-all shadow-xl">View Catalog</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : "Top Tier Equipment"}
            </h3>
            <div className="h-1.5 w-20 bg-orange-600 mt-2"></div>
          </div>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
            {filteredProducts.length} Products Found
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-xl font-medium">No equipment matches your search...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* --- CONTACT US SECTION --- */}
      <section className="bg-slate-100 py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Contact Us</h2>
            <div className="h-1.5 w-16 bg-orange-600 mt-4 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
              <h4 className="text-2xl font-bold text-slate-800 mb-10 tracking-tight">Our Credentials</h4>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 font-black text-xl">W</div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">WhatsApp</p>
                    <p className="font-bold text-slate-700 text-lg">+254 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl">F</div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Facebook</p>
                    <p className="font-bold text-slate-700 text-lg">KitchenAll Pro Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-200/50 border-2 border-dashed border-slate-300 rounded-3xl min-h-[400px] flex items-center justify-center text-center p-8">
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Google Maps API Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t py-16 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 KitchenAll Pro Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}