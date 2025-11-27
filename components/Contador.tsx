import Link from "next/link"
import { useState } from "react";


export default function Contador() {

    const [count, setCount] = useState<number>(0);
     const [history, setHistory] = useState<number[]>([]);

    return (
        <>
        <p>Clicaste {count} vezes</p>
        
        <button onClick={() => {
            const novo = count + 1;
            setCount(novo);
            setHistory([...history, novo]);
        } }
        >
            Clica Aqui
        </button>
        <p>Historico:
            {history.map((c, i) => (<span key ={i}>{c}</span>))}
        </p>
        </>
    )
}