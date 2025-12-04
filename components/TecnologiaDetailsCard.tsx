import Image from "next/image";
import Link from "next/link";
import ContadorPersonalizado from "../components/contadorPersonalizado";

interface TecnologiaCardProps {
  title: string;
  image: string;
}

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
  return (
    <div className="bg-violet-800 text-violet-200 m-2 p-4 border-2 border-violet-500 rounded-lg 
                    flex flex-col items-center w-full max-w-xs mx-auto gap-3 shadow-md">

      <p className="font-semibold text-lg">{title}</p>

      <Image
        className="mx-auto"
        src={`/tecnologias/${image}`}
        alt={title}
        width={60}
        height={60}
      />

      <Link
        href="/tecnologia"
        className="text-purple-300 hover:text-purple-400 underline"
      >
        Clica aqui para ver detalhadamente
      </Link>

      <ContadorPersonalizado title={title} />
    </div>
  );
}
