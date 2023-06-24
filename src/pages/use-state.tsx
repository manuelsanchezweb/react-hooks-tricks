import { useState } from 'react'
import CodeBlock from '../component/code-block'

const PageUseState = () => {
  // 1. Crear un estado y actualizarlo con un botón
  const [count, setCount] = useState(0)
  const increase = () => setCount(count + 1)

  // 2. Crear un estado y actualizar su ultimo valor con un botón
  const [countWithLastValue, setCountWithLastValue] = useState(0)
  const increaseWithLastValue = () => setCountWithLastValue(prevCount => prevCount + 1)

  return (
    <section className="flex flex-col gap-4 mb-12">
      <h1 className="text-2xl md:text-5xl mb-12">useState</h1>
      <p>
        Con useState podemos ver el estado de un componente y actualizarlo en el
        momento que queramos. Es por ello que la estructura básica es la
        siguiente:
      </p>
      <div className="flex gap-4 items-center">
        <span>
          Este es el número: <strong>{count}</strong>
        </span>
        <button onClick={increase}>Aumentar +1</button>
      </div>

      <CodeBlock>
        {`
const [count, setCount] = useState(0)
const increase = () => setCount(count + 1)

return (
    <div className="flex gap-4 items-center">
        <span>Este es el número: <strong>{count}</strong></span>
        <button onClick={increase}>Aumentar +1</button>
    </div>
  )
  `}
      </CodeBlock>

      <p>Hasta aquí la parte sencilla. Hoy os quería traer unos casos más avanzados de useState.</p>
      <h2 className="text-2xl mb-6 w-fit underline">
        Hacer algo a partir del estado anterior
      </h2>
      <div className="flex gap-4 items-center">
        <span>
          Este es el número: <strong>{countWithLastValue}</strong>
        </span>
        <button onClick={increaseWithLastValue}>Aumentar +1</button>
      </div>
      <CodeBlock>
        {`
const [countWithLastValue, setCountWithLastValue] = useState(0)
const increaseWithLastValue = () => setCountWithLastValue(prevCount => prevCount + 1)

return (
    <div className="flex gap-4 items-center">
        <span>Este es el número: <strong>{countWithLastValue}</strong></span>
        <button onClick={increaseWithLastValue}>Aumentar +1</button>
    </div>
  )
  `}
      </CodeBlock>
      <p>Aunque el resultado es exactamente igual en este caso, no te dejes engañar. Aquí estamos hablando de un simple botón aislado, pero tenemos que tener en cuenta que el estado se puede actualizar desde varios lugares, y que hacerlo utilizando el <code>prevCount</code> garantizará que siempre miremos el último estado a la hora de actualizar el mismo.</p>
    </section>
  )
}

export default PageUseState
