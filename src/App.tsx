import './app.scss';
import 'core/assets/styles/custom.scss';
import Routes from 'Routes';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#0D9CA4',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Routes />
  </ThemeProvider>
  )
}

export default App;
