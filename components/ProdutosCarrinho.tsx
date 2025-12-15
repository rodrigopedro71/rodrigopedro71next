'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Produto } from '@/models/interfaces'

export default function ProdutosCarrinho(produto: Produto) {

    const { id, title, price, description, category, image, rating } = produto
    const navigation = useRouter()

    const goToProduto = () => {
        navigation.push(`/produtos/${id}`)
    }

    const removeFromCart = () => {
        const cartAtual = JSON.parse(localStorage.getItem('cart') ?? '[]')

        cartAtual.pop({ id, title, price, description, category, image, rating })
        localStorage.setItem('cart', JSON.stringify(cartAtual))
    }

    return (
        <article className="p-5">
            <h2>{title}</h2>

            <p>Preço: {price} €</p>

            <Image
                src={`https://deisishop.pythonanywhere.com${image}`}
                alt={image}
                width={250}
                height={250}
            />

            <button
                onClick={goToProduto}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-2xl text-white"
            >
                Mais Informação
            </button>
        </article>
    )
}
