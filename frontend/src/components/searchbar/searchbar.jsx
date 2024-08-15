import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchTerm, onSearchTermChange, onSearch }) {
  return (
    <div className="search-container">
      <h1 className="page-title">Pesquise tarefas por título ou descrição</h1>
      <input
        type="text"
        placeholder="Buscar por título..."
        className="input-busca"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <button type="button" className="search-button" onClick={onSearch}>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </button>
    </div>
  );
}

// definindo as PropTypes
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired, 
  onSearchTermChange: PropTypes.func.isRequired, 
  onSearch: PropTypes.func.isRequired, 
  showSearchBar: PropTypes.bool
};

export default SearchBar;

