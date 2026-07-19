import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  LogOut,
  Coins,
  User,
  Copy,
  Check,
  AlertCircle,
  FileText,
  MessageSquare,
  Bookmark,
  Mail,
  Loader2,
} from 'lucide-react';

const generateFormSchema = z.object({
  topic: z.string().trim().min(3, 'Topic must be at least 3 characters long'),
  type: z.enum(['blog', 'caption', 'description', 'newsletter']),
  tone: z.string().trim().min(1, 'Tone is required'),
  length: z.enum(['short', 'medium', 'long']),
  audience: z.string().trim().optional(),
});

type GenerateFormInput = z.infer<typeof generateFormSchema>;

interface GenerateResponse {
  content: string;
  wordCount: number;
  creditsRemaining: number;
  generatedAt: string;
}

export const Generator: React.FC = () => {
  const { user, logout, updateCredits } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateFormInput>({
    resolver: zodResolver(generateFormSchema),
    defaultValues: {
      topic: '',
      type: 'blog',
      tone: 'Professional',
      length: 'medium',
      audience: '',
    },
  });

  const selectedTone = watch('tone');
  const selectedLength = watch('length');
  const selectedType = watch('type');

  const onSubmit = async (data: GenerateFormInput) => {
    setIsGenerating(true);
    setErrorMsg(null);
    setResult(null);
    try {
      const response = await api.post<GenerateResponse>('/generate', data);
      const { content, wordCount: words, creditsRemaining } = response.data;

      setResult(content);
      setWordCount(words);
      updateCredits(creditsRemaining);
    } catch (err: unknown) {
      console.error('Generation error:', err);
      let errMsg = 'Failed to generate content. Please try again.';
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 402) {
          errMsg =
            'Insufficient credits. Please top up your account to generate more content.';
        } else {
          errMsg = err.response?.data?.message || errMsg;
        }
      }
      setErrorMsg(errMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const contentTypes = [
    { value: 'blog', label: 'Blog Post', icon: FileText },
    { value: 'caption', label: 'Social Caption', icon: MessageSquare },
    { value: 'description', label: 'Product Description', icon: Bookmark },
    { value: 'newsletter', label: 'Newsletter', icon: Mail },
  ];

  const tones = ['Professional', 'Casual', 'Funny', 'Persuasive'];
  const lengths = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-sans select-none">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
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
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800/80 px-3.5 py-1.5 rounded-full text-slate-300">
              <User className="w-4 h-4 text-purple-400" />
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800/80 px-3.5 py-1.5 rounded-full text-slate-300">
              <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-semibold text-slate-200">
                {user?.credits} Credits
              </span>
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

      {/* Main Page Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
        {/* Left Column - Control panel / Form */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Configure Generator
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Content Type Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Content Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setValue(
                            'type',
                            type.value as GenerateFormInput['type']
                          )
                        }
                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition cursor-pointer select-none ${
                          isSelected
                            ? 'bg-purple-600/10 border-purple-500 text-purple-300'
                            : 'bg-slate-950/30 border-slate-800/80 text-slate-400 hover:border-slate-850 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topic Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Topic / Describe what to write about
                </label>
                <textarea
                  {...register('topic')}
                  rows={4}
                  placeholder="e.g. 5 essential tips for remote developers working across timezones..."
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl p-3 text-white placeholder-slate-500 outline-none transition duration-200 text-sm resize-none"
                />
                {errors.topic && (
                  <p className="text-red-400 text-xs pl-1">
                    {errors.topic.message}
                  </p>
                )}
              </div>

              {/* Tone selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map((t) => {
                    const isSelected = selectedTone === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setValue('tone', t)}
                        className={`py-2 px-3 rounded-xl border text-center text-xs font-medium transition cursor-pointer select-none ${
                          isSelected
                            ? 'bg-purple-600/10 border-purple-500 text-purple-300'
                            : 'bg-slate-950/30 border-slate-800/80 text-slate-400 hover:border-slate-850 hover:text-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Length selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Length
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {lengths.map((len) => {
                    const isSelected = selectedLength === len.value;
                    return (
                      <button
                        key={len.value}
                        type="button"
                        onClick={() =>
                          setValue(
                            'length',
                            len.value as GenerateFormInput['length']
                          )
                        }
                        className={`py-2 px-3 rounded-xl border text-center text-xs font-medium transition cursor-pointer select-none ${
                          isSelected
                            ? 'bg-purple-600/10 border-purple-500 text-purple-300'
                            : 'bg-slate-950/30 border-slate-800/80 text-slate-400 hover:border-slate-850 hover:text-slate-200'
                        }`}
                      >
                        {len.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Audience Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Target Audience (optional)
                </label>
                <input
                  type="text"
                  {...register('audience')}
                  placeholder="e.g. tech managers, startup founders"
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 px-4 text-white placeholder-slate-500 outline-none transition duration-200 text-sm"
                />
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] disabled:active:scale-100 disabled:opacity-50 text-white font-semibold rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 text-sm select-none"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-white shrink-0" />
                    Generate Content
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Right Column - Results Area */}
        <section className="lg:col-span-3">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-xl h-full flex flex-col overflow-hidden min-h-[500px]">
            {/* Results Title bar */}
            <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/20 shrink-0">
              <h3 className="font-bold text-slate-200 text-sm tracking-wide">
                GENERATED CONTENT
              </h3>
              {result && (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400">
                    {wordCount} words
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-950 border border-slate-800/80 px-2.5 py-1.5 rounded-lg">
                    {user?.credits} Credits Remaining
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg transition select-none cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Content Display Body */}
            <div className="flex-1 p-6 overflow-y-auto relative flex flex-col justify-center">
              {errorMsg && (
                <div className="flex items-start gap-3 bg-red-950/40 border border-red-800/50 p-4 rounded-xl text-red-200 text-sm max-w-md mx-auto my-4 animate-fadeIn select-text">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
                  <h4 className="font-semibold text-slate-200">
                    Crafting Content...
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[250px]">
                    Calling OpenRouter AI. This might take a few seconds.
                  </p>
                </div>
              )}

              {!isGenerating && !result && !errorMsg && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center text-slate-600 mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-slate-400">
                    No Content Generated Yet
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
                    Fill in the configuration details on the left and click
                    Generate to begin.
                  </p>
                </div>
              )}

              {!isGenerating && result && (
                <div className="flex-1 w-full text-left select-text bg-slate-950/20 p-4 rounded-xl border border-slate-800/20 overflow-y-auto max-h-[600px]">
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 font-sans text-sm outline-none">
                    {result}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Generator;
