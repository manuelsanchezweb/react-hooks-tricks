import { useLocation } from 'wouter'
import { ARRAY_ROUTES as routes } from '../data/routes'

const Pagination = () => {
  const [location, setLocation] = useLocation()

  // Find the index of the current route
  const currentIndex = routes.findIndex((route) => route.path === location)

  // Determine the previous and next routes
  const previousRoute = routes[currentIndex - 1]
  const nextRoute = routes[currentIndex + 1]

  return (
    <div className="flex flex-col sm:flex-row gap-4 my-6">
      {currentIndex !== 0 && (
        <button
          disabled={!previousRoute}
          onClick={() => setLocation(previousRoute.path)}
        >
          {previousRoute.name}
        </button>
      )}

      {currentIndex !== routes.length - 1 && currentIndex !== 0 && (
        <button
          disabled={!nextRoute}
          onClick={() => setLocation(nextRoute.path)}
        >
          {nextRoute.name}
        </button>
      )}
    </div>
  )
}

export default Pagination
