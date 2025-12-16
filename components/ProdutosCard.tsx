'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Produto } from '@/models/interfaces'

export default function ProdutosCard(produto: Produto) {

    const { id, title, price, image } = produto
    const navigation = useRouter()

    const goToDetails = () => {
        navigation.push(`/produtos/${id}`)
    }

    const [favorito, setFavorito] = useState(false)

    useEffect(() => {
    const f = localStorage.getItem('favorito')
    if (f !== null) {
        setFavorito(JSON.parse(f))
    }
    }, [])

    useEffect(() => {
    localStorage.setItem('favorito', JSON.stringify(favorito))
    }, [favorito])



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
                onClick={goToDetails}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-2xl text-white"
            >
                Mais Informação
            </button>

            <button onClick={() => setFavorito(!favorito)}>
            {favorito ? '❤' : '🤍'}
            </button>
        </article>
    )
}
