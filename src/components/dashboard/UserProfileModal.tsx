'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentUsername: string;
  onUpdate: (newUsername: string) => void;
}

export default function UserProfileModal({ isOpen, onClose, userId, currentUsername, onUpdate }: UserProfileModalProps) {
  const [username, setUsername] = useState(currentUsername);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsername(currentUsername);
  }, [currentUsername]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setError(null);
    if (!username || username.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newUsername: username.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al actualizar el perfil');
      }

      onUpdate(username.trim());
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 pb-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <User size={20} />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Tu Perfil</h2>
          </div>
        </div>

        <div className="p-6 pt-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre de Arquitecto</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold tracking-tight focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Ej: Neuromancer"
            maxLength={20}
          />
          {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
          <p className="text-slate-500 text-[10px] uppercase mt-2">Así es como serás visto por los demás en el Salón del Arquitecto (Ranking) y en futuras competiciones.</p>

          <button 
            onClick={handleSave}
            disabled={loading || currentUsername === username.trim()}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 border border-emerald-500 text-white rounded-xl px-4 py-3 font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            {loading ? <span className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full block"/> : <><Save size={18} /> Guardar Cambios</>}
          </button>
        </div>

        {/* Zona de Peligro: Reinicio */}
        <div className="p-6 border-t border-slate-800 bg-red-950/20 mt-2 flex flex-col items-center text-center">
            <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">Zona de Peligro</h3>
            <p className="text-[10px] text-red-300/80 mb-4 px-2">
              Si quieres mejorar tus tiempos o tu puntuación en el Ranking desde cero, puedes borrar tu progreso. 
              <strong> Esto eliminará todo tu XP y bloqueará de nuevo el Mapa.</strong>
            </p>
            <button 
              onClick={async () => {
                if(window.confirm("¿Estás 100% seguro de que quieres borrar todo tu progreso y volver al Nivel 1? Esta acción NO se puede deshacer.")) {
                  setLoading(true);
                  try {
                    await fetch('/api/reset-progress', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId })
                    });
                    window.location.reload(); // Recargar la página limpia todo el estado
                  } catch (e) {
                    setError("Error al borrar el progreso.");
                    setLoading(false);
                  }
                }
              }}
              disabled={loading}
              className="text-red-400 hover:text-white hover:bg-red-600 border border-red-900/50 hover:border-red-500 px-4 py-2 font-bold uppercase text-[10px] rounded-lg transition-colors w-full"
            >
              Borrar mi Progreso y Reiniciar
            </button>
        </div>
      </div>
    </div>
  );
}
