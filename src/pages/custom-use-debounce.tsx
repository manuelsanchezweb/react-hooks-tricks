import Disgression from '../component/disgression'
import Heading from '../component/heading'
import Pagination from '../component/pagination'

const PageUseDebounce = () => {
  return (
    <section className="flex flex-col gap-4 mb-12">
      <Heading title="useDebounce" />

      <Disgression
        title="Esta página está en construcción"
        content="¡Esperamos tenerla lista pronto!"
      />

      <Pagination />
    </section>
  )
}

export default PageUseDebounce
