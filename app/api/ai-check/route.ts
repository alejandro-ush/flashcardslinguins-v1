// app/api/ai-check/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { answer, correctAnswer } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { correct: false, explanation: "Falta OPENAI_API_KEY en el servidor." },
        { status: 500 }
      );
    }

    const prompt = `
Eres un profesor de alemán para hispanohablantes. Corrige una respuesta breve.

- Respuesta del estudiante: "${answer}"
- Respuesta correcta esperada: "${correctAnswer}"

Evalúa:
1) ¿Es correcta de forma semántica aunque no coincida literal?
2) ¿Hay errores de ortografía/género/mayúsculas?
3) Devuelve SOLO un JSON *puro* con este formato:

{
  "correct": boolean,
  "explanation": string
}
`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5",
        messages: [
          { role: "system", content: "Eres un profesor de alemán para hispanohablantes." },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!resp.ok) {
      const details = await resp.text();
      return NextResponse.json(
        { correct: false, explanation: `Error de OpenAI: ${details}` },
        { status: 500 }
      );
    }

    const completion = await resp.json();
    const raw = completion?.choices?.[0]?.message?.content?.trim() ?? "";

    // Intentamos parsear JSON de forma segura
    let payload: { correct: boolean; explanation: string } = {
      correct: false,
      explanation: "No se pudo leer la respuesta de IA.",
    };

    try {
      payload = JSON.parse(raw);
    } catch {
      // Si vino con texto extra, intenta extraer el bloque JSON
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          payload = JSON.parse(m[0]);
        } catch {
          /* ignore */
        }
      }
    }

    if (typeof payload.correct !== "boolean") payload.correct = false;
    if (!payload.explanation) payload.explanation = "Sin explicación.";

    return NextResponse.json(payload);
  } catch (err) {
    console.error("IA ERROR", err);
    return NextResponse.json(
      { correct: false, explanation: "Error procesando IA en el servidor." },
      { status: 500 }
    );
  }
}
