'use client';

import React from 'react';
import { HelpCircle, X, ShieldAlert, Target, Zap, TrendingDown } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-5 flex justify-between items-center z-10 rounded-t-2xl">
          <div className="flex flex-row items-center gap-3">
             <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400">
               <HelpCircle size={24} />
             </div>
             <h2 className="text-xl font-black text-white uppercase tracking-tight">Manual del Arquitecto</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8 text-slate-300">
          
          {/* Section 1: Cómo se Juega */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-sm"><Target size={18} /> ¿Cómo se juega?</h3>
            <p className="text-sm leading-relaxed">
              AI Architect es un simulador práctico para aprender <strong>"Prompt Engineering"</strong> (el arte de darle instrucciones efectivas a una Inteligencia Artificial). 
              En el <strong>Mapa de Habilidades</strong> encontrarás diferentes nodos. Cada nodo es un escenario real donde debes lograr que la IA realice una tarea escribiendo las instrucciones (Prompt) correctas en la Terminal.
            </p>
          </section>

          {/* Section 2: Reglas del Juego */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider text-sm"><ShieldAlert size={18} /> Reglas del Juego</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <strong>Sigue las Restricciones:</strong> Cada misión tiene "Reglas de Validación" estrictas. Por ejemplo, te pueden prohibir usar ciertas palabras clave.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <strong>Generación Dinámica:</strong> Cada vez que juegues, el sistema de IA inventará un escenario completamente nuevo para ti en tiempo real. ¡Nunca memorices una respuesta, enfócate en la técnica!
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <strong>Precisión:</strong> El resultado de la Inteligencia Artificial debe cumplir <em>exactamente</em> con el Objetivo marcado en pantalla.
              </li>
            </ul>
          </section>

          {/* Section 3: Cómo Ganar */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider text-sm"><Zap size={18} /> ¿Cómo se gana y avanza?</h3>
            <p className="text-sm leading-relaxed">
              Cuando ejecutas tu simulación, tu Prompt es enviado a múltiples IAs avanzadas de forma simultánea. Se evaluará gramática, adherencia a formato y si resolviste el problema. Si obtienes una <strong>calificación mayor a 50</strong> y cumples todas las reglas, pasarás la misión con éxito y ganarás Puntos de Experiencia (XP). Gana suficiente XP para competir en el <strong>Ranking Mundial de Arquitectos</strong>.
            </p>
          </section>

          {/* Section 4: Penalización de Puntos */}
          <section className="space-y-3 bg-red-950/20 p-4 border border-red-900/30 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px]" />
            <h3 className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-sm relative z-10"><TrendingDown size={18} /> Sistema de Pistas y Penalización</h3>
            <p className="text-sm leading-relaxed relative z-10 text-red-200/80">
              Si tu Prompt falla, se te permitirá reintentarlo gratis todas las veces que quieras. Sin embargo, si te quedas estancado, verás un botón que dice <strong>"¿En qué me equivoqué?"</strong>. 
            </p>
            <p className="text-sm leading-relaxed relative z-10 text-red-200/80 mt-2">
              Al usar esta opción para revelar la explicación de la IA y obtener una pista, el sistema automáticamente <strong>restará 50 puntos de XP</strong> de tu puntaje Global en el Ranking como penalización. ¡Usa este botón de ayuda sabiamente o perderás tu ventaja competitiva!
            </p>
          </section>

        </div>
        
        <div className="p-5 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-lg transition-colors"
          >
            Entendido, a jugar
          </button>
        </div>
      </div>
    </div>
  );
}
