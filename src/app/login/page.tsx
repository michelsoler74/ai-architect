import React from 'react';
import LoginView from '@/components/auth/LoginView';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      {/* Fondo estético con gradientes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <LoginView />
      </div>
    </main>
  );
}
