import React from "react";
import "./paginacao.css";

const Paginacao = ({ itemsPorPagina, totalItems, pagina, paginaAtual }) => {
  const numeroPaginas = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPorPagina); i++) {
    numeroPaginas.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {numeroPaginas.map((numero) => (
          <li key={numero} className={`page-item ${numero === paginaAtual ? 'active' : ''}`}>
            <button
              onClick={() => pagina(numero)}
              className="page-link"
              aria-current={numero === paginaAtual ? "page" : undefined}
            >
              {numero}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginacao;
