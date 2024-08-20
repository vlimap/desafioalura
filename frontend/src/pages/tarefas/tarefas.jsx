import { useState, useEffect } from "react";
import exibirTarefas from "../../api/exibirTarefas";
import excluirTarefa from "../../api/excluirTarefa"; 
import SearchBar from "../../components/searchbar/searchbar";
import "./tarefas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ListaDeTarefas({ showSearchBar = true }) {
  const [tarefas, setTarefas] = useState([]);
  const [filteredTarefas, setFilteredTarefas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [liveRegionMessage, setLiveRegionMessage] = useState("");

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

  useEffect(() => {
    if (liveRegionMessage) {
      setTimeout(() => setLiveRegionMessage(""), 3000); 
    }
  }, [liveRegionMessage]);

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
      setLiveRegionMessage(`Tarefa excluída: ${id}`);
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
          <section key={tarefa._id} aria-labelledby={`tarefa-titulo-${tarefa._id}`}>
            <li className="container__tarefa">
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
                <div 
                  className="container__tarefa--descricao"
                  aria-describedby={`tarefa-titulo-${tarefa._id} tarefa-descricao-${tarefa._id}`}
                >
                  <h2 
                    className="descricao__tarefa--titulo" 
                    id={`tarefa-titulo-${tarefa._id}`}
                  >
                    {tarefa.titulo}
                  </h2>
                  <p id={`tarefa-descricao-${tarefa._id}`}>
                    {tarefa.descricao}
                  </p>
                </div>
              </div>
              <button
                className="tarefa__botao-deletar"
                onClick={() => handleDelete(tarefa._id)}
                aria-label={`Excluir tarefa ${tarefa.titulo}`}
              >
                <FontAwesomeIcon icon={faTrash} className="tarefa__botao-deletar__icon" />
              </button>
            </li>
          </section>
        ))}
      </ul>
      <div
        role="status"
        aria-live="polite"
        style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }}
      >
        {liveRegionMessage}
      </div>
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
