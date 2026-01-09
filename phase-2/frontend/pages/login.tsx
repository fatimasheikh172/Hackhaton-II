import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth-context';
import apiClient from '@/lib/api-client';
import axios from 'axios';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Direct API call to login endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Extract token from the response
      const { access_token } = response.data;

      // Immediately store the token in localStorage
      localStorage.setItem('auth_token', access_token);

      // Now fetch user data using the stored token
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/profile`,
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      const user = userResponse.data;

      // Login to the auth context with complete user data
      login(access_token, {
        id: user.id,
        email: user.email,
        name: user.full_name || user.email.split('@')[0]
      });

      // Redirect to tasks page after successful login
      router.push('/tasks');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials and try again.');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Todo App</h1>
          <h2 className="text-xl font-semibold text-gray-700">Welcome back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;