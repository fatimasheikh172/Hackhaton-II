import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth-context";
import {
  CheckCircle2,
  Zap,
  ArrowRight,
  Shield,
  Sparkles,
  Star,
  Layout as LayoutIcon,
  Check,
  MousePointer2,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/dashboard");
    }
  }, [state.isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-[#07080d] text-white overflow-x-hidden font-sans selection:bg-indigo-500/30">

      <Head>
        <title>NovaFlow | Work Management Platform</title>
        <meta
          name="description"
          content="NovaFlow is a modern, secure work management platform for professional teams."
        />
      </Head>

      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-gradient-to-br from-indigo-500/30 via-cyan-400/20 to-transparent rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-500/20 via-fuchsia-500/20 to-transparent rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
              <CheckCircle2 />
            </div>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              NovaFlow
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/login")}
              className="text-gray-400 hover:text-white font-semibold transition"
            >
              Sign in
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-6 py-2.5 rounded-full bg-white text-black font-black hover:scale-105 transition"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pt-48 pb-32 px-6 text-center">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black tracking-widest mb-10"
          >
            <Sparkles size={14} />
            ENTERPRISE WORK MANAGEMENT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[110px] font-black leading-[0.9] mb-10"
          >
            Work with clarity.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Deliver with confidence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-16"
          >
            NovaFlow is a secure and scalable platform that helps teams plan,
            manage, and execute work efficiently across the organization.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => router.push("/register")}
            className="group relative px-14 py-6 rounded-3xl 
            bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-600 
            font-black text-lg flex items-center gap-3 mx-auto 
            shadow-[0_20px_60px_rgba(99,102,241,0.45)] 
            hover:scale-105 transition"
          >
            Get started
            <ArrowRight />
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition" />
          </motion.button>

          {/* ================= BENTO GRID ================= */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">

            <div className="md:col-span-8 h-[420px] bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-[0_40px_120px_rgba(99,102,241,0.15)] relative">
              <MousePointer2 className="absolute top-10 right-10 text-indigo-400 animate-bounce" size={40} />
              <h3 className="text-3xl font-black mb-2">
                Unified Workspace
              </h3>
              <p className="text-gray-400 font-semibold mb-8">
                Centralized dashboards with real-time collaboration.
              </p>

              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center px-6 gap-4"
                  >
                    <div className="w-6 h-6 rounded-full border border-indigo-400 flex items-center justify-center">
                      <Check size={14} />
                    </div>
                    <div className="h-2 w-48 bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 h-[420px] bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-600 rounded-[3rem] p-10 shadow-[0_40px_120px_rgba(168,85,247,0.35)] relative">
              <Layers className="absolute top-10 right-10 opacity-20" size={120} />
              <h3 className="text-6xl font-black italic">99.9%</h3>
              <p className="uppercase text-xs tracking-widest text-indigo-100/70 font-bold">
                Platform availability
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-40 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-20">
          <Feature
            icon={Zap}
            title="High Performance"
            desc="Fast response times and optimized workflows for teams."
          />
          <Feature
            icon={Shield}
            title="Enterprise Security"
            desc="Industry-standard encryption and secure authentication."
          />
          <Feature
            icon={LayoutIcon}
            title="Intuitive Interface"
            desc="A clean and focused UI designed for productivity."
          />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-gray-500 text-sm">
          <span className="font-black">© 2026 NovaFlow</span>

          <div className="flex gap-10 uppercase text-xs font-black tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>

          <div className="flex items-center gap-2 text-indigo-400/70">
            <Star size={14} fill="currentColor" />
            <span className="font-black text-gray-400">
              Built with security and reliability in mind
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ icon: Icon, title, desc }: any) => (
  <div className="group">
    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition">
      <Icon size={28} className="text-indigo-400 group-hover:text-white transition" />
    </div>
    <h3 className="text-2xl font-black mb-4">{title}</h3>
    <p className="text-gray-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
