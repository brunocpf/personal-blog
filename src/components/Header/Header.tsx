import React from 'react';
import {
  AppBar,
  Box,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Nav from './Nav';
import ColorModeToggler from './ColorModeToggler';
import LanguageSwitcher from './LanguageSwitcher';
import MenuToggle from './MenuToggle';

const useStyles = makeStyles(theme => ({
  appBar: {
    background: theme.palette.background.default,
  },
  logo: {
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuNav: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      position: 'relative',
    },
  },
}));

const MotionBox = motion.custom(Box);

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Container>
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, translateY: '-10px' },
              visible: { opacity: 1, translateY: '0px' },
            }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Link href="/" passHref>
                <Typography
                  variant="h6"
                  component="a"
                  color="textPrimary"
                  className={classes.logo}
                >
                  bruno-fernandes.dev
                </Typography>
              </Link>
            </Box>
            <Box display="flex" alignItems="center" className={classes.nav}>
              <Box>
                <LanguageSwitcher />
              </Box>

              <Box px={2}>
                <ColorModeToggler />
              </Box>

              <Nav />
            </Box>
            <Box className={classes.menuNav}>
              <MenuToggle />
            </Box>
          </MotionBox>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
