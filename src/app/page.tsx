'use client';

import React, { useState, useEffect } from 'react';
import MissionPanel from "@/components/mission/MissionPanel";
import SkillTree from "@/components/dashboard/SkillTree";
import { supabase } from '@/lib/supabase';
import { LayoutGrid, Map, User, Trophy, BarChart3, HelpCircle } from 'lucide-react';
import Leaderboard from '@/components/dashboard/Leaderboard';
import HelpModal from '@/components/dashboard/HelpModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'map' | 'mission' | 'ranking'>('map');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [nodeLevels, setNodeLevels] = useState<Record<string, number>>({});
  const [user, setUser] = useState<any>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProgress(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProgress(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProgress = async (userId: string) => {
    // Consultamos todos los logs del usuario para ver qué desafíos ha intentado con éxito
    const { data } = await supabase
      .from('ai_logs')
      .select('challenge_id')
      .eq('user_id', userId);

    if (data && data.length > 0) {
      // Extraemos los IDs únicos y contamos su frecuencia
      const counts: Record<string, number> = {};
      const idsCompeticion: string[] = [];
      
      data.forEach(log => {
        if (log.challenge_id) {
          idsCompeticion.push(log.challenge_id);
          counts[log.challenge_id] = (counts[log.challenge_id] || 0) + 1;
        }
      });
      
      const uniqueIds = Array.from(new Set(idsCompeticion));
      setCompletedNodes(uniqueIds);
      setNodeLevels(counts);
    }
  };

  const handleSelectNode = (nodeId: string) => {
    setSelectedNode(nodeId);
    setActiveTab('mission');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Imagen de fondo sutil */}
        <div className="absolute inset-0 bg-[url('/bg-michel.jpg')] bg-cover bg-center bg-fixed opacity-15 mix-blend-screen" />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />

        {/* Luces decorativas */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col gap-8">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800/50 pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              AI ARCHITECT <span className="text-emerald-500 font-mono text-sm ml-2 tracking-widest">v0.1</span>
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Ecosistema de Aprendizaje Prompt Engineering</p>
          </div>

          <nav className="flex bg-slate-900/50 backdrop-blur-md p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => {
                setActiveTab('map');
                if (user) fetchProgress(user.id);
              }}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'map' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map size={18} /> Progreso
            </button>
            <button 
              onClick={() => setActiveTab('ranking')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'ranking' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 size={18} /> Ranking
            </button>
            <button 
              onClick={() => setActiveTab('mission')}
              disabled={!selectedNode}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'mission' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white disabled:opacity-30'
              }`}
            >
              <Trophy size={18} /> Misión
            </button>
          </nav>

          <div className="flex items-center gap-4">
             {user ? (
               <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
                 <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                   <User size={18} />
                 </div>
                 <div className="hidden sm:block">
                   <p className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Arquitecto</p>
                   <p className="text-[10px] font-bold text-white max-w-[100px] truncate">{user.email}</p>
                 </div>
               </div>
             ) : (
               <a href="/login" className="bg-white text-slate-950 px-6 py-2 rounded-lg font-black text-xs uppercase transition-transform active:scale-95">
                 Entrar
               </a>
             )}
             <button
               onClick={() => setIsHelpOpen(true)}
               className="bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-4 py-2 rounded-lg font-bold text-[10px] uppercase transition-all flex items-center gap-2"
               title="Guía y Reglas del Juego"
             >
               <HelpCircle size={16} /> <span className="hidden sm:inline">Guía</span>
             </button>
          </div>
        </header>

        <div className="min-h-[60vh] animate-in fade-in duration-700">
          {activeTab === 'map' ? (
            <SkillTree onSelectNode={handleSelectNode} completedNodes={completedNodes} nodeLevels={nodeLevels} />
          ) : activeTab === 'ranking' ? (
            <Leaderboard />
          ) : (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <MissionPanel activeNodeId={selectedNode || 'node-1'} />
              <div className="mt-8 flex justify-center">
                 <button 
                  onClick={() => {
                    setActiveTab('map');
                    if (user) fetchProgress(user.id);
                  }}
                  className="text-slate-500 hover:text-white text-sm font-bold flex items-center gap-2"
                 >
                   Regresar al Mapa de Habilidades
                 </button>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-slate-600">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Code & Prompt by Antigravity Agent</p>
        </footer>

        <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      </div>
    </main>
  );
}
