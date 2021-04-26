import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import mainLogo from 'core/assets/images/logo.png';

import LoginModal from '../LoginModal';

import './styles.scss';

const Navbar = () => {

  const [modalShow, setModalShow] = useState(false);


  useEffect(() => {
    console.log('Iniciou!');
  }, []);

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
        <a href="#/login" className="nav-link" onClick={() => setModalShow(true)}>
          <h6 className="text-start main-login-text">Bem-vindo!<br />Entre ou cadastre-se</h6>
        </a>
      </div>
      <LoginModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </nav>
  );
}

export default Navbar;
