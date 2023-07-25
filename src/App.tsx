import { Link } from 'wouter'
import SelectMenu from './component/select-menu'
import ToggleSwitcher from './component/toggle-mode'
import RoutingSystem from './component/routing-system'
import Pagination from './component/pagination'
import ScrollToTop from './hoc/ScrollToTop'
import React, { useEffect, useState } from 'react'

function App() {
  const [isFlag, setIsFlag] = useState(false)
  const googleTranslateElementInit = () => {
    // @ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'es',
        autoDisplay: false,
        includedLanguages: 'en,es,de,ru',
        // do not show the message of google
      },
      'google_translate_element'
    )
  }
  useEffect(() => {
    if (isFlag == true) return
    const addScript = document.createElement('script')
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    )
    document.body.appendChild(addScript)
    // @ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit
    setIsFlag(true)
  }, [])

  return (
    <>
      <div id="google_translate_element"></div>

      <React.StrictMode>
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
      </React.StrictMode>
    </>
  )
}

export default App
