'use client';

export default function BlogPage() {
  const posts = [
    { title: "Essential Bakery Equipment for 2026", category: "Guides", date: "April 02, 2026" },
    { title: "Energy Efficient Industrial Ovens", category: "Technical", date: "March 28, 2026" },
    { title: "Setting Up Your First Barista Station", category: "Cafe", date: "March 15, 2026" }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-12">
          <div>
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] block mb-4">The Journal</span>
            <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter">Kitchen <span className="text-orange-600">Insights</span></h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] mb-8 overflow-hidden relative border border-slate-50 transition-transform group-hover:-translate-y-2">
                 <div className="absolute top-6 left-6 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                    {post.category}
                 </div>
              </div>
              <div className="space-y-3 px-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{post.date}</span>
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors uppercase leading-tight">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm font-medium">Professional tips on how to optimize your commercial kitchen workflow...</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}