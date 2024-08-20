import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const LazyIcon = () => <FontAwesomeIcon icon={faSearch} />;

function SearchBar({ searchTerm, onSearchTermChange, onSearch }) {
  return (
    <div className="search-container" role="search" aria-label="Busca de Tarefas">
      <label htmlFor="search-input" className="sr-only">Buscar por título</label>
      
      <input
        id="search-input"
        type="text"
        placeholder="Buscar por título..."
        className="input-busca"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        aria-label="Campo de busca por título"
      />
      
      <button 
        type="button" 
        className="search-button" 
        onClick={onSearch} 
        aria-label="Iniciar busca"
      >
        <LazyIcon />
      </button>
    </div>
  );
}

// Definindo as PropTypes
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired, 
  onSearchTermChange: PropTypes.func.isRequired, 
  onSearch: PropTypes.func.isRequired, 
};

export default SearchBar;
