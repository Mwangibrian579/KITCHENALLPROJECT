'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p: any) => p.id.toString() === id);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToQuote = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full" 
      />
    </div>
  );

  if (!product) return <div className="min-h-screen flex items-center justify-center font-black">PRODUCT NOT FOUND</div>;

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse delay-1000" />

      <nav className="px-8 py-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/60 backdrop-blur-xl z-50">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase text-slate-900">
          KITCHENALL <span className="text-orange-600">PRO</span>
        </Link>
        <Link href="/" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors">
          ← Back to Catalog
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 lg:sticky lg:top-32"
          >
            <motion.div 
              whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
              className="aspect-square bg-gradient-to-br from-slate-50 to-white rounded-[4rem] p-12 flex items-center justify-center border border-slate-100 shadow-2xl relative overflow-hidden group"
            >
              <img 
                src={product.image_url || product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain mix-blend-multiply z-10 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </motion.div>

          <div className="w-full lg:w-1/2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-orange-600" />
                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.4em]">
                  {product.brand || "Professional Series"}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85]">
                {product.name}
              </h1>

              <div className="flex flex-col gap-2 pt-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl font-black text-slate-900 tracking-tighter">
                    KES {Number(product.price).toLocaleString()}
                  </span>
                  
                  {/* NOTABLE STRIKETHROUGH PRICE */}
                  {product.original_price && Number(product.original_price) > 0 && (
                    <span className="text-2xl font-bold text-slate-300 line-through decoration-orange-500/50 decoration-4 italic">
                      {Number(product.original_price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* SAVINGS BADGE */}
                {product.original_price && Number(product.original_price) > Number(product.price) && (
                  <div className="inline-flex">
                    <span className="text-[10px] font-black text-white bg-orange-600 px-3 py-1 rounded-full uppercase tracking-widest animate-bounce">
                      Save KES {(Number(product.original_price) - Number(product.price)).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Brand', val: product.brand || 'Premium' },
                { label: 'Warranty', val: '12 Months' },
                { label: 'Material', val: 'AISI 304 Steel' },
                { label: 'Delivery', val: '24-48 Hours' }
              ].map((spec, i) => (
                <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-100 hover:border-orange-200 transition-colors">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{spec.label}</p>
                  <p className="text-xs font-black uppercase text-slate-900">{spec.val}</p>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 pt-8 border-t border-slate-100"
            >
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</h3>
              <p className="text-slate-600 leading-relaxed text-xl font-medium">
                {product.description || "Designed for high-traffic kitchens, this unit combines industrial-grade power with refined aesthetics for the modern professional."}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <button 
                onClick={handleAddToQuote}
                className={`flex-[2] py-7 rounded-[2.5rem] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                  added ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-orange-600'
                }`}
              >
                {added ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    Added to List
                  </>
                ) : 'Add to Quote'}
              </button>
              
              <a 
                href={`https://wa.me/254741045143?text=Details for ${product.name}`} 
                target="_blank" 
                className="flex-1 bg-green-500 text-white py-7 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-green-600 transition-all text-center shadow-xl active:scale-95"
              >
                Chat
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}