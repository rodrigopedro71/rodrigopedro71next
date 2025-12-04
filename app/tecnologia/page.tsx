import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard";
import Link from "next/link";

interface TecnologiaPageProps {
  searchParams: {
    id?: string;
  };
}

export default function TecnologiaPage({ searchParams }: TecnologiaPageProps) {
  const indice = searchParams.id ? parseInt(searchParams.id) : 0;

  const tecnologia = tecnologias[indice];

  if (!tecnologia) {
    return (
      <div className="text-red-500">
        <p>Tecnologia não encontrada.</p>
        <Link href="/tecnologias">
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Voltar
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">

      <TecnologiaDetailsCard title={tecnologia.description} image={""} />

      <Link href="/tecnologias">
        <button className="px-4 py-2 bg-violet-700 text-white rounded-lg">
          Voltar
        </button>
      </Link>

    </div>
  );
}
