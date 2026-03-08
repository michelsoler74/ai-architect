# Guía de Contribución: AI Architect

¡Gracias por tu interés en **AI Architect**! Este simulador de *Prompt Engineering* no sería lo mismo sin la ayuda y el conocimiento estructurado de la comunidad. 

Queremos asegurarnos de que contribuir al código fuente y a las misiones sea tan divertido como jugar.

## 🧩 Cómo participar
Si quieres reportar un problema, proponer una nueva característica o un nuevo "Nodo" (escenario de Prompt Engineering), sigue los pasos a continuación.

### 🐛 Reportar Bugs (Errores)
1. Antes de crear un *Issue*, **comprueba que no exista uno similar**.
2. Dale a "New Issue" en la pestaña de Issues.
3. Proporciona toda la información necesaria:
   - Pasos para reproducir.
   - El resultado esperado frente al resultado actual de la simulación.
   - Capturas de pantalla (opcional pero muy agradecido).

### 🚀 Nuevos Desafíos / Nodos de Entrenamiento
Nos encanta que el "Árbol de Habilidades" (*Skill Tree*) crezca. Si tienes un escenario increíble sobre Jailbreak, Format Extraction, o Personificación de IAs:
1. Crea un Issue del tipo "Idea de Nodo".
2. Incluye:
   - `Title` (ej: "La Sombra del Prompt").
   - `Rules` (ej: "No puedes decir la contraseña secreta").
   - `Input Data` (Los datos base que la IA consumirá).
   - `Success Criteria` (Qué tiene que revisar groq/Llama3 para dar por buena la respuesta).

---

## 💻 Entorno de Desarrollo
Para aportar código, sigue este flujo estándar:

1. **Fork** el repositorio.
2. Clónalo localmente: `git clone https://github.com/TU_USUARIO/ai-architect.git`
3. Instala las dependencias: `npm install`
4. Crea una nueva rama que describa el cambio: `git checkout -b feat/nueva-mision-de-roles` o `fix/bug-en-evaluador`.

### 🚨 Reglas de Estilo para Pull Requests
- Usamos la convención de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
  - `feat: añade un nuevo botón de ayuda`
  - `fix: resuelve el cuelgue al evualar en Groq`
  - `docs: actualiza el README.md`
- **Linting:** Asegúrate de que `npm run lint` pasa exitosamente antes de abrir la PR.
- Documenta en la Pull Request qué y POR QUÉ has cambiado o añadido tal lógica.

### 🧪 API & Backend Local
Si tocas la carpeta `src/app/api/...` ten en cuenta que el simulador realiza llamadas concurrentes a **OpenRouter** y **Groq**. 
Asegúrate de no dejar "Keys" expuestas ni subir `.env.local`.

---

¡Disfruta construyendo la mente de los nuevos usuarios de Inteligencia Artificial! 🚀
