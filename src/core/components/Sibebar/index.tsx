import mainLogo from 'core/assets/images/logo.png';
import { Route } from 'core/models/Route';
import { Link, NavLink } from "react-router-dom";
import './styles.scss';

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
        <li key={index}>
          <NavLink className="sidebar-nav-item" to={route.path}>
            {route.name}
          </NavLink>
        </li>
      ))}
    </ul>
    <div className="sidebar-logout-container">
      <Link to="/" className="sidebar-logout-text">
        Sair
      </Link>
    </div>
  </nav>
);

export default Sidebar;
