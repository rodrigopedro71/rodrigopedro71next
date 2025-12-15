'use client'

import { use } from 'react'
import useSWR from 'swr'
import { Produto } from '@/models/interfaces'
import ProdutoCard from '@/components/ProdutosCard'
import Link from 'next/link'

interface Props {
    params: Promise<{ name: string }>
}

const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint)

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export default function Page({ params }: Props) {

    const categoriaAtual = use(params).name

    const endpoint = 'https://deisishop.pythonanywhere.com/products/'
    const { data, error, isLoading } = useSWR<Produto[]>(endpoint, fetcher)

    if (error) return <p>{error.message}</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data) return <p>Não há produtos</p>

    return (
        <section className="p-5 flex flex-col gap-6">
            {data.map(item => {
                if (item.category === categoriaAtual) {
                    return (
                        <ProdutoCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            image={item.image}
                            rating={item.rating}
                        />
                    )
                }
            })}

            <Link
                href="/categorias"
                className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-2 text-white w-fit"
            >
                Voltar atrás
            </Link>
        </section>
    )
}
