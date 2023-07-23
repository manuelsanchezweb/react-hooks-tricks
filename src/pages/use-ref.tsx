import { useRef, useState } from 'react'
import Disgression from '../component/disgression'
import Heading from '../component/heading'
import Pagination from '../component/pagination'

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
]

const PageUseRef = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [filteredItems, setFilteredItems] = useState(items)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (inputRef.current) {
      const value = inputRef.current.value.toLowerCase()

      const newFilteredItems = items.filter((item) =>
        item.toLowerCase().includes(value)
      )
      setFilteredItems(newFilteredItems)
    }
  }

  return (
    <section className="flex flex-col gap-4 mb-12">
      <Heading title="useRef" />

      <Disgression
        title="Esta página está en construcción"
        content="¡Esperamos tenerla lista pronto!"
      />

      <p>
        El hook useRef es un hook un tanto desconocido, pero muy útil. Podemos
        hablar de dos casos de uso principales: Con useRef podemos guardar
        valores que persistan durante renderizados. Esa es la diferencia
        principal que tiene con useState, que se vuelve a renderizar en cuanto
        cambia su valor.
      </p>

      <ul className="list-disc pl-10">
        <li>
          Nos sirve para guardar referencias de elementos del DOM. Este es el
          uso que más se suele ver entre los usuarios de React. Encontraremos la
          referencia a dicho elemento una vez accedamos a la propiedad current
          del objeto que nos devuelve useRef.
        </li>
        <li>
          Con useRef podemos guardar valores que persistan durante renderizados,
          y esa es la diferencia principal que tiene con useState, que se vuelve
          a renderizar en cuanto cambia su valor.
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="border border-gray-300 p-4 rounded-sm text-black bg-gray-100 placeholder:text-black"
          type="text"
          placeholder="Filtra por nombre"
        />
        <button>Buscar</button>
      </form>
      {filteredItems && filteredItems.length !== 0 ? (
        <ul>
          {filteredItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No hay resultados</p>
      )}

      <Pagination />
    </section>
  )
}

export default PageUseRef
