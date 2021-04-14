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
      <Redirect from="/actions" to="/actions/events" exact />
      <Route path="/actions">
        <h1>actions</h1>
        <Switch>
          <Route path="/actions/events">
            <h2>events</h2>
          </Route>
          <Route path="/actions/users">
            <h2>users</h2>
          </Route>
        </Switch>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
