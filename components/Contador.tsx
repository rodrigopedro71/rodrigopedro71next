"use client";

import { useEffect, useState } from "react";

export default function Contador() {
    const [count, setCount] = useState(() => {
        const countStored = localStorage.getItem("count");
        return countStored ? parseInt(countStored) : 0;
    });

    const [history, setHistory] = useState<number[]>(() => {
        const historyStored = localStorage.getItem("history");
        return historyStored ? JSON.parse(historyStored) : [];
    });

    useEffect(() => {
        localStorage.setItem("count", String(count));
        localStorage.setItem("history", JSON.stringify(history));
    }, [count, history]);

    return (
        <>
            <p>Clicaste {count} vezes</p>

            <button
                onClick={() => {
                    const novo = count + 1;
                    setCount(novo);
                    setHistory((history) => [...history, novo]);
                }}
            >
                Clica Aqui Para Aumentar
            </button>

            <br />

            <button
                onClick={() => {
                    const novo = count - 1;
                    setCount(novo);
                    setHistory((history) => [...history, novo]);
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
