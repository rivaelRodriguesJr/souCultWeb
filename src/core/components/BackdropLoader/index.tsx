import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  isLoading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const BackdropLoader = ({ isLoading = false }: Props) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

export default BackdropLoader;
