import React from 'react';
import LoginView from '@/components/auth/LoginView';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      {/* Fondo estético con la nueva imagen y gradientes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-[url('/bg-michel.jpg')] bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-1000 mix-blend-screen"
        />
        {/* Capa de oscurecimiento (viñeta y cristal) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 backdrop-blur-[2px]" />
        
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full flex justify-center mt-12">
        <LoginView />
      </div>
    </main>
  );
}
