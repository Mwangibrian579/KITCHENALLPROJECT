'use client';

import { useState } from "react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Success! Please check your email for the reset link.");
        setEmail(""); // Clear input
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Ensure your Laravel server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${geist.className} fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8fafc] p-6`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 lg:p-12 space-y-8 border border-slate-100">
        
        {/* LOGO & HEADER */}
        <div className="space-y-2 text-center">
          <span className="text-xl font-black tracking-tighter uppercase text-[#0a1120]">
            KitchenAll <span className="text-[#ff5500]">Pro</span>
          </span>
          <h2 className="text-3xl font-bold text-[#0a1120] tracking-tight">Reset Access</h2>
          <p className="text-slate-500 text-sm font-medium">Enter your email to receive a secure reset link.</p>
        </div>

        {/* FEEDBACK MESSAGES */}
        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded text-sm text-green-700 font-bold">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700 font-bold">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="chef@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-3.5 px-5 outline-none focus:bg-white focus:border-[#0a1120]/20 text-sm font-medium text-slate-700 transition-all"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#0a1120] hover:bg-[#161e2e] text-white rounded-lg py-4 text-sm font-bold shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? "SENDING..." : "Send Reset Link"}
          </button>
        </form>

        {/* BACK TO LOGIN */}
        <div className="pt-2 text-center">
          <Link href="/login" className="text-xs font-bold text-slate-400 hover:text-[#0a1120] transition-colors uppercase tracking-widest">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}