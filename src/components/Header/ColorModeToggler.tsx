import React from 'react';
import { styled } from '@mui/material/styles';
import LightThemeIcon from '@mui/icons-material/Brightness7Rounded';
import DarkThemeIcon from '@mui/icons-material/Brightness1Rounded';
import { IconButton } from '@mui/material';
import { useIntl } from 'react-intl';
import { useThemeContext } from '../ThemeContext';

const PREFIX = 'ColorModeToggler';

const classes = {
  button: `${PREFIX}button`,
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.button}`]: {
    color: theme.palette.text.primary,
  },
}));

export interface ColorModeTogglerProps {}

const ColorModeToggler: React.FC<ColorModeTogglerProps> = () => {
  const { mode, toggleMode } = useThemeContext();
  const { formatMessage } = useIntl();

  return (
    <StyledIconButton
      onClick={toggleMode}
      className={classes.button}
      aria-label={formatMessage({
        id: 'toggleTheme',
      })}
      size="large"
    >
      {mode === 'dark' ? <LightThemeIcon /> : <DarkThemeIcon />}
    </StyledIconButton>
  );
};

export default ColorModeToggler;
