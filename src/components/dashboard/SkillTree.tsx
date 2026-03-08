'use client';

import React from 'react';
import { Lock, CheckCircle2, Play, Star, ChevronRight } from 'lucide-react';

export type SkillNode = {
  id: string;
  title: string;
  description: string;
  level: number;
  status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED';
  position: { x: number; y: number };
};

const INITIAL_NODES: SkillNode[] = [
  {
    id: 'node-1',
    title: 'El Arquitecto Restringido',
    description: 'DOMINIO DE DATOS: Extracción pura y control léxico.',
    level: 1,
    status: 'UNLOCKED',
    position: { x: 0, y: 0 }
  },
  {
    id: 'node-2',
    title: 'La Sombra del Prompt',
    description: 'SEGURIDAD: Defensa contra inyecciones y ataques.',
    level: 2,
    status: 'LOCKED',
    position: { x: -200, y: 100 }
  },
  {
    id: 'node-3',
    title: 'Razonamiento en Cadena',
    description: 'LÓGICA: Pensamiento estructurado y CoT.',
    level: 2,
    status: 'LOCKED',
    position: { x: 200, y: 100 }
  },
  {
    id: 'node-5',
    title: 'Control de Estructura',
    description: 'FORMATO: Salidas JSON/XML perfectas bajo presión.',
    level: 3,
    status: 'LOCKED',
    position: { x: -100, y: 200 }
  },
  {
    id: 'node-6',
    title: 'Aprendizaje Few-Shot',
    description: 'PATRONES: Enseñar nuevos conceptos con ejemplos.',
    level: 3,
    status: 'LOCKED',
    position: { x: 100, y: 200 }
  },
  {
    id: 'node-4',
    title: 'Arquitectura de Agentes',
    description: 'CUMBRE: Orquestación de personalidades y herramientas.',
    level: 4,
    status: 'LOCKED',
    position: { x: 0, y: 300 }
  }
];

interface SkillTreeProps {
  onSelectNode: (nodeId: string) => void;
  completedNodes: string[];
  nodeLevels?: Record<string, number>;
}

