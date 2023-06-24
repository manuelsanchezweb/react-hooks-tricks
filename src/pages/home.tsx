const PageHome = () => {
  return (
    <div className="flex flex-col gap-4 items-center my-12 text-center">
      <h1 className="text-3xl">Contenido de React para todos!</h1>
      <svg
        width="100%"
        height="100%"
        viewBox="-10.5 -9.45 21 18.9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm mr-0 flex origin-center transition-all ease-in-out"
      >
        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
        <g stroke="currentColor" stroke-width="1" fill="none">
          <ellipse rx="10" ry="4.5"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
      </svg>
      <p>
        ¡Usa el menu de arriba para seleccionar el contenido que quieras
        aprender!
      </p>
      <p>La página está en constante actualización :=)</p>
    </div>
  )
}

export default PageHome
