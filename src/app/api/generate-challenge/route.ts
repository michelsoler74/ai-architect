import { NextResponse } from 'next/server';
import { generateChallenge } from '@/lib/llm/challenge-generator';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nodeId = searchParams.get('nodeId') || 'node-1';
  const difficulty = parseInt(searchParams.get('difficulty') || '1');

  try {
    const challenge = await generateChallenge(nodeId, difficulty);
    return NextResponse.json({ success: true, challenge });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
