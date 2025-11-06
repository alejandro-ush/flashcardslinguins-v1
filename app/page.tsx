// app/page.tsx
"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

import { useState } from "react";
import Flashcard from "../components/Flashcard";
import { nextReview, grade, Card } from "../utils/leitner";

const seed: Card[] = [
  { id: "1", front: "der Hund → ?", back: "el perro", box: 1 },
  { id: "2", front: "die Katze → ?", back: "la gata", box: 1 },
  { id: "3", front: "das Haus → ?", back: "la casa", box: 2 },
  { id: "4", front: "trinken → ?", back: "beber", box: 2 },
  { id: "5", front: "essen → ?", back: "comer", box: 3 },
];

export default function Page() {
  const [cards, setCards] = useState<Card[]>([]);
  const [queue, setQueue] = useState<Card[]>([]);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    async function load() {
      console.log("LOAD START");

      //console.log("SUPABASE CLIENT:", supabase);

      const { data, error } = await supabase.from("flashcards").select("*");

      console.log("SUPABASE DATA:", data);
      console.log("ERROR:", error);
      console.log("TOTAL:", data?.length);

      if (!error && data) {
        setCards(data);
        setQueue(nextReview(data));
      }
    }
    load();
  }, []);
  
  const current = queue[index];

  const handleAnswer = (correct: boolean) => {
    const updated = grade(current, correct);
    const newCards = cards.map(c => (c.id === updated.id ? updated : c));
    setCards(newCards);

    if (index < queue.length - 1) {
      setIndex(index + 1);
    } else {
      // Nueva tanda
      setQueue(nextReview(newCards));
      setIndex(0);
    }
  };

  if (!current) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Flashcards MVP (Demo)</h1>
        <p>No hay tarjetas pendientes. 🎉</p>
        <button onClick={() => { setCards(seed); setQueue(nextReview(seed)); setIndex(0); }}>
          Reiniciar
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Flashcards MVP (Demo)</h1>
      <p style={{ opacity: 0.7 }}>Caja: {current.box} — {index + 1} / {queue.length}</p>

      <Flashcard
        front={current.front}
        back={current.back}
        onAnswer={handleAnswer}
      />
    </main>
  );
}
