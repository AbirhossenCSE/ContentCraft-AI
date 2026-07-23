import type React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  FileText,
  MessageSquare,
  Bookmark,
  Mail,
  ShieldCheck,
  Coins,
  History as HistoryIcon,
  Sliders,
  ArrowRight,
  GitBranch,
} from 'lucide-react';
import heroImg from '../assets/hero.png';

export const Landing: React.FC = () => {
  const { token } = useAuth();

  // Redirect to generator if user is already logged in
  if (token) {
    return <Navigate to="/generator" replace />;
  }

  const features = [
    {
      title: 'Blog Posts',
      description:
        'Generate structured, engaging, and SEO-friendly long-form articles tailored to your industry.',
      icon: FileText,
      color: 'text-purple-400',
    },
    {
      title: 'Social Captions',
      description:
        'Craft highly viral, creative, and platform-specific social media captions with ease.',
      icon: MessageSquare,
      color: 'text-blue-400',
    },
    {
      title: 'Product Descriptions',
      description:
        'Produce persuasive, benefit-focused copywriting to increase online conversions.',
      icon: Bookmark,
      color: 'text-green-400',
    },
    {
      title: 'Newsletters',
      description:
        'Write personalized and value-driven email campaigns to keep your subscribers engaged.',
      icon: Mail,
      color: 'text-amber-400',
    },
  ];

  const valueProps = [
    {
      title: 'JWT-Secured Accounts',
      description:
        'Your profile and generation logs are encrypted with industrial-strength standard JSON Web Tokens.',
      icon: ShieldCheck,
    },
    {
      title: '5 Free Daily Credits',
      description:
        'Get 5 fresh content credits automatically restored every day, refreshing at local midnight.',
      icon: Coins,
    },
    {
      title: 'Save & Manage History',
      description:
        'Track and search all previous generations, toggle favorites, or delete entries with a click.',
      icon: HistoryIcon,
    },
    {
      title: 'Custom Styles & Tones',
      description:
        'Tailor your copy by selecting Professional, Casual, Funny, or Persuasive tones and exact length limits.',
      icon: Sliders,
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description:
        'Create your free account instantly and receive 5 starting credits.',
    },
    {
      number: '02',
      title: 'Describe Your Topic',
      description:
        'Specify your niche topic, target audience, tone of voice, and copy length.',
    },
    {
      number: '03',
      title: 'Get AI Content',
      description:
        'Review, copy to clipboard, or save your newly crafted AI copy to your history.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden flex flex-col relative">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[550px] h-[550px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Public Navbar */}
      <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex justify-between items-center relative z-20 shrink-0 select-none">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 outline-none">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/10">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              ContentCraft AI
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-slate-400 hover:text-white text-sm font-medium transition px-3 py-2 rounded-xl"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl px-4 py-2 transition shadow-md shadow-purple-500/10 active:scale-[0.98]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10 w-full">
        {/* 2. Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Create Copy Faster with{' '}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent block sm:inline">
                ContentCraft AI
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Instantly draft engaging blog posts, viral social media captions,
              persuasive e-commerce descriptions, and structured newsletter
              campaigns powered by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3 px-6 transition duration-200 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 text-slate-200 font-medium rounded-xl py-3 px-6 transition flex items-center justify-center"
              >
                Log In
              </Link>
            </div>
          </div>
          {/* Hero Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-md w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImg}
                  alt="ContentCraft AI Hero Preview"
                  className="w-full h-auto object-cover select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Tailored Content Types
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              We configure specific prompts and architectures behind the scenes
              to optimize the formatting of your content copies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-slate-800 hover:scale-[1.01] transition-all duration-300 flex flex-col items-start text-left"
                >
                  <div
                    className={`p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 ${feature.color} mb-5`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Why ContentCraft AI Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Why Choose ContentCraft AI
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Designed from the ground up for high speed, absolute security, and
              zero complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-slate-800 transition-all duration-300 flex gap-4 items-start text-left"
                >
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-purple-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {prop.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. How It Works Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Start crafting optimized copies in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 h-full hover:border-slate-800 transition duration-350 text-left flex flex-col justify-between">
                  <div>
                    <div className="text-4xl font-black bg-gradient-to-r from-purple-500/20 to-indigo-500/20 bg-clip-text text-transparent mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Final CTA Band */}
        <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <div className="relative group rounded-2xl overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Ready to create content faster?
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Join now to receive 5 free credits instantly. No credit card
                required.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3.5 px-8 transition shadow-lg shadow-purple-500/20 active:scale-[0.98]"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 relative z-20 shrink-0 select-none py-8 px-6 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo mark */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-md flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-slate-300">
              ContentCraft AI
            </span>
          </div>

          <p className="text-xs">
            &copy; {new Date().getFullYear()} ContentCraft AI. All rights
            reserved.
          </p>

          <a
            href="https://github.com/AbirhossenCSE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-300 transition"
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
