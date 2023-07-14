import { useEffect, useState } from 'react'
import Disgression from '../component/disgression'
import CodeBlock from '../component/code-block'
import { Link } from 'wouter'
import Heading from '../component/heading'
import Pagination from '../component/pagination'

const PageUseEffect = () => {
  interface User {
    name: string
    // Add any other properties from the API response
  }

  const [data, setData] = useState<User[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [filterName, setFilterName] = useState('')

  console.log(setIsLoading, setError)

  // Handle de loading y error states
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch(
  //         'https://jsonplaceholder.typicode.com/usersGOKUUU'
  //       );
  //       const result = await response.json();

  //       setData(result);
  //       console.log(result);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Handle con dependencias
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        let result = await response.json()

        // filter the result if filterName is not empty
        if (filterName) {
          result = result.filter((user: User) =>
            user.name.toLowerCase().includes(filterName.toLowerCase())
          )
        }

        setData(result)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [filterName])

  // 1. Carga inicial
  useEffect(() => {
    console.log('El componente se ha montado')
  }, [])

  // 2. Añadir el evento resize al window
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    // Esto es lo que se llama un 'cleanup function'. Se ejecutará cuando el componente se desmonte, o antes de que el efecto se vuelva a ejecutar.
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Nota: los corchetes vacíos significa que este useEffect se ejecutará una vez al montarse el componente y no en actualizaciones subsecuentes.

  return (
    <section className="flex flex-col gap-4 mb-12">
      <Heading title="useEffect" />
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

      <p>
        Estas son{' '}
        <strong>
          las tres fases que componen el ciclo de vida de un componente
        </strong>
        .
      </p>

      <Disgression
        title="¿Por qué se suele utilizar useEffect a la hora de hacer fetch?"
        content="Es un clásico ejemplo de algo que queremos que ocurra una vez el componente, digamos por ejemplo una lista, esté montado en la página. Una vez pase eso, hacemos un fetch y en el mejor de los casos miraremos estados de carga y de error y lo gestionaremos combinando <a href='/use-state'>useState</a> y useEffect."
      />

      <Heading variant="h2" title="Cuando montamos el componente..." />

      <p>
        Veamos el caso más sencillo de todos. Vamos a mandar un{' '}
        <code>console.log</code> a la consola cuando el componente se cargue.
        Puedes abrir las herramientas del desarrollador y comprobar como recibes
        el console.log que dice que el componente, en este caso la página
        entera, se ha montado.
      </p>

      <CodeBlock>
        {`
    useEffect(() => {
        console.log('El componente se ha montado')
    }, []) // Esta es la dependencia que hace que se ejecute solo una vez)
    `}
      </CodeBlock>

      <Heading
        variant="h2"
        title="Otro ejemplo, pero esta vez contemplamos desmontarse"
      />

      <p>
        Algunos de los usos más frecuentes de useEffect es cuando tenemos que
        añadirle un evento a un elemento y para ello necesitamos esperar a que
        la página se cargue por completo. Echémosle un vistazo al siguiente caso
        en el que vamos a conseguir añadir <code>resize</code> a la{' '}
        <code>window</code> para así poder acceder en todo momento a la{' '}
        <code>window.innerWidth</code> y mostrarlo en pantalla.
      </p>

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

      <p>
        Tu pantalla tiene <strong>{windowWidth}</strong> píxeles ahora mismo.
      </p>

      <Disgression
        title="¿Por qué debemos hacer la cleanup function?"
        content="<p>Si no lo haces, puede que notes que el componente seguirá funcionando y que todo está bien, sobre todo en aplicaciones pequeñas. Sin embargo, es buena práctica considerar el <strong>unmounting</strong> de un componente para así evitar efectos no deseados, ya que si no lo hacemos, el <strong>event listener</strong> seguiría activo y vete tú a saber qué comportamiento extraño podría ocasionar. Además, de que ganamos en rendimiento, ya que así el navegador no tiene que gastar recursos en realizar la función cada vez que el evento tiene lugar. Así que siempre que puedas, te recomiendo que hagas la cleanup function.</p>
        "
      />

      <p>
        Por cierto, esto es un ejemplo fantástico de cómo podemos extraer un
        poco de código para crear un hook reutilizable, podríamos llamarlo{' '}
        <Link href="/use-window-width">useWindowWidth.</Link>
      </p>

      <Heading
        variant="h2"
        title="Ahora vamos a ver un ejemplo de actualización con fetch"
      />

      <p>
        Vamos a entrar ya en faena a los casos más prácticos donde vamos a hacer
        un <strong>fetch</strong> a un endpoint{' '}
        <a
          target="_blank"
          rel="nofollow noopener"
          href="https://jsonplaceholder.typicode.com/users"
        >
          (https://jsonplaceholder.typicode.com/users)
        </a>{' '}
        para luego guardar los datos en una variable <strong>data</strong>.
        Vemos que el estado inicial que hemos creado es <strong>null</strong> y
        que luego vamos a pasarle el resultado. De esta forma vamos a poder
        mostrar los nombres de la gente en pantalla. Por querer simplificar, no
        he querido hacer estados de <strong>loading</strong> o de{' '}
        <strong>error</strong> por el momento.
      </p>

      <CodeBlock>
        {`
    const [data, setData] = useState(null)

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


    return (
      <ul className='grid grid-cols-2 md:grid-cols-3'>
        {data &&
          data.map((user: any, index: number) => (
            <li className="p-4" key={index}>{user.name}</li>
          ))}
      </ul>
    )
    `}
      </CodeBlock>

      <ul className="grid grid-cols-2 md:grid-cols-3">
        {data &&
          data?.length > 0 &&
          data.map((user: any, index: number) => (
            <li className="p-4" key={index}>
              {user.name}
            </li>
          ))}
      </ul>

      <Heading
        variant="h2"
        title="Gestionando los estados de 'loading' y 'error'"
      />

      <p>
        Un caso muy típico con useEffect y fetch es cuando hacemos una llamada y
        tenemos que mostrarle al usuario los distintos estados: que estamos en
        mitad de la llamada, que ha salido bien o que ha salido mal. Para ello,
        podemos crear un par de variables más con useState y modificar el
        código.
      </p>

      <CodeBlock>
        {`
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
          );
          if(!response.ok) throw Error('Ha habido un problema con la API en la respuesta');
          const result = await response.json();
  
          setData(result);
          console.log(result);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);


    return (
      <ul className='grid grid-cols-2 md:grid-cols-3'>
      {isLoading && <p>Loading...</p>}
      {error && <p className='text-red-500'>Ha habido un error: {error.message}</p>}
      {data &&
        data.map((user: any, index: number) => (
          <li className="p-4" key={index}>{user.name}</li>
        ))}
    </ul>
    )
    `}
      </CodeBlock>

      <ul className="grid grid-cols-2 md:grid-cols-3">
        {isLoading && <p>Loading...</p>}
        {error && (
          <p className="text-red-500">Ha habido un error: {error.message}</p>
        )}
        {data &&
          data.length > 0 &&
          data.map((user: any, index: number) => (
            <li className="p-4" key={index}>
              {user.name}
            </li>
          ))}
      </ul>

      <Heading variant="h2" title="Las dependencias de useEffect" />

      <p>
        Pero qué pasa si queremos mostrar usuarios dependiendo de un filtro.
        Digamos que queremos filtrar a través de un input por nombre de usuario.
        Ahí podríamos hacer lo siguiente:
      </p>

      <CodeBlock>
        {`
  const [data, setData] = useState<User[] | null>(null)
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        let result = await response.json()

        // Filtra el resultado si hay algo en filterName
        if (filterName) {
          result = result.filter((user: User) =>
            user.name.toLowerCase().includes(filterName.toLowerCase())
          )
        }

        setData(result)
        console.log(result)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }, [filterName]) // Añadimos filterName como dependencia para que se ejecute cada vez que cambie

    return (
      <ul className='grid grid-cols-2 md:grid-cols-3'>
        {data 
          ? data.map((user: any, index: number) => (
            <li className="p-4" key={index}>{user.name}</li>
          ))
          : <p>No hay resultados</p>
        }
      </ul>
      )
    `}
      </CodeBlock>

      <input
        className="border border-gray-300 p-4 rounded-sm text-black bg-gray-100 placeholder:text-black"
        type="text"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="Filtra por nombre"
      />

      <ul className="grid grid-cols-2 md:grid-cols-3">
        {data && data?.length > 0 ? (
          data.map((user: any, index: number) => (
            <li className="p-4" key={index}>
              {user.name}
            </li>
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </ul>

      <p>
        Y como puedes comprobar, esta solución funciona, pero en mi opinión
        tenemos como mínimo dos problemas:
      </p>

      <ul className="list-disc pl-10">
        <li>
          Estamos haciendo un fetch cada vez que actualizamos una variable, lo
          cual no es muy eficiente. Sería mejor filtrar directamente de los
          datos que ya tenemos. Para ellos podríamos hacer uso del{' '}
          <Link href="/use-memo">useMemo</Link>.
        </li>
        <li>
          La variable filterName se actualiza cada vez que escribimos{' '}
          <strong>un caracter</strong>. Esto tampoco es eficiente. Para ello hay
          soluciones como decir que se actualice cada <strong>300ms</strong>{' '}
          después de que el usuario haya dejado de escribir. Esto lo podemos
          lograr con un <strong>Hook</strong> que se llama{' '}
          <Link href="/use-debounce">useDebounce</Link>.
        </li>
      </ul>

      <Pagination />
    </section>
  )
}

export default PageUseEffect
