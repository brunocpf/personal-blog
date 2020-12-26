import React, { useState } from 'react';
import { motion, useCycle, Variants } from 'framer-motion';
import { makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  button: {
    position: 'relative',
    cursor: 'pointer',
    color: theme.palette.text.primary,
    userSelect: 'none',
  },
  highlightContainer: {
    position: 'absolute',
    width: '100%',
    height: '2px',
    overflow: 'hidden',
    bottom: 0,
  },
  highlight: {
    background: 'currentColor',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: 'translateX(-100%)',
  },
  activeButton: {},
}));

const buttonAnimationVariants: Variants = {
  hover: {
    translateX: '-25%',
  },
  rest: {
    translateX: '-125%',
  },
  active: {
    translateX: '0%',
  },
};

export interface NavButtonProps {
  label: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, href }) => {
  const classes = useStyles();
  const router = useRouter();

  const isActive = href === router.pathname;

  return (
    <motion.div
      className={classNames({
        [classes.button]: true,
        [classes.activeButton]: isActive,
      })}
      whileHover="hover"
      initial={isActive ? 'active' : 'rest'}
      animate={isActive ? 'active' : 'rest'}
    >
      <Link href={href} passHref>
        <Typography component="a">
          <Typography color="textPrimary">{label}</Typography>
          <div className={classes.highlightContainer}>
            <motion.div
              className={classes.highlight}
              variants={buttonAnimationVariants}
            />
          </div>
        </Typography>
      </Link>
    </motion.div>
  );
};

export default NavButton;
