import BaseContainer from 'core/components/BaseContainer';
import { Route, Switch } from 'react-router';

import CheckIn from './pages/CheckIn';
import Events from './pages/Events';
import NewEvent from './pages/NewEvent';
import Users from './pages/Users';
import Rooms from './pages/Rooms';
import NewRoom from './pages/NewRoom';

import './styles.scss';

const CulturalCompanyRoutes = () => (
  <Switch>
    <Route path="/cultural-company/events">
      <Events />
    </Route>
    <Route path="/cultural-company/newevent">
      <NewEvent />
    </Route>
    <Route path="/cultural-company/rooms">
      <Rooms/>
    </Route>
    <Route path="/cultural-company/newroom">
      <NewRoom/>
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
      <Users/>
    </Route>
  
  </Switch>
)

export default CulturalCompanyRoutes;