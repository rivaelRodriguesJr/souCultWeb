import Company from 'pages/Company';
import CulturalCompany from 'pages/CulturalCompany';
import Home from 'pages/Home';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from './core/utils/history';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect from="/" to="/home" exact />
      <Route path="/home">
        <Home />
      </Route>  
      <Redirect from="/cultural-company" to="/cultural-company/events" exact />
      <Route path="/cultural-company">
        <CulturalCompany />
      </Route>
      <Redirect from="/company" to="/company/users" exact />
      <Route path="/company">
        <Company />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
