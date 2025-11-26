import Link from "next/link";
import Projeto from "@/components/Projeto";

export default function DescricaoProjetos() {

    const listaProjetos = [
        "LP2: Desenvolvimento de um jogo de tabuleiro.",
        "DIW: Construção de um site sobre a cidade de Munique.",
        "AAC: Criação de um jogo de memória utilizando Arduino.",
        "DIW: Desenvolvimento de um site de loja com JavaScript."
    ];

    return (
        <>
            <h2>Os meus projetos!</h2>

            <Link
                href="https://rodrigopedro71.github.io/"
                target="_blank"
                className="text-red-500 hover:text-pink-400"

            >
                Clica aqui para ver os meus projetos!
            </Link>

            <Projeto
                nomeProjeto="Loja"
                url="https://rodrigopedro71.github.io/lab7/index.html"
            />

            <ul>
                {listaProjetos.map((texto, index) => (
                    <li key={index}>{texto}</li>
                ))}
            </ul>
        </>
    );
}
