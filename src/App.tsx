import { Route } from 'wouter'
import PageUseState from './pages/use-state'
import PageUseEffect from './pages/use-effect'
import PageHome from './pages/home';
import SelectMenu from './component/select-menu';
import PageUseMemo from './pages/use-memo';
import PageUseDebounced from './pages/custom-use-debounced';

function App() {

  return (
    <>
      <SelectMenu />
     
      <Route path="/" component={PageHome} />
      <Route path="/use-state" component={PageUseState} />
      <Route path="/use-effect" component={PageUseEffect} />
      <Route path="/use-memo" component={PageUseMemo} />
      <Route path="/use-debounced" component={PageUseDebounced} />
    </>
  )
}

export default App
