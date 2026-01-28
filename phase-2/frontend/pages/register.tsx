import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth-context';
import apiClient from '../lib/api-client';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!full_name.trim()) {
      setError('Please enter your full name.');
      setIsSubmitting(false);
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address.');
      setIsSubmitting(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password.');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
        full_name: full_name || email.split('@')[0]
      });

      const { access_token } = response.data;

      // Store the token in localStorage temporarily so the next API call can use it
      localStorage.setItem('auth_token', access_token);

      const userResponse = await apiClient.get('/auth/profile');

      const user = userResponse.data;
      // Call login and wait for the state update to complete
      await login(access_token, {
        id: user.id,
        email: user.email,
        name: user.full_name || user.email.split('@')[0]
      });

      // Redirect to tasks page after successful registration
      router.push('/tasks');
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to the server. Please make sure the backend server is running');
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError(err.response.data.detail || 'Invalid input provided. Please check your information.');
      } else if (err.response?.status === 409) {
        setError('Email already registered. Please use a different email or try logging in.');
      } else if (err.response?.status === 404) {
        setError('Server not found. Please check if the backend is running');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later or contact support if the problem persists.');
      } else if (err.request) {
        setError('Please make sure the backend server is running.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden p-6 font-sans selection:bg-indigo-500/30">

      {/* --- BACKGROUND DECORATION (Home Theme Match) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 180 }}
            className="mx-auto w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/20"
          >
            <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Create Account</h1>
          <p className="text-gray-500 mt-2 font-medium flex items-center justify-center gap-2">
            Start your productivity journey <Sparkles size={14} className="text-indigo-400" />
          </p>
        </div>

        {/* --- REGISTER CARD --- */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-[10px] font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="text"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/5 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/5 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-medium"
                    placeholder="name@focusflow.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/[0.03] border border-white/5 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/[0.03] border border-white/5 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Already a member?{' '}
              <a href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

