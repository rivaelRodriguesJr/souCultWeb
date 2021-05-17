import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Sidebar from 'core/components/Sibebar';
import { Route } from 'core/models/Route';
import CulturalCompanyRoutes from './CulturalCompanyRoutes';

const routes: Route[] = [
  {
    name: 'Meus eventos',
    path: '/cultural-company/events',
    Icon: HomeOutlinedIcon
  }, {
    name: 'Check-in',
    path: '/cultural-company/check-in',
    Icon: LibraryBooksOutlinedIcon
  }, {
    name: 'Salas',
    path: '/cultural-company/rooms',
    Icon: BusinessOutlinedIcon
  }, {
    name: 'Administradores',
    path: '/cultural-company/users',
    Icon: PersonOutlineOutlinedIcon
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(5),
    }
  }),
);

const CulturalCompany = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar routes={routes} />
      <main className={classes.content}>
        <CulturalCompanyRoutes />
      </main>
    </div>
  );
};

export default CulturalCompany;
