import { groq } from '@/lib/llm/groq';

export type DynamicChallenge = {
  id: string;
  title: string;
  description: string;
  hint?: string;
  rules: string[];
  inputData: string;
  successCriteria: string;
  topic: string;
};

const CHALLENGE_TEMPLATES: Record<string, string> = {
  'node-1': 'Genera un ejercicio de extracción de datos. Dificultad {DIFF}/10. {LEVEL_DESC}. Objetivo: Extraer información sin usar palabras prohibidas. En el "hint", explica de forma didáctica cuál es la dificultad o trampa del texto a procesar.',
  'node-2': 'Genera un ejercicio de seguridad (Prompt Injection). Dificultad {DIFF}/10. {LEVEL_DESC}. En el "hint", explica de forma didáctica el vector de ataque oculto o por qué puede fallar el modelo.',
  'node-3': 'Genera un ejercicio de razonamiento (Chain of Thought). Dificultad {DIFF}/10. {LEVEL_DESC}. En el "hint", explica de forma didáctica por qué el usuario debe usar pasos lógicos y qué problema se busca evitar.',
  'node-5': 'Genera un ejercicio de Control de Estructura. Dificultad {DIFF}/10. {LEVEL_DESC}. En el "hint", explica de forma didáctica qué parte de los datos intenta romper o corromper el formato.',
  'node-6': 'Genera un ejercicio de Few-Shot Learning. Dificultad {DIFF}/10. {LEVEL_DESC}. En el "hint", explica de forma didáctica la mecánica e importancia de usar pocos ejemplos exactos.',
  'node-4': 'Genera un ejercicio de Arquitectura de Agentes. Dificultad {DIFF}/10. {LEVEL_DESC}. En el "hint", explica de forma didáctica el conflicto entre objetivos o roles dados.'
};

const getLevelDescription = (difficulty: number) => {
  if (difficulty <= 20) return "Nivel Iniciado: Instrucciones claras, poco ruido léxico.";
  if (difficulty <= 40) return "Nivel Especialista: Incluye distracciones semánticas y restricciones moderadas.";
  if (difficulty <= 60) return "Nivel Experto: El contexto es denso, usa técnicas de ofuscación y requiere precisión absoluta.";
  if (difficulty <= 85) return "Nivel Maestro: Ataques de ingeniería social sutiles, acertijos multinivel y paradojas.";
  return "Nivel Arquitecto Legendario: Desafíos casi imposibles que requieren una estructura de prompt perfecta para no ser engañado.";
};

export async function generateChallenge(nodeId: string, difficulty: number = 1): Promise<DynamicChallenge> {
  const levelDesc = getLevelDescription(difficulty);
  const basePrompt = (CHALLENGE_TEMPLATES[nodeId] || CHALLENGE_TEMPLATES['node-1'])
    .replace('{DIFF}', difficulty.toString())
    .replace('{LEVEL_DESC}', levelDesc);

  const prompt = `
    Eres el "Arquitecto Supremo de Niveles" para un simulador de Prompt Engineering Profesional.
    Tu misión es crear un desafío nivel ${difficulty}/100.
    
    ${basePrompt}
    
    IMPORTANTE: El campo "description" debe centrarse en el contexto lúdico del desafío. El campo "hint" DEBE explicarle al jugador el POR QUÉ del desafío y CUÁL es el ataque o trampa de forma MUY clara, explícita y didáctica (sin darle la respuesta).

    FORMATO DE RESPUESTA (JSON estricto):
    {
      "title": "Nombre del nivel",
      "description": "El contexto narrativo o introductorio de la misión.",
      "hint": "Explicación MUY CLARA de la amenaza o trampa del reto y el razonamiento para que el jugador entienda qué está pasando de forma didáctica.",
      "rules": ["Regla 1", "Regla 2..."],
      "inputData": "El contenido literal que el usuario enviaría para el ataque/reto.",
      "successCriteria": "Qué debe lograr exactamente el estudiante.",
      "secret": "..."
    }
  `;

  try {
    // Si la dificultad es > 50, usamos modelos mas pesados
    let content = "";
    
    if (difficulty > 50) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "z-ai/glm-4.5-air:free",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      content = data.choices[0]?.message?.content || "{}";
    } else {
      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: "llama-3.1-8b-instant",
        response_format: { type: "json_object" }
      });
      content = response.choices[0]?.message?.content || "{}";
    }

    const data = JSON.parse(content);

    return {
      id: nodeId,
      title: typeof data.title === 'string' ? data.title : JSON.stringify(data.title || "Misión Generada"),
      description: typeof data.description === 'string' ? data.description : JSON.stringify(data.description || "Descripción de la misión."),
      hint: typeof data.hint === 'string' ? data.hint : undefined,
      rules: Array.isArray(data.rules) ? data.rules.map(String) : [String(data.rules || "No usar palabras prohibidas típicas.")],
      inputData: typeof data.inputData === 'string' ? data.inputData : JSON.stringify(data.inputData || "Datos de prueba."),
      successCriteria: typeof data.successCriteria === 'string' ? data.successCriteria : JSON.stringify(data.successCriteria || "Éxito basado en precisión."),
      topic: nodeId
    };
  } catch (error) {
    console.error("Error generating challenge:", error);
    // Fallback estático si falla la IA
    return {
      id: nodeId,
      title: "Misión de Emergencia",
      description: "Error al conectar con el Arquitecto de Niveles.",
      hint: "Concéntrate en el objetivo principal predeterminado.",
      rules: ["Regla estándar."],
      inputData: "Data error.",
      successCriteria: "Error",
      topic: nodeId
    };
  }
}
