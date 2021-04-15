import BaseContainer from "core/components/BaseContainer";
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
            <BaseContainer title="Meus eventos">
              <h2>Meus eventos</h2>
            </BaseContainer>
          </Route>
          <Route path="/cultural-company/check-in">
            <BaseContainer title="Check-in">
              <h2>Check-in</h2>
            </BaseContainer>
          </Route>
          <Route path="/cultural-company/rooms">
            <BaseContainer title="Salas">
              <h2>Salas</h2>
            </BaseContainer>
          </Route>
          <Route path="/cultural-company/users">
            <BaseContainer title="Administradores">
              <h2>Administradores</h2>
            </BaseContainer>
          </Route>
        </Switch>
      </div>
    </div>
  );

}

export default CulturalCompany;
