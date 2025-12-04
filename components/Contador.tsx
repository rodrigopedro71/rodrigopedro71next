"use client";

import { useEffect, useState } from "react";

export default function ExemploLocalStorage() {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  // Ler localStorage só no cliente
  useEffect(() => {
    if (typeof window === "undefined") return;

    const valueStored = localStorage.getItem("value");
    const historyStored = localStorage.getItem("history");

    if (valueStored) {
      setValue(parseInt(valueStored, 10));
    }

    if (historyStored) {
      try {
        const parsed = JSON.parse(historyStored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      } catch {
        // Se o JSON estiver corrompido, ignora
      }
    }
  }, []);

  // Guardar automaticamente sempre que mudar
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("value", String(value));
    localStorage.setItem("history", JSON.stringify(history));
  }, [value, history]);

  return (
    <div>
      <p>Valor: {value}</p>

      <button
        onClick={() => {
          const novo = value + 1;
          setValue(novo);
          setHistory([...history, novo]);
        }}
      >
        Incrementar
      </button>

      <p>
        Histórico:{" "}
        {history.map((v, i) => (
          <span key={i}>{v}{i < history.length - 1 ? ", " : ""}</span>
        ))}
      </p>
    </div>
  );
}
