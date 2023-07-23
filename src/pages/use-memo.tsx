import { useState, useMemo } from 'react'
import CodeBlock from '../component/code-block'
import Heading from '../component/heading'
import Pagination from '../component/pagination'
import { Link } from 'wouter'

const PageUseMemo = () => {
  const [query, setQuery] = useState('')

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
      item.toLowerCase().includes(query.toLowerCase())
    )
  }, [items, query])

  return (
    <section className="flex flex-col gap-4 mb-12">
      <Heading title="useMemo" />

      <p>
        <code>useMemo</code> es un hook que se utiliza para memorizar el
        resultado de una función entre renderizados de forma que no haya que
        volver a efectuar dicha función. Por lo cual, la principal razón para
        utilizar useMemo es la optimización del rendimiento. Veámoslo con un
        ejemplo en el que tenemos la siguiente lista de usuarios y queremos
        mostrar items dependiendo de lo que escribamos en un input:
      </p>
      <CodeBlock>
        {`
    const items = [
        "Harry Potter and the Philosopher's Stone",
        "The Lord of the Rings",
        "To Kill a Mockingbird",
        "Pride and Prejudice",
        "The Great Gatsby",
        "Moby Dick",
        "1984",
        "The Catcher in the Rye",
        "War and Peace",
        "Ulysses",
        "The Odyssey",
    ];

    return (
      <input
        type="text"
        placeholder="Search..."
      />
    )
    `}
      </CodeBlock>
      <p>
        Supongamos que items no tiene tan solo 11 películas, sino que es una
        lista muy larga.{' '}
        <strong>
          Si quisiéramos hacer una función de filtrado, cada vez que el
          componente se renderice (por cualquier razón), se volverá a calcular
          la lista filtrada
        </strong>
        . Esto puede llevar a un rendimiento poco óptimo.
      </p>
      <p>Pero podríamos usar useMemo para mejorar las cosas:</p>
      <CodeBlock>
        {`
    const [query, setQuery] = useState('');

    const items = [
        "Harry Potter and the Philosopher's Stone",
        "The Lord of the Rings",
        "To Kill a Mockingbird",
        "Pride and Prejudice",
        "The Great Gatsby",
        "Moby Dick",
        "1984",
        "The Catcher in the Rye",
        "War and Peace",
        "Ulysses",
        "The Odyssey",
        // ... more items ...
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
    }, [items, query]);
    
    return (
      <>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </>
    )
    `}
      </CodeBlock>

      <p>
        Con <code>useMemo</code> , el cálculo de la lista filtrada sólo se
        realiza si <code>items</code> o<code>query</code> cambian. Si el
        componente se vuelve a renderizar por alguna otra razón, useMemo
        simplemente devolverá la lista filtrada previamente calculada sin volver
        a realizar el cálculo.{' '}
        <strong>
          Y en un mundo plagado de <Link href="use-state">useState</Link>, algo
          de ahorro de performance nunca viene mal.
        </strong>
      </p>

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

export default PageUseMemo
