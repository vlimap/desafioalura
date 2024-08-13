import './footer.css';

function Footer() {
const anoAtual = new Date().getFullYear();
  return (
    <div className="footer">
      &copy; {anoAtual} Task Senac. Todos os direitos reservados.
    </div>
  );
}

export default Footer;