export default function SkillTree({ onSelectNode, completedNodes, nodeLevels = {} }: SkillTreeProps) {
  return (
    <div className="relative w-full py-12 px-4 select-none">
      {/* Background Grid Aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-20">
          
          {/* Tier 1: Iniciación */}
          <div className="relative">
            <h3 className="text-center text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-6">Fase 1: El Despertar</h3>
            {INITIAL_NODES.filter(n => n.level === 1).map(node => (
              <NodeCard 
                key={node.id} 
                node={node} 
                isCompleted={completedNodes.includes(node.id)}
                levelCount={nodeLevels[node.id] || 0}
                onClick={() => onSelectNode(node.id)} 
              />
            ))}
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] h-20 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 400 80" fill="none">
                 <path d="M200 0V20C200 35 180 40 160 40H40C20 40 0 45 0 60V80" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                 <path d="M200 0V20C200 35 220 40 240 40H360C380 40 400 45 400 60V80" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
               </svg>
            </div>
          </div>

          {/* Tier 2: Especialización */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 w-full px-8 relative">
            {INITIAL_NODES.filter(n => n.level === 2).map(node => (
              <div key={node.id} className="relative flex flex-col items-center">
                <h3 className={`text-center text-[10px] font-black uppercase tracking-widest mb-6 ${node.id === 'node-2' ? 'text-red-500' : 'text-purple-500'}`}>
                   {node.id === 'node-2' ? 'Senda de Seguridad' : 'Senda de la Razón'}
                </h3>
                <NodeCard 
                  node={node} 
                  isLocked={!completedNodes.includes('node-1')}
                  isCompleted={completedNodes.includes(node.id)}
                  levelCount={nodeLevels[node.id] || 0}
                  onClick={() => onSelectNode(node.id)} 
                />
                
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] h-20 pointer-events-none">
                   <svg className="w-full h-full" viewBox="0 0 200 80" fill="none">
                     <path d={node.id === 'node-2' ? "M100 0V40H200V80" : "M100 0V40H0V80"} stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                     <path d={node.id === 'node-2' ? "M100 0V40H0V80" : "M100 0V40H200V80"} stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                   </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Tier 3: Tecnologías Avanzadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl px-8 relative">
            {INITIAL_NODES.filter(n => n.level === 3).map(node => (
              <div key={node.id} className="relative flex flex-col items-center">
                 <h3 className="text-center text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">Técnica Avanzada</h3>
                 <NodeCard 
                    node={node} 
                    isLocked={!completedNodes.includes('node-2') && !completedNodes.includes('node-3')}
                    isCompleted={completedNodes.includes(node.id)}
                    levelCount={nodeLevels[node.id] || 0}
                    onClick={() => onSelectNode(node.id)} 
                 />
                 <div className="absolute top-full left-1/2 -translate-x-1/2 w-[100px] h-20 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 80" fill="none">
                       <path d={node.id === 'node-5' ? "M50 0V40H100V80" : "M50 0V40H0V80"} stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                 </div>
              </div>
            ))}
          </div>

          {/* Tier 4: Maestría Final */}
          <div className="relative mt-8">
            <h3 className="text-center text-[10px] font-black text-amber-500 uppercase tracking-widest mb-6">Cumbre del Arquitecto</h3>
            {INITIAL_NODES.filter(n => n.level === 4).map(node => (
              <NodeCard 
                key={node.id} 
                node={node} 
                isLocked={!completedNodes.includes('node-5') && !completedNodes.includes('node-6')}
                isCompleted={completedNodes.includes(node.id)}
                levelCount={nodeLevels[node.id] || 0}
                onClick={() => onSelectNode(node.id)} 
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function NodeCard({ node, onClick, isLocked = false, isCompleted = false, levelCount = 0 }: { 
    node: SkillNode, 
    onClick: () => void, 
    isLocked?: boolean,
    isCompleted?: boolean,
    levelCount?: number
}) {
  const status = isCompleted ? 'COMPLETED' : isLocked ? 'LOCKED' : 'UNLOCKED';
  const displayDifficulty = levelCount + 1;

  return (
    <div 
      onClick={!isLocked ? onClick : undefined}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 transform ${
        status === 'COMPLETED' 
          ? 'bg-emerald-500/5 border-emerald-500/30' 
          : status === 'LOCKED'
          ? 'bg-slate-900/50 border-slate-800 opacity-60 cursor-not-allowed'
          : 'bg-slate-900 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 cursor-pointer hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/10'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${
            status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 
            status === 'LOCKED' ? 'bg-slate-800 text-slate-500' : 'bg-cyan-500/20 text-cyan-400'
        }`}>
          {status === 'COMPLETED' ? <CheckCircle2 size={24} /> : 
           status === 'LOCKED' ? <Lock size={24} /> : <Play size={24} />}
        </div>
        {status === 'COMPLETED' && (
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1 text-emerald-500">
               <Star size={12} fill="currentColor" />
               <Star size={12} fill="currentColor" />
               <Star size={12} fill="currentColor" />
            </div>
            <div className="text-[9px] font-black tracking-widest uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">
              Dificultad: {displayDifficulty}
            </div>
          </div>
        )}
      </div>

      <h4 className={`font-bold text-lg mb-1 ${status === 'LOCKED' ? 'text-slate-500' : 'text-white group-hover:text-cyan-400 transition-colors'}`}>
        {node.title}
      </h4>
      <p className="text-slate-400 text-xs leading-relaxed">
        {node.description}
      </p>

      {!isLocked && (
        <div className={`mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 ${status === 'COMPLETED' ? 'text-emerald-500' : 'text-cyan-500'}`}>
          {status === 'COMPLETED' ? 'Subir de Nivel' : 'Iniciar Misión'} <ChevronRight size={12} />
        </div>
      )}
    </div>
  );
}
