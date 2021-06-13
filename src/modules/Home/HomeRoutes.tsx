import { Route, Switch } from 'react-router-dom';
import Index from './pages/Home';
import Register from './pages/Register/index';


const HomeRoutes = () => (
  <Switch>
    <Route path="/home" exact>
      <Index />
    </Route>
    <Route path="/home/about">
      <h1>Sobre</h1>
    </Route>
    <Route path="/home/know-more">
      <h1>Como funciona</h1>
    </Route>
    <Route path="/home/contact">
      <h1>Contato</h1>
    </Route>
    <Route path="/home/register">
      <Register></Register>
    </Route>
  </Switch>
);

export default HomeRoutes;
