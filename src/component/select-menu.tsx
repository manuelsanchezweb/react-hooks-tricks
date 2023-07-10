import React from 'react'
import { useLocation } from 'wouter'

const SelectMenu = () => {
  const [location, setLocation] = useLocation()

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value)
  }

  const REACT_HOOKS = [
    { value: '/use-state', label: 'Hook useState' },
    { value: '/use-effect', label: 'Hook useEffect' },
    { value: '/use-memo', label: 'Hook useMemo' },
    // { value: '/use-callback', label: 'Hook useCallback' },
    // { value: '/use-ref', label: 'Hook useRef' },
  ]

  const CUSTOM_HOOKS = [
    // { value: '/use-input', label: 'Hook useInput' },
    { value: '/use-debounced', label: 'Hook useDebounced' },
    { value: '/use-window-width', label: 'Hook useWindowWidth' },
  ]

  return (
    <div className="flex flex-col items-center gap-4 my-6">
      <div className="select-wrapper">
        <select
          className="border border-black rounded-md text-xs py-3 max-w-[200px]"
          onChange={handleSelectChange}
          value={location}
          name="content"
        >
          <option value="/">Inicio</option>
          <optgroup label="React Hooks">
            {REACT_HOOKS.map((hook, index) => (
              <option key={index} value={hook.value}>
                {hook.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Custom Hooks">
            {CUSTOM_HOOKS.map((hook, index) => (
              <option key={index} value={hook.value}>
                {hook.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  )
}

export default SelectMenu
