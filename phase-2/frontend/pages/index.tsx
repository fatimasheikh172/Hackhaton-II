import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth-context';
import { CheckCircle2, Zap, ArrowRight, Github, Shield, Sparkles, Star, Layout as LayoutIcon, Check, MousePointer2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push('/tasks');
    }
  }, [state.isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      <Head>
        <title>FocusFlow | Productivity for Elite Teams</title>
        <meta name="description" content="Next-gen task management system." />
      </Head>

      {/* --- RADIAL GRADIENT BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 rounded-full blur-[160px]" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
              <CheckCircle2 className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              FocusFlow
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/login')} className="px-5 py-2 text-sm font-bold text-gray-400 hover:text-white transition-all">
              Log in
            </button>
            <button 
              onClick={() => router.push('/register')} 
              className="relative group px-6 py-2.5 bg-white text-black text-sm font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Join FocusFlow</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white group-hover:from-white group-hover:to-indigo-100 transition-all" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 mb-10 backdrop-blur-md"
          >
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Productivity Standard</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[110px] font-black tracking-tight leading-[0.85] mb-10"
          >
            Your workflow, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-indigo-800">
              perfected.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium mb-16"
          >
            FocusFlow is the shortcut to getting things done. Designed for speed, security, and absolute clarity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <button 
              onClick={() => router.push('/register')} 
              className="px-12 py-6 bg-indigo-600 rounded-3xl font-black text-lg flex items-center gap-3 hover:bg-indigo-500 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* --- BENTO GRID MOCKUP --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto px-4"
          >
            {/* Main Feature Card */}
            <div className="md:col-span-8 h-[400px] bg-white/5 border border-white/10 rounded-[3rem] p-8 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                    <MousePointer2 className="text-indigo-400 animate-bounce" size={40} />
                </div>
                <h3 className="text-3xl font-black text-left mb-2">Power Dashboard</h3>
                <p className="text-gray-400 text-left mb-8 font-bold tracking-tight">Real-time sync with 0.1ms latency.</p>
                <div className="space-y-3">
                    <div className="h-16 w-full bg-white/5 rounded-2xl border border-white/5 flex items-center px-6 gap-4">
                        <div className="w-6 h-6 rounded-full border border-indigo-500/50 flex items-center justify-center text-indigo-400"><Check size={14}/></div>
                        <div className="h-2 w-48 bg-white/10 rounded-full" />
                    </div>
                    <div className="h-16 w-full bg-white/5 rounded-2xl border border-white/5 flex items-center px-6 gap-4">
                        <div className="w-6 h-6 rounded-full border border-white/10" />
                        <div className="h-2 w-64 bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Small Stat Card */}
            <div className="md:col-span-4 h-[400px] bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-10 flex flex-col justify-end text-left relative overflow-hidden">
                <Layers className="absolute top-10 right-10 text-white/20" size={120} strokeWidth={1} />
                <h3 className="text-5xl font-black mb-2 italic">99.9%</h3>
                <p className="font-bold text-indigo-100/60 uppercase tracking-widest text-xs">Uptime Guaranteed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-40 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20 text-left">
          <Feature icon={Zap} title="Lightning Fast" desc="Optimized for rapid task switching and instant data persistence." />
          <Feature icon={Shield} title="Encrypted" desc="Your tasks are private. We use AES-256 encryption at rest." />
          <Feature icon={LayoutIcon} title="Modern Flow" desc="A UI that disappears so you can focus on your work." />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center"><CheckCircle2 size={12}/></div>
             <span className="font-black tracking-tight text-gray-500">FocusFlow v1.0</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black text-gray-600 uppercase tracking-widest">
            <a href="https://github.com/fatimasheikh172" className="hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
          <div className="flex items-center gap-2 text-yellow-500/50">
            <Star size={14} fill="currentColor" />
            <span className="text-gray-600 font-black">4.9/5 Rating</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ icon: Icon, title, desc }: any) => (
  <div className="group">
    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-indigo-600 transition-all duration-500">
      <Icon size={28} className="text-indigo-500 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;