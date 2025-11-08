// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Flashcard from "../components/Flashcard";
import { nextReview, grade, Card } from "../utils/leitner";

const categoryEmojis: Record<string, string> = {
  comida: "🍎",
  casa: "🏠",
  verbos: "⚡️",
  objeto: "📦",
  ropa: "👕",
  transporte: "🚗",
  rutina: "⏰",
  familia: "🫂",
};

const DEFAULT_CATEGORY = "comida";

const seed: Card[] = [
  { id: "1", front: "der Hund → ?", back: "el perro", box: 1 },
  { id: "2", front: "die Katze → ?", back: "la gata", box: 1 },
  { id: "3", front: "das Haus → ?", back: "la casa", box: 2 },
  { id: "4", front: "trinken → ?", back: "beber", box: 2 },
  { id: "5", front: "essen → ?", back: "comer", box: 3 },
];

export default function Page() {
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [cards, setCards] = useState<Card[]>([]);
  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [explanationText, setExplanationText] = useState("");
  const [feedback, setFeedback] = useState("");


  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("category", category);

      if (!error && data) {
        setCards(data);
        setQueue(nextReview(data));
        setIndex(0);
      }
    }
    load();
  }, [category]);

  const current = queue[index];

  const handleAnswer = (correct: boolean) => {
    const updated = grade(current, correct);
    const newCards = cards.map(c => (c.id === updated.id ? updated : c));
    setCards(newCards);

    if (index < queue.length - 1) {
      setIndex(index + 1);
    } else {
      setQueue(nextReview(newCards));
      setIndex(0);
    }
  };

  if (!current) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Flashcards MVP (Demo)</h1>
        <h2 style={{ opacity: 0.9 }}>
          {categoryEmojis[category]} Categoría: {category}
        </h2>
        <p style={{ opacity: 0.7 }}>
          Caja: — {index + 1} / {queue.length}
        </p>

        <p>No hay tarjetas pendientes. 🎉</p>
        <button onClick={() => { setCards(seed); setQueue(nextReview(seed)); setIndex(0); }}>
          Reiniciar
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {Object.keys(categoryEmojis).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: category === cat ? "2px solid black" : "1px solid #ccc"
            }}
          >
            {categoryEmojis[cat]} {cat}
          </button>
        ))}
      </div>

      <h1>Flashcards MVP (Demo)</h1>
      <h2 style={{ opacity: 0.9 }}>
        {categoryEmojis[category]} Categoría: {category}
      </h2>
      <p style={{ opacity: 0.7 }}>Caja: {current?.box} — {index + 1} / {queue.length}</p>

      <Flashcard
        front={current.front}
        back={current.back}
        onAnswer={handleAnswer}
      />

      <div style={{ marginTop: 20 }}>
        {loading && (
          <p style={{ color: "#ccc", marginBottom: 10 }}>
            Analizando respuesta... 🤖  Espere un momento
          </p>
        )}

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #555",
            background: "#222",
            color: "#fff",
            borderRadius: 8,
            marginBottom: 10
          }}
        />

        <button
          onClick={async () => {
            setLoading(true);
            
            const res = await fetch("/api/ai-check", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                answer: answer,
                correctAnswer: current.back
              })
            });

            const data = await res.json();

            if (data.correct) {
              setResultText("✅ Correcto");
            } else {
              setResultText("❌ Incorrecto");
            }
            
            setExplanationText(data.explanation);            

            setAnswer("");

            setLoading(false);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #666",
            background: "#333",
            color: "white"
          }}
        >
          Enviar respuesta
        </button>

        {resultText && (
          <p style={{ marginTop: 10, fontWeight: "bold", color: resultText.includes("✅") ? "lightgreen" : "red" }}>
            {resultText}
          </p>
        )}

        {explanationText && (
          <p style={{ marginTop: 4, opacity: 0.8, fontStyle: "italic", color: "#ccc" }}>
            {explanationText}
          </p>
        )}

        {resultText && (
          <button
            onClick={() => {
              handleAnswer(resultText.includes("✅"));
              setResultText("");
              setExplanationText("");
            }}
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #888",
              background: "#222",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Siguiente →
          </button>
        )}

      </div>

    </main>
  );
}
