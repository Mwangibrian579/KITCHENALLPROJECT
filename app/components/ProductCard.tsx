interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-orange-500 hover:shadow-2xl transition-all duration-300">
      <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-black uppercase tracking-widest relative">
        [EQUIPMENT IMAGE]
        <div className="absolute bottom-0 left-0 w-full bg-slate-900/10 h-1 group-hover:bg-orange-500 transition-colors"></div>
      </div>
      <div className="p-5">
        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Industrial Grade</span>
        <h3 className="font-bold text-slate-900 text-lg mt-1 group-hover:text-orange-600 transition-colors truncate">{product.name}</h3>
        <p className="text-slate-500 text-sm mt-2 line-clamp-2 min-h-[40px] leading-snug">{product.description}</p>
        
        <div className="mt-6 pt-4 border-t border-slate-50 flex items-end justify-between">
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Price (Inc. VAT)</span>
            <span className="text-2xl font-black text-slate-900">KSH {Number(product.price).toLocaleString()}</span>
          </div>
          <button className="bg-slate-100 text-slate-900 p-3 rounded-md hover:bg-orange-600 hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}