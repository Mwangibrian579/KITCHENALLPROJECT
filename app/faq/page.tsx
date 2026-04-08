'use client';

export default function FAQPage() {
  const faqs = [
    { q: "Do you offer installation across East Africa?", a: "Yes, we provide full installation and technical setup in Kenya, Uganda, Tanzania, and Rwanda." },
    { q: "What are your warranty terms?", a: "Most industrial machines carry a 1-year warranty with 24/7 technical support access." },
    { q: "Can I customize equipment orders?", a: "Absolutely. We specialize in bespoke kitchen stainless steel fabrication to fit your space." },
    { q: "What is your return policy?", a: "We offer returns for manufacturer defects reported within 7 days of delivery." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] block mb-4">Support Center</span>
          <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Common <span className="text-orange-600">Questions</span></h1>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-orange-600/20 transition-all shadow-sm">
              <div className="flex gap-6">
                <span className="text-orange-600 font-black text-xl">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}