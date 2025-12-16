'use client'

import { paises } from '@/models/interfaces'

export default function PaisCard({ nome, area, populacao }: paises) {
    return (
        <article className="p-5">
            <h2>{nome}</h2>
            <p>Área: {area} km²</p>
            <p>População: {populacao}</p>
        </article>
    )
}
