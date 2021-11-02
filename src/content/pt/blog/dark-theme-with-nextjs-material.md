---
title: Dark Theme com SSR (Next.js) e Material UI v5
summary: Configurando um trocador de tema usando Material UI v5 e server side rendering com Next.js
date: 2021-10-14T08:19:33.122Z
tags:
  - ssr
  - react
---

# Dark Theme com SSR (Next.js) e Material UI v5

Então, eu tive um pouco de dificuldade atualizando esse blog para usar o Material UI v5. Eu segui a [guia de migração](https://mui.com/guides/migration-v4/) que os autores sugerem mas tudo ainda ficou quebrado, com erro de mismatch de nomes de classes de CSS entre o cliente e o servidor. I sabia que o problema era relacionado a CSS mas demorou um pouco pra eu descobrir que o culpado real foi o hook [useDarkMode](https://github.com/donavon/use-dark-mode) que eu usava pra trocar entre o tema dark/escuro e o tema light com SSR, persistência, suporte pra fallback das preferências do usuário, e sem "flash" de conteúdo.

Acabei decidindo remover esse hook. Parece que não funciona bem trocando temas agora que o Material UI descontinuou o JSS em favor do Emotion.

O que eu fiz foi implementar um ThemeContext pra tratar disso, usando cookies, inspirado pela solução implementada do site dos docs do MUI, e parece que funcionou bem o suficiente, sem flash de conteúdo (no meu código real, tudo tá organizado em arquivos separados, mas pra facilitar esse post):

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

Com isso, você pode trocar o `ThemeProvider` no `_app.tsx`, e usar o hook `useThemeContext` pra alterar entre os modos de cor.

Até o próximo!
