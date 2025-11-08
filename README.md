# 🌍 Flashcards Linguins – MVP IA  
**Aprendizaje inteligente de idiomas con IA + Repetición Espaciada (SRS)**  

![Preview](docs/preview.png)  
> *"Tu nuevo compañero para aprender idiomas de forma natural, personalizada y divertida."*  

---

## 🚀 Descripción general  

**Flashcards Linguins** es un proyecto **MVP (Producto Mínimo Viable)** desarrollado con **Next.js**, **Supabase** y **OpenAI**, que combina aprendizaje adaptativo, IA y diseño minimalista para crear una experiencia de estudio moderna y dinámica.  

El objetivo es ofrecer una plataforma que **entienda cómo aprende cada persona** y ajuste automáticamente las tarjetas y correcciones según su progreso, errores y nivel (A1, A2, B1...).  

---

## 🧠 Principales características  

✅ **Sistema Leitner (SRS):**  
Repetición espaciada que prioriza las tarjetas según tu desempeño.  

✅ **Corrección con IA (GPT):**  
La IA analiza tus respuestas, entiende sinónimos y errores semánticos y te explica *por qué* está bien o mal.  

✅ **Categorías dinámicas:**  
Elige entre vocabulario de *comida 🍎, casa 🏠, verbos ⚡️, ropa 👕,* y más.  

✅ **Interfaz reactiva y accesible:**  
Diseño limpio, intuitivo y sin distracciones.  

✅ **Modo “Ayuda”:**  
Muestra la respuesta correcta si la necesitás (limitado en futuras versiones como parte de la gamificación).  

✅ **Feedback claro y natural:**  
Mensajes positivos, explicación de errores y botón de “Siguiente” para mantener el ritmo humano.  

---

## ⚙️ Stack tecnológico  

| Tecnología | Uso |
|-------------|-----|
| **Next.js (App Router)** | Frontend + Serverless API Routes |
| **Supabase** | Base de datos y autenticación |
| **OpenAI API (GPT-5)** | Corrección semántica y generación de feedback |
| **Vercel** | Hosting y CI/CD automático |
| **TypeScript + React Hooks** | Lógica reactiva y tipado seguro |

---

## 🧩 Arquitectura general  
/app
├── api/ai-check/route.ts # Endpoint IA server-side

├── page.tsx # Lógica principal y flujo de tarjetas


/components
└── Flashcard.tsx # Componente visual de la tarjeta


/lib
└── supabaseClient.ts # Conexión segura con Supabase


/utils
└── leitner.ts # Algoritmo Leitner (SRS)


---

## 🧪 Próximos pasos (Roadmap V4 → V6)  

- 🎮 **Gamificación:** puntos, límites de ayuda y recompensas.  
- 📊 **Seguimiento inteligente:** estadísticas de progreso y memoria.  
- 🧬 **IA adaptativa:** personalización por nivel y errores frecuentes.  
- 🌐 **Versión multi-idioma:** español, inglés y alemán.  
- 🤝 **Módulo colaborativo:** mazos compartidos y aprendizaje social.  

---

## 💡 Contexto y propósito  

Este MVP fue desarrollado como **experimento de producto real** para validar una idea:  
> ¿Qué pasa si un sistema de aprendizaje entiende cómo aprendés y se adapta a vos?  

El objetivo no es solo enseñar vocabulario, sino construir **una experiencia más humana** de aprendizaje, aprovechando IA para acompañar, corregir y motivar.  

---

## 🧑‍💻 Autor  
**Alejandro Jaramillo**  
Desarrollador & Creador de Productos Digitales  
📍 Berlín, Alemania  

💼 [LinkedIn](https://www.linkedin.com/in/)  
🐙 [GitHub](https://github.com/alejandro-ush)  
✉️ [Contacto](mailto:tuemail@ejemplo.com)  

---

## 📸 Capturas sugeridas (añadir luego)
- `docs/preview.png` → Pantalla principal  
- `docs/ai-feedback.png` → Ejemplo de corrección IA  
- `docs/categories.png` → Selector de categorías  

---

> _"Aprender un idioma no debería sentirse como estudiar, sino como descubrir."_ 🌱
