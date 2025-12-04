import ContadorPersonalizado from "../components/contadorPersonalizado";

interface TecnologiaDetailsCardProps {
  description: string;
}

export default function TecnologiaDetailsCard({ description }: TecnologiaDetailsCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-violet-700 text-white">
      <p>{description}</p>

      {/* Se quiseres mostrar likes por tecnologia */}
      <ContadorPersonalizado title={description} />
    </div>
  );
}
