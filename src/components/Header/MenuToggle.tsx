import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Drawer, makeStyles, Toolbar, useTheme } from '@material-ui/core';
import { useIntl } from 'react-intl';
import NavButton from './NavButton';
import ColorModeToggler from './ColorModeToggler';
import LanguageSwitcher from './LanguageSwitcher';

const useStyles = makeStyles(theme => ({
  button: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    outline: 'none',
    border: 'none',
    padding: '6px',
    cursor: 'pointer',
    background: 'transparent',
    color: theme.palette.text.primary,
  },
}));

const Path: React.FC<React.ComponentProps<typeof motion.path>> = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export interface MenuToggleProps {}
type ToggleButtonProps = {
  toggle: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ toggle }) => {
  const classes = useStyles();

  return (
    <button onClick={toggle} className={classes.button}>
      <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
          initial={{
            d: 'M 2 2.5 L 20 2.5',
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          initial={{
            opacity: 1,
          }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
          initial={{
            d: 'M 2 2.5 L 20 2.5',
          }}
        />
      </svg>
    </button>
  );
};

const MenuToggle: React.FC<MenuToggleProps> = () => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggle = () => {
    setOpen(o => !o);
  };

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
    <motion.nav initial="hidden" animate={open ? 'open' : 'closed'}>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Toolbar>
          <Box display="flex" width="100%">
            <ToggleButton toggle={toggle} />
          </Box>
        </Toolbar>
        <Box display="flex" alignItems="center" justifyContent="center" px={2}>
          <ColorModeToggler />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" px={2}>
          <LanguageSwitcher />
        </Box>
        <Box
          display="grid"
          gridGap={theme.spacing(2)}
          gridAutoFlow="rows"
          pl={2}
          pr={8}
          pt={2}
        >
          {navButtons.map(nb => (
            <NavButton label={nb.label} href={nb.href} key={nb.href} />
          ))}
        </Box>
      </Drawer>
      <ToggleButton toggle={toggle} />
    </motion.nav>
  );
};

export default MenuToggle;
