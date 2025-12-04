interface TecnologiaDetailsCardProps {
  description: string;
}

export default function TecnologiaDetailsCard({ description }: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-violet-900 text-violet-100 p-4 rounded-lg">
      <p>{description}</p>
    </div>
  );
}
