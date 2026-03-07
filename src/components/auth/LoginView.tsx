'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, LogIn, Github, Chrome, Loader2, ArrowRight } from 'lucide-react';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = view === 'signin' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ 
          email, 
          password, 
          options: { emailRedirectTo: window.location.origin } 
        });

    if (authError) {
      setError(authError.message);
    } else if (view === 'signup') {
      alert('¡Revisa tu correo para confirmar tu cuenta!');
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) setError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
          <Chrome size={32} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Sesión Iniciada</h2>
          <p className="text-slate-400 text-sm mt-1">{user.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl mb-4">
          <LogIn className="text-emerald-500" size={32} />
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">AI Architect</h1>
        <p className="text-slate-400 text-sm mt-2 font-medium">
          {view === 'signin' ? 'Accede a tu cuenta de Arquitecto' : 'Empieza tu entrenamiento'}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <button 
          onClick={handleGoogleAuth}
          className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
        >
          <Chrome size={20} className="text-blue-500" />
          Continuar con Google
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900/50 px-2 text-slate-500 font-bold">O con correo</span>
        </div>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="email" 
              placeholder="tu-correo@ejemplo.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-600"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Contraseña</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-600"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl flex items-start gap-3">
             <AlertTriangle size={16} className="shrink-0 mt-0.5" />
             <p>{error}</p>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 mt-4"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : view === 'signin' ? 'Entrar Ahora' : 'Crear Cuenta'}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setView(view === 'signin' ? 'signup' : 'signin')}
          className="text-slate-400 hover:text-white text-sm font-medium transition-colors underline-offset-4 hover:underline"
        >
          {view === 'signin' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
}

function AlertTriangle(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      {...props}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  );
}
