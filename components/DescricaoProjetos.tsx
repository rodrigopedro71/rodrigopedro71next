import Link from "next/link"
import Projeto from "@/components/Projeto"

export default function DescricaoProjetos() {

    return (
        <>
            <h2>Os meus projetos!</h2>
            <Link href="https://rodrigopedro71.github.io/" target="_blank" className="text-purple-500 hover:text-blue-600">Clica aqui para ver os meus projetos!</Link>
            <Projeto
                nomeProjeto="Loja"
                url="https://rodrigopedro71.github.io/lab7/index.html"
            />
            <ul>
                <li>LP2: Desenvolvimento de um jogo de tabuleiro.</li>
                <li>DIW: Construção de um site sobre a cidade de Munique.</li>
                <li>AAC: Criação de um jogo de memória utilizando Arduino.</li>
                <li>DIW: Desenvolvimento de um site de loja com JavaScript.</li>
            </ul>
            
        </>
    )
}