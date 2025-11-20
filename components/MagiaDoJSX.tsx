export default function MagiaDoJSX(){

    const magia = <strong>HTML dentro de JavaScript!</strong>
    const tecnologias = "Reach e Next.js"

    return (
        <div className='bg-blue-300 p-3 m-3 rounded x1'>
            <p>Este é o meu componente MagiaDoJSX.</p>
            <p>Um component é uma função que retorna JSX - {magia}. </p>
            <p>Os componenetes são usados em {tecnologias}</p>
        </div>
    )
}