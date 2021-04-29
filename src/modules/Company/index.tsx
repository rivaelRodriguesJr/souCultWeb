import BaseContainer from "core/components/BaseContainer";
import Sidebar from "core/components/Sibebar";
import { Route, Switch } from "react-router";
import './styles.scss';

const routes: any[] = [
  {
    name: 'Colaboradores',
    path: '/company/users'
  },
];

const Company = () => {

  return (
    <div className="company-container">
      <Sidebar routes={routes} />
      <div className="company-content">
        <Switch>
          <Route path="/company/users">
            <BaseContainer title="Colaboradores">
              <h2>Colaboradores</h2>
            </BaseContainer>
          </Route>
        </Switch>
      </div>
    </div>
  );

}

export default Company;
