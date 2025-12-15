'use client'

import { Produto } from '@/models/interfaces'
import useSWR from 'swr'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ProdutoCard from '@/components/ProdutosCard'
import ProdutoCartCard from '@/components/ProdutosCarrinho'

const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint)

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export default function Page() {

    const endpoint = 'https://deisishop.pythonanywhere.com/products/'
    const { data, error, isLoading } = useSWR<Produto[]>(endpoint, fetcher)

    const [textoPesquisa, setTextoPesquisa] = useState("")
    const [listaFiltrada, setListaFiltrada] = useState<Produto[]>([])
    const [ordenacao, setOrdenacao] = useState("")
    const [carrinho, setCarrinho] = useState<Produto[]>([])
    const [total, setTotal] = useState(0)
    const [isAluno, setIsAluno] = useState(false)
    const [cupao, setCupao] = useState("")

    useEffect(() => {
        const carrinhoLocal = localStorage.getItem('cart') || '[]'
        setCarrinho(JSON.parse(carrinhoLocal))
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(carrinho))
    }, [carrinho])

    useEffect(() => {
        if (!data) return

        let resultado = data.filter(prod =>
            prod.title.toLowerCase().includes(textoPesquisa.toLowerCase())
        )

        if (ordenacao === 'nome') {
            resultado.sort((a, b) => a.title.localeCompare(b.title))
        }

        if (ordenacao === 'precoCrescente') {
            resultado.sort((a, b) => a.price - b.price)
        }

        if (ordenacao === 'precoDecrescente') {
            resultado.sort((a, b) => b.price - a.price)
        }

        setListaFiltrada(resultado)
    }, [textoPesquisa, data, ordenacao])

    useEffect(() => {
        const soma = carrinho.reduce((acc, prod) => acc + Number(prod.price), 0)
        setTotal(soma)
    }, [carrinho])

    function adicionar(id: number) {
        if (!data) return

        const encontrado = data.find(p => p.id === id)
        if (!encontrado) return

        setCarrinho(prev => [...prev, encontrado])
    }

    function remover(index: number) {
        setCarrinho(lista => lista.filter((_, i) => i !== index))
    }

    function comprar() {
        fetch('https://deisishop.pythonanywhere.com/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                products: carrinho.map(p => p.id),
                student: isAluno,
                coupon: cupao,
                name: ""
            })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw err })
                }
                return res.json()
            })
            .then(() => {
                setCarrinho([])
                alert("Compra realizada com sucesso!")
            })
            .catch(err => {
                alert(err.message || "Erro ao comprar")
            })
    }

    if (error) return <p>{error.message}</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data) return <p>Não há produtos</p>

    return (
        <>
            <h1>Produtos</h1>

            <input
                className="flex flex-col py-5"
                type="text"
                placeholder="Escreve o que procuras..."
                value={textoPesquisa}
                onChange={e => setTextoPesquisa(e.target.value)}
            />

            <select
                className="flex flex-col pb-5 text-black font-bold"
                value={ordenacao}
                onChange={e => setOrdenacao(e.target.value)}
            >
                <option value="default">Seleciona um filtro</option>
                <option value="nome">Nome</option>
                <option value="precoCrescente">Preço (Mais baixo)</option>
                <option value="precoDecrescente">Preço (Mais alto)</option>
            </select>

            <Link href="/categorias" className="flex flex-col pb-5">
                Ver Categorias
            </Link>

            {listaFiltrada.map(produto => (
                <div key={produto.id}>
                    <ProdutoCard {...produto} />
                    <button
                        onClick={() => adicionar(produto.id)}
                        className="bg-purple-600 p-2 rounded-2xl text-white"
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            ))}

            <h2 className="flex justify-center pt-20 text-xl">
                {carrinho.length === 0
                    ? 'Carrinho vazio... Adiciona produtos!'
                    : 'Carrinho'}
            </h2>

            <p>
                {carrinho.length === 0
                    ? ''
                    : `Preço total: ${total.toFixed(2)}€`}
            </p>

            <button
                className="flex flex-col bg-purple-600 rounded-2xl p-2 mb-5 text-white"
                onClick={comprar}
            >
                Comprar
            </button>

            <label>
                Estudante DEISI
                <input
                    type="checkbox"
                    checked={isAluno}
                    onChange={e => setIsAluno(e.target.checked)}
                />
            </label>

            <input
                className="flex flex-col pt-5"
                type="text"
                placeholder="Escreve um cupão..."
                value={cupao}
                onChange={e => setCupao(e.target.value)}
            />

            {carrinho.map((prod, i) => (
                <div key={i}>
                    <ProdutoCartCard {...prod} />
                    <button
                        onClick={() => remover(i)}
                        className="flex flex-col p-2 bg-purple-600 rounded-2xl text-white"
                    >
                        Remover do carrinho
                    </button>
                </div>
            ))}
        </>
    )
}
