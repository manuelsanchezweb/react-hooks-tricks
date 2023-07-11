import { ARRAY_ROUTES } from '../data/routes'
import { Route } from 'wouter'

const RoutingSystem = () => {
  return (
    <>
      {ARRAY_ROUTES.map((route) => (
        <Route path={route.path} component={route.component} key={route.path} />
      ))}
    </>
  )
}

export default RoutingSystem
