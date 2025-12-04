export interface Produto {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }

}

import type { NextConfig } from "next";
const nextConfig: NextConfig = {

images: {
domains: ['deisishop.pythonanywhere.com'], 
// adicionar domínio da API​

},

};

export default nextConfig;