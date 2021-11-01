import React from 'react';
import { styled } from '@mui/material/styles';

const PREFIX = 'AppContainer';

const classes = {
  appLayout: `${PREFIX}appLayout`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.appLayout}`]: {
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
  return <Root className={classes.appLayout}>{children}</Root>;
};

export default AppContainer;
