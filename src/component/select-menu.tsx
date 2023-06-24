import React from 'react';
import { useLocation } from 'wouter';

const SelectMenu = () => {
    const [location, setLocation] = useLocation();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLocation(event.target.value);
    };

    
    return (
        <div className="flex flex-col items-center gap-4 my-6">
        <label htmlFor="content">Contenido de React</label>
        <div className="select-wrapper">
        <select className="border border-black px-2 py-4 max-w-[200px]" onChange={handleSelectChange} value={location} name='content'>
          <option value="/">Inicio</option>
          <option value="/use-state">Hook useState</option>
          <option value="/use-effect">Hook useEffect</option>
        </select>
        </div>
      </div>
    );
};

export default SelectMenu;