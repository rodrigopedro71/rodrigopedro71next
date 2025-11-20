import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';

export default function () {
  return (
    <div>
        <h2>Tecnologias Exploradas</h2>

        <h2>Características do React e Next.js</h2>
        {tecnologias.map((tecnologia, i) => {
            return <li key={i}><strong>{tecnologia.title}</strong> – {tecnologia.image} - {tecnologia.description} - {tecnologia.rating}</li>
        })}
    </div>
  )
}
