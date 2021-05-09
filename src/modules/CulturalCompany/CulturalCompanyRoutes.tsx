import BaseContainer from 'core/components/BaseContainer';
import { Route, Switch } from 'react-router';

import CheckIn from './pages/CheckIn';
import Events from './pages/Events';
import Profile from './pages/Profile/';

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
      </BaseContainer>
      <Profile/>
    </Route>
  
  </Switch>
)

export default CulturalCompanyRoutes;