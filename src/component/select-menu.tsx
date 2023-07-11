import React from 'react'
import { useLocation } from 'wouter'
import { Category, routes } from '../data/routes'

const SelectMenu = () => {
  const [location, setLocation] = useLocation()

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value)
  }

  return (
    <div className="flex flex-col items-center gap-4 my-6">
      <div className="select-wrapper">
      <select className="border border-black rounded-md text-xs py-3 max-w-[200px]" onChange={handleSelectChange} value={location}>
          { (Object.keys(routes) as Category[]).map(category => (
            <optgroup label={category} key={category}>
              {routes[category].map(route => (
                <option value={route.path} key={route.path}>
                  {route.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectMenu
