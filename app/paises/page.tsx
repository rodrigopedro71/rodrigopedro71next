'use client'

import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { paises } from '@/models/interfaces'
import PaisCard from '@/components/paises'

const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export default function Page() {

    const url = '/data/paises.json/'
    const { data, error, isLoading } = useSWR<paises[]>(url, fetcher)

    const [textoPesquisa, setTextoPesquisa] = useState("")
    const [listaFiltrada, setListaFiltrada] = useState<paises[]>([])
    const [ordenacao, setOrdenacao] = useState("popDecrescente")

    useEffect(() => {
        if (!data) return

        let resultado = data.filter(p =>
            p.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
        )

        if (ordenacao === 'popCrescente') {
            resultado.sort((a, b) => a.populacao - b.populacao)
        }

        if (ordenacao === 'popDecrescente') {
            resultado.sort((a, b) => b.populacao - a.populacao)
        }

        setListaFiltrada(resultado)
    }, [textoPesquisa, data, ordenacao])

    if (error) return <p>{error.message}</p>
    if (isLoading) return <p>A descarregar dados</p>
    if (!data) return <p>Não há países</p>

    return (
        <>
            <h1>Países</h1>

            <input
                className="flex flex-col py-5"
                type="text"
                placeholder="Filtrar por nome..."
                value={textoPesquisa}
                onChange={e => setTextoPesquisa(e.target.value)}
            />

            <select
                className="flex flex-col pb-5 text-black font-bold"
                value={ordenacao}
                onChange={e => setOrdenacao(e.target.value)}
            >
                <option value="popDecrescente">População (Mais alto)</option>
                <option value="popCrescente">População (Mais baixo)</option>
            </select>

            {listaFiltrada.map((pais, index) => (
                <div key={index}>
                    <PaisCard
                        nome={pais.nome}
                        area={pais.area}
                        populacao={pais.populacao}
                    />
                </div>
            ))}
        </>
    )
}
