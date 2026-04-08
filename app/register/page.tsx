'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ ADDED ONLY THIS
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        // Prompt for 3 seconds then redirect
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.message || "Registration failed. Please check your details.");
      }
    } catch (err) {
      setError("Connection error. Is your Laravel server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${geist.className} fixed inset-0 z-[9999] flex flex-col md:flex-row bg-white overflow-hidden`}>
      
      {/* SUCCESS OVERLAY PROMPT */}
      {showSuccess && (
        <div className="fixed inset-0 bg-[#0a1120]/80 backdrop-blur-md z-[10000] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center shadow-2xl border-b-[10px] border-[#ff5500]">
            <div className="w-20 h-20 bg-orange-50 text-[#ff5500] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-[#0a1120] uppercase tracking-tighter">Account Created!</h3>
            <p className="text-slate-500 mt-3 font-medium">Your professional profile is ready. Redirecting to login...</p>
          </div>
        </div>
      )}

      {/* --- LEFT SIDE: THE UTILITY NAVY PANEL --- */}
      <div className="hidden md:flex md:w-[45%] bg-[#0a1120] text-white p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="relative z-10 space-y-12">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter uppercase">
              KitchenAll <span className="text-[#ff5500]">Pro</span>
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight">
            Expand your <br /> 
            culinary reach.
          </h1>
          
          <p className="text-slate-400 text-base lg:text-lg font-normal leading-relaxed max-w-sm">
            Join Kenya's premier network for commercial kitchen solutions. 
            Access wholesale pricing and professional project tools.
          </p>

          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff5500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-bold text-white uppercase tracking-widest">Industry Verified</p>
                <p className="text-[10px] text-slate-500 font-medium">Professional accounts are manually reviewed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE REGISTRATION PORTAL --- */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-24 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-[#0a1120] tracking-tight">Registration</h2>
            <p className="text-slate-500 text-sm font-medium">Enter your professional details to request access.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-3 px-4 outline-none focus:bg-white focus:border-[#0a1120]/20 transition-all text-sm font-medium text-slate-700"
                  required
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-3 px-4 outline-none focus:bg-white focus:border-[#0a1120]/20 transition-all text-sm font-medium text-slate-700"
                  required
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <input 
                type="email" 
                placeholder="company@email.com"
                className="w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-3 px-4 outline-none focus:bg-white focus:border-[#0a1120]/20 transition-all text-sm font-medium text-slate-700"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="flex items-center w-full bg-[#f8fafc] border border-slate-100 rounded-lg">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="flex-1 bg-transparent py-3 px-4 outline-none focus:bg-white transition-all text-sm font-medium text-slate-700"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-4 text-slate-400">
                  👁️
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="flex items-center w-full bg-[#f8fafc] border border-slate-100 rounded-lg">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="flex-1 bg-transparent py-3 px-4 outline-none focus:bg-white transition-all text-sm font-medium text-slate-700"
                  required
                  onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="px-4 text-slate-400">
                  👁️
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0a1120] hover:bg-[#161e2e] text-white rounded-lg py-4 text-sm font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "CREATING PROFILE..." : "Create Professional Account"}
              </button>
            </div>

            <p className="text-center text-slate-400 text-xs font-medium">
              already have an account? <Link href="/login" className="text-[#ff5500] font-bold hover:underline">Login here</Link>
            </p>
            
            <div className="pt-4 flex justify-center">
              <Link href="/" className="text-slate-300 hover:text-[#0a1120] font-bold text-[11px] flex items-center gap-2 transition-all uppercase tracking-widest">
                ← Return to Homepage
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}