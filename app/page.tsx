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
      onClick={() => {
        const correct = answer.trim().toLowerCase() === current.back.toLowerCase();

        setFeedback(
          correct
            ? "✅ Correcto"
            : `❌ Incorrecto — La respuesta correcta es: ${current.back}`
        );

        handleAnswer(correct);
        setAnswer("");
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

    {feedback && (
      <p style={{ marginTop: 10, color: feedback.includes("✅") ? "lightgreen" : "red" }}>
        {feedback}
      </p>
    )}

    </div>

    </main>
  );
}
