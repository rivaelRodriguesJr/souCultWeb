import { createStyles, CssBaseline, makeStyles, Theme } from "@material-ui/core";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Sidebar from "core/components/Sibebar";
import React from "react";
import CompanyRoutes from "./CompanyRoutes";
import './styles.scss';

const routes: any[] = [
  {
    name: 'Colaboradores',
    path: '/company/users',
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

const Company = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar routes={routes} />
      <main className={classes.content}>
        <CompanyRoutes />
      </main>
    </div>
  );
};

export default Company;
