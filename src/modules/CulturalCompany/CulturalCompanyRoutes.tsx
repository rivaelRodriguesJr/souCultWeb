import BaseContainer from 'core/components/BaseContainer';
import { Route, Switch } from 'react-router';

import CheckIn from './pages/CheckIn';
import Events from './pages/Events';

import './styles.scss';

const CulturalCompanyRoutes = () => (
  <Switch>
    <Route path="/cultural-company/events">
      <Events />
    </Route>
    <Route path="/cultural-company/check-in">
      <CheckIn />
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
)

export default CulturalCompanyRoutes;