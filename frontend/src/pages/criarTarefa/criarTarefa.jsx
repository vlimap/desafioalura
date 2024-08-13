import { useState } from 'react';
import criarTarefa from '../../api/criarTarefa';
import '../../assets/css/tarefa.css'
import ListaDeTarefas from '../tarefas/tarefas';

function CriarTarefa() {
  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('Alta');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [responsaveis, setResponsaveis] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaTarefa = {
      titulo,
      prioridade,
      data: formatarData(data),
      descricao,
      responsaveis,
    };
    try {
      await criarTarefa(novaTarefa);
      setTitulo('');
      setPrioridade('Alta');
      setData('');
      setDescricao('');
      setResponsaveis([]);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <>
    <form id="formularioTarefas" className="formulario-tarefas" onSubmit={handleSubmit}>
      <div className="formulario-tarefas--linha-inteira">
        <div className="formulario-tarefas--linha-metade">
          <div className="formulario-tarefas--coluna">
            <label className="tituloTarefaForm">Título</label>
            <input
              id="tituloTarefaForm"
              placeholder="Ex.: Revisar código crítico"
              className="input--borda"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              minLength="5"
              maxLength="30"
            />
          </div>
        </div>
        <div className="formulario-tarefas--linha-metade">
          <div className="formulario-tarefas--coluna">
            <label htmlFor="prioridadeTarefaForm">Prioridade</label>
            <select
              id="prioridadeTarefaForm"
              className="input--borda"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
          <div className="formulario-tarefas--coluna">
            <label htmlFor="dataTarefaForm">Data</label>
            <input
              type="date"
              id="dataTarefaForm"
              className="input--borda"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="formulario-tarefas--linha-inteira">
        <div className="formulario-tarefas--coluna">
          <label htmlFor="descricaoTarefaForm">Descrição</label>
          <textarea
            id="descricaoTarefaForm"
            placeholder="Revisar bugs críticos no módulo principal."
            className="input-textarea input--borda"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            maxLength="150"
          ></textarea>
        </div>
        <div className="formulario-tarefas--coluna">
          <label htmlFor="responsavelTarefaForm">Responsável(is):</label>
          <div className="container__checkbox">
            {['Fulano 1', 'Fulano 2', 'Fulano 3', 'Fulano 4', 'Fulano 5', 'Fulano 6'].map((nome) => (
              <div className="container__checkbox--item" key={nome}>
                <input
                  type="checkbox"
                  id={nome}
                  data-responsavel
                  checked={responsaveis.includes(nome)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setResponsaveis([...responsaveis, nome]);
                    } else {
                      setResponsaveis(responsaveis.filter((resp) => resp !== nome));
                    }
                  }}
                />
                <label htmlFor={nome}>{nome}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="formulario-tarefas--linha-inteira">
        <button type="reset" className="formulario-tarefas__botao" onClick={() => {
          setTitulo('');
          setPrioridade('Alta');
          setData('');
          setDescricao('');
          setResponsaveis([]);
        }}>
          Limpar
        </button>
        <button type="submit" className="formulario-tarefas__botao">
          Adicionar
        </button>
      </div>
    </form>
    <ListaDeTarefas showSearchBar={false} />
    </>
  );
}


function formatarData(data) {
  if (data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
  return '';
}

export default CriarTarefa;
