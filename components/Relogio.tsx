'use client'

import React, { useState, useEffect } from 'react'

export default function Relogio() {
  const [horaAtual, setHoraAtual] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setHoraAtual(new Date())
    }, 1000)

    // cleanup quando o componente é removido
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <p>{horaAtual.toLocaleTimeString()}</p>
    </div>
  )
}
