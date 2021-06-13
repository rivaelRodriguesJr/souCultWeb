import './app.scss';
import 'core/assets/styles/custom.scss';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import Routes from 'Routes';

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0D9CA4',
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default App;
