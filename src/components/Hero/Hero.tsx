import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import ContactButtons from '../ContactButtons';

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    background: theme.palette.background.paper,
  },
  myImage: {
    backgroundSize: '200%',
    backgroundImage: 'url(my-photo.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 25%',
    width: '100%',
    borderRadius: '50%',
    height: '0',
    paddingBottom: '100%',
  },
  imageBg: {
    background: `linear-gradient(45deg, ${
      theme.palette.mode === 'light' ? '#C1D8E8' : '#828282'
    }, transparent)`,
  },
  highlight: {
    color: theme.palette.mode === 'light' ? '#57BBFF' : '#F3F9FD',
  },
}));

export interface HeroProps {}
const MotionContainer = motion(Container);

const Hero: React.FC<HeroProps> = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <Box className={classes.container} py={5}>
      <MotionContainer
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            translateY: '30px',
            opacity: 0.1,
          },
          visible: {
            translateY: '0px',
            opacity: 1,
          },
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={4} sm={4} md={2}>
            <motion.div className={classes.myImage} />
          </Grid>
          <Grid item xs={8} sm={8} md={10}>
            <Typography variant="h6">Bruno Fernandes</Typography>
            <Typography variant="subtitle1">
              {formatMessage({
                id: 'jobDescription',
              })}
            </Typography>
            <Box pt={4} display={{ xs: 'none', sm: 'block' }}>
              <Typography variant="body1">
                {formatMessage({
                  id: 'bio',
                })}
              </Typography>
              <ContactButtons />
            </Box>
          </Grid>
          <Box pt={4} px={2} display={{ xs: 'block', sm: 'none' }}>
            <Typography variant="body1">
              {formatMessage({
                id: 'bio',
              })}
            </Typography>
            <ContactButtons />
          </Box>
        </Grid>
      </MotionContainer>
    </Box>
  );
};

export default Hero;
