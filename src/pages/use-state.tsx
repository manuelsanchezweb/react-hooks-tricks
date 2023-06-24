import { useState } from 'react'
import CodeBlock from '../component/code-block'
import { Link } from 'wouter'

const PageUseState = () => {
  // 1. Crear un estado y actualizarlo con un botón
  const [count, setCount] = useState(0)
  const increase = () => setCount(count + 1)

  // 2. Crear un estado y actualizar su ultimo valor con un botón
  const [countWithLastValue, setCountWithLastValue] = useState(0)
  const increaseWithLastValue = () =>
    setCountWithLastValue((prevCount) => prevCount + 1)

  // 3. Crear un estado de un objeto y actualizarlo con un botón
  const [friends, setFriends] = useState({
    luis: 0,
    paco: 0,
  })
  const increaseLuis = () =>
    setFriends((prevFriends) => ({
      ...prevFriends,
      luis: prevFriends.luis + 1,
    }))
  const increasePaco = () =>
    setFriends((prevFriends) => ({
      ...prevFriends,
      paco: prevFriends.paco + 1,
    }))

    // 4. Crear un array de números y añadir el siguiente  con un botón
    const [numbers, setNumbers] = useState([1, 2, 3]);

    const addNextNumber = () => {
        const maxNumber = Math.max(...numbers);
        const nextNumber = maxNumber + 1;
        setNumbers(prevNumbers => [...prevNumbers, nextNumber]);
    };

  return (
    <section className="flex flex-col gap-4 mb-12">
      <h1 className="text-3xl md:text-5xl mb-12 font-bold">useState</h1>
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

      <p>
        Hasta aquí la parte sencilla. Hoy os quería traer unos casos más
        avanzados de useState.
      </p>
      <h2 className="text-2xl mb-6 w-fit underline">¿Por qué todo se renderiza 2 veces?</h2>
      <CodeBlock>
      {`
      // src/main.tsx
      ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
      )
`}
      </CodeBlock>
      <p>Esta es una pregunta muy típica. Es un fenómeno que sucede con React en el entorno de desarrollo debido al StrictMode. Por eso verás entre varias cosas que los console.logs salen duplicados. Una vez despliegues la aplicación, todo funcionará como debe ser. Es una medida de seguridad que ayuda a React a buscar potenciales problemas en el desarrollo.</p>
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
      <p>
        Aunque el resultado es exactamente igual en este caso, no te dejes
        engañar. Aquí estamos hablando de un simple botón aislado, pero tenemos
        que tener en cuenta que el estado se puede actualizar desde varios
        lugares, y que hacerlo utilizando el <code>prevCount</code> garantizará
        que siempre miremos el último estado a la hora de actualizar el mismo.
      </p>

      <h2 className="text-2xl mb-6 w-fit underline">Actualizar un objeto</h2>
      <p>
        Se nos puede dar el caso en el que simplemente queremos actualizar una
        parte del objeto, y queremos que el resto se mantenga igual. Supongamos
        que hemos hecho una app en la que nuestros amigos Luis y Paco pueden ver
        en directo el número de amigos que tienen.
      </p>
      <CodeBlock>
        {`

const [friends, setFriends] = useState({
      luis: 0,
      paco: 0
})
const increaseLuis = () => setFriends(prevFriends => ({...prevFriends, luis: prevFriends.luis + 1}))
const increasePaco = () => setFriends(prevFriends => ({...prevFriends, paco: prevFriends.paco + 1}))

return (
    <div className="flex gap-4 items-center">
        <span>Luis tiene <strong>{friends.luis}</strong> amigos</span>
        <button onClick={increaseLuis}>Aumentar +1 los amigos de Luis</button>
    </div>
    <div className="flex gap-4 items-center">
        <span>Paco tiene <strong>{friends.paco}</strong> amigos</span>
        <button onClick={increasePaco}>Aumentar +1 los amigos de Paco</button>
    </div>
)
  `}
      </CodeBlock>
      <div className="flex gap-4 items-center">
        <span>
          Luis tiene <strong>{friends.luis}</strong> amigos
        </span>
        <button onClick={increaseLuis}>Aumentar +1 los amigos de Luis</button>
      </div>
      <div className="flex gap-4 items-center">
        <span>
          Paco tiene <strong>{friends.paco}</strong> amigos
        </span>
        <button onClick={increasePaco}>Aumentar +1 los amigos de Paco</button>
      </div>
      <p>O algo mejor:</p>
      <CodeBlock>
        {`

const [friends, setFriends] = useState({
    luis: 0,
    paco: 0
  });
  
  const increaseFriend = (friendName) => setFriends(prevFriends => ({
    ...prevFriends, 
    [friendName]: prevFriends[friendName] + 1
  }));

  return (
    <div className="flex gap-4 items-center">
        <span>Luis tiene <strong>{friends.luis}</strong> amigos</span>
        <button onClick={() => increaseFriend('luis')}>Increase Luis</button>
    </div>
    <div className="flex gap-4 items-center">
        <span>Paco tiene <strong>{friends.paco}</strong> amigos</span>
        <button onClick={() => increaseFriend('paco')}>Increase Paco</button>
    </div>
)
  `}
      </CodeBlock>
      <p>En ambos casos hacemos uso del Spread Operator (...estado), que lo que hace es crear una copia del objeto y aplicarle algunos cambios a ese objeto en lugar de modificar el estado directamente. Así respeta el principio de inmutabilidad de React, que es fundamental para la gestión del estado. También se puede hacer con arrays.</p>
      <h2 className="text-2xl mb-6 w-fit underline">Actualizar un array</h2>
      <p>De la misma forma podemos actualizar un array haciendo una copia del mismo y haciendo las modificaciones desde ahí.</p>
      <div>
        <button onClick={addNextNumber}>Añade el siguiente número</button>
        <ul className="flex gap-2 my-2 max-w-full flex-wrap">
            {numbers.map((number, index) => (
            <li key={index}>{number}</li>
            ))}
        </ul>
      </div>
    
      <CodeBlock>
        {`

const [numbers, setNumbers] = useState([1, 2, 3]);

const addNextNumber = () => {
    const maxNumber = Math.max(...numbers);
    const nextNumber = maxNumber + 1;
    setNumbers(prevNumbers => [...prevNumbers, nextNumber]);
};

  return (
    <>
        <button onClick={addNextNumber}>Añade el siguiente número</button>
        <ul className="flex gap-2 my-2">
        {numbers.map((number, index) => (
        <li key={index}>{number}</li>
        ))}
        </ul>
    </>
)
  `}
      </CodeBlock>
      <p>Esto es todo lo que quería explicar sobre useState. ¡Espero que te haya gustado la explicación!</p>
      <Link href="/">
        <a className="link">Ir a Inicio</a>
      </Link>
    </section>
  )
}

export default PageUseState
