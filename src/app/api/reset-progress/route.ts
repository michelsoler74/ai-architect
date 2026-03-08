import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
        return NextResponse.json({ error: "Falta ID de usuario" }, { status: 400 });
    }

    // 1. Resetear XP en Perfiles
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ total_xp: 0 })
      .eq('id', userId);

    if (profileError) {
        return NextResponse.json({ error: "Error al resetear perfil: " + profileError.message }, { status: 500 });
    }

    // 2. Borrar todo el historial de misiones del usuario
    const { error: logsError } = await supabase
      .from('ai_logs')
      .delete()
      .eq('user_id', userId);

    if (logsError) {
        return NextResponse.json({ error: "Error al limpiar progreso: " + logsError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
