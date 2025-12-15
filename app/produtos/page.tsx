'use client'

import { Produto } from '@/models/interfaces'
import useSWR from 'swr'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProdutoCard from '@/components/ProdutosCard'
import ProdutoCartCard from '@/components/ProdutosCarrinho'

const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export default function Page() {

    const url = 'https://deisishop.pythonanywhere.com/products/'
    const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher)

    const [pesquisa, setPesquisa] = useState("")
    const [lista, setLista] = useState<Produto[]>([])
    const [ordem, setOrdem] = useState("")
    const [cart, setCart] = useState<Produto[]>([])
    const [valorTotal, setValorTotal] = useState(0)
    const [aluno, setAluno] = useState(false)
    const [codigoCupao, setCodigoCupao] = useState("")

    useEffect(() => {
        const guardado = localStorage.getItem('cart') || '[]'
        setCart(JSON.parse(guardado))
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if (!data) return

        let copia = data.filter(p =>
            p.title.toLowerCase().includes(pesquisa.toLowerCase())
        )

        if (ordem === 'nome') {
            copia.sort((a, b) => a.title.localeCompare(b.title))
        }

        if (ordem === 'precoCrescente') {
            copia.sort((a, b) => a.price - b.price)
        }

        if (ordem === 'precoDecrescente') {
            copia.sort((a, b) => b.price - a.price)
        }

        setLista(copia)
    }, [pesquisa, data, ordem])

    useEffect(() => {
        const soma = cart.reduce((acc, p) => acc + Number(p.price), 0)
        setValorTotal(soma)
    }, [cart])

    function adicionar(id: number) {
        if (!data) return

        const item = data.find(p => p.id === id)
        if (!item) return

        setCart(prev => [...prev, item])
    }

    function remover(index: number) {
        setCart(atual => atual.filter((_, i) => i !== index))
    }

    function comprar() {
        fetch('https://deisishop.pythonanywhere.com/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                products: cart.map(p => p.id),
                student: aluno,
                coupon: codigoCupao,
                name: ""
            })
        })
            .then(r => {
                if (!r.ok) {
                    return r.json().then(e => { throw e })
                }
                return r.json()
            })
            .then(() => {
                setCart([])
                alert('Compra realizada com sucesso!')
            })
            .catch(e => {
                alert(e.message || 'Erro ao comprar')
            })
    }

    if (error) return <p>{error.message}</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data) return <p>Não há produtos</p>

    return (
        <main className="p-5 flex flex-col gap-6">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Produtos</h1>

                <input
                    className="py-2 px-3 rounded-xl border"
                    type="text"
                    placeholder="Procura por nome..."
                    value={pesquisa}
                    onChange={e => setPesquisa(e.target.value)}
                />

                <select
                    className="py-2 px-3 rounded-xl text-black font-bold"
                    value={ordem}
                    onChange={e => setOrdem(e.target.value)}
                >
                    <option value="default">Seleciona um filtro</option>
                    <option value="nome">Nome</option>
                    <option value="precoCrescente">Preço (Mais baixo)</option>
                    <option value="precoDecrescente">Preço (Mais alto)</option>
                </select>

                <Link href="/categorias" className="underline">
                    Ver Categorias
                </Link>
            </header>

            <section className="flex flex-col gap-6">
                {lista.map(p => (
                    <div key={p.id} className="flex flex-col gap-2">
                        <ProdutoCard {...p} />

                        <button
                            onClick={() => adicionar(p.id)}
                            className="bg-purple-600 hover:bg-purple-700 p-2 rounded-2xl text-white"
                        >
                            Adicionar ao carrinho
                        </button>
                    </div>
                ))}
            </section>

            <section className="pt-10 flex flex-col gap-4">
                <h2 className="text-xl font-semibold">
                    {cart.length === 0 ? 'Carrinho vazio... Adiciona produtos!' : 'Carrinho'}
                </h2>

                {cart.length > 0 && (
                    <p className="font-semibold">
                        Preço total: {valorTotal.toFixed(2)}€
                    </p>
                )}

                <button
                    className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-2 text-white w-fit"
                    onClick={comprar}
                >
                    Comprar
                </button>

                <label className="flex items-center gap-2">
                    Estudante DEISI
                    <input
                        type="checkbox"
                        checked={aluno}
                        onChange={e => setAluno(e.target.checked)}
                    />
                </label>

                <input
                    className="py-2 px-3 rounded-xl border"
                    type="text"
                    placeholder="Escreve um cupão..."
                    value={codigoCupao}
                    onChange={e => setCodigoCupao(e.target.value)}
                />

                <div className="flex flex-col gap-4">
                    {cart.map((p, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <ProdutoCartCard {...p} />

                            <button
                                onClick={() => remover(idx)}
                                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-2xl text-white w-fit"
                            >
                                Remover do carrinho
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
