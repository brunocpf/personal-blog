import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useIntl } from 'react-intl';
import NavButton from './NavButton';

export interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();

  const navButtons = [
    {
      label: formatMessage({ id: 'home' }),
      href: '/',
    },
    {
      label: formatMessage({ id: 'blog' }),
      href: '/blog',
    },
    {
      label: formatMessage({ id: 'about' }),
      href: '/about',
    },
    {
      label: formatMessage({ id: 'contact' }),
      href: '/contact',
    },
  ];

  return (
    <Box
      display={{ xs: 'none', sm: 'grid' }}
      gridGap={theme.spacing(2)}
      gridAutoFlow="column"
    >
      {navButtons.map(nb => (
        <NavButton label={nb.label} href={nb.href} key={nb.href} />
      ))}
    </Box>
  );
};

export default Nav;
