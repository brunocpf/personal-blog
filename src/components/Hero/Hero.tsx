import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  container: {
    ...theme.mixins.gutters(),
  },
  myImage: {
    backgroundSize: '200%',
    backgroundImage: 'url(my-photo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 25%',
  },
  imageBg: {
    background: `linear-gradient(45deg, ${
      theme.palette.type === 'light' ? '#C1D8E8' : '#828282'
    }, transparent)`,
  },
  highlight: {
    color: theme.palette.type === 'light' ? '#57BBFF' : '#F3F9FD',
  },
}));

export interface HeroProps {}
const MotionBox = motion.custom(Box);
const MotionContainer = motion.custom(Container);

const Hero: React.FC<HeroProps> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { formatMessage } = useIntl();

  const renderHelloMessage = () => {
    const splitText = formatMessage(
      {
        id: 'helloMessage',
      },
      { name: 'Bruno' },
    )
      .split(' ')
      .map(t => t.split(/(!)/))
      .flat();

    return splitText.map((s, i) =>
      s.includes('Bruno') ? (
        <span className={classes.highlight} key={i}>
          {s}
        </span>
      ) : (
        <span key={i}>
          {s}
          {i === splitText.length - 1 ? '' : ' '}
        </span>
      ),
    );
  };

  return (
    <Box className={classes.container}>
      <MotionContainer
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, translateY: '20px' },
          visible: {
            opacity: 1,
            translateY: '0px',
          },
        }}
      >
        <Grid
          container
          alignItems="center"
          direction={matches ? 'row' : 'column-reverse'}
        >
          <Grid item md={7}>
            <Box py={matches ? 8 : 3}>
              <Box py={matches ? 4 : 2}>
                <Typography variant="h2" align={matches ? 'left' : 'center'}>
                  {renderHelloMessage()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" align={matches ? 'left' : 'center'}>
                  {formatMessage({
                    id: 'welcomeMessage',
                  })}
                </Typography>
              </Box>
              <Box py={2}>
                <Grid
                  container
                  spacing={1}
                  justify={matches ? 'flex-start' : 'center'}
                >
                  <Grid item>
                    <Button variant="contained" color="primary">
                      {formatMessage({
                        id: 'aboutMe',
                      })}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      {formatMessage({
                        id: 'blog',
                      })}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item md={5}>
            <Box
              py={matches ? 8 : 2}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box
                width={{ xs: '200px', sm: '200px', md: '300px', lg: '400px' }}
                height={{ xs: '200px', sm: '200px', md: '300px', lg: '400px' }}
                borderRadius={30}
                p="5%"
                className={classes.imageBg}
              >
                <MotionBox
                  width="100%"
                  height="100%"
                  borderRadius={30}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                      translateY: '0px',
                      translateX: '0px',
                    },
                    visible: {
                      opacity: 1,
                      translateY: '-2%',
                      translateX: '-15%',
                    },
                  }}
                  className={classes.myImage}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MotionContainer>
    </Box>
  );
};

export default Hero;
