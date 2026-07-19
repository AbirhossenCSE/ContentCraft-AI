import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginSchemaInput = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaInput) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await login(data.email, data.password);
      navigate('/generator');
    } catch (err: unknown) {
      console.error('Login error:', err);
      let apiErrorMsg = 'Invalid email or password. Please try again.';
      if (axios.isAxiosError(err)) {
        apiErrorMsg = err.response?.data?.message || apiErrorMsg;
      }
      setErrorMsg(apiErrorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white p-4 relative overflow-hidden font-sans">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />

      {/* Glassmorphic Auth Card */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl p-8 relative z-10 hover:border-slate-800 transition-all duration-300">
        {/* Brand / Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            ContentCraft AI
          </h2>
          <p className="text-slate-400 text-sm mt-2 text-center">
            Sign in to start crafting high-quality content
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 flex items-start gap-3 bg-red-950/40 border border-red-800/50 p-4 rounded-xl text-red-200 text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none transition duration-200 text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300 block">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 pl-11 pr-12 text-white placeholder-slate-500 outline-none transition duration-200 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition duration-150"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] disabled:active:scale-100 disabled:opacity-50 text-white font-semibold rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 text-sm select-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {/* Redirect Footer */}
        <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-800/80 pt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300 underline font-medium transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
