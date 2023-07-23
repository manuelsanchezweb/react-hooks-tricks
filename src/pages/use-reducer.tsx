import { useEffect, useReducer } from 'react'
import Disgression from '../component/disgression'
import Heading from '../component/heading'
import Pagination from '../component/pagination'
import { Link } from 'wouter'
import CodeBlock from '../component/code-block'

const ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
} as const

type State = {
  isLoading: boolean
  isError: boolean
  data: any[]
  errorMessage: string
}

type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

type Action =
  | { type: typeof ACTIONS.FETCH_INIT }
  | { type: typeof ACTIONS.FETCH_SUCCESS; payload: any[] }
  | { type: typeof ACTIONS.FETCH_FAILURE; error: string }

function dataFetchReducer(state: State, action: Action) {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: '',
      }
    case ACTIONS.FETCH_SUCCESS:
      const successAction = action as {
        type: typeof ACTIONS.FETCH_SUCCESS
        payload: User[]
      }
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: successAction.payload,
        errorMessage: '',
      }
    case ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error,
      }
    default:
      throw new Error()
  }
}

const PageUseReducer = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
    errorMessage: '',
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      dispatch({ type: ACTIONS.FETCH_INIT })

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )

        if (!response.ok) {
          let errorMessage = ''
          switch (response.status) {
            case 403:
              errorMessage = 'No tienes permisos para ver esto o hacer fetch.'
              break
            case 500:
              errorMessage = 'Error interno del servidor.'
              break
            default:
              errorMessage = 'Ha habido un problema con la respuesta.'
          }
          throw new Error(errorMessage)
        }

        const data = (await response.json()) as User[]
        if (isMounted) dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data })
      } catch (error) {
        if (isMounted && error instanceof Error) {
          dispatch({ type: ACTIONS.FETCH_FAILURE, error: error.message })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="flex flex-col gap-4 mb-12">
      <Heading title="useReducer" />

      <p>
        Aquí tenemos <code>useReducer</code>, que es un hook de React al que
        mucha gente le tiene miedo y que puede suponer algo de dificultad. Vamos
        a intentar explicarlo de la forma más simple posible.
      </p>
      <p>
        De forma general, con useReducer podemos manejar estados más complejos
        que con <Link href="/use-state">useState</Link>. Podríamos tener varios
        estados distintos: como el de loading, el de error y el de datos. Con
        useState tendríamos que crear un estado para cada uno de ellos, pero con
        useReducer podemos tener un único estado que contenga todos ellos y
        actualizarlos de forma independiente a través de un <code>reducer</code>{' '}
        y <code>acciones</code>.
      </p>

      <Heading variant="h2" title="Ejemplo de reducer y acciones" />

      <Disgression
        title="Aviso sobre TypeScript"
        content="Ya sabes que está muy de moda hoy en día, además de que es buena idea, usar TypeScript. Por ello, y porque no encontraba un ejemplo de useReducer con TypeScript, he decidido hacerlo yo mismo. Si no usas TypeScript, sáltate los tipados y no te preocupes."
      />

      <CodeBlock>
        {`

    const ACTIONS = {
        FETCH_INIT: 'FETCH_INIT',
        FETCH_SUCCESS: 'FETCH_SUCCESS',
        FETCH_FAILURE: 'FETCH_FAILURE',
    } as const

    function dataFetchReducer(state: State, action: Action) {
        switch (action.type) {
          case ACTIONS.FETCH_INIT:
            return {
              ...state,
              isLoading: true,
              isError: false,
              errorMessage: '',
            }
          case ACTIONS.FETCH_SUCCESS:
            const successAction = action as {
              type: typeof ACTIONS.FETCH_SUCCESS
              payload: User[] // estos son los datos que esperamos recibir (en este caso, un array de usuarios que hemos definido con ts)
            }
            return {
              ...state,
              isLoading: false,
              isError: false,
              data: successAction.payload,
              errorMessage: '',
            }
          case ACTIONS.FETCH_FAILURE:
            return {
              ...state,
              isLoading: false,
              isError: true,
              errorMessage: action.error,
            }
          default:
            throw new Error()
        }
      }
    `}
      </CodeBlock>

      <p>
        En el caso de arriba guardamos en una constante las tres acciones para
        lidiar mejor con los <code>magic strings</code> y vemos cuáles son los
        tres tipos de acciones que hemos definido y lo que sucederá en cada
        caso:
      </p>

      <ul className="list-disc pl-10">
        <li>
          En el caso de <code>ACTIONS.FETCH_INIT</code> empezamos activando el
          estado de carga y desactivando el de error. También vacíamos el
          mensaje de error.
        </li>
        <li>
          Luego, tenemos <code>ACTIONS.FETCH_SUCCESS</code>, que es la acción
          que se ejecutará cuando la petición haya llegado a buen puerto. En
          este caso, guardamos los datos que nos llegan en el estado y
          desactivamos el estado de carga y de error.
        </li>
        <li>
          Por último, tenemos <code>ACTIONS.FETCH_FAILURE</code>, que es la
          acción que se ejecutará cuando la petición haya fallado. En este caso,
          guardamos el mensaje de error en el estado y desactivamos el estado de
          carga.
        </li>
      </ul>

      <p>
        Es importante que inicialicemos los estados llamando al{' '}
        <code>useReducer</code> en el componente.
      </p>

      <CodeBlock>
        {`
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: [],
        errorMessage: '',
    })
    `}
      </CodeBlock>

      <p>
        Y por fin lo combinaremos con nuestro useEffect. En este caso, si me lo
        permites, voy a poner un ejemplo algo más complejo que el que estudiamos
        en el apartado de <Link href="use-effect">useEffect</Link>. Vamos a
        gestionar <code>unmounting</code> y <code>estados de error</code> de la
        respuesta.
      </p>

      <CodeBlock>
        {`
    useEffect(() => {
        let isMounted = true
    
        const fetchData = async () => {
          dispatch({ type: ACTIONS.FETCH_INIT })
    
          try {
            const response = await fetch(
              'https://jsonplaceholder.typicode.com/users'
            )
    
            if (!response.ok) {
              let errorMessage = ''
              switch (response.status) {
                case 403:
                  errorMessage = 'No tienes permisos para ver esto o hacer fetch.'
                  break
                case 500:
                  errorMessage = 'Error interno del servidor.'
                  break
                default:
                  errorMessage = 'Ha habido un problema con la respuesta.'
              }
              throw new Error(errorMessage)
            }
    
            const data = (await response.json()) as User[]
            if (isMounted) dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data })
          } catch (error) {
            if (isMounted && error instanceof Error) {
              dispatch({ type: ACTIONS.FETCH_FAILURE, error: error.message })
            }
          }
        }
    
        fetchData()
    
        return () => {
          isMounted = false
        }
      }, [])
    `}
      </CodeBlock>

      <p>
        Lo importante es entender que en el <code>dispatch</code> es donde vamos
        a pasar la acción que queremos que se active, además de la otra
        información que sea necesaria para cada una de las acciones, como puede
        ser el <code>payload</code> en el caso de{' '}
        <code>ACTIONS.FETCH_SUCCESS</code> o el <code>error</code> en el caso de{' '}
        <code>ACTIONS.FETCH_FAILURE</code>
      </p>

      <p>
        Y luego simplemente para presentar la información, lo podemos hacer como
        lo hago justo a continuación:
      </p>

      <CodeBlock>
        {`
    {state.isError && <div>{state.errorMessage}</div>}

    {state.isLoading ? (
      <div>Loading...</div>
    ) : (
      <ul>
        {state.data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    )}
    `}
      </CodeBlock>

      {state.isError && <div>{state.errorMessage}</div>}

      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Heading variant="h3" title="Lista de usuarios" />
          <ul className="flex flex-wrap gap-2">
            {state.data.map((user: any) => (
              <li key={user.id}>- {user.name}</li>
            ))}
          </ul>
        </>
      )}

      <Pagination />
    </section>
  )
}

export default PageUseReducer
