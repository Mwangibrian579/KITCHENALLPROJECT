'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Geist } from "next/font/google";
import { useRouter } from "next/navigation";

const geist = Geist({ subsets: ["latin"] });

export default function LoginPage() {
  const router = useRouter();
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    let start = 0;
    const end = 5000;
    const duration = 2000;
    
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCustomerCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); 
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_name', data.user.name);
        localStorage.setItem('is_logged_in', 'true');

        const pendingProduct = localStorage.getItem('pending_product');
        
        if (pendingProduct) {
          router.push('/?action=add_pending');
        } else {
          router.push('/'); 
        }
      } else {
        setErrorMessage(data.message || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Could not connect to the server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${geist.className} fixed inset-0 z-[9999] flex flex-col md:flex-row bg-white`}>
      
      {/* LEFT SIDE */}
      <div className="md:w-[45%] bg-[#0a1120] text-white p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="relative z-10 space-y-12 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter uppercase">
              KitchenAll <span className="text-[#ff5500]">Pro</span>
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight">
            Precision in every <br /> 
            culinary connection.
          </h1>
          
          <p className="text-slate-400 text-base lg:text-lg font-normal leading-relaxed max-w-sm">
            Access the industrial-grade inventory and professional tools trusted by 
            leading Kenyan hotels and chefs.
          </p>

          <div className="flex gap-16 pt-8 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white tracking-tighter">
                {customerCount.toLocaleString()}+
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Clients
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white tracking-tighter">1,200+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Premium Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-10">
          
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold text-[#0a1120] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Log in to manage your professional equipment inventory.
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-xs font-bold text-red-700 uppercase tracking-widest">
                Auth Error
              </p>
              <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="admin@kitchenall.pro"
                className="w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-3.5 px-5 outline-none focus:bg-white focus:border-[#0a1120]/20 focus:ring-4 focus:ring-slate-50 transition-all text-sm font-medium text-slate-700"
              />
            </div>

            {/* PASSWORD (UPDATED PROPERLY) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#ff5500] hover:text-orange-700">
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center bg-[#f8fafc] border border-slate-100 rounded-lg focus-within:bg-white focus-within:border-[#0a1120]/20 focus-within:ring-4 focus-within:ring-slate-50 transition-all">
                
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••••••"
                  className="flex-1 bg-transparent py-3.5 pl-5 pr-2 outline-none text-sm font-medium text-slate-700"
                />

                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-4 flex items-center justify-center text-slate-400 hover:text-[#0a1120] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-[#0a1120] focus:ring-[#0a1120]" />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-500">
                Remember me
              </label>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-[#0a1120] hover:bg-[#161e2e] text-white rounded-lg py-4 text-sm font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.99] disabled:opacity-70 flex justify-center items-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Authenticating...
                </>
              ) : 'Sign In'}
            </button>

            <p className="text-center text-slate-400 text-xs font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#ff5500] font-bold hover:underline">
                Register here
              </Link>
            </p>
            
            <div className="pt-6 flex justify-center">
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