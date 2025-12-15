'use client'

import useSWR from 'swr'
import { Produto } from '@/models/interfaces'
import { useParams } from 'next/navigation'
import ProdutoDetalhe from '@/components/ProdutosPersonalizado'

interface Props {
    params: {
        id: string
    }
}

const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint)

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`)
    }

    return response.json()
}

export default function PaginaUmProduto({ params }: Props) {

    const endpoint = 'https://deisishop.pythonanywhere.com/products/'
    const { data, error, isLoading } = useSWR<Produto[]>(endpoint, fetcher)

    const parametros = useParams()
    const idProduto = Number(parametros.id)

    if (isLoading) return <p>A carregar...</p>
    if (error) return <p>{error.message}</p>
    if (!data) return <p>Não há produtos</p>

    const encontrado = data.find(item => item.id === idProduto)

    if (!encontrado) return <p>Produto não encontrado</p>

    return (
        <>
            <ProdutoDetalhe
                id={encontrado.id}
                title={encontrado.title}
                price={encontrado.price}
                description={encontrado.description}
                category={encontrado.category}
                image={encontrado.image}
                rating={encontrado.rating}
            />
        </>
    )
}
