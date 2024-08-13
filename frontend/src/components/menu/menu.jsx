import { Link } from 'react-router-dom';
import './module.menu.css';

function Menu() {
  return (
    <div className="menu">
      <Link to="/" className="menu-item active">Tarefas</Link>
      <Link to="/criar-tarefa" className="menu-item">Criar tarefa</Link>
    </div>
  );
}

export default Menu;
