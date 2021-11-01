import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ContactButtons from '../ContactButtons';

const useStyles = makeStyles(theme => ({
  contactContainer: {
    display: 'flex',
    justifyContent: 'center',
    transform: 'scale(0.8)',
  },
}));

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const classes = useStyles();
  return (
    <Box component="footer" bgcolor="background.paper" p={1}>
      <Box p={1} className={classes.contactContainer}>
        <ContactButtons />
      </Box>
      <Divider />
      <Box p={1}>
        <Typography align="center" variant="body2">
          &copy; bruno-fernandes.dev | Designed and Developed by Bruno Fernandes
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
