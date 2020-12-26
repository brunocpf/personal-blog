import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@material-ui/core';

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Montserrat Alternates',
    h2: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bolder',
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        borderRadius: '20px',
        boxShadow: 'none',
      },
    },
  },
};

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
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
  createMuiTheme({
    palette: {
      type: 'light',
      background: {
        default: '#FFFFFF',
        paper: '#F3F9FD',
      },
      text: {
        primary: '#1B3B51',
        secondary: '#57BBFF',
      },
    },
    ...themeOptions,
  }),
);

export default lightTheme;
