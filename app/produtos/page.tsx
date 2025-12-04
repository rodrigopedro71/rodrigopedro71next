'use client'
import useSWR from 'swr';
import {Produto} from '@/models/interfaces'

const fetcher = (url: string) => fetch(url).then(res => res.json());


export default function FetchUser() {

    // A. Fetch de dados​
    const {data, error, isLoading} = useSWR<Produto[]>('https://deisishop.pythonanywhere.com/products', fetcher);

    // B. Renderização​

    if (error) return <p>Erro ao carregar</p>;

    if (isLoading) return <p>Carregando...</p>;

    if (!data) return <p>Utilizador inexistente</p>;


    return(
        <div>
      <h1>Produtos</h1>

      <ul className="flex flex-wrap gap-4">
        {data.map(produto => (
          <li key={produto.id}>
            <h2>{produto.title}</h2>
              <img src={produto.image} width='300' />
            
          </li>
        ))}
      </ul>
    </div>
    )
    
}
