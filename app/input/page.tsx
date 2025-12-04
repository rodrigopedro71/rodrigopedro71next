'use client'

import React, { useState } from 'react'

export default function InputPage() {
  const [texto, setTexto] = useState('')
  const [opcao, setOpcao] = useState('')

  const [tarefas, setTarefas] = useState<string[]>([])
  const [novaTarefa, setNovaTarefa] = useState<string>('')

  const [editIndex, setEditIndex] = useState<number | null>(null)

  function adicionarTarefa() {
    const tarefaLimpada = novaTarefa.trim()
    if (!tarefaLimpada) return

    if (editIndex !== null) {
      // editar tarefa existente
      const tarefasAtualizadas = tarefas.map((t, i) =>
        i === editIndex ? tarefaLimpada : t
      )
      setTarefas(tarefasAtualizadas)
      setEditIndex(null)
    } else {
      // adicionar nova tarefa
      setTarefas([...tarefas, tarefaLimpada])
    }

    setNovaTarefa('')
  }

  function editarTarefa(index: number) {
    setNovaTarefa(tarefas[index])
    setEditIndex(index)
  }

  function apagarTarefa(index: number) {
    const tarefasFiltradas = tarefas.filter((_, i) => i !== index)
    setTarefas(tarefasFiltradas)

    // se estiver a editar a mesma tarefa que foi apagada, sai do modo edição
    if (editIndex === index) {
      setEditIndex(null)
      setNovaTarefa('')
    }
  }

  return (
    <section>
      <h2>Input:</h2>

      <input
        type="text"
        placeholder="Escreve aqui..."
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />

      <p>O que escreveste: {texto}</p>

      <h2>Tecnologias</h2>

      <select
        value={opcao}
        onChange={(evento) => setOpcao(evento.target.value)}
      >
        <option value="">-- escolhe uma tecnologia --</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
      </select>

      <p>Tecnologia escolhida: {opcao || 'nenhuma'}</p>

      <h2>Tarefas</h2>

      <div>
        <input
          type="text"
          placeholder="Escreve uma tarefa..."
          value={novaTarefa}
          onChange={(evento) => setNovaTarefa(evento.target.value)}
        />

        <button onClick={adicionarTarefa}>
          {editIndex !== null ? 'Guardar' : 'Adicionar'}
        </button>
      </div>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}{' '}
            <button onClick={() => editarTarefa(index)}>Editar</button>{' '}
            <button onClick={() => apagarTarefa(index)}>Apagar</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
