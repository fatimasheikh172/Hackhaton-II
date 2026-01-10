import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Background changed to Deep Dark
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Background Ambient Glows - Updated for Dark Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px]" />
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </main>

        {/* Dynamic Footer - Styled for Dark Mode */}
        <footer className="py-10 px-10 border-t border-white/5 text-center mt-auto">
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] flex items-center justify-center gap-2">
              System Core <Sparkles size={12} className="text-indigo-500" /> V2.0.26
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          </div>
        </footer>
      </div>

      {/* Floating Action Button - Enhanced for Midnight Theme */}
      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-10 right-10 z-50 group flex items-center gap-4"
        onClick={() => {
            // Scroll to top or open modal
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        {/* Tooltip Styling */}
        <span className="bg-white text-black text-[10px] font-black px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl tracking-[0.2em] uppercase translate-x-2 group-hover:translate-x-0">
          Create
        </span>
        
        <div className="relative">
          {/* Animated Ring around button */}
          <div className="absolute inset-0 bg-indigo-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
          
          <div className="relative p-5 bg-indigo-600 text-white rounded-[1.8rem] shadow-2xl border border-indigo-400/30 group-hover:bg-indigo-500 transition-colors">
            <Plus className="h-7 w-7" strokeWidth={2.5} />
          </div>
        </div>
      </motion.button>

      {/* Mobile Safe Area */}
      <div className="md:hidden h-28" />
    </div>
  );
};

export default Layout;