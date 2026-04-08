'use client';

import { useState } from 'react';

/**
 * KITCHENALL CONTACT PAGE
 * Fully functional with state management, API posting,
 * and user notifications (Success/Error states).
 */
export default function ContactPage() {
  // 1. FORM STATE
  const [formData, setFormData] = useState({
    full_name: '',
    business_name: '',
    email: '',
    phone: '',
    equipment_needed: 'Baking Equipment',
    message: ''
  });

  // 2. UI STATUS STATE
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. SUBMISSION HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Ensure Laravel sends JSON
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is JSON first
      const contentType = response.headers.get('content-type');
      let resData = {};
      if (contentType && contentType.includes('application/json')) {
        resData = await response.json();
      } else {
        throw new Error('Unexpected response format from server.');
      }

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to submit enquiry.');
      }

      // Success
      setStatus('success');
      setFormData({
        full_name: '',
        business_name: '',
        email: '',
        phone: '',
        equipment_needed: 'Baking Equipment',
        message: ''
      });

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* LEFT: CONTACT INFO */}
          <div className="lg:w-1/2 space-y-12">
            <div>
              <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] block mb-4">Direct Contact</span>
              <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
                Get in <span className="text-orange-600">Touch</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-md font-medium">
                Visit our showroom or reach out to our technical team for industrial kitchen solutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest block mb-2">Showroom</span>
                <p className="text-sm font-bold text-slate-900 leading-tight">Ladhies Road, Nairobi, Kenya</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <span className="text-orange-600 font-black text-[10px] uppercase tracking-widest block mb-2">Phone/WhatsApp</span>
                <p className="text-sm font-bold text-slate-900 leading-tight">0741 045 143</p>
              </div>
            </div>

            <div className="w-full h-80 bg-slate-100 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-center p-6">
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest italic">
                  Nairobi Showroom Location Map
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:w-1/2 bg-slate-900 p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">

            {/* Success Overlay */}
            {status === 'success' && (
              <div className="absolute inset-0 bg-orange-600 flex flex-col items-center justify-center p-10 text-center z-10 animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Thank You!</h3>
                <p className="text-white/80 font-medium">Your enquiry has been sent to our technical team. We will contact you shortly.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 bg-white text-orange-600 px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-100 transition-colors"
                >
                  Send Another
                </button>
              </div>
            )}

            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Send an <span className="text-orange-600">Enquiry</span></h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-600 outline-none transition-all placeholder:text-white/10"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Business Name</label>
                  <input
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-600 outline-none transition-all placeholder:text-white/10"
                    placeholder="Restaurant or Hotel Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-600 outline-none transition-all placeholder:text-white/10"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-600 outline-none transition-all placeholder:text-white/10"
                    placeholder="0741045143"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Equipment Needed</label>
                <select
                  name="equipment_needed"
                  value={formData.equipment_needed}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-600 outline-none transition-all text-slate-300 appearance-none cursor-pointer"
                >
                  <option>Baking Equipment</option>
                  <option>Industrial Ovens</option>
                  <option>Refrigeration</option>
                  <option>Full Kitchen Setup</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-orange-600 outline-none transition-all placeholder:text-white/10"
                  placeholder="Detail your kitchen requirements..."
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-xs font-bold uppercase tracking-tight">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[0.25em] transition-all transform active:scale-95 shadow-xl shadow-orange-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Processing...' : 'Submit Questionnaire'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}