import { PaletteMode, useMediaQuery } from '@mui/material';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import buildTheme from 'src/util/theme';

function getCookie(name: string) {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, '$1');
}

type ThemeContextType = {
  mode: PaletteMode;
  setMode: (mode: PaletteMode | null) => void;
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  setMode: () => {},
  toggleMode: () => {},
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [colorMode, setColorMode] = useState<PaletteMode | null>(null);
  const prefersDarkMode = useMediaQuery('@media (prefers-color-scheme: dark)');
  const preferredColorMode: PaletteMode = prefersDarkMode ? 'dark' : 'light';

  useEffect(() => {
    if (process.browser) {
      const nextColorMode = getCookie('colorMode') as PaletteMode | string;
      if (nextColorMode !== 'light' && nextColorMode !== 'dark') {
        setColorMode(null);
      } else {
        setColorMode(nextColorMode);
      }
    }
  }, []);

  useEffect(() => {
    document.cookie = `colorMode=${
      colorMode ?? preferredColorMode
    };path=/;max-age=31536000`;
  }, [colorMode, preferredColorMode]);

  const toggleMode = useCallback(() => {
    setColorMode(mode => (mode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(
    () => buildTheme(colorMode ?? preferredColorMode),
    [colorMode, preferredColorMode],
  );

  return (
    <ThemeContext.Provider
      value={{
        mode: colorMode ?? preferredColorMode,
        setMode: setColorMode,
        toggleMode,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
