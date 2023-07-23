import PageUseDebounce from '../pages/custom-use-debounce'
import PageUseWindowWidth from '../pages/custom-use-window-width'
import PageHome from '../pages/home'
import PageUseEffect from '../pages/use-effect'
import PageUseMemo from '../pages/use-memo'
import PageUseReducer from '../pages/use-reducer'
import PageUseRef from '../pages/use-ref'
import PageUseState from '../pages/use-state'

export interface Route {
  name: string
  path: string
  component: React.FC
}

export type Category = 'Básico' | 'React Hook' | 'Custom Hook'

type Routes = {
  [K in Category]: Route[]
}

export const routes: Routes = {
  Básico: [{ name: 'Inicio', path: '/', component: PageHome }],
  'React Hook': [
    { name: 'Hook useState', path: '/use-state', component: PageUseState },
    { name: 'Hook useEffect', path: '/use-effect', component: PageUseEffect },
    { name: 'Hook useMemo', path: '/use-memo', component: PageUseMemo },
    { name: 'Hook useRef', path: '/use-ref', component: PageUseRef },
    {
      name: 'Hook useReducer',
      path: '/use-reducer',
      component: PageUseReducer,
    },
  ],
  'Custom Hook': [
    {
      name: 'Hook useDebounce',
      path: '/use-debounce',
      component: PageUseDebounce,
    },
    {
      name: 'Hook useWindowWidth',
      path: '/use-window-width',
      component: PageUseWindowWidth,
    },
  ],
}

export const ARRAY_ROUTES = Object.values(routes).flat()
