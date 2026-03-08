import { NextResponse } from 'next/server';
import { groq } from '@/lib/llm/groq';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { prompt, result, challengeId, dynamicChallenge, userId } = await req.json();

    if (!prompt || !result || !userId) {
      return NextResponse.json({ error: "Faltan datos requeridos o usuario no logueado" }, { status: 400 });
    }

    // 1. Deduct points
    const xpPenalty = 50; // Quita 50 XP por pedir ayuda
    
    // Obtener perfil actual
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_xp')
      .eq('id', userId)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({ 
          total_xp: Math.max(0, (profile.total_xp || 0) - xpPenalty) 
        })
        .eq('id', userId);
    }

    // 2. Generar explicación con LLM
    const explanationPrompt = `
      Eres un Arquitecto de Prompt Engineering nivel experto.
      El usuario ha fallado el desafío "${dynamicChallenge?.title || challengeId}".
      Reglas del desafío: ${dynamicChallenge?.rules?.join(', ')}
      Objetivo: ${dynamicChallenge?.successCriteria}
      
      El prompt que usó el usuario fue:
      "${prompt}"
      
      La respuesta generada por el LLM fue calificada como fallida.
      
      Por favor, en MÁXIMO 3 párrafos cortos:
      1. Explica qué hizo mal en su prompt (por qué falló dadas las reglas/objetivo).
      2. Dale una pista MUY directa o un ejemplo corto de cómo estructurar su prompt correctamente (sin darle el texto exacto, pero siendo muy útil).
      
      Responde en texto plano amigable.
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: explanationPrompt }],
      model: "llama-3.1-8b-instant",
    });

    const explanation = response.choices[0]?.message?.content || "No se pudo generar la explicación.";

    return NextResponse.json({ success: true, explanation, penalty: xpPenalty });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
