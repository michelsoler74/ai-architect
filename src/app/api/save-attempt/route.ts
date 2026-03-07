import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { prompt, results, challengeId = 'node-1', userId, difficulty = 1 } = await req.json();

    if (!prompt || !results) {
        return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Buscamos el mejor resultado (el que tenga mayor score y sea successful)
    // Para simplificar, asumimos que evaluamos el mejor intento
    const bestResult = results.reduce((prev: any, current: any) => 
        (current.score > prev.score) ? current : prev
    , results[0]);


    // Insertamos el intento en la tabla 'ai_logs' que ya tienes creada
    const { data: attemptData, error: attemptError } = await supabase
      .from('ai_logs')
      .insert([
        { 
          user_id: userId || null, 
          prompt: prompt,
          response: bestResult.response,
          model_used: bestResult.model,
          challenge_id: challengeId // Usaremos este campo para saber qué nivel se completó
        }
      ])
      .select();

    if (attemptError) {
      console.error("Supabase Insert Error:", attemptError);
      return NextResponse.json({ error: attemptError.message }, { status: 500 });
    }

    // Si hay un usuario logueado, actualizamos sus puntos de XP y su record de dificultad
    if (userId) {
      const xpGained = Math.round((bestResult.score || 0) * (difficulty / 2));
      
      // Intentamos actualizar el perfil. Usamos RPC o una consulta directa.
      // Aquí actualizamos el total_xp y el récord del nodo específico.
      const nodeField = challengeId.replace('-', '_'); // ej: node_1
      const highestDiffKey = `highest_difficulty_${nodeField}`;

      // 1. Obtenemos datos actuales del perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_xp')
        .eq('id', userId)
        .single();
      
      if (profile) {
        await supabase
          .from('profiles')
          .update({ 
            total_xp: profile.total_xp + xpGained,
            [highestDiffKey]: difficulty // Podríamos poner un Math.max aquí si quisiéramos
          })
          .eq('id', userId);
      }
    }

    return NextResponse.json({ success: true, attempt: attemptData });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
