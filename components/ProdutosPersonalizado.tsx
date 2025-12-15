'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Produto } from '@/models/interfaces'

export default function ProdutosPersonalizado(produto: Produto) {

    const { title, price, description, category, image, rating } = produto
    const navigation = useRouter()

    const goBack = () => {
        navigation.push('/produtos')
    }

    return (
        <section>
            <h2>{title}</h2>

            <p>Categoria: {category}</p>

            <Image
                src={`https://deisishop.pythonanywhere.com${image}`}
                alt={image}
                width={250}
                height={250}
            />

            <p>Preço: {price} €</p>
            <p>{description}</p>

            <p>Rating: {rating.rate}</p>
            <p>Total avaliações: {rating.count}</p>

            <button
                onClick={goBack}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-2xl text-white"
            >
                Voltar atrás
            </button>
        </section>
    )
}
