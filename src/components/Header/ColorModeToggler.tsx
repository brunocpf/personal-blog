import React from 'react';
import useDarkMode from 'use-dark-mode';
import LightThemeIcon from '@material-ui/icons/Brightness7Rounded';
import DarkThemeIcon from '@material-ui/icons/Brightness1Rounded';
import { IconButton, makeStyles } from '@material-ui/core';
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
    >
      {isDarkMode ? <LightThemeIcon /> : <DarkThemeIcon />}
    </IconButton>
  );
};

export default ColorModeToggler;
