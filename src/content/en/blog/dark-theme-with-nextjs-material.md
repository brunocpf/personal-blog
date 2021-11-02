---
title: Dark Theme with SSR (Next.js) and Material UI v5
summary: Setting up a theme switcher using Material UI v5 and server side rendering with Next.js
date: 2021-10-14T08:19:33.122Z
tags:
  - ssr
  - react
---

# Dark Theme with SSR (Next.js) and Material UI v5

So, I had a bit of a hard time upgrading this blog to Material UI v5. I followed the [migration instructions](https://mui.com/guides/migration-v4/) that the authors suggest but everything was still broken, with mismatched CSS class names between the client and the server. I figured the problem was CSS related but it took a while for me to figure out that the real culprit was the [useDarkMode](https://github.com/donavon/use-dark-mode) hook which I used to switch between the light and dark theme with SSR, persistence, user preferences fallback support, and no content flash.

Utimately I decided to remove it. It seems it doesn't play well with switching themes now that Material UI has ditched JSS in favor of Emotion.

I ended up implementing a ThemeContext to deal with this, using cookies, inspired by the solution on the MUI docs website, and it seems to have worked well enough, and with no content flash (in my actual code, everything is properly organized in its own file, but for the sake of this post):

---

```tsx
import {
  createTheme,
  PaletteMode,
  useMediaQuery,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

function getThemeOptions(mode: PaletteMode): ThemeOptions {
  return {
    // theme options
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // light palette
          }
        : {
            // dark palette
          }),
    },
  };
}

function buildTheme(mode: PaletteMode) {
  return responsiveFontSizes(createTheme(getThemeOptions(mode)));
}

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
```

---

With this, you can just replace the `ThemeProvider` in `_app.tsx`, and use the `useThemeContext` hook to toggle the color mode.

See you in the next one!
