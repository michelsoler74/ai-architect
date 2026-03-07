import Groq from "groq-sdk";

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Helper function to call Groq models quickly
export async function testLLM(prompt: string) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant", // Modelo rápido
    });
    return chatCompletion.choices[0]?.message?.content || "";
}

export async function compareModels(prompt: string, models: string[]) {
  const promises = models.map(async (model) => {
    const start = Date.now();
    try {
      const completion = await groq.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });
      const latencyMs = Date.now() - start;
      
      return {
        provider: 'Groq',
        model: model,
        response: completion.choices[0]?.message?.content || '',
        latencyMs,
        tokensUsed: completion.usage?.total_tokens || 0,
        score: 0 
      };
    } catch (e: any) {
        return {
            provider: 'Groq',
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
