<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K-PRO | Admin Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#F5F6FA] flex items-center justify-center min-h-screen">

    <div class="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div class="bg-[#0B1F3A] p-10 text-center">
            <h1 class="text-3xl font-black text-[#1E90FF] italic tracking-tighter uppercase">Kitchenall</h1>
            <p class="text-slate-400 text-[10px] font-bold uppercase tracking-[3px] mt-2">Admin Management Suite</p>
        </div>

        <div class="p-10">
            @if($errors->any())
                <div class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase">
                    {{ $errors->first() }}
                </div>
            @endif

            <form action="{{ route('admin.login.submit') }}" method="POST" class="space-y-6">
                @csrf
                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input type="email" name="email" required 
                        class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#1E90FF] outline-none transition-all font-bold text-slate-700">
                </div>

                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                    <input type="password" name="password" required 
                        class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#1E90FF] outline-none transition-all font-bold text-slate-700">
                </div>

                <button type="submit" 
                    class="w-full bg-[#1E90FF] hover:bg-[#1C86EE] text-white font-black uppercase text-xs py-5 rounded-2xl shadow-lg shadow-blue-200 transition-all tracking-widest">
                    Authorize Access
                </button>
            </form>
        </div>
        
        <div class="pb-8 text-center">
            <p class="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Secure Environment v3.0</p>
        </div>
    </div>

</body>
</html>