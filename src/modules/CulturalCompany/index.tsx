import Sidebar from 'core/components/Sibebar';
import { Route } from 'core/models/Route';

import CulturalCompanyRoutes from './CulturalCompanyRoutes';

import './styles.scss';

const routes: Route[] = [
  {
    name: 'Meus eventos',
    path: '/cultural-company/events'
  }, {
    name: 'Check-in',
    path: '/cultural-company/check-in'
  }, {
    name: 'Salas',
    path: '/cultural-company/rooms'
  }, {
    name: 'Administradores',
    path: '/cultural-company/users'
  }
];

const CulturalCompany = () => {

  return (
    <div className="cultural-company-container">
      <Sidebar routes={routes} />
      <div className="cultural-company-content">
        <CulturalCompanyRoutes />
      </div>
    </div>
  );

}

export default CulturalCompany;
