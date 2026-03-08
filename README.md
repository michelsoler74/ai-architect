# 🧠 AI Architect

<div align="center">
  <img src="https://raw.githubusercontent.com/michelsoler74/ai-architect/main/public/bg-michel.jpg" alt="AI Architect" width="600" />
</div>

<br/>

<div align="center">
  <strong>El simulador práctico definitivo para aprender y dominar el Prompt Engineering.</strong>
</div>
<div align="center">
  Supera misiones dinámicas, compite en el Salón del Arquitecto y perfecciona tus habilidades de comunicación con LLMs.
</div>

<br/>

<div align="center">
  <a href="#características">Características</a> •
  <a href="#tecnologías-utilizadas">Tecnologías</a> •
  <a href="#instalación-en-local">Cómo empezar</a> •
  <a href="#estructura-del-juego">Mecánicas</a> •
  <a href="#contribuir">Contribuir</a>
</div>

## 👀 Sobre el Proyecto

**AI Architect** es una plataforma gamificada de código abierto diseñada para enseñar *Prompt Engineering* a través de la práctica directa. Se acabó leer tutoriales teóricos; aquí debes enfrentarte a escenarios generados dinámicamente y evaluados en tiempo real por un LLM-as-a-judge asíncrono.

El proyecto nace con el objetivo de dotar a estudiantes, desarrolladores y curiosos de un espacio de entrenamiento iterativo, con métricas, penalizaciones, niveles de dificultad crecientes y un ranking global para fomentar la competitividad sana.

---

## ✨ Características

- 🎮 **Misiones Dinámicas y Procedurales:** El sistema de IA inventa problemas diferentes en cada intento. ¡No hay respuestas memorizables!
- ⚖️ **Evaluación "LLM as a judge" (Groq Paralelo):** Tus prompts se prueban contra potentes *modelos free-tier* de OpenRouter (Nemotron, Gemma) y un modelo estricto de LLaMA3 en Groq evalúa el rendimiento semántico y el éxito del prompt en paralelo, erradicando los cuellos de botella de red.
- 🌳 **Árbol de Habilidades (Skill Tree):** Progresión no lineal. A medida que vences un nodo, la dificultad intrínseca sube un nivel.
- 📉 **Sistema de Riesgo / XP:** Puedes consultar pistas a la IA, pero el sistema aplicará un "impuesto de -50 XP" permanente en tu clasificación global para fomentar la autosuficiencia técnica.
- 🏆 **Salón del Arquitecto (Ranking Global):** Tabla de clasificación persistente en Supabase conectada en tiempo real.
- 💅 **Look & Feel Inmersivo (Cyberpunk / Terminal):** Modo oscuro extremo enfocado al código, micro-animaciones HUD retrofuturistas y personalización de Avatares.

---

## 💻 Tecnologías Utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) 15 (App Router), React, TailwindCSS, Lucide Icons.
- **Backend / API:** Next.js Serverless Routes.
- **Base de Datos & Auth:** [Supabase](https://supabase.com/).
- **Modelería Inteligente:** [OpenRouter API](https://openrouter.ai/) (Inferencia Multi-Modelo) y [Groq](https://groq.com/) (LLaMA3 rápido para métricas y evaluaciones).

---

## 🚀 Instalación en Local

Sigue estos pasos si deseas ejecutar una copia de AI Architect en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/michelsoler74/ai-architect.git
cd ai-architect
```

### 2. Instalar las dependencias
```bash
npm install
```

### 3. Configurar Entorno
Renombra el archivo `.env.local.example` a `.env.local` (si no existe, créalo) y añade tus claves de API:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
OPENROUTER_API_KEY=tu_clave_de_openrouter
GROQ_API_KEY=tu_clave_de_groq
```

### 4. Lanzar el Servidor de Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la consola del Arquitecto.

---

## 📖 Estructura del Juego (Nodos)

Cada "Nodo" en el mapa de misiones enseña un pilar clave del *Prompt Engineering*:
1. **El Arquitecto Restringido:** Extracción estricta de variables (JSON/Data) sin usar palabras prohibidas.
2. **La Sombra del Prompt:** Detectar y evadir técnicas maliciosas como el *Jailbreak* y el *Prompt Injection*.
3. **Razonamiento en Cadena (CoT):** Forzar al modelo a pensar paso a paso (Chain of Thought).
4. **Maestría Cumbre:** Domina la personificación profunda y configuraciones tonales.

---

## 🤝 Contribuir

¡Nos encantan las contribuciones de la comunidad! Si quieres ayudar a mejorar la aplicación o a crear nuevos y más endiablados "Nodos" de entrenamiento:

1. Revisa la guía de contribución en nuestro archivo [CONTRIBUTING.md](CONTRIBUTING.md).
2. Abre una *Issue* para darnos tu idea o reportar un error.
3. Haz un *Fork* del repositorio y preséntanos una *Pull Request*.

## 📄 Licencia

Este proyecto se distribuye bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más información. 

---
<div align="center">
  <i>"El Prompt no es solo texto, es arquitectura mental estructurada en tokens."</i>
</div>
