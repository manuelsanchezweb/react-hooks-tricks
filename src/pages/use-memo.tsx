import { useState, useMemo } from 'react'
import CodeBlock from '../component/code-block'
import Disgression from '../component/disgression'
import Heading from '../component/heading'
import Pagination from '../component/pagination'

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
      <Heading title='useMemo' />

      <Disgression
        title="Esta página está en construcción"
        content="¡Esperamos tenerla lista pronto!"
      />

      <p>Con useMemo lo que podemos hacer es ganar en rendimiento ya que</p>

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
    )
    `}
      </CodeBlock>

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

      <Pagination />
    </section>
  )
}

export default PageUseMemo
