import { Link } from "wouter"

const PageHome = () => {
  return (
    <div className="flex flex-col gap-4 my-12">
      <h1 className="text-3xl font-bold">React Tricks: Hooks Fáciles Para Todos</h1>
      <p>Te damos la bienvenida a tu guía paso a paso de ejemplos de código prácticos donde cubriremos desde los fundamentos de los Hooks, como useState y useEffect, hasta los Hooks personalizados y avanzados.</p>
      <Link href="/use-state">
        <a>Empecemos</a>
        </Link>
    </div>
  )
}

export default PageHome
