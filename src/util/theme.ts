import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Josefin Sans',
    h2: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: '20px',
          boxShadow: 'none',
        },
      },
    },
  },
};

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#151515',
        paper: '#343434',
      },
      text: {
        primary: '#E2E2E2',
        secondary: '#F3F9FD',
      },
    },
    ...themeOptions,
  }),
);

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff',
        paper: '#f2f2f2',
      },
      primary: {
        main: '#a91b1b',
      },
      text: {
        primary: '#666666',
        secondary: '#a91b1b',
      },
    },
    ...themeOptions,
  }),
);

export default lightTheme;
