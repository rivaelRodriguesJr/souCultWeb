import { createStyles, Divider, makeStyles, Typography } from '@material-ui/core';
import './styles.scss';

type Props = {
  title: string;
  children: React.ReactNode;
}

/*
.base-container-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 23px;
  text-transform: uppercase;

  color: #0D9CA4;

  margin-bottom: 45px;
}

.base-container-divider {
  border-color: #0D9CA4; 
  margin-bottom: 20px;
 }

*/

const useStyles = makeStyles(() =>
  createStyles({
    baseContainerTitle: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '35px',
      lineHeight: '23px',
      textTransform: 'uppercase',
      color: '#0D9CA4',
      marginBottom: '30px'
    },
    baseContainerDivider: {
      marginBottom: '20px'
    }
  })
);

const BaseContainer = ({ title, children }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.baseContainerTitle}>{title}</Typography>
      <Divider className={classes.baseContainerDivider} />
      {children}
    </>
  );
}

export default BaseContainer;
