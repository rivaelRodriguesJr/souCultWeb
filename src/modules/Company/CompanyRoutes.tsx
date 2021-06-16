import BaseContainer from "core/components/BaseContainer";
import Users from "modules/CulturalCompany/pages/Users";
import UsersForm from "modules/CulturalCompany/pages/UsersForm";
import { Route, Switch } from "react-router";
import './styles.scss';


const CompanyRoutes = () => (
  <Switch>
    <Route path="/company/users" exact>
      <BaseContainer title="Colaboradores">
        <Users />
      </BaseContainer>
    </Route>
    <Route path="/company/users/:userId">
      <UsersForm />
    </Route>
  </Switch>
);

export default CompanyRoutes;
