// components/Flashcard.tsx
"use client";
import { useState } from "react";

type Props = {
  front: string;
  back: string;
  onAnswer: (correct: boolean) => void;
};

export default function Flashcard({ front, back, onAnswer }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, maxWidth: 420 }}>
      <h3 style={{ marginTop: 0 }}>{show ? "Respuesta" : "Pregunta"}</h3>
      <p style={{ fontSize: 18 }}>{show ? back : front}</p>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => setShow(!show)}>
          {show ? "Ocultar" : "Ayuda"}
        </button>
        {show && (
          <>
            <button onClick={() => onAnswer(true)}>✅ Correcta</button>
            <button onClick={() => onAnswer(false)}>❌ Incorrecta</button>
          </>
        )}
      </div>
    </div>
  );
}
