import { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, Code2, Layout } from 'lucide-react';

interface LandingPageProps {
  onGenerate: (prompt: string) => void;
}

export default function LandingPage({ onGenerate }: LandingPageProps) {
  const [prompt, setPrompt] = useState('');

  const examples = [
    'A SaaS landing page for an AI writing tool',
    'A portfolio site for a photographer',
    'A pricing page for a fitness app',
    'An e-commerce store for coffee beans',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      if (prompt == null) {
        return
      }
      onGenerate(prompt.trim())
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">WebForge</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Examples</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative flex flex-col items-center justify-center px-6 pt-16 md:pt-28 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          AI-powered website builder
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight max-w-4xl leading-[1.1]">
          Describe it.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Watch it build itself.
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 text-center max-w-2xl">
          Type a prompt and get a fully structured website with real files, code, and a live file explorer — all in seconds.
        </p>

        {/* Prompt input */}
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-30 group-focus-within:opacity-60 transition-opacity duration-300" />
            <div className="relative flex items-center bg-slate-900 rounded-2xl border border-white/10">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the website you want to build..."
                className="flex-1 bg-transparent px-5 py-4 text-base text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="m-1.5 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-medium text-white hover:from-blue-400 hover:to-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Build
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Example prompts */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-2xl">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              className="px-3.5 py-1.5 text-sm text-slate-400 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-slate-200 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl">
          {[
            { icon: Wand2, title: 'Prompt to Project', desc: 'Describe what you want in plain English.' },
            { icon: Code2, title: 'Real File Explorer', desc: 'Browse generated files and source code.' },
            { icon: Layout, title: 'Step-by-Step Build', desc: 'Watch each build step execute live.' },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
