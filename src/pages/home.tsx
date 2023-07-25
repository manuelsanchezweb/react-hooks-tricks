import { Link } from 'wouter'

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

      <div className="flex flex-col md:items-start gap-2 md:gap-4">
        <h2 className="mt-6 text-2xl">
          Una nueva forma de aprender desarrollo web
        </h2>
        <p>
          ¡Contenido actual e inédito cada semana sobre tus tecnologías
          favoritas!
        </p>

        <a
          className="btn max-w-fit"
          target="_blank"
          title="Abonarte a la newsletter"
          href="https://manuelsanchezweb.us21.list-manage.com/subscribe?u=884780a19b6d2a27ff1395e35&id=86106f7d0c"
        >
          Sigue todo lo que hago
        </a>
      </div>
    </div>
  )
}

export default PageHome
