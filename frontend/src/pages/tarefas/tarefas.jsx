import { useState, useEffect } from "react";
import exibirTarefas from "../../api/exibirTarefas";
import excluirTarefa from "../../api/excluirTarefa"; 
import SearchBar from "../../components/searchbar/searchbar";
import "./tarefas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
function ListaDeTarefas({ showSearchBar = true }) {
  const [tarefas, setTarefas] = useState([]);
  const [filteredTarefas, setFilteredTarefas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefasObtidas = await exibirTarefas();
        setTarefas(tarefasObtidas);
        setFilteredTarefas(tarefasObtidas);
      } catch (error) {
        setError("Não foi possível carregar as tarefas. Tente novamente mais tarde.");
      }
    };

    fetchTarefas();
  }, []);

  const handleSearch = () => {
    const filtered = tarefas.filter(tarefa => 
      tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTarefas(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await excluirTarefa(id); 
      const updatedTarefas = tarefas.filter((tarefa) => tarefa._id !== id);
      setTarefas(updatedTarefas);
      setFilteredTarefas(updatedTarefas);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  return (
    <div className="conteudo-principal">
      {showSearchBar && (
        <SearchBar 
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
          showSearchBar={true}
        />
      )}
      <h2 className="lista-tarefas__titulo">Tarefas Recentes</h2>
      <ul className="lista__tarefas">
        {filteredTarefas.map((tarefa) => (
          <li key={tarefa._id} className="container__tarefa">
            <div className="conteudo__tarefa">
              <div className="tarefas__etiquetas">
                <div
                  className={`etiqueta__prioridade ${getPrioridadeClass(
                    tarefa.prioridade
                  )}`}
                >
                  {tarefa.prioridade}
                </div>
                <div className="etiqueta">
                  {new Date(tarefa.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
                {tarefa.responsaveis.map((resp) => (
                  <div key={resp} className="etiqueta">
                    {resp}
                  </div>
                ))}
              </div>
              <div className="container__tarefa--descricao">
                <h2 className="descricao__tarefa--titulo">{tarefa.titulo}</h2>
                <p>{tarefa.descricao}</p>
              </div>
            </div>
            <button
              className="tarefa__botao-deletar"
              onClick={() => handleDelete(tarefa._id)}
            >
              <FontAwesomeIcon icon={faTrash} className="tarefa__botao-deletar__icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getPrioridadeClass(prioridade) {
  switch (prioridade) {
    case "Alta":
      return "etiqueta__prioridade--alta";
    case "Média":
      return "etiqueta__prioridade--media";
    case "Baixa":
      return "etiqueta__prioridade--baixa";
    default:
      return "";
  }
}

export default ListaDeTarefas;
