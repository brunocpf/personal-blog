import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from '@mui/system';

const MotionBox = motion(Box);

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
  const router = useRouter();

  const isActive = href.split('/')[1] === router.pathname.split('/')[1];

  return (
    <MotionBox
      sx={{
        position: 'relative',
        cursor: 'pointer',
        color: theme => theme.palette.text.primary,
        userSelect: 'none',
      }}
      whileHover="hover"
      initial={isActive ? 'active' : 'rest'}
      animate={isActive ? 'active' : 'rest'}
    >
      <Link href={href} passHref>
        <Typography component="a">
          <Typography color="textPrimary">{label}</Typography>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              overflow: 'hidden',
              bottom: 0,
            }}
          >
            <MotionBox
              sx={{
                background: 'currentColor',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform: 'translateX(-100%)',
              }}
              variants={buttonAnimationVariants}
            />
          </Box>
        </Typography>
      </Link>
    </MotionBox>
  );
};

export default NavButton;
