import { Link, Route } from 'wouter'
import PageUseState from './pages/use-state'
import PageUseEffect from './pages/use-effect'
import PageHome from './pages/home'
import SelectMenu from './component/select-menu'
import PageUseMemo from './pages/use-memo'
import PageUseDebounced from './pages/custom-use-debounced'
import ToggleSwitcher from './component/toggle-mode'
import PageUseWindowWidth from './pages/custom-use-window-width'

function App() {

  return (
    <>
      <header className="flex flex-col items-start gap-4 md:flex-row md:items-center justify-between mt-8 mb-16">
        <Link href="/">
          <img src="./logo.png" alt="logo" className="h-20 cursor-pointer" />
        </Link>
        <div className="flex gap-6 items-center">
          <SelectMenu />
          <ToggleSwitcher />  
        </div>
   
      </header>

      <Route path="/" component={PageHome} />
      <Route path="/use-state" component={PageUseState} />
      <Route path="/use-effect" component={PageUseEffect} />
      <Route path="/use-memo" component={PageUseMemo} />
      <Route path="/use-debounced" component={PageUseDebounced} />
      <Route path="/use-window-width" component={PageUseWindowWidth} />
    </>
  )
}

export default App
