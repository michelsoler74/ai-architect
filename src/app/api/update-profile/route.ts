import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { userId, newUsername } = await req.json();

    if (!userId || !newUsername) {
        return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    if (newUsername.length < 3 || newUsername.length > 20) {
        return NextResponse.json({ error: "El nombre debe tener entre 3 y 20 caracteres" }, { status: 400 });
    }

    const { error } = await supabase
      .from('profiles')
      .update({ username: newUsername })
      .eq('id', userId);

    if (error) {
        if (error.code === '23505') { // postgres unique violation
            return NextResponse.json({ error: "Este nombre ya está en uso. ¡Elige otro!" }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
