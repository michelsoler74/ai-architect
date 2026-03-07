import { OpenAI } from 'openai';

// Cliente de OpenAI configurado para usar base URL de OpenRouter
export const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || 'dummy_key', // Se requerirá luego, o BYOK
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000', // Required for OpenRouter rankings
    'X-Title': 'The AI Architect', // Required for OpenRouter rankings
  },
});

export async function compareModels(prompt: string, models: string[]) {
  const promises = models.map(async (model) => {
    const start = Date.now();
    try {
      const completion = await openrouter.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });
      const latencyMs = Date.now() - start;
      
      return {
        provider: 'OpenRouter',
        model: model,
        response: completion.choices[0]?.message?.content || '',
        latencyMs,
        tokensUsed: completion.usage?.total_tokens || 0,
        score: 0 // To be evaluated by Groq later
      };
    } catch (e: any) {
        return {
            provider: 'OpenRouter',
            model: model,
            response: `Error: ${e.message}`,
            latencyMs: Date.now() - start,
            tokensUsed: 0,
            score: 0
        }
    }
  });

  return Promise.all(promises);
}
