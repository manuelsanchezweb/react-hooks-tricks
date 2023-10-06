import { useMemo, useState } from 'react'
import CodeBlock from '../component/code-block'
import Heading from '../component/heading'
import Pagination from '../component/pagination'
import useDebounce from '../hooks/useDebounce'

const PageUseDebounce = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300) // Aquí añadimos 300ms de delay

  const items = [
    "Harry Potter and the Philosopher's Stone",
    'The Lord of the Rings',
    'To Kill a Mockingbird',
    'Pride and Prejudice',
    'The Great Gatsby',
    'Moby Dick',
    '1984',
    'The Catcher in the Rye',
    'War and Peace',
    'Ulysses',
    'The Odyssey',
    // ... more items ...
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [items, debouncedQuery])

  return (
    <section className="flex flex-col gap-4 mb-12">
      <Heading title="useDebounce" />

      <p>
        Este es un custom hook en el que combinando useState y useEffect vamos
        lograr añadir un <strong>delay</strong> a una acción que tiene lugar en
        un setter (useState), y dicho setter solo se va a producir si en ese
        delay no ha habido otra interacción. Con esto vamos a lograr un ahorro
        signifiticativo en rendimiento, sobre todo cuando la interacción del
        usuario.
      </p>

      <CodeBlock>
        {`
    function useDebounce<T>(value: T, delay: number): T {
      // Internal state to hold the debounced value
      const [debouncedValue, setDebouncedValue] = useState(value)
    
      useEffect(() => {
        // Set up a timer that updates the debounced value after the specified delay
        const handler = setTimeout(() => {
          setDebouncedValue(value)
        }, delay)
    
        // Cleanup function: this will cancel the previous timer whenever the value or delay changes
        return () => {
          clearTimeout(handler)
        }
      }, [value, delay])
    
      return debouncedValue
    }
    
    export default useDebounce    
    `}
      </CodeBlock>

      <h2>Caso: delay a la hora de buscar una peli</h2>

      <CodeBlock>
        {`
const [query, setQuery] = useState('')
const debouncedQuery = useDebounce(query, 300); // Aquí añadimos 300ms de delay

const items = [
  "Harry Potter and the Philosopher's Stone",
  'The Lord of the Rings',
  'To Kill a Mockingbird',
  'Pride and Prejudice',
  'The Great Gatsby',
  'Moby Dick',
  '1984',
  'The Catcher in the Rye',
  'War and Peace',
  'Ulysses',
  'The Odyssey',
  // ... more items ...
]

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setQuery(event.target.value)
}

const filteredItems = useMemo(() => {
  return items.filter((item) => item.toLowerCase().includes(debouncedQuery.toLowerCase()));
}, [items, debouncedQuery]);

`}
      </CodeBlock>

      <h3>Prueba tú mismo.</h3>

      <input
        className="border border-gray-300 p-4 rounded-sm text-black bg-gray-100 placeholder:text-black"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Harry Potter, The Lord of the Rings..."
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Pagination />
    </section>
  )
}

export default PageUseDebounce
