import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import mainLogo from 'core/assets/images/logo.png';
import { Route } from 'core/models/Route';
import { Link, NavLink } from "react-router-dom";
import './styles.scss';

const drawerWidth = 240;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#EEEAEB'
    },
    drawerContainer: {
      overflow: 'auto',
    },
    drawerToolbar: {
      padding: theme.spacing(3),
      justifyContent: 'center'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    mainLogoImg: {
      width: '133.5px',
      height: '118.px'
    },
    iconColor: {
      color: '#FE8C12'
    }
  }),
);


type Props = {
  routes: Route[];
}

const Sidebar = ({ routes }: Props) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar className={classes.drawerToolbar}>
        <img className={classes.mainLogoImg} src={mainLogo} alt="Sou Cult" />
      </Toolbar>
      <div className={classes.drawerContainer}>
        <List>
          {routes.map((route, index) => (
            <NavLink key={index} to={route.path} className="sidebar-nav-item">
              <ListItem className="text-sea-blue-2" button>
                {route.Icon && (<ListItemIcon className={classes.iconColor}><route.Icon /></ListItemIcon>)}
                <ListItemText primary={route.name} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
      <div className="sidebar-logout-container">
        <Link to="/" className="sidebar-logout-text">
          Sair
        </Link>
      </div>
    </Drawer>
  );
}

export default Sidebar;
