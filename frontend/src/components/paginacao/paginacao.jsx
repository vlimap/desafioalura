import "./paginacao.css";

// Componente Paginacao responsável por renderizar a barra de navegação de páginas
const Paginacao = ({ itemsPorPagina, totalItems, pagina, paginaAtual }) => {
  const numeroPaginas = [];

  // Calcula o número total de páginas e preenche o array `numeroPaginas`
  for (let i = 1; i <= Math.ceil(totalItems / itemsPorPagina); i++) {
    numeroPaginas.push(i);
  }

  // Função que navega para a página anterior, caso não esteja na primeira página
  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      pagina(paginaAtual - 1); 
    }
  };

  // Função que navega para a próxima página, caso não esteja na última página
  const irParaProximaPagina = () => {
    if (paginaAtual < numeroPaginas.length) {
      pagina(paginaAtual + 1); 
    }
  };

  return (
    <nav>
      <ul className="pagination">

        {/* Botão de Voltar */}
        <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
          <button
            onClick={irParaPaginaAnterior}   
            className="page-link"            
            aria-label="Página anterior"     
            disabled={paginaAtual === 1}    
          >
            &lt;
          </button>
        </li>

        {/* Números de Páginas */}
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

        {/* Botão de Avançar */}
        <li className={`page-item ${paginaAtual === numeroPaginas.length ? 'disabled' : ''}`}>
          <button
            onClick={irParaProximaPagina}     
            className="page-link"            
            aria-label="Próxima página"       
            disabled={paginaAtual === numeroPaginas.length} 
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacao;
