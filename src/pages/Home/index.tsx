import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './components/Home';

const Home = () => (
  <>
    <Navbar />
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
    </Switch>
  </>
);

export default Home;
