import React from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';
import { LogOut, User, Zap, Box } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="flex justify-between h-20 items-center">
          
          {/* --- BRAND LOGO --- */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/dashboard')}>
            <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:scale-110 transition-transform">
              <Box className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tighter text-white uppercase leading-none">
                Task<span className="text-indigo-500">Core</span>
              </h1>
              <span className="text-[9px] font-bold text-gray-600 tracking-[0.3em] uppercase">Control Center</span>
            </div>
          </div>

          {/* --- USER ACTIONS --- */}
          {state.isAuthenticated && (
            <div className="flex items-center gap-6">
              
              {/* Profile Badge */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-2xl">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-white tracking-wide leading-tight">
                    {state.user?.name || 'Commander'}
                  </span>
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                    Online Status
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="group flex items-center gap-2.5 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 rounded-xl transition-all duration-300"
              >
                <LogOut className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Terminate Session</span>
                <span className="sm:hidden">Exit</span>
              </motion.button>
              
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;