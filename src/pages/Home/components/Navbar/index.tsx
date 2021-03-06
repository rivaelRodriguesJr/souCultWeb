import { Link, NavLink } from 'react-router-dom';
import './styles.scss';
import mainLogo from 'core/assets/images/logo.png';


const Navbar = () => {
  return (
    <nav className="row bg-gray main-nav">
      <div className="col-1">
        <Link to="/">
          <img className="main-logo-img" src={mainLogo} alt="Sou Cult" />
        </Link>
      </div>
      <div className="col-9">
        <ul className="main-menu">
          <li>
            <NavLink to="/home/about" className="nav-link">
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/know-more" className="nav-link">
              Como funciona
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/contact" className="nav-link">
              Contato
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="col-2 main-menu-login-container">
      <NavLink to="/cultural-company" className="nav-link">
        <h6 className="text-start main-login-text">Bem-vindo!<br/>Entre ou cadastre-se</h6>
      </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
