import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import searchicon from '../../../../assets/search-icon.png';

// Componente del formulario
function SearchBar() {
  const [toSearch, setToSearch] = useState('');
//  const history = useHistory();

  // Función para manejar cambios en la caja de texto
  const changeHandler = (event) => {
    setToSearch(event.target.value);
  };

  // Función para manejar el envío del formulario
  const submitHandler = (event) => {
    event.preventDefault();
//    history.push(`/otro-componente/${toSearch}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={toSearch} onChange={changeHandler} placeholder="Busar productos..." className="search-bar"/>
	<button type="submit">
	    <img src={searchicon} alt="Search Icon"/>
	</button>
    </form>
  );
}
export default SearchBar;
