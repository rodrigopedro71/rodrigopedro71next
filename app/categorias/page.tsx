'use client'

import { Categoria } from '@/models/interfaces'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint)

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export default function Page() {

    const endpoint = 'https://deisishop.pythonanywhere.com/categories/'
    const { data, error, isLoading } = useSWR<Categoria[]>(endpoint, fetcher)

    if (error) return <p>{error.message}</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data) return <p>Não há categorias</p>

    return (
        <section className="p-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Categorias</h1>

            <ul className="flex flex-col gap-2">
                {data.map(cat => (
                    <li key={cat.name}>
                        <Link
                            href={`/categorias/${cat.name}`}
                            className="hover:text-purple-600"
                        >
                            {cat.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <Link
                href="/produtos"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-2 w-fit"
            >
                Voltar atrás
            </Link>
        </section>
    )
}
