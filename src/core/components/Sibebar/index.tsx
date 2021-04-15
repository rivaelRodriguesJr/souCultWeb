import mainLogo from 'core/assets/images/logo.png';
import { NavLink } from "react-router-dom";
import './styles.scss';

type Route = {
  name: string;
  path: string;
}

type Props = {
  routes: Route[];
}

const Sidebar = ({ routes }: Props) => (
  <nav className="sidebar-nav-container">
    <div className="sidebar-logo-container">
      <img className="sidebar-logo-img" src={mainLogo} alt="Sou Cult" />
    </div>
    <ul className="sidebar-nav-content">
      {routes.map((route, index) => (
        <li>
          <NavLink key={index} className="sidebar-nav-item" to={route.path}>
            {route.name}
          </NavLink>
        </li>
      ))}
    </ul>
    <div className="sidebar-logout-container">
      <a href="/" className="sidebar-logout-text">Sair</a>
    </div>
  </nav>
);

export default Sidebar;
