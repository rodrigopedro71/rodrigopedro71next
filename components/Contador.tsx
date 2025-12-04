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
            <p className={`m-2 ${mudaCor()}`}>{count}</p>

            <button className="bg-red-500 rounded-lg mx-2"
                onClick={() => {
                    count < 10 ? setCount(count + 1) : count
                    setHistory([...history, count])

                }}
            >
                Clica Aqui Para Aumentar
            </button>

            <br />

            <button className="bg-red-500 rounded-lg mx-2"
                onClick={() => {
                    count > 0 ? setCount(count - 1) : count
                    setHistory([...history, count])
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

    function mudaCor() {
        if (count >= 0 && count <= 3) {
            return "text-red-500"
        }
        if (count >= 4 && count <= 7) {
            return "text-yellow-500"
        }
        if (count >= 8 && count <= 10) {
            return "text-green-500"
        }
    }
}
