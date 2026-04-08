'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for form and status
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: searchParams.get('email') || "", // Pre-filled from URL
    token: searchParams.get('token') || "", // Pre-filled from URL
    password: "",
    password_confirmation: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reset-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated! Redirecting to login...");
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setError(data.message || "Failed to reset password. Link may be expired.");
      }
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${geist.className} fixed inset-0 z-[9999] flex flex-col md:flex-row bg-white`}>
      
      {/* --- LEFT PANEL (Navy) --- */}
      <div className="md:w-[45%] bg-[#0a1120] text-white p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10 space-y-8 text-left">
          <span className="text-xl font-black tracking-tighter uppercase">
            KitchenAll <span className="text-[#ff5500]">Pro</span>
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight">
            Secure your <br /> 
            culinary workspace.
          </h1>
          <p className="text-slate-400 text-base max-w-sm">
            Updating your password ensures your professional inventory and trade data remain protected.
          </p>
        </div>
      </div>

      {/* --- RIGHT PANEL (Form) --- */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-10">
          
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold text-[#0a1120] tracking-tight">Set New Password</h2>
            <p className="text-slate-500 text-sm font-medium">Create a strong, memorable password for your account.</p>
          </div>

          {/* Feedback */}
          {message && <div className="bg-green-50 border-l-4 border-green-500 p-4 text-sm text-green-700 font-bold uppercase tracking-widest">{message}</div>}
          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700 font-bold uppercase tracking-widest">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Hidden Token & Email (Managed automatically from URL) */}
            <input type="hidden" value={formData.token} />

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Email</label>
              <input 
                required
                type="email" 
                value={formData.email}
                readOnly // Prevents user from changing the target email
                className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3.5 px-5 text-sm font-medium text-slate-400 outline-none cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-3.5 px-5 outline-none focus:bg-white focus:border-[#0a1120]/20 text-sm font-medium text-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••••••"
                onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                className="w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-3.5 px-5 outline-none focus:bg-white focus:border-[#0a1120]/20 text-sm font-medium text-slate-700"
              />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-[#0a1120] hover:bg-[#161e2e] text-white rounded-lg py-4 text-sm font-bold shadow-xl transition-all active:scale-[0.99] disabled:opacity-70 flex justify-center items-center gap-3"
            >
              {loading ? 'UPDATING...' : 'Update Password'}
            </button>

            <div className="pt-4 text-center">
              <Link href="/login" className="text-slate-300 hover:text-[#0a1120] font-bold text-[11px] transition-all uppercase tracking-widest">
                Cancel and return to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Next.js requires Suspense when using useSearchParams in a Client Component
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}