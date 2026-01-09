'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Produto } from '@/models/interfaces'

export default function ProdutosPersonalizado(produto: Produto) {

    const { title, price, description, category, image, rating } = produto
    const router = useRouter()

    const voltar = () => {
        router.push('/produtos')
    }

    
    const [favorito, setFavorito] = useState(false)

    return (
        <article className="p-5 flex flex-col gap-3">
            <header>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm opacity-80">{category}</p>
            </header>

            <div className="flex justify-center">
                <Image
                    src={`https://deisishop.pythonanywhere.com${image}`}
                    alt={title}
                    width={280}
                    height={280}
                />
            </div>

            <p className="text-lg font-semibold">€ {price}</p>

            <p className="leading-relaxed">{description}</p>

            

            <button
                onClick={voltar}
                className="mt-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-2xl text-white"
            >
                ⬅ Voltar
            </button>

            
        </article>
    )
}
