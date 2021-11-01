import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
import ContactButtons from '../ContactButtons';

const PREFIX = 'Footer';

const classes = {
  contactContainer: `${PREFIX}contactContainer`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.contactContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    transform: 'scale(0.8)',
  },
}));

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <StyledBox component="footer" bgcolor="background.paper" p={1}>
      <Box p={1} className={classes.contactContainer}>
        <ContactButtons />
      </Box>
      <Divider />
      <Box p={1}>
        <Typography align="center" variant="body2">
          &copy; bruno-fernandes.dev | Designed and Developed by Bruno Fernandes
        </Typography>
      </Box>
    </StyledBox>
  );
};

export default Footer;
