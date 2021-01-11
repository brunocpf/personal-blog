import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    background: theme.palette.background.default,
    overflowX: 'hidden',
  },
}));

export interface AppContainerProps {}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.appLayout}>{children}</div>;
};

export default AppContainer;
