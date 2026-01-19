import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth-context';
import apiClient from '../lib/api-client';
import { Lock, Mail, ArrowRight, Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address.');
      setIsSubmitting(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await apiClient.post('/auth/login', { email, password });

      const { access_token } = response.data;

      // Temporarily set the token in localStorage so the interceptor can pick it up
      localStorage.setItem('auth_token', access_token);
      const userResponse = await apiClient.get('/auth/profile');

      const user = userResponse.data;
      login(access_token, {
        id: user.id,
        email: user.email,
        name: user.full_name || user.email.split('@')[0]
      });

      router.push('/tasks');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to the server. Please make sure the backend server is running on http://localhost:8000');
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else if (err.response?.status === 404) {
        setError('Server not found. Please check if the backend is running on http://localhost:8000');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later or contact support if the problem persists.');
      } else if (err.request) {
        setError('Network error. Please check your internet connection and make sure the backend server is running.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden p-6 font-sans selection:bg-indigo-500/30">

      {/* --- BACKGROUND DECORATION (Home Theme Match) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        {/* --- LOGO / HEADER --- */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/20"
          >
            <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Welcome Back</h1>
          <p className="text-gray-500 mt-2 font-medium">Continue your flow where you left off.</p>
        </div>

        {/* --- LOGIN CARD (Glassmorphism) --- */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-xs flex items-center gap-3 font-bold uppercase tracking-wider"
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-medium"
                    placeholder="name@focusflow.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Password</label>
                  <a href="#" className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Forgot?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/5 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* --- FOOTER --- */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Subtle Brand Info */}
        <div className="mt-12 flex justify-center items-center gap-2 text-gray-600">
           <Sparkles size={12} />
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">End-to-End Encrypted</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;