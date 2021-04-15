import Sidebar from "core/components/Sibebar";
import { Route, Switch } from "react-router";
import './styles.scss';

const routes: any[] = [
  {
    name: 'Meus eventos',
    path: '/cultural-company/events'
  }, {
    name: 'Check-in',
    path: '/cultural-company/check-in'
  }, {
    name: 'Salas',
    path: '/cultural-company/rooms'
  }, {
    name: 'Administradores',
    path: '/cultural-company/users'
  },
];

const CulturalCompany = () => {

  return (
    <div className="cultural-company-container">
      <Sidebar routes={routes} />
      <div className="cultural-company-content">
        <Switch>
          <Route path="/cultural-company/events">
            <h2>Meus eventos</h2>
          </Route>
          <Route path="/cultural-company/check-in">
            <h2>Check-in</h2>
          </Route>
          <Route path="/cultural-company/rooms">
            <h2>Salas</h2>
          </Route>
          <Route path="/cultural-company/users">
            <h2>Administradores</h2>
          </Route>
        </Switch>
      </div>
    </div>
  );

}

export default CulturalCompany;
