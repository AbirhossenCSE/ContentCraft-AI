import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut, Coins, User } from 'lucide-react';

export const GeneratorPlaceholder: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-sans select-none">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/10">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            ContentCraft AI
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* User profile / credits info */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-full">
              <User className="w-4 h-4 text-purple-400" />
              <span>{user?.name || 'User'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-full">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{user?.credits ?? 0} Credits</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-4 py-2 hover:bg-slate-800/50 rounded-xl transition duration-150 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main content placeholder */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 text-center hover:border-slate-800 transition-all duration-300">
          <div className="w-16 h-16 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Generator Coming Soon
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Get ready! This dashboard will allow you to generate custom blog
            posts, social media captions, newsletters, and product descriptions
            powered by OpenRouter AI.
          </p>
          <div className="flex flex-col gap-2.5 p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-left text-xs text-slate-455">
            <span className="font-semibold text-slate-300 text-sm mb-1 block">
              Account Summary
            </span>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Email:</span>
              <span className="text-slate-200">{user?.email}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-slate-400">Credits Available:</span>
              <span className="text-amber-400 font-semibold">
                {user?.credits} Credits
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeneratorPlaceholder;
