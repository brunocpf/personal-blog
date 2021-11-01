import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Nav from './Nav';
import ColorModeToggler from './ColorModeToggler';
import LanguageSwitcher from './LanguageSwitcher';
import MenuToggle from './MenuToggle';

const MotionBox = motion(Box);

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: theme => theme.palette.background.default }}
    >
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
                  fontWeight="bold"
                  sx={{ textDecoration: 'none' }}
                >
                  bruno-fernandes.dev
                </Typography>
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Box>
                <LanguageSwitcher />
              </Box>

              <Box px={2}>
                <ColorModeToggler />
              </Box>

              <Nav />
            </Box>
            <Box
              sx={{ position: 'relative', display: { xs: 'flex', md: 'none' } }}
            >
              <MenuToggle />
            </Box>
          </MotionBox>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
