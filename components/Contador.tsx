"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  // Carregar valores do localStorage só no cliente
  useEffect(() => {
    if (typeof window === "undefined") return;

    const countStored = window.localStorage.getItem("count");
    const historyStored = window.localStorage.getItem("history");

    if (countStored) {
      const parsed = parseInt(countStored);
      if (!Number.isNaN(parsed)) {
        setCount(parsed);
      }
    }

    if (historyStored) {
      try {
        const parsedHistory = JSON.parse(historyStored);
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        }
      } catch {
        // se der erro no JSON, ignora
      }
    }
  }, []);

  // Guardar sempre que count ou history mudam
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem("count", String(count));
    window.localStorage.setItem("history", JSON.stringify(history));
  }, [count, history]);

  function mudaCor() {
    if (count >= 0 && count <= 3) {
      return "text-red-500";
    }
    if (count >= 4 && count <= 7) {
      return "text-yellow-500";
    }
    if (count >= 8 && count <= 10) {
      return "text-green-500";
    }
    return "";
  }

  return (
    <>
      <p className={`m-2 ${mudaCor()}`}>{count}</p>

      <button
        className="bg-red-500 rounded-lg mx-2"
        onClick={() => {
          if (count < 10) {
            const novo = count + 1;
            setCount(novo);
            setHistory([...history, novo]);
          }
        }}
      >
        Clica Aqui Para Aumentar
      </button>

      <br />

      <button
        className="bg-red-500 rounded-lg mx-2"
        onClick={() => {
          if (count > 0) {
            const novo = count - 1;
            setCount(novo);
            setHistory([...history, novo]);
          }
        }}
      >
        Clica Aqui Para Diminuir
      </button>

      <br />

      <button
        onClick={() => {
          const novo = 0;
          setCount(novo);
          setHistory([novo]);
        }}
      >
        Reset
      </button>

      <p>
        Historico:{" "}
        {history.map((c, i) => (
          <span key={i}>
            {c}
            {i < history.length - 1 ? "; " : ""}
          </span>
        ))}
      </p>
    </>
  );
}
