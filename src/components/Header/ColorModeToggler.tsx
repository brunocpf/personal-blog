import React from 'react';
import useDarkMode from 'use-dark-mode';
import LightThemeIcon from '@mui/icons-material/Brightness7Rounded';
import DarkThemeIcon from '@mui/icons-material/Brightness1Rounded';
import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useIntl } from 'react-intl';

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.text.primary,
  },
}));

export interface ColorModeTogglerProps {}

const ColorModeToggler: React.FC<ColorModeTogglerProps> = () => {
  const classes = useStyles();
  const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode();
  const { formatMessage } = useIntl();

  return (
    <IconButton
      onClick={toggleDarkMode}
      className={classes.button}
      aria-label={formatMessage({
        id: 'toggleTheme',
      })}
      size="large">
      {isDarkMode ? <LightThemeIcon /> : <DarkThemeIcon />}
    </IconButton>
  );
};

export default ColorModeToggler;
