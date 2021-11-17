import { Route, Switch } from 'react-router-dom';
import Index from './pages/Home';
import Register from './pages/Register/index';
import About from './pages/About/index';
import KnowMore from './pages/KnowMore/index';


const HomeRoutes = () => (
  <Switch>
    <Route path="/home" exact>
      <Index />
    </Route>
    <Route path="/home/about">
      <About></About>
    </Route>
    <Route path="/home/know-more">
      <KnowMore></KnowMore>
    </Route>
    <Route path="/home/register">
      <Register></Register>
    </Route>
  </Switch>
);

export default HomeRoutes;
