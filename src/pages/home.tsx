import { Link } from 'wouter'
// import Newsletter from '../component/newsletter'

const PageHome = () => {
  return (
    <div className="flex flex-col gap-4 my-12">
      <h1 className="text-3xl font-bold">
        React Tricks: Hooks Fáciles Para Todos
      </h1>
      <p>
        Te damos la bienvenida a tu guía paso a paso de ejemplos de código
        prácticos donde cubriremos desde los fundamentos de los Hooks, como
        useState y useEffect, hasta los Hooks personalizados y avanzados.
      </p>
      <Link href="/use-state">
        <a>Empecemos</a>
      </Link>

      {/* <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
        <h1 className="mt-6 text-3xl md:text-5xl">
          Una nueva forma de aprender desarrollo web
        </h1>
        <p>
          ¡Contenido actual e inédito cada semana sobre tus tecnologías
          favoritas!
        </p>
        <Newsletter />
      </div> */}
    </div>
  )
}

export default PageHome
