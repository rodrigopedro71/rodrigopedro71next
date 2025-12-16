export interface Produto {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number
    }
}

export interface paises {
    nome: string;
    area: number;
    populacao: number;
    
    }

export interface Categoria {
    name: string;
}