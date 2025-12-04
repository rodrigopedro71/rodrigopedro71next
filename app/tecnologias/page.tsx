import React from "react";
import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaCard from "@/components/TecnologiaCard";

export default function TecnologiasPage() {
  return (
    <div>
      <h2>Tecnologias Exploradas</h2>

      <ul className="flex flex-wrap gap-4">
        {tecnologias.map((tecnologia, i) => (
          <li key={i}>
            <TecnologiaCard
              title={tecnologia.title}
              image={tecnologia.image}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
