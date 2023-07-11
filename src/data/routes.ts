import PageUseDebounced from "../pages/custom-use-debounced"
import PageUseWindowWidth from "../pages/custom-use-window-width"
import PageHome from "../pages/home"
import PageUseEffect from "../pages/use-effect"
import PageUseMemo from "../pages/use-memo"
import PageUseState from "../pages/use-state"

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
  'Básico': [
    { name: 'Inicio', path: '/', component: PageHome },
  ],
  'React Hook': [
    { name: 'Hook useState', path: '/use-state', component: PageUseState },
    { name: 'Hook useEffect', path: '/use-effect', component: PageUseEffect },
    { name: 'Hook useMemo', path: '/use-memo', component: PageUseMemo },
  ],
  'Custom Hook': [
    { name: 'Hook useDebounced', path: '/use-debounced', component: PageUseDebounced  },
    { name: 'Hook useWindowWidth', path: '/use-window-width', component: PageUseWindowWidth },
  ],
}

export const ARRAY_ROUTES = Object.values(routes).flat();
