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
import color from 'color';
import { motion } from 'framer-motion';
import Nav from './Nav';
import ColorModeToggler from './ColorModeToggler';

const useStyles = makeStyles(theme => ({
  appBar: {
    background: color(theme.palette.background.paper).alpha(0.5).toString(),
  },
  logo: {
    fontWeight: 'bold',
    textDecoration: 'none',
  },
}));

const MotionBox = motion.custom(Box);

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
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
                  Bruno Fernandes
                </Typography>
              </Link>
            </Box>
            <Box display="flex" alignItems="center">
              <Box px={1}>
                <ColorModeToggler />
              </Box>
              <Nav />
            </Box>
          </MotionBox>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
