interface CaracteristicaProps {
    caracteristica: string[];
}

export default function Caracteristica({ caracteristica }: CaracteristicaProps) {
    return (
        <div>
            <ul>
                {caracteristica.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
