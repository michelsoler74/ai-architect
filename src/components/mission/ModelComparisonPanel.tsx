'use client';

import React from 'react';
import { Bot, Zap, Clock, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export interface ModelResponse {
  provider: string;
  model: string;
  response: string;
  latencyMs: number;
  tokensUsed: number;
  score: number;
  isSuccess?: boolean;
}

interface ComparisonPanelProps {
  userPrompt: string;
  responses: ModelResponse[];
}

export default function ModelComparisonPanel({ userPrompt, responses }: ComparisonPanelProps) {
  if (!responses || responses.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 w-full p-6 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-2xl mt-8">
      
      {/* Header del panel */}
      <div className="pb-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Laboratorio de Modelos
          </h2>
          <p className="text-sm text-slate-400 mt-1">Comparando el mismo prompt en distintos LLMs gratuitos.</p>
        </div>
        <div className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-mono border border-slate-700 w-full md:w-auto">
          <span className="text-emerald-400 font-semibold">Prompt: </span>
          <span className="text-slate-300 truncate max-w-xs inline-block align-bottom">{userPrompt}</span>
        </div>
      </div>

      {/* Grid de Modelos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {responses.map((res, index) => (
          <div key={index} className="flex flex-col bg-slate-950 rounded-lg p-5 border border-slate-800 hover:border-cyan-500/50 transition-colors group h-full">
            
            {/* Cabecera del Modelo */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Bot className={res.provider === 'Groq' || res.model.includes('llama') ? 'text-emerald-500' : 'text-purple-500'} />
                <h3 className="font-bold text-sm truncate max-w-[200px]" title={res.model}>{res.model}</h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 shrink-0">
                <div className="flex items-center gap-1" title="Latencia"><Clock size={12}/> {res.latencyMs}ms</div>
              </div>
            </div>

            {/* Salida Generada con streaming simulado */}
            <div className="flex-1 bg-slate-900 rounded border border-slate-800 p-4 mb-4 font-mono text-sm overflow-y-auto max-h-64 leading-relaxed whitespace-pre-wrap">
              {res.response}
            </div>

            {/* Panel de Evaluación */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Resuelto:</span>
                  <div className="flex items-center gap-2">
                      {res.isSuccess ? <CheckCircle className="text-emerald-500" size={16}/> : <XCircle className="text-red-500" size={16}/>}
                  </div>
                </div>
                {res.score > 0 && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs uppercase tracking-wider text-slate-500">Semantic Score</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      res.score > 85 ? 'bg-emerald-500/20 text-emerald-400' : 
                      res.score > 60 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {res.score}/100
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback del Tutor basado en la variabilidad */}
      <div className="mt-2 bg-blue-950/30 border border-blue-900/50 p-4 rounded-lg flex items-start gap-4">
        <ShieldAlert className="text-blue-400 shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-blue-400 text-sm">💡 Observación del Arquitecto ("Sage")</h4>
          <p className="text-sm text-blue-200/80 mt-1 leading-relaxed">
            Revisa cómo modelos diferentes interpretan el mismo prompt. Al depender de LLMs menos parametrizados o sin un fine-tuning severo, tu prompt debe ser extremadamente preciso, directo y sin ambigüedades.
          </p>
        </div>
      </div>
      
    </div>
  );
}
