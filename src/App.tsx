import { Link } from 'wouter'
import SelectMenu from './component/select-menu'
import ToggleSwitcher from './component/toggle-mode'
import RoutingSystem from './component/routing-system'
import Pagination from './component/pagination'
import ScrollToTop from './hoc/ScrollToTop'

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

      <Pagination />

      <ScrollToTop>
        <RoutingSystem />
      </ScrollToTop>
    </>
  )
}

export default App
