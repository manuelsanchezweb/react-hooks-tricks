import { Route } from 'wouter'
import PageUseState from './pages/use-state'
import PageUseEffect from './pages/use-effect'
import PageHome from './pages/home';
import SelectMenu from './component/select-menu';

function App() {

  return (
    <>
      <SelectMenu />
     
      <Route path="/home" component={PageHome} />
      <Route path="/use-state" component={PageUseState} />
      <Route path="/use-effect" component={PageUseEffect} />
    </>
  )
}

export default App
