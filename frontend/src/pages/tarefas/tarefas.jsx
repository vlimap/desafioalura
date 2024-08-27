import { useState, useEffect } from "react";
import exibirTarefas from "../../api/exibirTarefas";
import excluirTarefa from "../../api/excluirTarefa"; 
import SearchBar from "../../components/searchbar/searchbar";
import Paginacao from '../../components/pagination/paginacao';
import "./tarefas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function ListaDeTarefas({ showSearchBar = true }) {
  const [tarefas, setTarefas] = useState([]);
  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [error, setError] = useState(null);
  const [liveRegionMessage, setLiveRegionMessage] = useState("");
  
  // Estado para a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPagina, setitemsPorPagina] = useState(3);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefasObtidas = await exibirTarefas();
        setTarefas(tarefasObtidas);
        setTarefasFiltradas(tarefasObtidas);
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

  // Função de busca
  const lidarComBusca = () => {
    const filtered = tarefas.filter(tarefa => 
      tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase())
    );
    setTarefasFiltradas(filtered);
    setCurrentPage(1); 
  };

  // Função de exclusão
  const lidarComExclusao = async (id) => {
    try {
      await excluirTarefa(id); 
      const atualizarTarefas = tarefas.filter((tarefa) => tarefa._id !== id);
      setTarefas(atualizarTarefas);
      setTarefasFiltradas(atualizarTarefas);
      setLiveRegionMessage(`Tarefa excluída: ${id}`);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  // Cálculo das tarefas a serem exibidas na página atual
  const indiceUltimoItem = currentPage * itemsPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itemsPorPagina;
  const tarefasAtuais = tarefasFiltradas.slice(indicePrimeiroItem, indiceUltimoItem);

  // Função para mudar a página
  const pagina = (numeroPaginas) => setCurrentPage(numeroPaginas);

  return (
    <div className="conteudo-principal">
      {showSearchBar && (
        <SearchBar 
          termoBusca={termoBusca}
          mudancaTermoBusca={setTermoBusca}
          onSearch={lidarComBusca}
          showSearchBar={true}
        />
      )}
      <h2 className="lista-tarefas__titulo">Tarefas Recentes</h2>

      {tarefasAtuais.length === 0 ? (
        <p className="mensagem__nenhuma-tarefa">Nenhuma tarefa disponível.</p>
      ) : (
        <ul className="lista__tarefas">
          {tarefasAtuais.map((tarefa) => (
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
                  onClick={() => lidarComExclusao(tarefa._id)}
                  aria-label={`Excluir tarefa ${tarefa.titulo}`}
                >
                  <FontAwesomeIcon icon={faTrash} className="tarefa__botao-deletar__icon" />
                </button>
              </li>
            </section>
          ))}
        </ul>
      )}

      <Paginacao 
        itemsPorPagina={itemsPorPagina}
        totalItems={tarefasFiltradas.length}
        pagina={pagina}
        paginaAtual={currentPage} 
      />

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
