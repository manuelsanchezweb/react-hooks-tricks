import CodeBlock from '../component/code-block'
import Heading from '../component/heading'
import Pagination from '../component/pagination'
import useWindowWidth from '../hooks/useWindowWidth'

const PageUseWindowWidth = () => {
  const windowWidth = useWindowWidth()

  return (
    <section className="flex flex-col gap-4 mb-12">
      <Heading title="useWindowWidth" />

      <p>
        Este es un custom hook en el que combinando useState y useEffect vamos a
        lograr añadir <code>resize</code> a <code>window</code> y recuperar el
        resultado sin nunca dejar de escuchar el evento. Muy útil cuando quieres
        realizar algo en determinadas resoluciones.
      </p>

      <CodeBlock>
        {`
    function useWindowWidth() {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        useEffect(() => {
          window.addEventListener('resize', handleResize);
    
          return () => {
              window.removeEventListener('resize', handleResize);
          };
        }, []); // Este efecto no depende de ninguna prop o estado, así que no tiene dependencias y se ejecutará una sola vez
    
        return windowWidth;
    }
    
    export default useWindowWidth;
    `}
      </CodeBlock>

      <p>Luego solo lo tenemos que importar de la siguiente forma:</p>

      <CodeBlock>
        {`
    import useWindowWidth from './hooks/useWindowWidth'; 

    function App() {
        const windowWidth = useWindowWidth();
      
        return <p>Tu pantalla tiene <strong>{windowWidth}</strong> píxeles ahora mismo.</p>;
      }
            `}
      </CodeBlock>

      <p>
        Tu pantalla tiene <strong>{windowWidth}</strong> píxeles ahora mismo.
      </p>

      <Pagination />
    </section>
  )
}

export default PageUseWindowWidth
