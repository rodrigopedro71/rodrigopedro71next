import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard";
import Link from "next/link";

interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating?: number;
}

const tecnologias = tecnologiasJson as Tecnologia[];

interface TecnologiaPageProps {
  searchParams?: {
    id?: string;
  };
}

export default function TecnologiaPage({ searchParams }: TecnologiaPageProps) {
  // lê o índice da query: /tecnologia?id=0, /tecnologia?id=1, etc.
  const indice = searchParams?.id ? parseInt(searchParams.id, 10) : 0;

  const tecnologia =
    !Number.isNaN(indice) && indice >= 0 && indice < tecnologias.length
      ? tecnologias[indice]
      : undefined;

  if (!tecnologia) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-red-400">Tecnologia não encontrada.</p>

        <Link href="/tecnologias">
          <button className="px-4 py-2 bg-violet-700 text-white rounded-lg">
            Voltar
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <h2 className="text-2xl font-semibold text-violet-200">
        {tecnologia.title}
      </h2>

      {/* AQUI ESTAVA O ERRO: usa-se "description", não "title"/"image" */}
      <TecnologiaDetailsCard description={tecnologia.description} />

      <Link href="/tecnologias">
        <button className="px-4 py-2 bg-violet-700 text-white rounded-lg">
          Voltar
        </button>
      </Link>
    </div>
  );
}
