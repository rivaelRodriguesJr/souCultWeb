import BaseContainer from "core/components/BaseContainer";
import { Route, Switch } from "react-router";
import './styles.scss';


const CompanyRoutes = () => (
  <Switch>
    <Route path="/company/users">
      <BaseContainer title="Colaboradores">
        <h2>Colaboradores</h2>
      </BaseContainer>
    </Route>
  </Switch>
);

export default CompanyRoutes;
