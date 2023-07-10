import { useEffect, useState } from 'react'
import Disgression from '../component/disgression'
import CodeBlock from '../component/code-block'
import { Link } from 'wouter'

const PageUseEffect = () => {
  interface User {
    name: string
    // Add any other properties from the API response
  }

  const [data, setData] = useState<User[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        const result = await response.json()
        setData(result)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  // 1. Carga inicial
  useEffect(() => {
    console.log('El componente se ha montado')
  }, [])

  // 2. Añadir el evento resize al window 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Esto es lo que se llama un 'cleanup function'. Se ejecutará cuando el componente se desmonte, o antes de que el efecto se vuelva a ejecutar.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Nota: los corchetes vacíos significa que este useEffect se ejecutará una vez al montarse el componente y no en actualizaciones subsecuentes.

  return (
    <section className="flex flex-col gap-4 mb-12">
      <h1 className="text-3xl md:text-5xl mb-12 font-bold">useEffect</h1>
      <p>
        Nos gusta entender useEffect como un hook que nos permite hacer cosas
        cuando el componente{' '}
        <strong>se monta, se actualiza o se desmonta</strong>. Y esto es lo
        fundamental que debemos entender.
      </p>

      <ul className="list-disc pl-10">
        <li>
          Con <strong> montarse</strong> nos referimos a cuando el componente se
          carga por primera vez en el navegador.
        </li>
        <li>
          Con <strong>actualizar</strong> nos referimos a cuando el componente
          se vuelve a renderizar por cualquier motivo.
        </li>
        <li>
          Y <strong>con desmontar</strong> nos referimos a cuando el componente
          deja de estar en el navegador.
        </li>
      </ul>

      <Disgression
        title="¿Por qué se suele utilizar useEffect a la hora de hacer fetch?"
        content="Es un clásico ejemplo de algo que queremos que ocurra una vez el componente, digamos por ejemplo una lista, esté montado en la página. Una vez pase eso, hacemos un fetch y en el mejor de los casos miraremos estados de carga y de error y lo gestionaremos combinando <a href='/use-state'>useState</a> y useEffect."
      />

      <p>
        Veamos el caso más sencillo de todos. Vamos a mandar un <code>console.log</code> a la
        consola cuando el componente se cargue. Puedes abrir las herramientas
        del desarrollador y comprobar como recibes el console.log que dice que
        el componente, en este caso la página entera, se ha montado.
      </p>

      <CodeBlock>
        {`
    useEffect(() => {
        console.log('El componente se ha montado')
    }, [] // Esta es la dependencia que hace que se ejecute solo una vez)
    `}
      </CodeBlock>

      <p>Algunos de los usos más frecuentes de useEffect es cuando tenemos que añadirle un evento a un elemento y para ello necesitamos esperar a que la página se cargue por completo. Echémosle un vistazo al siguiente caso en el que vamos a conseguir añadir <code>resize</code> a la <code>window</code> para así poder acceder en todo momento a la <code>window.innerWidth</code> y mostrarlo en pantalla.</p>

      <CodeBlock>
        {`
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   const handleResize = () => {
     setWindowWidth(window.innerWidth);
   };
 
   useEffect(() => {
     window.addEventListener('resize', handleResize);
 
     // Esto es lo que se llama un 'cleanup function'. 
     // Se ejecutará cuando el componente se desmonte,
     // o antes de que el efecto se vuelva a ejecutar.
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);
 
   return (
     <div>
        <p>Tu pantalla tiene <strong>{windowWidth}</strong> píxeles ahora mismo.</p>
     </div>
   );
    `}
      </CodeBlock>

      <p>Tu pantalla tiene <strong>{windowWidth}</strong> píxeles ahora mismo.</p>

      <p>Por cierto, esto es un ejemplo fantástico de cómo podemos extraer un poco de código para crear un hook reutilizable, podríamos llamarlo <Link href="/use-window-width">useWindowWidth.</Link></p>

      <ul>
        {data &&
          data.map((user: any, index: number) => (
            <li key={index}>{user.name}</li>
          ))}
      </ul>
    </section>
  )
}

export default PageUseEffect
