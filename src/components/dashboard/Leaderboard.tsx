'use client';

import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Crown, User, ArrowUpCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LeaderboardUser {
  id: string;
  username: string;
  total_xp: number;
}

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, total_xp')
        .order('total_xp', { ascending: false })
        .limit(10);

      if (!error && data) {
        setUsers(data as LeaderboardUser[]);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Salón del Arquitecto_</h2>
            <p className="text-cyan-100 text-xs font-bold opacity-80 uppercase tracking-widest mt-1">Top Engineering Professionals</p>
          </div>
          <Trophy className="text-white/30" size={48} />
        </div>

        {/* List */}
        <div className="p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
              <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">Sincronizando Ranking...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user, index) => (
                <div 
                  key={user.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                    index === 0 
                      ? 'bg-amber-500/5 border-amber-500/20 ring-1 ring-amber-500/20' 
                      : index === 1
                      ? 'bg-slate-800/50 border-slate-700'
                      : index === 2
                      ? 'bg-orange-900/5 border-orange-500/10'
                      : 'bg-slate-950/40 border-slate-900'
                  }`}
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {index === 0 ? <Crown className="text-amber-500" size={24} /> :
                     index === 1 ? <Medal className="text-slate-400" size={24} /> :
                     index === 2 ? <Medal className="text-orange-600" size={24} /> :
                     <span className="text-slate-600 font-mono font-black">{index + 1}</span>}
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <User className="text-slate-400" size={20} />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-white font-black text-sm tracking-tight truncate">
                      {user.username.split('@')[0]}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 rounded-full" 
                          style={{ width: `${Math.min(100, (user.total_xp / 10000) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Maestría</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm italic">
                      {user.total_xp.toLocaleString()} <span className="text-[10px] uppercase not-italic">XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                      <ArrowUpCircle size={10} className="text-cyan-500" /> Professional Level
                    </div>
                  </div>
                </div>
              ))}

              {users.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Aún no hay arquitectos en el ranking</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="bg-slate-950/60 p-4 border-t border-slate-800 text-center">
           <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">Los datos se actualizan en tiempo real</p>
        </div>
      </div>
    </div>
  );
}
